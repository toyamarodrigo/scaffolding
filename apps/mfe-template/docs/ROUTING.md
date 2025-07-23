# Feature-Based Routing Pattern

This React application template uses a feature-based routing architecture where each domain manages its own routes independently.

## Architecture

### Main Router (`src/routes/router.tsx`)

- Handles top-level application routes
- Delegates to feature-specific routes
- Manages global error boundaries and layout

### Domain Routes (`src/modules/{domain}/routes/`)

Each domain should follow this pattern:

```txt
src/modules/{domain}/
├── routes/
│   ├── {domain}.routes.tsx   # Route definitions
│   └── index.ts              # Exports and constants
├── containers/               # Logic containers
├── views/                    # Presentation views (home domain)
├── pages/                    # Page components (core domain only)
└── ...
```

## Creating New Feature Routes

### 1. Create Route Definitions

```typescript
// src/modules/dashboard/routes/dashboard.routes.tsx
import { RouteObject } from 'react-router';
import { ModuleErrorBoundary } from '../../../shared/components/error-boundary';
import { DashboardOverviewPage, DashboardAnalyticsPage } from '../containers';
// OR for core domain:
// import { DashboardOverviewPage, DashboardAnalyticsPage } from '../pages';

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <ModuleErrorBoundary>
        <DashboardOverviewPage />
      </ModuleErrorBoundary>
    ),
  },
  {
    path: 'analytics',
    element: (
      <ModuleErrorBoundary>
        <DashboardAnalyticsPage />
      </ModuleErrorBoundary>
    ),
  },
];
```

### 2. Create Index File

```typescript
// src/modules/dashboard/routes/index.ts
export { dashboardRoutes } from './dashboard.routes'

export const DASHBOARD_ROUTES = {
  OVERVIEW: '',
  ANALYTICS: 'analytics',
} as const
```

### 3. Register in Main Router

```typescript
// src/routes/router.tsx
import { dashboardRoutes } from '../modules/dashboard/routes';

// Add to router children:
{
  path: 'dashboard',
  children: dashboardRoutes,
}
```

## Benefits

- **Domain Independence**: Each domain owns its routing logic
- **Team Autonomy**: Teams can work on routes without conflicts
- **Scalability**: Easy to add new domains without touching main router
- **Maintainability**: Clear separation of concerns
- **Testability**: Domain routes can be tested in isolation

## Example Structure

```txt
/                          → Home Overview
/home                      → Home Overview
/home/features             → Features List
/home/features/:id         → Feature Detail
/home/getting-started      → Getting Started
/about                     → About Page
/dashboard                 → Dashboard Overview (future)
/dashboard/analytics       → Dashboard Analytics (future)
/profile                   → Profile Overview (future)
/profile/settings          → Profile Settings (future)
```

## Error Handling

Each domain route should wrap its pages in `ModuleErrorBoundary` for proper error isolation:

```typescript
{
  path: 'some-page',
  element: (
    <ModuleErrorBoundary>
      <SomePage />
    </ModuleErrorBoundary>
  ),
}
```
