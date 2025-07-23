# 📁 Folder Organization Guide

## 🎯 Domain Structure

### **✅ Organize by TYPE of code (kebab-case)**

```txt
modules/your-domain/
├── components/              # All domain UI components
│   ├── domain-card.tsx      # Main entity display
│   ├── sub-feature-list.tsx # Sub-feature components
│   └── index.ts             # export * from "./domain-card"
├── containers/              # Logic containers (all domains)
│   ├── domain.container.tsx # Main container
│   └── index.ts             # export * from "./domain.container"
├── views/                   # Presentation views (home domain only)
│   ├── domain.view.tsx      # Main view
│   └── index.ts             # export * from "./domain.view"
├── pages/                   # Page components (core domain only)
│   ├── domain-page/
│   │   ├── domain-page.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/                   # All domain business logic
│   ├── use-domain.ts        # Main entity logic
│   ├── use-sub-feature.ts   # Sub-feature logic
│   └── index.ts             # export * from "./use-domain"
├── routes/                  # Domain routing
│   ├── domain.routes.tsx    # Domain routes
│   └── index.ts             # export * from "./domain.routes"
├── services/                # All domain API calls
│   ├── your-domain.api.ts   # Basic CRUD operations
│   ├── sub-feature.api.ts   # Sub-feature operations
│   └── index.ts             # export * from "./your-domain.api"
├── types/                   # All domain types (home domain only)
│   ├── domain.types.ts      # Main entity types
│   ├── sub-feature.types.ts # Sub-feature types
│   └── index.ts             # export * from "./domain.types"
├── store/                   # Domain state (auth, core - singular)
│   ├── domain.store.ts      # Main store
│   └── index.ts             # export * from "./domain.store"
├── stores/                  # Domain state (home - plural)
│   ├── domain.store.ts      # Main store
│   └── index.ts             # export * from "./domain.store"
└── index.ts                 # Public API (selective exports)
```

## 📤 Export Patterns

### **Folder-level index.ts (export everything):**
```typescript
export * from './price-display'
// core/products/components/index.ts
export * from './product-card'
export * from './product-list'
// core/products/api/index.ts
export * from './products.api'

export * from './review-list'
export * from './reviews.api'
export * from './use-pricing'

// core/products/hooks/index.ts
export * from './use-products'
export * from './use-reviews'
```

### **Domain-level index.ts (selective exports):**
```typescript
export { ProductCard, ReviewList } from './components'
export { useProductReviews, useProducts } from './hooks'
// core/products/index.ts - Only export what external code needs
export type { Product, ProductReview } from './types'
export { calculateDiscount } from './utils'

// Keep internal to domain:
// API modules, complex utilities, internal types
```

## 🎯 Real Examples

### **Home Domain (Actual Example):**
```
modules/home/
├── components/
│   ├── card/
│   │   ├── card.tsx         # Home card component
│   │   └── index.ts
│   └── index.ts
├── containers/
│   ├── home.container.tsx   # Home logic container
│   └── index.ts
├── views/
│   ├── home.view.tsx        # Home presentation view
│   └── index.ts
├── hooks/
│   ├── use-home-data.ts     # Home data logic
│   └── index.ts
├── routes/
│   ├── home.routes.tsx      # Home routing
│   └── index.ts
├── services/
│   ├── home.api.ts          # Home API calls
│   └── index.ts
├── stores/
│   ├── home.store.ts        # Home state
│   └── index.ts
├── types/
│   ├── home.types.ts        # Home types
│   └── index.ts
└── index.ts
```

### **Auth Domain (Actual Example):**
```
modules/auth/
├── components/
│   ├── login-form.tsx       # Login form component
│   ├── register-form.tsx    # Register form component
│   └── index.ts
├── hooks/
│   ├── use-auth.ts          # Auth logic
│   └── index.ts
├── routes/
│   ├── auth.routes.tsx      # Auth routing
│   └── index.ts
├── services/
│   ├── auth.api.ts          # Auth API calls
│   └── index.ts
├── store/
│   ├── auth.store.ts        # Auth state
│   └── index.ts
└── index.ts
```

## 🔍 File Naming Conventions

| Content Type | Naming Pattern | Example |
|-------------|----------------|---------|
| **Services** | `[entity].api.ts` | `home.api.ts` |
| **Sub-features** | `[feature].api.ts` | `auth.api.ts` |
| **Components** | `[entity]-[type].tsx` | `home-card.tsx` |
| **Containers** | `[entity].container.tsx` | `home.container.tsx` |
| **Views** | `[entity].view.tsx` | `home.view.tsx` |
| **Hooks** | `use-[entity].ts` | `use-home-data.ts` |
| **Types** | `[entity].types.ts` | `home.types.ts` |
| **Stores** | `[entity].store.ts` | `home.store.ts` |
| **Routes** | `[entity].routes.tsx` | `home.routes.tsx` |

## ❌ Common Mistakes

### **Don't create sub-domains:**
```
❌ Bad:
modules/home/
├── reviews/          # Don't create nested domains
│   ├── services/
│   ├── components/
│   └── hooks/
└── pricing/          # Don't create nested domains
    ├── services/
    └── utils/
```

### **Don't mix naming conventions:**
```
❌ Bad:
├── HomeCard.tsx      # PascalCase file
├── use-home-data.ts  # kebab-case file
└── homeAPI.ts        # camelCase file

✅ Good:
├── home-card.tsx     # All kebab-case
├── use-home-data.ts  # All kebab-case
└── home.api.ts       # All kebab-case
```

## 🎬 Container/View Pattern (Within Domains)

### **Domain Container/View Structure:**
```
modules/domain-name/
├── containers/              # Logic containers
│   ├── domain.container.tsx # Main domain container
│   └── index.ts
├── views/                   # Presentation views
│   ├── domain.view.tsx      # Main domain view
│   └── index.ts
├── components/              # Domain-specific components
│   ├── domain-card/
│   │   ├── domain-card.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/                   # Domain-specific hooks
│   ├── use-domain-data.ts
│   └── index.ts
└── index.ts                 # Domain exports
```

### **Domain Routes Structure:**
```
modules/domain-name/routes/
├── domain.routes.tsx        # Main domain routes
├── sub-routes.tsx           # Sub-feature routes
└── index.ts                 # Route exports
```

**Note:** Only the `core/` domain has a `pages/` folder. The `home/` domain uses Container/View pattern with `containers/` and `views/`. The `auth/` domain uses `containers/` without `views/`.

## 🔧 Shared Organization

### **Shared Structure:**
```
shared/
├── components/              # Reusable UI
│   ├── error-boundary/      # Error boundary components
│   │   ├── default-error-fallback.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── utils/
│   │   │   ├── handle-error.ts
│   │   │   └── throw-error.ts
│   │   └── index.ts
│   ├── ui/
│   │   ├── button.tsx
│   │   └── index.ts
│   ├── navigation.tsx
│   └── index.ts
├── hooks/                   # Generic hooks
│   ├── use-query.ts
│   └── index.ts
├── lib/                     # External library configurations
│   ├── utils.ts
│   └── index.ts
├── providers/               # React providers
│   ├── query-client.ts
│   ├── query-provider.tsx
│   └── index.ts
├── stores/                  # Global state
│   ├── app.store.ts
│   └── index.ts
└── utils/                   # Generic utilities
    └── index.ts
```

Remember: **Organize by what code DOES, not what it's ABOUT**!
