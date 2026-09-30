# Agape Tech

Agape Tech is a statically exported Next.js site with a Netlify Function for contact inquiries. The contact function validates requests on the server and, when configured, sends inquiry email through Resend and/or appends inquiries to Google Sheets. The static site remains buildable without delivery credentials.

## Requirements

- Node.js 22
- npm
- A Resend account and a sender address verified with Resend to enable email delivery
- A Google Cloud service account and a shared Google Sheet to enable direct Sheets delivery

## Install and run locally

```bash
npm install
cp .env.example .env
```

Fill in the server-only contact settings in `.env` to test delivery. The authoritative Netlify, Google Sheets, environment-variable, and owner-action instructions are in [docs/NETLIFY-PRODUCTION-SETUP.md](docs/NETLIFY-PRODUCTION-SETUP.md). Do not put credentials in `NEXT_PUBLIC_*` variables, commit them, or use real credentials in tests.

Run the site and Netlify Functions together:

```bash
npm run netlify:dev
```

The local site is served by Netlify Dev at `http://localhost:8888`. `npm run dev` starts the Next.js frontend alone and does not serve the contact function.

### Contact delivery settings

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for delivery | Server-only Resend API key. |
| `CONTACT_TO_EMAIL` | Yes, for delivery | Address that receives project inquiries. |
| `CONTACT_FROM_EMAIL` | Yes, for delivery | Sender address verified with Resend. Use an email address, not a display name. |
| `CONTACT_REPLY_TO_EMAIL` | No | Reply-To address for optional visitor acknowledgement messages. |
| `CONTACT_SEND_ACKNOWLEDGEMENT` | No | Set to `true` to send a visitor acknowledgement after the internal inquiry email succeeds. Defaults to disabled. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key. This is public and is embedded in the static form at build time. |
| `TURNSTILE_SECRET_KEY` | No | Server-only Turnstile secret. Set together with the public site key to enable server verification. |
| `GOOGLE_CLIENT_EMAIL` | No | Server-only Google service-account email. Share the target spreadsheet with this address as an Editor. |
| `GOOGLE_PRIVATE_KEY` | No | Server-only private key from the service-account JSON credentials. Store literal `\n` escapes or a supported multiline environment value. |
| `GOOGLE_SHEET_ID` | No | The spreadsheet ID from the Google Sheet URL. |
| `GOOGLE_SHEET_TAB` | No | Worksheet/tab title. Defaults to `Sheet1`. The first row must contain `name`, `email`, `organization`, `service`, `projectStage`, and `summary` headers. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | No | Legacy server-only webhook fallback. It is used only when the direct Google Sheets configuration is absent; direct Sheets takes precedence when complete. |
| `NEXT_PUBLIC_SITE_URL` | For canonical metadata | Actual public site origin, set before building. It is used for canonical/social URLs and sitemap output. |

If Resend settings are absent or invalid, the function can still deliver through Google Sheets when its required settings are complete. If Google Sheets is configured and its API call fails, the function logs an internal error and returns a generic delivery failure without exposing credentials or provider details. Turnstile is optional; when enabled, both keys must be set and verification failures prevent delivery. The handler includes bounded input validation, a honeypot, and same-origin checks. It does not use an in-memory rate limiter or claim durable rate limiting; configure additional abuse controls at the hosting or edge layer if needed.

The function does not write inquiries to an application database. Netlify and Resend process request or email data to provide their services; review their current terms and retention practices before enabling the form. The optional acknowledgement email is off by default.

For the complete deployment variable classification and owner-only cloud steps, use [docs/NETLIFY-PRODUCTION-SETUP.md](docs/NETLIFY-PRODUCTION-SETUP.md).

## Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The production build exports the static site to `out/`. Netlify is configured in `netlify.toml` to publish that directory and bundle functions from `netlify/functions/`. Configure the environment variables in the Netlify site settings; no deployment is performed by these commands.

If Turbopack cannot start its CSS worker in a restricted local environment, Next.js 16.3.7 also supports `npx next build --webpack`. This is a production build, not a dev-mode or experimental build. Keep the Netlify build command as `npm run build` unless the host has the same restriction.

## Production launch and GitHub Desktop

Use [the production launch checklist](docs/PRODUCTION-LAUNCH-CHECKLIST.md) to track owner-confirmed facts, domain/email verification, environment settings, functional smoke tests, and approvals. Do not replace missing business facts with sample contact details or organization names. Without `NEXT_PUBLIC_SITE_URL`, exported pages request no indexing and no canonical URL or populated sitemap is published. Set it to the final HTTPS **origin** (for example, `https://your-verified-domain`, not a path) in the build environment before approving production.

Review local changes in GitHub Desktop, inspect the diff and tests, and commit only when the owner approves the content and configuration plan. Push/publish and deploy are separate owner-approved steps; no command in the local verification procedure deploys the site. Never commit `.env`, API keys, or DNS credentials. Rebuild after changing any `NEXT_PUBLIC_*` value because these values are embedded in the static export. A Netlify environment-variable change alone does not update an existing static build.

## Brand assets

The supplied source artwork remains in `assets/brand/`. Identical PNG copies in `public/assets/brand/` remain unchanged; optimized WebP derivatives there serve the main site imagery. Keep source art and PNG copies intact when refreshing derivatives.
