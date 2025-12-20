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
- `app/components/CallSanta.tsx`: Simpler call starter version (uses `useConversation` directly).
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
