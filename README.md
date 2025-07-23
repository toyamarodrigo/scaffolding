# Microfrontend Monorepo

A scalable application architecture using React Router and domain-driven design principles.

## Architecture Overview

This monorepo contains:

- **Shell Application**: Main container application
- **Application Template**: Boilerplate for creating new applications
- **Shared Utilities**: Common functionality shared across applications

## Key Features

- 🎯 **Screaming Architecture**: Feature-based organization
- 🔄 **React Router DOM**: Single-page application routing
- 📦 **PNPM Workspace**: Efficient dependency management
- 🔧 **TypeScript**: Type safety across the monorepo
- ⚡ **Vite**: Fast development and optimized builds
- 🎨 **Consistent Styling**: Shared design system

## Project Structure

```txt
monorepo-microfrontend/
├── apps/
│   └── mfe-template/          # Application template
├── packages/
│   └── shared-utils/          # Shared utilities // TODO
├── pnpm-workspace.yaml        # PNPM workspace configuration
├── package.json               # Root package.json
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start all applications**:

   ```bash
   pnpm dev
   ```

3. **Access applications**:
   - App: <http://localhost:3000>

## Creating New Applications

1. **Copy the template**:

   ```bash
   cp -r apps/mfe-template apps/your-new-app
   ```

2. **Update configuration**:
   - Update `package.json` name and port
   - Update `vite.config.ts` port configuration

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

## Domain-Driven Architecture

Each application follows domain-driven design with screaming architecture principles:

```txt
src/modules/
├── [your-domains]/    # Business domains (e.g., products, orders, customers)
│   ├── components/    # Domain-specific UI components  
│   ├── containers/    # Route entry points with business logic
│   ├── views/         # Presentation components (if using Container/View pattern)
│   ├── hooks/         # Domain business logic
│   ├── services/      # Domain API calls
│   ├── routes/        # Domain routing
│   └── stores/        # Domain state management
├── shared/            # Cross-cutting concerns
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Generic hooks  
│   ├── stores/        # Global state
│   └── utils/         # Helper functions
└── routes/            # Main application routing
```

**Key Principles:**

- **Domain Independence**: Each business domain is self-contained
- **Flexible Patterns**: Each domain chooses the pattern that fits best
- **Clear Boundaries**: No direct imports between domains
- **Scalable Teams**: Different teams can own different domains

## Shared Dependencies

Common dependencies are shared across applications:

- React & React DOM
- React Router DOM
- Shared utilities package

## Development Workflow

1. **Start applications**: `cd apps/mfe-template && pnpm dev`
2. **Develop features**: Work on individual applications
3. **Test integration**: Verify in the shell application

## Best Practices

### Code Organization

- Group related files by feature, not by file type
- Keep components small and focused
- Use custom hooks for complex logic
- Implement proper error boundaries

### Communication

- Use shared state or events for cross-application communication
- Minimize direct dependencies between applications
- Share common utilities through the shared package

### Performance

- Lazy load components when possible
- Share common dependencies to reduce bundle size
- Implement proper error handling and loading states

## Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications for production
- `pnpm preview` - Preview production builds
- `pnpm lint` - Run linting across all packages
- `pnpm type-check` - Run TypeScript type checking across all packages
- `pnpm test` - Run tests across all packages

## Contributing

1. Follow the established folder structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add tests for critical functionality
5. Update documentation as needed
