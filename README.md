# The Pipe Dream public site

The public website for The Pipe Dream, including the live Weldon song-request experience.

## Production routing

- GitHub: `matawayllc/the-pipe-dream-site` (`main`)
- Vercel: `matawayllc/the-pipe-dream-site`
- Production: `pipedreamband.com` and `www.pipedreamband.com`
- Heist API: `https://portal.pipedreamband.com`

Run `npm run check:routing` before any push or deployment. The Vercel production build runs the same routing guard and will reject a retired or unexpected repository owner.

## Environment routing

The Weldon route handlers call Heist server-to-server. Their upstream is selected by deployment environment and is never exposed to browser JavaScript.

| Public environment | Public origin | Heist origin |
| --- | --- | --- |
| Production | `https://pipedreamband.com` | `https://portal.pipedreamband.com` |
| Staging project / Vercel Preview | `https://the-pipe-dream-site-staging.vercel.app` | `https://pipe-dream-band-portal-staging.vercel.app` |

Production retains its existing defaults when the environment variables are omitted. Staging and every Vercel Preview deployment fail closed unless all three values are explicitly configured:

```text
PUBLIC_SITE_ENVIRONMENT=staging
PUBLIC_SITE_ORIGIN=https://the-pipe-dream-site-staging.vercel.app
HEIST_API_ORIGIN=https://pipe-dream-band-portal-staging.vercel.app
```

Configure these values on the dedicated Vercel staging project (`the-pipe-dream-site-staging`, project ID `prj_DF2tKJXVwjcejGyz8UtaFJv8TVZA`) and on any Preview environment that should use staging. The staging project's `staging` branch deploys with `VERCEL_ENV=production`; that combination is accepted only when Vercel supplies this exact project ID. The Mataway LLC production project and every unknown production project are forbidden from claiming the staging environment. Never set `VERCEL_PROJECT_ID` manually.

Never configure a Preview deployment with the production Heist origin. Run `npm run check:environment` to validate the environment contract; `npm run build` runs both repository and environment routing guards automatically.

For local development, copy `.env.example` to `.env.local`. With no upstream variables configured, local development preserves the prior behavior and calls production Heist. Set all three staging values above when locally testing staging instead.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
