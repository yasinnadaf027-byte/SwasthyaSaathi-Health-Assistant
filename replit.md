# Swasth Saathi

Swasth Saathi helps rural users describe symptoms in their own language, recognize possible warning signs, and take a safer next step without replacing a healthcare professional.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/swasthyasaathi` — React/Vite web app and all user-facing routes
- `artifacts/api-server/src/routes/swasthyasaathi.ts` — safety analysis, summaries, profile, assessments, reminders, and facility endpoints
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/db/src/schema/swasthyasaathi.ts` — PostgreSQL schema

## Architecture decisions

- Deterministic red-flag screening runs before optional Gemini enrichment and can override ordinary AI responses.
- AI is server-side only; the browser never receives the Gemini key.
- Facility entries are explicitly labeled demo data until a verified map provider is connected.
- The first build uses a demo user so the complete assessment journey is usable while managed authentication is not configured.

## Product

Swasth Saathi supports English, Hindi, and Marathi; guided symptom intake; browser voice input and playback; risk-focused results; doctor-ready summaries; configurable reminders; accessible profile preferences; nearby facility discovery; and privacy/safety education.

## User preferences

- The visible product name is “Swasth Saathi”.

## Gotchas

- Emergency guidance must remain deterministic and must not be downgraded by an AI response.
- Demo facility data must not be presented as verified healthcare information.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
