# 🚀 Portfolio Migration: Next.js + Golang (Gin)

## 📌 Project Vision
Transitioning from a TypeScript-heavy SPA (Vite) and Node.js (NestJS) to a high-performance **Hybrid Stack**:
- **Frontend**: Next.js 15 (App Router, Server Components, Lenis Scrolling)
- **Backend**: Golang (Gin-Gonic, GORM, OpenAPI)
- **Philosophy**: Contract-First development with strict type safety across the boundary.

---

## 🏗️ Architectural Shift

| Layer | Old (TS/Node) | New (Go/Next.js) | Reason |
| :--- | :--- | :--- | :--- |
| **Rendering** | Client-Side (Vite) | **Server-Side (Next.js)** | SEO & Initial Load Speed |
| **API Framework**| NestJS | **Gin-Gonic (Go)** | Memory Efficiency & Concurrency |
| **Data Flow** | Loose JSON | **OpenAPI Spec** | Prevention of Type Drift |
| **Database** | Prisma / TypeORM | **GORM (Go)** | Native performance for Data Eng tasks |

---

## 🛠️ Step-by-Step Implementation

### Phase 1: The Contract (api/openapi.yaml)
1. **Define Schemas**: Create the `Project` and `Contact` schemas.
2. **Define Endpoints**: 
   - `GET /projects`: Fetch portfolio data from Postgres.
   - `POST /contact`: Handle form submissions and emails.
3. **Generate**: 
   - Run `oapi-codegen` for Go Server stubs.
   - Run `openapi-typescript` for Next.js Client types.

### Phase 2: The Go Backend (backend-go/)
1. **Modules**: Initialize with `go mod init github.com/Izenberk/portfolio-go`.
2. **Infrastructure**:
   - Set up `main.go` with Gin router.
   - Configure GORM with Postgres connection pool.
3. **Handlers**: Implement the logic for the generated OpenAPI interfaces.
4. **Environment**: Use `.env` for DB credentials and Port settings.

### Phase 3: The Next.js Frontend (frontend-next/)
1. **App Router**: Migrate layout logic from Vite to `app/layout.tsx`.
2. **Interactivity**: Use `"use client"` sparingly for animations (Framer Motion) and scrolling (Lenis).
3. **API Integration**: Swap internal API routes for fetch calls to the Go backend (`localhost:8080`).

---

## 🦾 Bytey Bestie's Development Rules
> **Role:** Senior AI Automation Architect Mode.
>
> 1. **No Manual Structs**: All API-related Go structs must come from `oapi-codegen`.
> 2. **Clean Repository**: Keep `legacy-ts/` only as a logic reference; do not import from it.
> 3. **Error Handling**: Use Go’s explicit error checking (`if err != nil`) for robust production code.
> 4. **MCP Leverage**: Use `@postgres` via Cursor to verify that GORM migrations match existing data.

---

## 🚦 Current Roadmap
- [x] Git Remote synced to `Portfolio.git`.
- [x] Local Environment (Postgres/Mongo) verified via MCP.
- [ ] **NEXT**: Draft `api/openapi.yaml` from legacy Express routes.
- [ ] Initialize `backend-go` project.