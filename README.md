# Todo App - Full Stack Next.js Application

A modern, full-stack todo application built with Next.js, TypeScript, and PostgreSQL. Features user authentication, task management, and a responsive UI.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Task Management**: Full CRUD operations for tasks with due dates and descriptions
- **Task Filtering**: Filter tasks by All, Pending, or Completed status
- **Responsive Design**: Mobile-first design with Tailwind CSS and Shadcn/UI components
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Security**: Protected routes, input validation, and secure cookies
- **Testing**: Comprehensive unit and integration tests

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with HTTP-only cookies
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel-ready configuration

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd curd_todo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app?schema=public"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── tasks/         # Task management endpoints
│   ├── auth/              # Authentication pages
│   ├── tasks/             # Main tasks page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── AuthForm.tsx      # Authentication form
│   ├── Navbar.tsx        # Navigation component
│   ├── TaskCard.tsx      # Individual task component
│   ├── TaskForm.tsx      # Task creation form
│   └── TaskFilter.tsx    # Task filtering component
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication state
├── hooks/                # Custom React hooks
│   └── useTasks.ts       # Task management hook
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # General utilities
└── __tests__/            # Test files
    ├── api/              # API route tests
    └── lib/              # Utility tests
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user's tasks (supports ?filter=all|pending|completed)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Deploy!

### Environment Variables for Production

Make sure to set these in your production environment:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-nextauth-secret"
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected API routes
- Input validation and sanitization
- CORS protection
- Secure cookie settings

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing Strategy

- **Unit Tests**: Test individual utility functions
- **Integration Tests**: Test API routes and database interactions
- **Component Tests**: Test React components (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.