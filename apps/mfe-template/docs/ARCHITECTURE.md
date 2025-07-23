# 🏗️ Frontend Architecture Guidelines

## 🎯 Architecture Philosophy

This microfrontend follows a **Domain-Driven Design** approach with **Screaming Architecture** principles for clear business intent while maintaining **Feature-Based Organization** for scalability.

## 📁 Folder Structure

### Current Structure

```txt
src/modules/
├── auth/                    # 🔐 Authentication Domain
│   ├── components/         # Auth components
│   ├── containers/         # Auth containers
│   ├── hooks/             # Auth business logic
│   ├── routes/            # Auth routing
│   ├── services/          # Auth API calls
│   └── store/             # Auth state
├── core/                    # 🎯 Core Business Domains
│   ├── components/         # Core components
│   ├── containers/         # Core containers
│   ├── hooks/             # Core business logic
│   ├── routes/            # Core routing
│   ├── services/          # Core API calls
│   └── store/             # Core state
├── home/                    # 🏠 Home Domain
│   ├── components/         # Home components
│   ├── containers/         # Home containers (Container/View pattern)
│   ├── hooks/             # Home business logic
│   ├── routes/            # Home routing
│   ├── services/          # Home API calls
│   ├── stores/            # Home state (plural)
│   ├── types/             # Home types
│   └── views/             # Home views (Container/View pattern)
└── shared/                 # 🔧 Cross-cutting concerns
    ├── components/         # Reusable UI components
    │   └── error-boundary/ # Error boundary components
    ├── hooks/             # Generic hooks
    ├── stores/            # Global state
    └── utils/             # Generic utilities
```

## 🏛️ Domain Organization

### Domain Modules (`src/modules/{domain}/`)

- **Self-contained business domains** - each domain is a complete feature
- **Everything co-located** - components, logic, routing, and state in one place
- **Clear boundaries** between different business concerns
- **Domain-specific structure** - each domain uses the pattern that fits best

Examples:

- `auth` domain uses containers for login/signup logic
- `home` and `core` domain uses Container/View pattern with containers and views

### Domain Structure Benefits

- **Scalable teams** - each domain can be owned by different teams
- **Clear ownership** - everything related to a feature is in one place
- **Easier maintenance** - changes to a feature are localized
- **Better testing** - domain-specific tests are co-located
- **Simplified routing** - no need to coordinate between pages and domains

## 📋 Standardized Feature Structure

### Domain Structure (`modules/{domain}/`)

```txt
domain-name/
├── components/              # Domain-specific UI
│   ├── card/
│   │   ├── card.tsx
│   │   ├── card.test.tsx
│   │   ├── card.stories.tsx
│   │   ├── card.styles.ts
│   │   ├── hooks/
│   │   ├── helpers/
│   │   └── stores/
│   └── index.ts
├── containers/              # Logic containers (all domains)
│   ├── domain.container.tsx
│   └── index.ts
├── views/                   # Presentation views (home domain only)
│   ├── domain.view.tsx
│   └── index.ts
├── hooks/                   # Business logic hooks
│   ├── use-domain-data.ts
│   ├── use-domain-actions.ts
│   ├── use-domain-filters.ts
│   └── index.ts
├── routes/                  # Domain routing
│   ├── domain.routes.tsx
│   └── index.ts
├── services/                # Data access layer
│   ├── domain.api.ts
│   ├── domain.queries.ts
│   ├── domain.mutations.ts
│   └── index.ts
├── types/                   # Type definitions (home domain only)
│   ├── domain.types.ts
│   ├── domain.schemas.ts    # Zod schemas
│   └── index.ts
├── stores/                  # Domain state - home (plural)
│   ├── domain.store.ts
│   └── index.ts
└── index.ts                 # Public API
```

### Error Boundary Structure (`shared/components/error-boundary/`)

```txt
error-boundary/
├── index.ts                 # Main exports
├── default-error-fallback.tsx # Default error fallback component
├── loading-spinner.tsx      # Loading spinner component
└── utils/                   # Error utilities
    ├── handle-error.ts      # Error handling function
    └── throw-error.ts       # Error throwing utility
```

### Container/View Pattern Implementation

```txt
// Example from home module
home/
├── containers/
│   └── home.container.tsx    # Logic container
├── views/
│   └── home.view.tsx         # Presentation view
├── components/
│   └── card/                 # Domain components   
├── hooks/
│   └── use-home-data.ts      # Business logic
├── services/
│   └── api.ts     # API calls
├── stores/
│   └── stuff.store.ts         # State management
└── types/
    └── stuff.types.ts         # Type definitions
```

## 🔧 Component Co-location Pattern

Each component should follow this pattern:

```txt
component-name/
├── index.ts                      # Barrel export
├── component-name.tsx            # Main component
├── component-name.test.tsx       # Unit tests
├── component-name.stories.tsx    # Storybook stories
├── component-name.styles.ts      # Styles
├── hooks/                        # Component-specific hooks (if complex)
│    └── use-component-logic.ts   
├── helpers/                      # Component-specific helpers (if complex)
│    ├── filter-rows.helper.ts
│    └── sort-data.helper.ts
└── stores/                       # Component-specific stores (if complex)
     ├── table.store.ts
     └── card.store.ts
```

## 🎨 Naming Conventions

### Files & Folders

- **Folders**: `kebab-case` (e.g., `home-card`, `user-profile`)
- **Components**: `kebab-case.tsx` (e.g., `stuff-card.tsx`)
- **Hooks**: `kebab-case.ts` starting with `use` (e.g., `use-home-data.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `stuff.types.ts`)
- **Helpers**: `kebab-case.helpers.ts` (e.g., `stuff.helper.ts`)
- **Services**: `kebab-case.api.ts` (e.g., `api.stuff.ts`)
- **Stores**: `kebab-case.store.ts` (e.g., `stuff.store.ts`)

## 🔄 Data Flow Patterns

### Container/View Pattern

```typescript
// ✅ Route (Routing)
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />,
  },
]);

// ✅ Container (Logic)
export const HomeContainer: React.FC = () => {
  const { data, loading, error } = useHomeData();
  const { filters, updateFilters } = useHomeFilters();

  return (
    <HomeView
      data={data}
      loading={loading}
      error={error}
      filters={filters}
      onFilterChange={updateFilters}
    />
  );
};

// ✅ View (Presentation)
export const HomeView: React.FC<Props> = ({
  data,
  loading,
  error,
  filters,
  onFilterChange
}) => {
  // Only UI logic here
  return <div>{/* Render UI */}</div>;
};
```

### Custom Hooks Pattern

```typescript
// ✅ Business logic in hooks
export function useHomeData(filters: HomeFilters) {
  const query = useQuery({
    queryKey: ['home', 'data', filters],
    queryFn: () => homeApi.getData(filters),
  })

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}
```

## 🚀 Scalability Guidelines

### Adding New Domains

1. Create in `src/modules/{domain}/`
2. Follow standardized domain structure
3. Include `components/`, `services/`, `store/`, `routes/`
4. Add `containers/` and `views/` for Container/View pattern
5. Export public API via `index.ts`
6. Add to main `modules/index.ts`

### Adding New Components within Domains

1. Create in `src/modules/{domain}/components/{component}/`
2. Use container/view pattern with `containers/` and `views/` folders
3. Add routes to domain's `routes/` folder
4. Follow domain-specific structure
5. Keep all related logic within the domain

### Cross-Feature Communication

- Use **custom hooks** for shared logic
- Use **shared stores** (Zustand) for global state
- Avoid direct imports between domains

## 🧪 Testing Strategy

### Unit Tests

- **Components**: Focus on behavior, not implementation
- **Hooks**: Test business logic isolated
- **Utils**: Test pure functions

### Integration Tests

- **Page flows**: Test user interactions
- **API integration**: Test data flow
- **Error scenarios**: Test error boundaries

## 📚 Best Practices

### Do's ✅

- Keep components small and focused
- Use TypeScript strictly
- Follow consistent naming
- Write tests for business logic
- Use error boundaries
- Implement proper loading states

### Don'ts ❌

- Don't mix domain logic in pages
- Don't create circular dependencies
- Don't export everything from domains
- Don't skip error handling
- Don't ignore TypeScript errors

## 🔄 Migration Strategy

When refactoring existing features:

1. **Identify domains** in current structure
2. **Extract business logic** to core domains
3. **Create page compositions** that use domains
4. **Update imports** progressively
5. **Add tests** for new structure
6. **Update documentation**

This architecture ensures your microfrontend remains maintainable, testable, and scalable as your team and features grow.
