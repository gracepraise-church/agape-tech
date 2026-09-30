# Netlify production setup

This is the repository-side source of truth for production configuration. It does not authorize deployment, DNS changes, account changes, secret entry, or real email testing.

## Current architecture

- Frontend: Next.js App Router, TypeScript, static export.
- Static output: `out/`, configured by `next.config.ts` with `output: "export"`.
- Backend: one Netlify Function at `netlify/functions/contact.ts`.
- Contact flow: browser → `/.netlify/functions/contact` → validation/security checks → delivery providers.
- Google delivery: direct `google-spreadsheet` + `google-auth-library` service-account access.
- Email delivery: Resend, when its three required settings are valid.
- Legacy fallback: `GOOGLE_SHEETS_WEBHOOK_URL`, only when the direct Google Sheets configuration is absent. It is not an Apps Script requirement and is not called alongside direct Sheets delivery.
- Apps Script: not present in this repository and not required by the current architecture.

No Google service-account JSON file, `Code.gs`, `appsscript.json`, `clasp` configuration, or Apps Script import is part of the project.

## Netlify build configuration

| Setting | Current value | Source |
| --- | --- | --- |
| Build command | `npm run build` | `netlify.toml` |
| Publish directory | `out` | `netlify.toml` |
| Functions directory | `netlify/functions` | `netlify.toml` |
| Function bundler | esbuild | `netlify.toml` |
| Node version | 22 | `netlify.toml` |
| Next.js output | static export | `next.config.ts` |
| URL style | trailing slash | `next.config.ts` |
| Image handling | unoptimized | `next.config.ts` |

The static export does not contain the contact backend. Netlify separately bundles the Function, which is the only place that imports Google and Resend server libraries. The browser submits JSON to the Function and receives a generic success or error response.

The configured headers deny framing and MIME sniffing, limit referrer data, and disable unused camera, geolocation, and microphone capabilities. There are no repository-defined redirects.

## Contact delivery order and fallback behavior

For a normal request, the handler performs these operations in order:

1. Require `POST`, validate same-origin headers, require JSON, enforce the 12 KiB bound, and parse JSON.
2. Return a deliberately neutral `200` for a non-empty honeypot field without delivering it.
3. Validate `name`, `email`, `organization`, `service`, `projectStage`, and `summary` with the server-side Zod schema.
4. Validate delivery configuration and, when enabled, verify Cloudflare Turnstile before any delivery attempt.
5. Attempt Resend first when all Resend settings are valid. An optional visitor acknowledgement runs only after the internal email succeeds; acknowledgement failure does not undo a successful internal email.
6. If the direct Google configuration is complete, load `GOOGLE_SHEET_TAB` (default `Sheet1`) and append exactly these six fields: `name`, `email`, `organization`, `service`, `projectStage`, `summary`. The first worksheet row must use those same headers. The webhook is not called in this mode.
7. If direct Google configuration is absent and `GOOGLE_SHEETS_WEBHOOK_URL` is set, POST the inquiry plus `submittedAt` to that webhook.
8. Return `200` only when at least one configured delivery succeeds. If direct Google Sheets is configured, a failed Sheets write forces a generic `502` even if the earlier email attempt succeeded. Provider details and secrets are never returned to the browser.

The implementation has one Google path per request: direct Sheets takes precedence over the legacy webhook. It does not intentionally create duplicate Sheet rows or run both Google paths. As with any non-idempotent multi-provider request, a client retry after a lost response can repeat a submission; strict cross-provider idempotency would require a durable idempotency store, which is outside the current architecture and has not been added.

## Netlify environment variables

Set these in Netlify’s environment-variable settings. Do not put production values in `.env.example`, source code, browser-exposed variables, or committed files.

| Variable | Required? | Secret? | Scope | Purpose |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes for production canonical metadata | No | Build/static output | Must be `https://www.agapetech-llc.com` for the stated production domain. No path, query, or fragment. |
| `RESEND_API_KEY` | Required for Resend delivery | Yes | Function runtime | Authenticates Resend. |
| `CONTACT_TO_EMAIL` | Required for Resend delivery | Server-only, not inherently secret | Function runtime | Internal inquiry recipient. |
| `CONTACT_FROM_EMAIL` | Required for Resend delivery | Server-only, not inherently secret | Function runtime | Verified Resend sender. |
| `CONTACT_REPLY_TO_EMAIL` | Optional | Server-only, not inherently secret | Function runtime | Reply-To for visitor acknowledgements. |
| `CONTACT_SEND_ACKNOWLEDGEMENT` | Optional; defaults off | No | Function runtime | Set to `true` only when visitor acknowledgements are approved. |
| `GOOGLE_CLIENT_EMAIL` | Required for direct Sheets delivery | Server-only, not inherently secret | Function runtime | Service-account email shared on the target Sheet. |
| `GOOGLE_PRIVATE_KEY` | Required for direct Sheets delivery | Yes | Function runtime | Service-account private key; the handler supports literal `\n` or real newlines. |
| `GOOGLE_SHEET_ID` | Required for direct Sheets delivery | Server-only, not inherently secret | Function runtime | Target spreadsheet ID. |
| `GOOGLE_SHEET_TAB` | Optional; defaults to `Sheet1` | Server-only, not inherently secret | Function runtime | Worksheet/tab title. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Optional legacy fallback | Server-only; treat as sensitive | Function runtime | Used only when direct Sheets configuration is absent. Configure only if the existing webhook path is intentionally retained. |
| `TURNSTILE_SECRET_KEY` | Optional; must pair with the site key | Yes | Function runtime | Server-side Turnstile verification. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional; must pair with the secret | No | Build/static output and browser | Public Turnstile widget key. |

The application must never use `NEXT_PUBLIC_` for Google credentials, the Resend key, the Turnstile secret, or the webhook URL. Next.js loads non-public variables on the server; the static browser bundle must not receive them.

## Google Sheets owner actions

These steps require the owner’s Google account and are not performed by repository work:

- Create or select the Google Cloud project.
- Enable **Google Sheets API**.
- Create the service account and a current JSON key, if the organization policy permits user-managed keys.
- Copy only `client_email` and `private_key` into Netlify’s function/runtime variables; keep the downloaded JSON outside the repository and remove it from local storage when no longer needed.
- Share the target spreadsheet with the service-account email as an Editor.
- Confirm the worksheet header row is exactly `name`, `email`, `organization`, `service`, `projectStage`, `summary`.
- Revoke any previously exposed or retired service-account key.

If the organization blocks user-managed key creation, use the organization-approved authentication alternative rather than weakening repository security.

## Production domain owner actions

The repository expects this production origin:

```text
https://www.agapetech-llc.com
```

Set `NEXT_PUBLIC_SITE_URL` to that exact origin before the production build. Repository work does not modify Namecheap, DNS, Netlify domains, SSL, or redirects.

## Pre-deployment checklist

- [ ] Owner reviews and commits the intended GitHub Desktop diff.
- [ ] Owner pushes the approved branch and confirms the Netlify repository connection.
- [ ] `npm test`, `npm run lint`, and `npm run typecheck` pass.
- [ ] `npx next build --webpack` passes if the local Turbopack worker is blocked by the development sandbox.
- [ ] No service-account JSON, private key, Resend key, Turnstile secret, or webhook secret is present in the repository.
- [ ] Direct Google variables are complete in Netlify, or the legacy webhook is intentionally configured instead.
- [ ] Resend variables are complete if email delivery is required.
- [ ] Turnstile variables are both set or both unset.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the production origin and the site is rebuilt after changing it.

## Post-deployment owner validation

- [ ] Validate the Netlify `netlify.app` URL before the custom domain.
- [ ] Confirm `/`, `/contact/`, metadata routes, assets, and `/404.html` load.
- [ ] Submit one approved non-sensitive contact inquiry and verify exactly one new Sheet row.
- [ ] Verify one internal email only if Resend is configured, plus the approved acknowledgement behavior.
- [ ] Test a controlled provider failure and confirm the browser receives a safe error rather than fake success.
- [ ] Repeat approved mobile, Safari, keyboard, reduced-motion, and 200% zoom smoke tests.
- [ ] Owner separately approves production deployment and any DNS or domain changes.
