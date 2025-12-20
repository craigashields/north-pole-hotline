"use client";
import {
  type CSSProperties,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import CallerAvatar from "./CallAvatar";
import CallButton from "./CallButton";
import Snowflake from "./Snowflake";
import { MessageCircle } from "lucide-react";
import { useConversation } from "@elevenlabs/react";

// ✅ Add achievements here (edit these however you like)
const KIDS_CONTEXT = [
  {
    name: "Robin",
    age: 5,
    gender: "boy",
    achievements: [
      "worked hard at school",
      "showed kindness to others",
      "fantastic creativity in art and crafts",
    ],
  },
  {
    name: "Dexter",
    age: 13,
    gender: "boy",
    achievements: [
      "was a great helper at home",
      "Improved a lot at school, putting in extra effort",
      "practised basketball and becoming a great player",
    ],
  },
  {
    name: "Luke",
    age: 4,
    gender: "boy",
    achievements: [
      "was brave with everything going on",
      "has start learning to read",
      "made lots of new friends at school",
    ],
  },
];

const PhoneScreen = () => {
  const [statusText, setStatusText] = useState("Ready");

  const conversation = useConversation({
    onConnect: () => setStatusText("Connected"),
    onDisconnect: () => setStatusText("Disconnected"),
    onError: (e) => {
      console.error(e);
      setStatusText("Error (check console)");
    },
    onMessage: () => {
      // Useful for debugging (tentative + final transcripts, agent messages, etc.)
      // console.log("Message:", m);
    },
  });

  const chimeRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/festive-chime-full.mp3"); // already includes 3 chimes
    audio.preload = "auto";
    audio.volume = 0.5;
    chimeRef.current = audio;
  }, []);

  const playFestiveChime = useCallback(async () => {
    const audio = chimeRef.current;
    if (!audio) return;

    // Reset
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;

    // Ensure metadata is loaded so duration is correct
    if (!Number.isFinite(audio.duration) || audio.duration === 0) {
      await new Promise<void>((resolve) => {
        const onLoaded = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          resolve();
        };
        audio.addEventListener("loadedmetadata", onLoaded, { once: true });
        audio.load();
      });
    }

    const fallbackMs = Math.ceil((audio.duration || 4) * 1000) + 250;

    await new Promise<void>((resolve) => {
      const cleanup = () => {
        window.clearTimeout(timer);
        audio.removeEventListener("ended", onEnd);
        audio.removeEventListener("error", onError);
      };

      const onEnd = () => {
        cleanup();
        resolve();
      };

      const onError = (e: Event) => {
        console.error("Chime error", e);
        cleanup();
        resolve();
      };

      // Attach listeners BEFORE play()
      audio.addEventListener("ended", onEnd);
      audio.addEventListener("error", onError);

      const timer = window.setTimeout(() => {
        // If something weird happens, move on.
        cleanup();
        resolve();
      }, fallbackMs);

      audio.play().catch((err) => {
        console.error("Chime play() failed", err);
        cleanup();
        resolve();
      });
    });
  }, []);

  const start = useCallback(async () => {
    try {
      // setStatusText("Requesting microphone...");
      // await navigator.mediaDevices.getUserMedia({ audio: true });

      setStatusText("Dialing Santa...");
      await playFestiveChime();
      setStatusText("Connecting to Santa...");
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!, // set in .env.local
        connectionType: "webrtc",
        dynamicVariables: {
          all_children: "Dexter, Robin, and Luke",
        },
      });

      // ✅ Send all kids + achievements once at call start (as an object, not JSON string)
      conversation.sendContextualUpdate?.(
        JSON.stringify({
          kids: KIDS_CONTEXT,
          // Optional: you can add an explicit turn-taking hint for Santa
          house_rule:
            "Please speak to one child at a time and ask them to pass the phone after you finish.",
        })
      );

      setStatusText(`Talking to Santa`);
    } catch (err) {
      console.error(err);
      const name =
        err && typeof err === "object" && "name" in err
          ? String((err as Error).name).toLowerCase()
          : "";
      if (name.includes("notallowed")) {
        setStatusText("Mic blocked — enable microphone for this site");
      } else if (
        name.includes("notfound") ||
        name.includes("devicesnotfound")
      ) {
        setStatusText("No microphone found");
      } else if (name.includes("notreadable") || name.includes("abort")) {
        setStatusText("Mic in use by another app");
      } else {
        setStatusText("Could not start (see console)");
      }
    }
  }, [conversation, playFestiveChime]);

  const stop = useCallback(async () => {
    await conversation.endSession();
    setStatusText("Ended");
  }, [conversation]);

  const isActive = conversation.status === "connected";

  const formatTime = () =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setTime(formatTime());
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const [snowflakes, setSnowflakes] = useState<
    { id: number; style: CSSProperties }[]
  >([]);

  const generateSnowflakes = useCallback(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 12 + 8}px`,
        animationDuration: `${Math.random() * 8 + 6}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.2,
      },
    }));
  }, []);

  useEffect(() => {
    setSnowflakes(generateSnowflakes());
  }, [generateSnowflakes]);

  const displayStatus =
    statusText === "Ready" || statusText === "Ended" ? "" : statusText;

  return (
    <div className="relative w-full max-w-[375px] mx-auto">
      {/* Phone bezel */}
      <div className="relative bg-phone-bezel rounded-[3rem] p-3 shadow-2xl">
        {/* Phone frame inner border */}
        <div className="absolute inset-2 rounded-[2.5rem] border border-muted/20" />

        {/* Phone screen */}
        <div className="relative phone-screen rounded-[2.25rem] overflow-hidden min-h-[750px] flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-phone-bezel rounded-b-2xl z-10 flex items-center justify-center">
            <div className="w-16 h-4 bg-phone-dark rounded-full flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted/30" />
            </div>
          </div>

          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-christmas-red/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-christmas-green/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-christmas-gold/10 rounded-full blur-3xl" />

            {/* Snowflakes */}
            {snowflakes.map((flake) => (
              <Snowflake key={flake.id} style={flake.style} />
            ))}
          </div>

          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-8 pt-12 pb-4">
            <span className="text-sm font-medium text-foreground/80">
              {time || "9:41"}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full bg-foreground/70"
                    style={{ height: `${i * 3 + 2}px` }}
                  />
                ))}
              </div>
              <span className="text-xs text-foreground/70 ml-1">5G</span>
              <div className="ml-2 w-6 h-3 border border-foreground/50 rounded-sm relative">
                <div
                  className="absolute inset-0.5 bg-christmas-green rounded-xs"
                  style={{ width: "80%" }}
                />
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-foreground/50 rounded-r-full" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
            {/* Avatar section */}
            <CallerAvatar />

            {/* Caller info */}
            <div className="mt-10 text-center">
              <h1 className="text-3xl font-semibold text-foreground text-shadow-glow tracking-tight">
                Santa Claus
              </h1>
              <p className="mt-2 text-lg text-christmas-gold font-medium">
                🎄 North Pole
              </p>
              <p className="mt-4 text-muted-foreground text-sm font-light animate-pulse">
                {displayStatus || "\u00a0"}
              </p>
            </div>
          </div>

          {/* Call actions */}
          <div className="relative z-10 pb-16 px-8">
            {/* Quick actions */}
            <div className="flex items-center justify-center gap-16 mb-10">
              <button className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full glass-effect flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <span className="text-xs text-muted-foreground">Remind Me</span>
              </button>
              <button className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full glass-effect flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-foreground/80" />
                </div>
                <span className="text-xs text-muted-foreground">Message</span>
              </button>
            </div>

            {/* Single call control */}
            <div className="flex items-center justify-center gap-6">
              {isActive ? (
                <div className="flex flex-col items-center gap-3">
                  <CallButton type="end" onClick={stop} />
                  <span className="text-sm text-muted-foreground">
                    End Call
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <CallButton type="call" onClick={start} />
                  <span className="text-sm text-muted-foreground">Call</span>
                </div>
              )}
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full" />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute left-0 top-32 w-1 h-8 bg-phone-bezel rounded-l-lg" />
      <div className="absolute left-0 top-44 w-1 h-14 bg-phone-bezel rounded-l-lg" />
      <div className="absolute left-0 top-60 w-1 h-14 bg-phone-bezel rounded-l-lg" />
      <div className="absolute right-0 top-44 w-1 h-16 bg-phone-bezel rounded-r-lg" />
    </div>
  );
};

export default PhoneScreen;
