# Agape Tech

Agape Tech is a statically exported Next.js site with a Netlify Function for contact inquiries. The contact function validates requests on the server and, when configured, sends inquiry email through Resend. The static site remains buildable without delivery credentials.

## Requirements

- Node.js 22
- npm
- A Resend account and a sender address verified with Resend to enable contact delivery

## Install and run locally

```bash
npm install
cp .env.example .env
```

Fill in the server-only contact settings in `.env` to test email delivery. Do not put credentials in `NEXT_PUBLIC_*` variables, commit them, or use real credentials in tests.

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
| `NEXT_PUBLIC_SITE_URL` | For canonical metadata | Actual public site origin, set before building. It is used for canonical/social URLs and sitemap output. |

If Resend settings are absent or invalid, the function returns an explicit configuration error and does not report a submission as successful. Turnstile is optional; when enabled, both keys must be set and verification failures prevent delivery. The handler includes bounded input validation, a honeypot, and same-origin checks. It does not use an in-memory rate limiter or claim durable rate limiting; configure additional abuse controls at the hosting or edge layer if needed.

The function does not write inquiries to an application database. Netlify and Resend process request or email data to provide their services; review their current terms and retention practices before enabling the form. The optional acknowledgement email is off by default.

## Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The production build exports the static site to `out/`. Netlify is configured in `netlify.toml` to publish that directory and bundle functions from `netlify/functions/`. Configure the environment variables in the Netlify site settings; no deployment is performed by these commands.

## Brand assets

The supplied source artwork remains in `assets/brand/`. Identical copies in `public/assets/brand/` are served by the site; keep both sets unchanged when updating the application.
