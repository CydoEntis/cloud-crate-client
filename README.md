# 🌩️ CloudCrate Client

Frontend for **CloudCrate** — a modern cloud storage web app with rich file previews and collaborative workspaces.

![CloudCrate Client Screenshot](./docs/demo.gif)

## Tech Stack

- React 18 + TypeScript
- TanStack Router (type-safe routing)
- TanStack Query (data fetching)
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- Zod
- ShadCn

## Features

- Drag-and-drop file uploads
- Rich previews (images, videos, PDFs, Office docs)
- Real-time storage tracking
- Responsive design (mobile/tablet/desktop)
- Dark mode support

## Setup

### Prerequisites
- Node.js 18+
- npm (recommended)
- Running CloudCrate API backend

## HTTPs
Will need to add your own certificates in order to communicate with the API over Https

### Installation

**Install dependencies**
```bash
npm install
```

**Create .env**
```bash
VITE_API_URL=https://localhost:7295
```

## Project Structure
```bash
src/
├── features/           # Feature modules (auth, crates, files)
├── shared/            # Shared components & utilities
├── routes/            # Route components
└── App.tsx
```

License
MIT
