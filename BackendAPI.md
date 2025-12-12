# Backend API — Endpoints & Configuration

This document describes the API routes, required request parameters, example responses, and environment variables to configure for Google OAuth, email, Gorq AI, and Google Maps integration.

---

## Quick setup / migrations

- Add required environment variables in `.env` (see `.env.example`).
- Run database migrations:

```powershell
php artisan migrate
```

### Database tables

The following tables are created by the migrations:

| Table                       | Description                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`                     | User accounts with fields: id, username, first_name, last_name, email, email_verified_at, password, provider_name, provider_id, avatar, current_plan, remember_token, timestamps            |
| `password_reset_tokens`     | Password reset tokens (email, token, created_at)                                                                                                                                            |
| `sessions`                  | Session storage for web authentication                                                                                                                                                      |
| `personal_access_tokens`    | Sanctum API tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, timestamps)                                                                         |
| `email_verification_tokens` | Email verification tokens (email, token, created_at)                                                                                                                                        |
| `ai_requests`               | AI generation request logs (id, user_id, model, prompt, status, result, error, tokens_used, meta, timestamps)                                                                               |
| `newsletter_subscribers`    | Newsletter subscriptions (id, name, email, verification_token, verified_at, unsubscribe_token, timestamps)                                                                                  |
| `subscription_plans`        | Available plans (id, name, slug, description, price, currency, interval, trial_days, features, is_active, timestamps)                                                                       |
| `payments`                  | Payment records (id, user_id, transaction_id, gateway, amount, currency, status, type, card_last_four, card_brand, description, plan_name, gateway_response, metadata, paid_at, timestamps) |
| `cache`                     | Laravel cache storage                                                                                                                                                                       |
| `cache_locks`               | Laravel cache locks                                                                                                                                                                         |
| `jobs`                      | Laravel queue jobs                                                                                                                                                                          |
| `job_batches`               | Laravel queue job batches                                                                                                                                                                   |
| `failed_jobs`               | Failed queue jobs                                                                                                                                                                           |

Installed and recommended packages:

- Laravel Sanctum — installed and configured for personal access tokens (token-based API auth)
- Laravel Socialite — configured for Google/GitHub OAuth flows

---

## Environment variables (added/required)

These variables were added to `.env.example` and must be configured in your `.env` when you connect services:

- GOOGLE_CLIENT_ID — Google OAuth client ID (Socialite)
- GOOGLE_CLIENT_SECRET — Google OAuth secret
- GOOGLE_REDIRECT — OAuth callback (default: `${APP_URL}/auth/google/callback`)
- GITHUB_CLIENT_ID — GitHub OAuth client ID
- GITHUB_CLIENT_SECRET — GitHub OAuth secret
- GITHUB_REDIRECT — GitHub OAuth callback
- GORQ_API_KEY — API key for Gorq (or your AI provider)
- GORQ_BASE_URL — Base URL for Gorq API (default `https://api.gorq.ai`)
- GORQ_DEFAULT_MODEL — Optional default model to use
- FRONTEND_URL — Frontend SPA address for CORS/callbacks
- SANCTUM_STATEFUL_DOMAINS — If using Sanctum for SPA auth

The repo already contains mail config examples (MAIL\_\* in `.env.example`) for sending messages.

---

## Routes summary

All API endpoints are exposed from `routes/api.php` and served from the API subdomain (e.g., `https://api.example.com/auth/login`).

### All endpoints at a glance

| Method              | URI                                    | Description                               | Auth  |
| ------------------- | -------------------------------------- | ----------------------------------------- | ----- |
| GET                 | `/ping`                                | Health check                              | No    |
| **Authentication**  |                                        |                                           |       |
| POST                | `/auth/register`                       | Register new user                         | No    |
| POST                | `/auth/login`                          | Login with email/password                 | No    |
| POST                | `/auth/logout`                         | Logout (revoke token)                     | Yes   |
| GET                 | `/auth/google/redirect`                | Redirect to Google OAuth                  | No    |
| GET                 | `/auth/google/callback`                | Google OAuth callback                     | No    |
| POST                | `/auth/google/token`                   | Exchange Google code/credential for token | No    |
| GET                 | `/auth/github/redirect`                | Redirect to GitHub OAuth                  | No    |
| GET                 | `/auth/github/callback`                | GitHub OAuth callback                     | No    |
| POST                | `/auth/github/token`                   | Exchange GitHub code/token for API token  | No    |
| POST                | `/auth/password/forgot`                | Request password reset email              | No    |
| POST                | `/auth/password/reset`                 | Reset password with token                 | No    |
| POST                | `/auth/password/change`                | Change password (authenticated)           | Yes   |
| POST                | `/auth/verify/send`                    | Send/resend verification email            | No    |
| GET                 | `/auth/verify/{token}`                 | Verify email with token                   | No    |
| GET                 | `/auth/link/google/redirect`           | Link Google account                       | Yes   |
| GET                 | `/auth/link/google/callback`           | Google link callback                      | Yes   |
| GET                 | `/auth/link/github/redirect`           | Link GitHub account                       | Yes   |
| GET                 | `/auth/link/github/callback`           | GitHub link callback                      | Yes   |
| POST                | `/auth/unlink`                         | Unlink OAuth provider                     | Yes   |
| **User Profile**    |                                        |                                           |       |
| GET                 | `/user`                                | Get current user profile                  | Yes   |
| PUT                 | `/user`                                | Update user profile                       | Yes   |
| POST                | `/user/avatar`                         | Upload avatar image                       | Yes   |
| DELETE              | `/user`                                | Delete user account                       | Yes   |
| GET                 | `/users/{id}/public`                   | Get public profile                        | No    |
| **Mail**            |                                        |                                           |       |
| POST                | `/mail/contact`                        | Send contact message                      | No    |
| POST                | `/mail/newsletter`                     | Subscribe to newsletter                   | No    |
| GET                 | `/mail/newsletter/verify/{token}`      | Verify newsletter subscription            | No    |
| GET                 | `/mail/newsletter/unsubscribe/{token}` | Unsubscribe from newsletter               | No    |
| POST                | `/mail/password-reset`                 | Send password reset email                 | No    |
| **AI / Gorq**       |                                        |                                           |       |
| POST                | `/ai/generate`                         | Generate AI response                      | No    |
| GET                 | `/ai/jobs/{id}/status`                 | Get async AI job status                   | No    |
| **Maps**            |                                        |                                           |       |
| POST                | `/maps/pin`                            | Generate Google Maps embed URL            | No    |
| **Plans**           |                                        |                                           |       |
| GET                 | `/subscription-plans`                  | List all plans                            | No    |
| GET                 | `/subscription-plans/{slug}`           | Get plan by slug                          | No    |
| **Payments**        |                                        |                                           |       |
| POST                | `/subscriptions`                       | Pay for a plan (purchase)                 | Yes   |
| POST                | `/payments/process`                    | Process one-time payment                  | Yes   |
| GET                 | `/payments`                            | List payment history                      | Yes   |
| GET                 | `/payments/last-plan`                  | Get last purchased plan                   | Yes   |
| GET                 | `/payments/{transactionId}`            | Verify/get payment details                | Yes   |
| POST                | `/payments/refund/{transactionId}`     | Request refund                            | Yes   |
| POST                | `/payments/revert-plan`                | Revert/clear current plan                 | Yes   |
| POST                | `/payments/webhook`                    | Payment webhook handler                   | No    |
| **Admin/Dev Tools** |                                        |                                           |       |
| POST                | `/admin/migrate`                       | Run migrations via HTTP                   | Token |

---

## Authentication

#### Flow overview

- **Credential (email + password hash)** — `POST /auth/register` to create an account and `POST /auth/login` to obtain a Sanctum personal access token. Tokens must be sent via `Authorization: Bearer <token>` on protected routes. Frontends are responsible for hashing the password with SHA-256 before sending it to the API.
- **Logout** — `POST /auth/logout` works for both API calls (returns JSON) and browser flows (redirects + clears the `api_token` cookie) and revokes the active Sanctum token.
- **OAuth browser redirects** — `GET /auth/{provider}/redirect` (Google/GitHub) sends the browser to the provider; `GET /auth/{provider}/callback` finishes authentication, issues a Sanctum token, and either returns JSON or sets the `api_token` cookie and redirects to the SPA.
- **OAuth API/token exchange** — `POST /auth/google/token` and `POST /auth/github/token` let SPAs or native apps exchange an OAuth `code`, Google Credential API `credential`, or a GitHub access token directly for a Sanctum token without browser redirects.
- **Email verification** — `POST /auth/verify/send` issues tokens; `GET /auth/verify/{token}` validates them and either returns JSON or redirects to the SPA.
- **Password reset** — `POST /auth/password/forgot` creates reset tokens and emails users; `POST /auth/password/reset` validates the token and updates the stored password hash.
- **Social linking** — Authenticated users can link/unlink Google/GitHub providers via `/auth/link/...` and `/auth/unlink` so future logins can use OAuth.
- **Profile & session hygiene** — Protected endpoints (e.g., `/user`) require the Bearer token or the secure `api_token` cookie returned by the OAuth callbacks.

> **⚠️ IMPORTANT: Password Hashing Requirement**
>
> For security, the frontend **must hash passwords client-side** before sending them to the API. All password fields expect a **SHA-256 hash** (64 hexadecimal characters) instead of plain text passwords. This ensures passwords are never transmitted in plain text over the network.
>
> Example (JavaScript):
>
> ```javascript
> const passwordHash = await crypto.subtle
>   .digest("SHA-256", new TextEncoder().encode(password))
>   .then((buf) =>
>     Array.from(new Uint8Array(buf))
>       .map((b) => b.toString(16).padStart(2, "0"))
>       .join("")
>   );
> ```

#### Credential-based register & login

- POST /auth/register

  - Body (JSON):
    - `username` (string, required, max 255, unique) — desired username
    - `first_name` (string, required, max 255) — user's first name
    - `last_name` (string, optional, max 255) — user's last name
    - `email` (string, required, valid email, unique) — user's email address
    - `password_hash` (string, required, 64 hex chars) — SHA-256 hash of the password
    - `password_hash_confirmation` (string, required) — must match password_hash
  - Behavior:
    - Creates a new user account with the provided details
    - Automatically sends an email verification link
    - Returns a Sanctum personal access token for immediate authentication
  - Success (201): `{ status: 'success', message: 'Registered. Please check your email to verify your account.', data: { user: {...}, token: '<plain-text-token>' } }`
  - Errors:
    - 422 — Validation failed (duplicate username/email, invalid format, etc.)
    - 500 — Server error

- POST /auth/login

  - Body (JSON):
    - `email` (string, required) — user's email address
    - `password_hash` (string, required, 64 hex chars) — SHA-256 hash of the password
  - Behavior:
    - Validates the email/password combination
    - Returns a Sanctum personal access token if valid
  - Success (200): `{ status: 'success', message: 'Logged in', data: { user: {...}, token: '<plain-text-token>' } }`
  - Errors:
    - 401 — Invalid credentials
    - 422 — Validation failed

#### Logout (token & cookie aware)

- POST /auth/logout

  - Behavior: API clients get JSON + token revocation; browser requests (Accept HTML) revoke tokens, clear the `api_token` cookie, and 302 redirect to `${FRONTEND_URL}/auth/logout`.
  - Success (200 or 302): JSON `{ status: 'success', message: 'Logged out' }` or 302 redirect to frontend logout page.

#### Google OAuth (browser redirect flow)

- GET /auth/google/redirect

  - Redirects to Google OAuth consent page using Laravel Socialite. This endpoint issues an HTTP redirect (302) that should be followed by the browser or frontend app. If your frontend needs the direct URL instead, call this endpoint and read the Location header of the response.

- GET /auth/google/callback

  - OAuth callback — handled with Laravel Socialite.
  - Behavior:
    - Socialite reads Google user info (id, name, email, avatar). The backend will map provider `name` into `first_name` and `last_name` where possible and generate a `username` using the preferred username or email localpart.
    - If a user exists with the same `provider_name` + `provider_id`, that user is returned.
    - Otherwise the backend attempts to find a user by email and attach Google provider data.
    - If no matching user exists, a new user is created and provider fields (`provider_name`, `provider_id`, `avatar`) are saved.
    - A Laravel Sanctum personal access token is created.
    - Behavior detail:
      - **By default (browser flow):** The server redirects (302) to `${FRONTEND_URL}/auth/complete?token=<sanctum-token>`. The token is passed as a query parameter for the frontend to extract and store.
      - **JSON response:** Only returned when the request is an explicit AJAX call (`X-Requested-With: XMLHttpRequest`), the `Accept` header specifically prefers `application/json` without `text/html` or `*/*`, or the query param `?format=json` is present.
  - Browser flow response (Redirect — default for all browser requests):
    - 302 redirect to `${FRONTEND_URL}/auth/complete?token=<plain-text-token>`
    - The frontend should extract the token from the URL, store it, and replace the URL in browser history to remove the token.
  - API flow response (JSON — only when explicitly requested):
    - { status: 'success', message: 'Authenticated via Google', data: { user: {...}, token: '<plain-text-token>' } }
    - To get JSON, use one of: `?format=json` query param, `X-Requested-With: XMLHttpRequest` header, or `Accept: application/json` (without `text/html` or `*/*`).

- POST /auth/google/token

  - Body (JSON):
    - `code` (string) — authorization code received from Google OAuth (required if `credential` missing)
    - `credential` (string) — ID token from Google One Tap / Credential API (required if `code` missing)
    - `redirect_uri` (string, optional) — override redirect URI used during code exchange
  - Behavior:
    - If `code` is provided, the backend exchanges it against Google's token endpoint using the configured `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, obtains an access token, resolves the user profile via Socialite, and creates/logs in the user.
    - If `credential` (ID token) is provided, the backend verifies it using Google's `tokeninfo` endpoint and uses the resulting profile to authenticate the user.
    - Always returns JSON (no redirects) with the Sanctum token.
  - Success response (200): `{ "status": "success", "message": "Authenticated via Google", "data": { "user": {...}, "token": "plain-text-sanctum-token" } }`
  - Errors:
    - 400 — Invalid/expired code or credential, or Google API error
    - 422 — Missing `code`/`credential` payload

#### GitHub OAuth (browser redirect flow)

- GET /auth/github/redirect

  - Redirects the browser to GitHub's OAuth consent page (via Socialite). If your SPA needs the URL to redirect itself, call this endpoint and read the Location header.

- GET /auth/github/callback

  - OAuth callback endpoint which handles the GitHub response and redirects to `${FRONTEND_URL}/auth/complete?token=<token>` for browser flows or returns JSON for API flows.

#### GitHub OAuth behavior

Behavior is identical to Google OAuth flow but uses the `github` Socialite driver:

- Creates the user if not present and saves `provider_name` = 'github' and `provider_id`.
- If a user already exists with the same email, the code attaches `provider` fields to that existing user rather than creating a new one.
- Redirects with token in query param on browser flows, returns JSON with token for API flows.

- POST /auth/github/token

  - Body (JSON):
    - `code` (string) — authorization code returned by GitHub's OAuth authorize endpoint (required if `access_token` missing)
    - `access_token` (string) — GitHub access token obtained on the client (required if `code` missing)
    - `redirect_uri` (string, optional) — custom redirect URI used when generating the code
  - Behavior:
    - When a `code` is provided, the backend calls `https://github.com/login/oauth/access_token` with your app's client ID/secret to exchange it for an access token, then fetches the user profile using Socialite and logs the user in.
    - When `access_token` is provided directly, it is used immediately to fetch the GitHub profile.
    - Always responds with JSON, returning `{ user, token }` on success or a structured 400 error on failure.
  - Errors:
    - 400 — Code exchange failed or provided access token invalid/expired
    - 422 — Neither `code` nor `access_token` provided

#### Password reset

- POST /auth/password/forgot

  - Body: { email }
  - Behavior: server will create a password reset token stored in `password_reset_tokens` (valid for ~2 hours) and email the frontend password-reset link to the user if the account exists. The response does not reveal whether the account exists.
  - Success (200): { status: 'success', message: 'Password reset link sent if account exists' }

- POST /auth/password/reset

  - Body: { email, token, password_hash, password_hash_confirmation }
  - Note: password_hash must be a 64-character SHA-256 hex hash of the new password
  - Behavior: verifies the reset token, ensures it is not expired (2 hours), updates the user's password hash, deletes the token, and returns a new API token so the user is authenticated immediately.
  - Success (200): { status: 'success', message: 'Password reset successfully', data: { user: {...}, token: '<plain-text-token>' } }

#### Email verification

- POST /auth/verify/send

  - Body: { email } or (authenticated) send to current user
  - Behavior: **Resend verification email** for users who missed or lost the original email sent during registration. Creates/updates an email verification token stored in `email_verification_tokens` and sends a verification email. For security, the response does not reveal whether the email exists if unregistered.
  - Success (200): { status: 'success', message: 'Verification email sent' } or 'Email already verified' if already verified

- GET /auth/verify/{token}

  - Behavior: verifies the token, sets `email_verified_at` for the user, deletes the token, and either returns JSON (API clients) or redirects the browser to `${FRONTEND_URL}/auth/verified`.
  - Success (200 or 302): JSON { status: 'success', message: 'Email verified', data: { user } } or 302 redirect to frontend verified page.

### Social account linking / unlinking

- GET `/auth/link/{provider}/redirect` + `/auth/link/{provider}/callback` (authenticated) allow existing users to attach Google/GitHub accounts to their profile.
- POST `/auth/unlink` removes the provider association.
- These routes require Bearer tokens (they live in the authenticated group) and return JSON.

### User profile (protected)

- GET /user

  - Returns current authenticated user's profile.
  - Success (200): { status: 'success', message: 'User profile', data: { user } }

- PUT /user

  - Body (optional fields):
    - `username` (string, optional, max 255, unique)
    - `first_name` (string, optional, max 255)
    - `last_name` (string, optional, max 255)
    - `email` (string, optional, valid email address, unique among users)
    - `avatar` (string, optional, url to avatar image)
  - Validation rules:
    - `username` => sometimes|string|max:255|unique:users,username,{user_id}
    - `first_name` => sometimes|string|max:255
    - `last_name` => sometimes|string|max:255
    - `email` => sometimes|email|unique:users,email,{user_id}
    - `avatar` => sometimes|url
  - Success (200): returns updated user { status: 'success', message: 'Profile updated', data: { user } }
  - Errors:
    - 401 Unauthenticated — missing or invalid token
    - 422 Validation failed — invalid_name/email or email already taken
    - 500 Server error — database or other internal error

- POST /user/avatar

  - Body (multipart/form-data):
    - `avatar` (file, required) — image file (jpg, png, gif, webp)
  - Behavior: stores the uploaded image in `storage/app/public/avatars/` and updates the user's avatar field with the public URL.
  - Success (200): { status: 'success', message: 'Avatar uploaded', data: { user } }
  - Errors:
    - 401 Unauthenticated
    - 422 Invalid file type or size
    - 500 Upload/storage error

- DELETE /user

  - Behavior: permanently deletes the user account and all associated data (tokens, payments, etc.)
  - Success (200): { status: 'success', message: 'Account deleted' }
  - Errors:
    - 401 Unauthenticated

- GET /users/{id}/public

  - Returns limited public profile information for the specified user ID.
  - Success (200): { status: 'success', message: 'Public profile', data: { user: { id, username, first_name, last_name, avatar } } }
  - Errors:
    - 404 User not found

### Mail endpoints

- POST /mail/contact

  - Body: { name, email, subject, message }
  - Behavior: sends a contact email to the configured admin email address.
  - Success (200): { status: 'success', message: 'Message sent' }

- POST /mail/newsletter

  - Body: { email, name }
  - Behavior: subscribes the email to the newsletter and sends a verification email.
  - Success (200): { status: 'success', message: 'Subscription verification sent' }

- GET /mail/newsletter/verify/{token}

  - Behavior: verifies the newsletter subscription using the token.
  - Success (200): { status: 'success', message: 'Newsletter subscription verified' }

- GET /mail/newsletter/unsubscribe/{token}

  - Behavior: unsubscribes the email from the newsletter using the token.
  - Success (200): { status: 'success', message: 'Unsubscribed from newsletter' }

- POST /mail/password-reset

  - Body: { email }
  - Behavior: alias for `/auth/password/forgot` - sends password reset email.
  - Success (200): { status: 'success', message: 'Password reset link sent if account exists' }

### AI / Gorq endpoints

- POST /ai/generate

  - Body: { prompt, model, ... }
  - Behavior: generates AI response using Gorq API, supports both sync and async modes.
  - Success (200): { status: 'success', message: 'Generated', data: { result, tokens_used } } or 202 for async with job ID.

- GET /ai/jobs/{id}/status

  - Returns the status of an async AI generation job.
  - Success (200): { status: 'success', message: 'Job status', data: { status, result, error } }

### Maps endpoint

- POST /maps/pin

  - Body: { address, zoom, size }
  - Behavior: generates a Google Maps embed URL and direct link for the given address.
  - Success (200): { status: 'success', message: 'Map generated', data: { embed_url, maps_link } }

### Subscription plans

- GET /subscription-plans

  - Returns all available subscription plans.
  - Success (200): { status: 'success', message: 'Plans retrieved', data: { plans: [...] } }

- GET /subscription-plans/{slug}

  - Returns details for a specific plan by slug.
  - Success (200): { status: 'success', message: 'Plan retrieved', data: { plan } }
  - Errors:
    - 404 Plan not found

### Payments

- POST /subscriptions

  - Body: { plan_slug, payment_method_id, ... }
  - Behavior: processes payment for a subscription plan.
  - Success (200): { status: 'success', message: 'Subscription created', data: { payment, user } }

- POST /payments/process

  - Body: { amount, currency, payment_method_id, description }
  - Behavior: processes a one-time payment.
  - Success (200): { status: 'success', message: 'Payment processed', data: { payment } }

- GET /payments

  - Returns the authenticated user's payment history.
  - Success (200): { status: 'success', message: 'Payments retrieved', data: { payments: [...] } }

- GET /payments/last-plan

  - Returns the user's most recent subscription plan purchase.
  - Success (200): { status: 'success', message: 'Last plan retrieved', data: { plan, payment } }

- GET /payments/{transactionId}

  - Returns details for a specific payment transaction.
  - Success (200): { status: 'success', message: 'Payment details', data: { payment } }

- POST /payments/refund/{transactionId}

  - Behavior: requests a refund for the specified payment.
  - Success (200): { status: 'success', message: 'Refund requested', data: { refund } }

- POST /payments/revert-plan

  - Behavior: reverts the user's current plan to null.
  - Success (200): { status: 'success', message: 'Plan reverted' }

- POST /payments/webhook

  - Body: webhook payload from payment provider
  - Behavior: handles payment provider webhooks for payment status updates.
  - Success (200): { status: 'success', message: 'Webhook processed' }

### Developer tools

If you do not have terminal access on the server, there is a safe, token-protected HTTP endpoint for running migrations using Artisan. It is disabled by default and should be enabled and used with caution in production environments.

Endpoint:

- POST /admin/migrate

Payload / headers:

- Header `X-RUN-MIG-TOKEN` or body param `token` — the value must match `RUN_MIG_TOKEN` in `.env`.
- Optional `seed` boolean body param to run `db:seed` after migrations.
- Optional `path` string body param to pass `--path` to `migrate`.

Requirements & safety:

- `ALLOW_RUN_MIG=true` must be set in `.env` to allow this endpoint to run.
- `RUN_MIG_TOKEN` should be a long random secret and stored in server environment. Do not keep it in VCS.
- The route is throttled (`throttle:10,1`) by default.

Example usage (curl):

```
curl -X POST https://api.example.com/admin/migrate \
    -H "X-RUN-MIG-TOKEN: $RUN_MIG_TOKEN"
```

Response:

- Returns a JSON result with the Artisan output under `data.output`. If operations fail, a 500 result with details will be returned and logged.

Security note: After running migrations via HTTP, disable ALLOW_RUN_MIG or rotate the token. This endpoint provides a convenient but sensitive capability and should be restricted to trusted usage only.
