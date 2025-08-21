# @repo/types

Shared TypeScript types for the TaskManager application. This package contains common types used by both the frontend and backend.

## Structure

- `src/index.ts` - Core domain types and API interfaces
- `src/react.ts` - React-specific types (contexts, hooks, component props)

## Usage

### Frontend (Next.js app)

```typescript
// Core types
import { User, Task, CreateTaskRequest } from "@repo/types";

// React-specific types
import { AuthContextType, TaskCardProps } from "@repo/types/react";
```

### Backend (Express server)

```typescript
// Core types
import { User, Task, IUser, ITask } from "@repo/types";
```

## Building

```bash
pnpm build
```

## Development

```bash
pnpm dev  # Watch mode for development
```
