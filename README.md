# 🚀 Task Manager - Completed in 5 Hours!

A full-stack task management application built with Next.js, NestJS, and MongoDB. This project demonstrates rapid development capabilities with modern web technologies.

## ⚡ Project Overview

**Task Manager** is a comprehensive web application that allows users to create, manage, and organize their tasks efficiently. Built with a focus on performance, user experience, and clean architecture.

### 🎯 Key Features

- **User Authentication**: Secure sign-up and sign-in with JWT tokens
- **Task Management**: Create, edit, delete, and organize tasks
- **Real-time Updates**: Instant task updates across the application
- **Responsive Design**: Modern UI that works on all devices
- **Dark/Light Theme**: Beautiful theme switching with smooth transitions
- **Task Filtering**: Filter tasks by status, priority, and date
- **Pagination**: Efficient task browsing with pagination support

## 🏗️ Architecture

This project follows a monorepo structure using **Turborepo** for efficient development and builds:

```
taskmanager37/
├── apps/
│   ├── server/          # NestJS Backend API
│   └── web/            # Next.js Frontend
├── packages/
│   ├── ui/             # Shared UI Components
│   ├── types/          # TypeScript Type Definitions
│   ├── eslint-config/  # ESLint Configuration
│   └── typescript-config/ # TypeScript Configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **Axios** - HTTP client for API communication
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **Passport.js** - Authentication middleware
- **Class-validator** - DTO validation
- **Swagger** - API documentation

### Development Tools
- **Turborepo** - Monorepo build system
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **pnpm** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskmanager37
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both `apps/server` and `apps/web` directories:
   
   **Server (.env)**
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-secret-key
   PORT=3001
   ```
   
   **Web (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually
   pnpm dev:web      # Frontend on http://localhost:3000
   pnpm dev:server   # Backend on http://localhost:3001
   ```

## 📱 Usage

1. **Sign Up**: Create a new account
2. **Sign In**: Authenticate with your credentials
3. **Dashboard**: View and manage your tasks
4. **Create Tasks**: Add new tasks with title, description, and priority
5. **Edit/Delete**: Modify or remove existing tasks
6. **Filter & Search**: Organize tasks by various criteria
7. **Theme Switch**: Toggle between light and dark modes

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login

### Tasks
- `GET /tasks` - Get all tasks (with pagination)
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Forms**: Input fields, buttons, labels, and validation
- **Layout**: Cards, dialogs, sheets, and modals
- **Navigation**: Tabs, dropdowns, and pagination
- **Feedback**: Alerts, badges, and loading states
- **Theme**: Dark/light mode toggle with smooth transitions

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:web      # Frontend tests
pnpm test:server   # Backend tests
pnpm test:e2e      # End-to-end tests
```

## 📦 Build & Deploy

```bash
# Build all applications
pnpm build

# Build specific apps
pnpm build:web
pnpm build:server

# Production start
pnpm start
```

## 🌟 Project Highlights

- **Rapid Development**: Completed in just 5 hours
- **Modern Architecture**: Clean separation of concerns
- **Type Safety**: Full TypeScript coverage
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized builds with Turborepo
- **Developer Experience**: Hot reload, linting, and formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by productivity and task management needs
- Special thanks to the open-source community

---

**Built with ❤️ in 5 hours** ⚡
