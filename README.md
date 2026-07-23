# new_era

iOS app — Expo (SDK 57) + Expo Router + NativeWind + InstantDB.

## Setup

1. Create an app at [instantdb.com/dash](https://instantdb.com/dash) and copy the App ID.
2. Add it to `.env`:

   ```
   EXPO_PUBLIC_INSTANT_APP_ID=your-app-id
   ```

3. Install and run:

   ```bash
   npm install
   npx expo run:ios
   ```

   This project uses `expo-maps`, a native module, so it needs a **development
   build** — Expo Go cannot load it. `npx expo run:ios` compiles the app into
   the simulator; the first build takes a few minutes.

   After that, `npm start` and hot reload work as normal. You only need to
   re-run `expo run:ios` when native dependencies change.

## v0.01 scope

Three screens, nothing more:

- `app/login.tsx` — InstantDB magic-code auth (email → 6-digit code)
- `app/(tabs)/index.tsx` — Home, with a full-bleed map
- `app/(tabs)/profile.tsx` — Profile, with sign out

Signed-out users are redirected to login by `src/components/AuthGate.tsx`.

## Instant schema & permissions

`instant.schema.ts` and `instant.perms.ts` are the source of truth. Push changes with:

```bash
npx instant-cli@latest push
```

## Layout

- `src/lib/db.ts` — the Instant client (`db`), typed against the schema
- `src/components/AuthGate.tsx` — redirects signed-out users to `/login`
- `src/components/Map.tsx` — Apple Maps on iOS, Google Maps on Android
- `instant.schema.ts` — entities and links
- `instant.perms.ts` — permission rules
