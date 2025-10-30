## Immoview Backend

Node.js backend (Express + Prisma + Postgres) with Admin JWT auth and Google/Facebook OAuth (skeleton), supporting video management and user engagement (likes, comments, shares).

### Prerequisites
- Node.js 18+
- Docker (optional, for Postgres)

### Setup
1. Copy environment and set values:
   - Create `backend/.env` with required vars (see below).

2. Start Postgres (optional via docker):
   - From project root: `docker-compose up -d`

3. Install deps and generate Prisma client:
   - `cd backend`
   - `npm i`
   - `npm run prisma:generate`

4. Migrate database:
   - `npm run prisma:migrate -- --name init`

5. Run dev server:
   - `npm run dev`

### Environment (.env)
Required:
- `NODE_ENV` = development
- `PORT` = 4000
- `DATABASE_URL` = postgresql://postgres:postgres@localhost:5432/immoview?schema=public
- `JWT_SECRET` = long random string
- `CORS_ORIGIN` = http://localhost:3000
- `OAUTH_CALLBACK_BASE_URL` = http://localhost:4000/api/auth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (optional for OAuth)
- `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` (optional for OAuth)

### API
- `GET /health`
- `POST /api/auth/admin/login` (email/password)
- `POST /api/auth/oauth/:provider/callback` (GOOGLE|FACEBOOK) – simplified upsert flow
- Admin-protected:
  - `GET /api/admin/admins`
  - `POST /api/admin/admins`
  - `PATCH /api/admin/admins/:id/deactivate`
  - `GET /api/admin/users`
  - `GET /api/admin/videos`
  - `POST /api/admin/videos`
  - `PATCH /api/admin/videos/:id`
  - `DELETE /api/admin/videos/:id`
- Public videos:
  - `GET /api/videos?q=...`
  - `GET /api/videos/:id`
- Engagement (USER token):
  - `POST /api/engagement/like`
  - `POST /api/engagement/unlike`
  - `POST /api/engagement/comment`
  - `GET /api/engagement/comments/:videoId`
  - `POST /api/engagement/share`


