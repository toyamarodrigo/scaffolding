# 🚀 React Application Template

A scalable React application template with domain-driven architecture. Template includes example domains that should be replaced with your business domains.

## Features

- **Screaming Architecture**: Organized by business features
- **React Router DOM**: Client-side routing
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast development and optimized builds

## Domain-Driven Folder Structure

```txt
src/modules/
├── [your-domains]/     # Replace with your business domains
│   ├── components/     # Domain-specific UI components
│   ├── containers/     # Route entry points with business logic  
│   ├── views/          # Presentation components (if using Container/View pattern)
│   ├── hooks/          # Domain business logic
│   ├── services/       # Domain API calls
│   ├── routes/         # Domain routing
│   └── stores/         # Domain state management
├── shared/             # Cross-cutting concerns
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Generic hooks
│   ├── stores/         # Global state
│   └── utils/          # Generic utilities
└── routes/             # Main application routing

# Current template examples (replace with your domains):
├── auth/               # Authentication (containers-only pattern)
├── home/               # Landing page (Container/View pattern) 
├── core/               # Core business (Container/View + pages pattern)
└── shared/             # Cross-cutting concerns
```

## Getting Started

1. **Copy this template** to create a new application
2. **Replace example domains** with your business domains (auth, home, core → your domains)
3. **Update package.json** with your application name
4. **Update vite.config.ts** with your application name and port
5. **Install dependencies**:

   ```bash
   pnpm install
   ```

6. **Start development server**:

   ```bash
   pnpm dev
   ```

## 📚 Documentation

Complete architecture and development guides are available in the [`docs/`](./docs/) folder:

- **[🏗️ Architecture Guide](./docs/ARCHITECTURE.md)** - Domain-driven design patterns and structure
- **[🤔 Developer Guide](./docs/DEVELOPER_GUIDE.md)** - "Where should I put this code?" decision tree
- **[🛣️ Routing Guide](./docs/ROUTING.md)** - Feature-based routing patterns

## Standalone Application

This template creates a standalone React application with domain-driven architecture. It can be:

- **Deployed independently** as a standalone application
- **Integrated into a larger system** through standard web integration techniques
- **Extended with Module Federation** if needed (configuration not included)

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Architecture Guidelines

### Domain-Driven Architecture Principles

1. **Business domain organization**: Group code by business domains, not technical layers
2. **Domain independence**: Each domain is self-contained with clear boundaries
3. **Flexible patterns**: Each domain chooses the pattern that fits best (containers-only, Container/View, etc.)
4. **Cross-cutting concerns**: Shared code goes in shared/ layer
5. **Scalable teams**: Different teams can own different domains

### Best Practices

- Keep components small and focused
- Use custom hooks for complex logic
- Implement proper error boundaries
- Follow consistent naming conventions
- Write tests for critical functionality
