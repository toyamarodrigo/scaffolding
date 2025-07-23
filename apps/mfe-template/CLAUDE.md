# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Development Commands

### Core Development Workflow

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - TypeScript compilation + Vite production build
- `pnpm preview` - Preview production build on port 3001
- `pnpm lint` - Run ESLint across codebase
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm type-check` - TypeScript type checking without emit

### Testing Commands

Currently no test setup is configured. When adding tests, follow the patterns documented in `docs/TESTING.md`.

## 🏗️ Architecture Overview

This is a **domain-driven React application** with **screaming architecture** principles for clear business intent while maintaining **feature-based organization** for scalability.

- **React 18** + **TypeScript** + **Vite**
- **TanStack Query** for data fetching
- **Zustand** for state management
- **React Router v7** for routing
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components

### Key Architectural Patterns

**Domain Structure**: Code is organized by business domains, not technical layers

```txt
src/modules/
├── [your-domain]/     # Your business domains (e.g., products, orders, customers)
├── [another-domain]/  # Each domain chooses its own pattern
├── shared/            # Cross-cutting concerns
└── ...

# Example domains (adapt to your business):
├── auth/              # Authentication (containers-only pattern)
├── products/          # Product catalog (Container/View pattern)  
├── orders/            # Order management (containers-only pattern)
├── dashboard/         # Analytics (Container/View + pages pattern)
└── shared/            # Cross-cutting concerns
```

**Component Classification**: Each component type has a specific purpose and location

- **Containers** (`containers/`) - Route entry points with business logic
- **Views** (`views/`) - Pure presentation components (Container/View pattern only)
- **Components** (`components/`) - Reusable domain-specific components
- **Shared Components** (`shared/components/`) - Cross-domain reusable components

**Routing**: Feature-based routing where each domain manages its own routes

- Main router in `src/routes/router.tsx`
- Domain routes in `src/modules/{domain}/routes/`
- Error boundaries at route level

## 📁 Project Structure Patterns

### Import Aliases (configured in vite.config.ts)

- `@/` - src root
- `@/hooks` - src/hooks
- `@/modules` - src/modules  
- `@/routes` - src/routes
- `@/shared` - src/shared
- `@/utils` - src/utils

### Domain Flexibility

Each domain can choose its own internal pattern based on complexity and team preference:

**Examples of domain patterns:**

- **Authentication domains** typically use containers-only (simpler forms)
- **Content/catalog domains** often use Container/View pattern (complex layouts)
- **Dashboard/admin domains** may use Container/View + pages/ pattern (varied page types)
- **E-commerce domains** might use different patterns per subdomain

**Current template examples:**

- `auth/` uses containers-only (no views/)
- `home/` uses Container/View pattern (containers/ + views/)
- `core/` uses Container/View + pages/ pattern
- `shared/` contains cross-cutting concerns

### File Naming Conventions

- All files and folders use `kebab-case`
- Containers: `{name}.container.tsx`
- Views: `{name}.view.tsx`
- Components: `{name}.tsx` or `{name}/` folder structure
- Hooks: `use-{name}.ts`
- Services: `{name}.api.ts`
- Stores: `{name}.store.ts`
- Types: `{name}.types.ts`

## 📚 Required Reading

When working on this project, always reference these documents for architectural decisions:

### Core Architecture Documents

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) - Domain-driven architecture patterns and philosophy
- [`docs/COMPONENT_CLASSIFICATION.md`](./docs/COMPONENT_CLASSIFICATION.md) - Component placement decision tree
- [`docs/DEVELOPER_GUIDE.md`](./docs/DEVELOPER_GUIDE.md) - Quick decision guide for developers
- [`docs/FOLDER_ORGANIZATION.md`](./docs/FOLDER_ORGANIZATION.md) - File structure and naming conventions
- [`docs/ROUTING.md`](./docs/ROUTING.md) - Feature-based routing patterns
- [`docs/TESTING.md`](./docs/TESTING.md) - Testing strategies and patterns

## 🎯 Key Architectural Principles

### Domain Structure

```txt
src/modules/
├── auth/          # Authentication domain (containers only)
├── home/          # Home domain (Container/View pattern)
├── core/          # Core business (Container/View + pages/)
└── shared/        # Cross-cutting concerns
```

### Component Classification Quick Reference

- **Route entry point?** → `containers/`
- **Full page layout?** → `views/` (if domain uses Container/View)
- **Reusable in domain?** → `components/`
- **Generic across domains?** → `shared/components/`

### Decision Tree for New Code

1. **What domain?** → Your business domain (e.g., products, orders, auth, dashboard) or shared
2. **What type?** → container, view, component, hook, service, util
3. **What pattern?** → Follow existing domain patterns or choose based on complexity

## 🚨 Critical Rules

- **Each domain can choose its own pattern** (containers-only vs Container/View vs pages)
- **No direct imports between domains** - use shared layer for cross-domain needs
- **Follow kebab-case naming** for all files and folders
- **Co-locate related files** in component folders when complex
- **Use error boundaries** throughout the application

## 🤔 Common Edge Cases & Solutions

### Cross-Domain State

Use `shared/stores/` for state needed by multiple domains:

```typescript
// ✅ shared/stores/user-preferences.store.ts
export const useUserPreferences = create(...)
```

### Hybrid Components (Business Logic + Multi-Domain)

Use `shared/components/business/` for components with business logic used across domains:

```typescript
// ✅ shared/components/business/user-avatar/
```

### Real-time Features

Use `shared/services/` for WebSocket/SSE clients with domain-specific hooks:

```typescript
// ✅ shared/services/websocket.service.ts
// ✅ modules/auth/hooks/use-auth-notifications.ts
```

### Complex Forms/Wizards

Keep orchestration in the primary domain, delegate to other domains via shared state:

```typescript
// ✅ modules/[primary-domain]/containers/wizard.container.tsx (orchestrator)
// ✅ shared/stores/[feature].store.ts (shared state)
```

## 🧠 Memory Aids for Claude

### When Creating New Features

1. Identify the primary business domain
2. Check if domain uses Container/View pattern or containers-only
3. Follow existing patterns in that domain
4. Use shared/ for cross-cutting concerns

### When Refactoring

1. Maintain domain boundaries
2. Don't create circular dependencies
3. Keep public APIs minimal via index.ts exports
4. Preserve existing architectural patterns

### When Testing

1. Unit tests co-located with source files (`.test.tsx`)
2. E2E tests organized by domain in `tests/e2e/[domain]/`
3. Use domain-specific test fixtures and helpers
4. Follow the testing patterns in `docs/TESTING.md`

## 💡 Pro Tips

- **When in doubt, follow existing patterns** - look at similar components
- **Start with containers/** - you can always refactor later
- **Use the decision trees** in the documentation guides
- **Each domain is independent** - they can use different patterns
- **Shared layer is for truly generic or cross-domain code**

## 🔧 MCP Integration Guidelines

### Tool Usage Strategy

- **Read**: Load specific documentation files or examine existing patterns
- **Glob**: Find components matching patterns across domains (`**/*container*`, `**/components/*`)
- **Grep**: Search for specific implementation patterns or API usage
- **Task**: Complex architectural analysis or multi-step refactoring

### Context Loading Priority

1. **Always start with CLAUDE.md** for project context
2. **Load specific docs** based on task type (see `docs/claude-workflows.md`)
3. **Examine existing patterns** in target domain before creating new code
4. **Reference edge cases** when encountering complex scenarios

### Memory Management

- Keep architectural principles in active memory throughout session
- Load domain-specific patterns when working in that domain
- Use progressive context loading - start minimal, add as needed
- Refresh context when switching between domains or task types

### Validation Pattern

Before implementing any solution:

1. Check if it follows domain boundaries
2. Validate component classification
3. Ensure naming conventions are followed
4. Verify pattern consistency with existing code

## 🔄 Documentation Updates

When adding new patterns or solving new edge cases, update the relevant documentation files to help future developers.
