# Portfolio

Personal portfolio website with an admin dashboard for managing skills, projects, and experience.

## Tech Stack

- **Backend:** Go (Gin), MongoDB
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **API Spec:** OpenAPI 3.0 (`api/openapi.yaml`)
- **Deployment:** Render (backend via Docker), Vercel (frontend)

## Project Structure

```
backend-go/       # Go API server (Gin + MongoDB)
frontend-next/    # Next.js frontend & admin dashboard
api/              # OpenAPI specification
```

## Local Development

### Prerequisites

- Go 1.21+
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd backend-go
cp .env.example .env  # configure MONGO_URI, JWT_SECRET, etc.
go run main.go
# Starts on http://localhost:8080
```

### Frontend

```bash
cd frontend-next
npm install
npm run dev
# Starts on http://localhost:3000
```

## Legacy

The previous NestJS/TypeScript monorepo codebase is preserved in the `legacy/` directory.
