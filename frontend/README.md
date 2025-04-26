# Kinetiic Ink - Exercise Tracker

A responsive exercise tracking application built with React, TypeScript, TailwindCSS, and PostgreSQL.

## Features

- **User Authentication**: Email/password and Google OAuth
- **Profile Management**: Create and manage multiple fitness profiles
- **Workout Tracking**: Create workouts with exercises and track sets, reps, and weights
- **Exercise History**: View your progress over time with historical data
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **State Management**: Redux Toolkit (without async thunk)
- **Routing**: React Router DOM
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Styling**: TailwindCSS

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Environment Setup

Create a `.env` file in the project root with the following variables:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/kinetiic_ink?schema=public"
JWT_SECRET="your-jwt-secret-key-change-this-in-production"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma migrate dev --name init
```

4. Start the development server:

```bash
npm run dev
```

## Development

### Folder Structure

- `src/components`: UI components
  - `ui/`: shadcn/ui components
  - `layout/`: Layout components
  - `workout/`: Workout-related components
  - `profile/`: Profile-related components
- `src/hooks`: Custom React hooks
- `src/lib`: Utility functions
- `src/pages`: Page components
- `src/redux`: Redux store setup, slices
- `src/services`: API services
- `src/types`: TypeScript types

### Database Schema

- **User**: Authentication and user information
- **Profile**: User fitness profiles
- **Workout**: Workout sessions
- **Exercise**: Exercises within workouts
- **Set**: Sets within exercises

## License

MIT
