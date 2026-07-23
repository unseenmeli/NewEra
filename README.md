# new_era

Next.js (App Router) + TypeScript + Tailwind CSS v4 + InstantDB.

## Setup

1. Create an app at [instantdb.com/dash](https://instantdb.com/dash) and copy the App ID.
2. Add it to `.env.local`:

   ```
   NEXT_PUBLIC_INSTANT_APP_ID=your-app-id
   ```

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

The home page shows the Instant connection status so you can confirm the client is wired up.

## Instant schema & permissions

`instant.schema.ts` and `instant.perms.ts` are the source of truth. Push changes with:

```bash
npx instant-cli@latest push
```

## Layout

- `src/lib/db.ts` — the Instant client (`db`), typed against the schema
- `instant.schema.ts` — entities and links
- `instant.perms.ts` — permission rules
