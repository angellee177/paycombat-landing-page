
# Paycombat Landing page
## Description

This repository built for Paycombat landing page purpose, CMS-driven architecture. It uses Payload CMS 3 and Next.js 15, and is containerized for easy local development with Podman and PostgreSQL.

---

## 🛠 **Project Architecture**

This project follows a CMS-first philosophy. All marketing pages are composed of reusable, abstracted UI blocks.

### Core Stack
- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload 3.0
- **Database:** PostgreSQL via postgres-adapter
- **Styling:** Tailwind CSS v4
- **Runtime:** Podman (Daemonless & Rootless)

### Reusable Block Library

Located in [src/blocks/](src/blocks), these generalized components power all pages (Landing, About, Careers):

- **FeatureGrid:** Flexible icon/text grids.
- **ProfileGrid:** Team/Entity galleries with hover effects.
- **SplitContent:** 50/50 media and text layouts.
- **ActionBanner:** High-impact conversion cards.
- **AccordionList:** Categorized listings (Jobs, FAQs).

---

## Landing page config
See the Payload config and collections in [src/payload.config.ts](./src/payload.config.ts) and [src/collections/](./src/collections/).

---
## Project Setup

Before you start, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **pnpm** (for dependency management)
- **Podman** (for containerized development)
- **PostgreSQL** (local or via container)

### Install the Dependencies
```bash
pnpm install
```
---
## Running the Project

You can run the project locally or in containers. Below are instructions for both.

### 1. Local Development Setup

#### Development Mode

```bash
pnpm run dev
```

This command will start the application in development mode on http://localhost:3000.

#### Production Build

```bash
pnpm run build && pnpm start
```

This will build and start the application in production mode.

#### Step 1: Set Up Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
DATABASE_URL=your-database-url
PAYLOAD_SECRET=your-secret
DB_PORT=your-db-port
PORT=your-local-port
```

Check the `.env-example` file if available.

### 2. Containerized Setup (Podman + PostgreSQL)

#### Build and Start Containers

```bash
podman-compose -f podman-compose.yml up --build
```

#### Access the App
- Frontend/Admin: http://localhost:3000
- PostgreSQL: localhost:5432 (user: payload, password: payload, db: payload)

#### Stop the Containers

```bash
podman-compose -f podman-compose.yml down
```

#### Notes
- The `media` folder is mounted for uploads.
- The `postgres_data` volume persists your database between runs.
- For production, set strong secrets and review Dockerfile for best practices.

---
## Running Tests

You can run tests to ensure the application is functioning as expected.

```bash
pnpm run test
```

---

## Documentation

See the Payload admin UI at http://localhost:3000/admin for API and content management.

## Additional Notes
- **Environment Variables**: The `.env` file is critical for configuring the application, especially for connecting to PostgreSQL and setting secrets.
- **Troubleshooting**: If you change dependencies, rebuild with `--build`. For logs: `podman-compose -f podman-compose.yml logs`.
