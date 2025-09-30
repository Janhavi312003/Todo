# Todo App

## What This Is

This is a full-stack todo app that lets users create accounts, manage their tasks, and filter them by status. I built it to practice my skills with Next.js 15 and modern React patterns, but it's also fully functional and ready for use.

## Features

- User authentication system (signup, login, logout)
- Create, edit, and delete tasks with descriptions and due dates
- Filter tasks by All, Pending, or Completed status
- Clean, responsive design that works on all devices
- Secure data storage using PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (no separate backend needed!)
- **Database**: PostgreSQL with Prisma ORM for easy database management
- **Authentication**: JWT tokens stored in HTTP-only cookies for security
- **Styling**: Tailwind CSS for utility-first styling and Shadcn/UI components

## Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/Janhavi312003/Todo
   cd curd_todo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up the database
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations to create tables
   npx prisma migrate dev
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to start using the app.

## Deployment

This app is configured to deploy easily to Vercel. Here's how:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard (make sure to use your production values)
4. Click "Deploy"

That's it! Vercel will handle the rest.

## Project Structure

The project follows Next.js 15's App Router structure. Here's a quick overview:

- `src/app/` - Contains all pages and API routes
- `src/components/` - Reusable UI components
- `src/contexts/` - React contexts for state management
- `src/hooks/` - Custom React hooks (like useTasks)
- `src/lib/` - Utility functions and database setup

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Live Demo

Check out the live version here: [https://todo.vercel.app](https://todo.vercel.app)