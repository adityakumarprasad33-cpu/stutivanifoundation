# 74. Local Development Guide

## Overview
This guide provides the necessary steps to run the Stuti-Vani Foundation platform on a local development machine.

## Prerequisites
- Node.js (v18.17.0 or higher)
- npm (v9 or higher)
- A Firebase project with Firestore, Authentication, and Storage enabled.
- A Cloudinary account (for media uploads).
- A Razorpay test account (for donation testing).

## Initial Setup
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd stuti-vani-foundation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Copy the example environment file and fill in your local credentials:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Do not commit `.env.local` to version control.*

## Running the Application
To start the local development server with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm start`: Starts the Next.js production server (requires `build` first).
- `npm run lint`: Runs ESLint to catch syntax and styling issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## Recommended IDE Setup
- **VS Code**: Recommended extensions include ESLint, Prettier, and Tailwind CSS IntelliSense.
- Ensure format-on-save is enabled to maintain code style consistency.
