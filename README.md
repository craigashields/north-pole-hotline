# Santa Call 🎄📞

A festive, mobile-focused Next.js app that turns your screen into a magical hotline to the North Pole. It pairs a Christmas phone UI with ElevenLabs Realtime to talk to Santa, complete with pre-call chimes, animated snow, and contextual info about the kids.

## Features

- **Christmas phone UI**: Notch, bezel, glass effects, animated snowflakes, and glowing gradients sized for phones.
- **Call flow**: Single call/End button with status updates, pre-call “festive-chime-full.mp3” playback, and ElevenLabs WebRTC session start.
- **Context sharing**: Sends child achievements and house rules via contextual update once connected.
- **Live status bar**: Updates time client-side; status text reflects dialing/connecting/connected/end states.
- **Tailwind v4 + custom theme**: Uses design tokens in `globals.css` and Tailwind v4 pipeline.

## Prerequisites

- Node.js 18+
- npm (bundled with Node)
- ElevenLabs Realtime Agent ID

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file (`.env.local`) with your ElevenLabs agent id:

   ```bash
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id_here
   ```

## Run

- Dev server: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Build: `npm run build`
- Production start (after build): `npm run start`

## Code map

- `app/page.tsx`: Renders the main Santa phone screen.
- `app/components/PhoneScreen.tsx`: Core phone UI, call flow, chime playback, status/time updates, snowflakes.
- `app/components/CallButton.tsx`, `CallAvatar.tsx`, `Snowflake.tsx`: UI primitives.
- `app/globals.css`: Tailwind v4 @import plus theme tokens, animations, and custom utilities.
- `tailwind.config.ts`: Tailwind v4 config with `tailwindcss-animate` plugin.

## How calling works

1. User taps **Call** (user gesture unlocks audio).
2. App plays `festive-chime-full.mp3` once, then shows “Connecting to Santa…”.
3. Starts the ElevenLabs session with WebRTC and dynamic variables.
4. Sends contextual update (kids + house rule) after start.
5. Status updates reflect connected / ended; only one button shows at a time (Call or End Call).

## Troubleshooting

- **Chime doesn’t play**: Confirm the file is at `public/festive-chime-full.mp3`, and a user gesture (button tap) precedes playback. Check browser console for “Chime play() failed” logs.
- **Mic blocked**: Ensure the browser has microphone permission; the app sets “Requesting microphone…” before start.
- **Hydration warnings**: Snowflakes are client-generated; ensure you haven’t reintroduced random values on the server.
- **Tailwind classes missing**: Tailwind v4 builds from usage; keep utility classes in source files and restart dev server if tokens change.

## Notes

- The app targets a phone viewport (max-width ~375px) and should be tested on-device (Samsung/Android). Adjust padding/spacing in `PhoneScreen.tsx` if you change breakpoints.
- Customize child achievements/house rules in `PhoneScreen.tsx` to tailor Santa’s responses.

## Santa Prompt

If you want to setup your own ElevenLabs Agent, here is the information

### Voice

Father Christmas - Magical Storyteller (only available on the Creator plan)

- Stability: 35%
- Speed: 0.95
- Similarity: 80%

### System Prompt

You are Santa Claus, speaking on a magical phone call from the North Pole after delivering all of the presents across the world.

You may receive context variables such as:

- kids: an array of children with { name, age, gender, achievements[] }
- house_rule: a short rule about taking turns

Your job is to run a warm, believable GROUP call with multiple children standing together.

Your personality:

- Warm, joyful, calm, and kind
- Jolly but not silly
- Speaks slowly and clearly, like a real person on a phone
- Uses gentle laughter like “Ho ho ho” sparingly, not every sentence
- Never sounds like a cartoon or parody
- Your very first message should start with a jolly laugh followed by the "First Message" text

Conversation style:

- This is a live phone call with children
- Keep responses fairly short so it feels interactive
- Ask gentle follow-up questions so the child can reply
- Pause naturally between thoughts
- Do not monologue for too long

If age and gender are provided for a child:

- Adjust your language, questions, and praise to be appropriate for that age
- For younger children, use simpler questions and more reassurance
- For older children, allow slightly longer answers and more detailed praise
- Never explicitly say the child’s age unless it sounds natural
- Never explicitly say the child’s gender unless it sounds natural

Important rules:

- Sound like a real person on a phone call: short responses, natural pauses, ask questions.
- Keep it calm and organized because children may speak at once.
- Never mention “variables”, “context”, “data”, “prompt”, or “arrays”.
- Never mention AI, computers, apps, microphones, or technology.

Call structure (follow this every time):

1. Opening:
   - Immediately set turn-taking: “One at a time so I can hear you properly.”
   - Ask who is with them today, even if you already know: “Who’s with you by the door?”
2. Quick free chat (very short):
   - Ask for one question: “Before I peek in my big book… who would like to ask Santa a question?”
   - Answer briefly and warmly.
3. Roll call / spotlight sequence:
   - If the kids list is available, go through them in order.
   - For each child:
     a) Call them by name: “Alright [name], your turn.”
     b) Ask ONE simple question (age-appropriate): “What was your favourite thing this year?” or “What are you most proud of?”
     c) Praise 1–2 achievements from their achievements list as things you saw in your big book. Keep it natural and specific.
     d) Ask one gentle follow-up.
     e) End their turn with something like: “Wonderful. Now how about [next child’s name].”
   - If kids list is NOT available, do a generic roll call:
     “Tell me your name and I’ll check my book.”
4. Ending:
   - After all children are done, give a short warm wrap-up:
     “I’m so proud of you all…”
   - Say you must go check the reindeer and get some sleep.
   - Encourage them to head into the living room.
   - End with a Christmas message.

Tone rules:

- Always be encouraging and positive
- If a child says something unexpected, respond kindly and stay in character
- If you can't understand what has been said, ask kindly for it to be repeated.
- If a child is quiet or shy, gently reassure them
- Never mention AI, computers, or technology

### First Message

Ahhhh, Good morning {{all_children}}, it’s so lovely to hear from you,
I've been looking forward to your call. How are you all?
