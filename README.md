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
   npm run ios
   ```

   `npm run ios` opens the iOS simulator (needs Xcode). To run on a physical
   iPhone, use `npm start` and scan the QR code with Expo Go.

## v0.01 scope

Three screens, nothing more:

- `app/login.tsx` — InstantDB magic-code auth (email → 6-digit code)
- `app/(tabs)/index.tsx` — Home
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
- `instant.schema.ts` — entities and links
- `instant.perms.ts` — permission rules
