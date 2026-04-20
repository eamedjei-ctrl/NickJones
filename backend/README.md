# TowPrecision Backend

This directory contains a Next.js backend API powered by Supabase.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from your Supabase project.
3. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/login` — login by email
- `GET /api/users` — list users
- `GET /api/requests` — list requests
- `POST /api/requests` — create a request
- `PATCH /api/requests/[id]` — update request status
- `GET /api/earnings` — list earnings

## Supabase Tables

Recommended tables:

- `users` (id, name, email, role)
- `requests` (id, pickup_location, destination, status, user_id)
- `earnings` (id, distance, fuel_cost, estimated_earnings, request_id)
