# 🤔 Developer Decision Guide

## ⚡ **30-Second Cheat Sheet**

| What you're building | Where it goes |
|---------------------|---------------|
| **Route entry point** | `modules/[domain]/containers/` |
| **Full page layout** | `modules/[domain]/views/` (if using Container/View pattern) |
| **Domain-specific components** | `modules/[domain]/components/` |
| **Generic UI components** | `shared/components/` |
| **API calls for your entities** | `modules/[domain]/services/` |
| **Business logic about your entities** | `modules/[domain]/hooks/` |

**🚨 When stuck**: Start in domain containers and move later!

## 🏗️ **Architecture Overview**

This React application follows a **Domain-Driven Design** approach with **Screaming Architecture** principles:

- **Domain modules** (`modules/[domain]/`) - self-contained business domains
- **Flexible patterns** - each domain uses the pattern that fits best
- **Co-located structure** - everything related to a domain in one place
- **Error boundaries** - robust error handling throughout the app

### **Example Domains (your project may have different ones):**

- **`auth/`** - Authentication and authorization (uses containers only)
- **`home/`** - Home page functionality (uses Container/View pattern)
- **`core/`** - Core business functionality (uses Container/View pattern)
- **`shared/`** - Cross-cutting concerns and reusable components

> **Note**: These are example domains. Your project might have `products/`, `orders/`, `dashboard/`, `settings/`, etc. The patterns remain the same regardless of domain names.

## 🆕 **When to Create NEW Folders**

### **Create a NEW DOMAIN (`modules/[new-name]/`) when:**

- Your app deals with a new type of business entity
- Current examples: `auth` (users/sessions), `home` (landing), `core` (main business)
- Future examples: `orders`, `products`, `customers`, `dashboard`

### **Create a NEW ROUTE when:**

- You need a new URL/route in your app
- Create container in `modules/[domain]/containers/`
- Create matching view in `modules/[domain]/views/` (if domain uses Container/View pattern)
- Example: `/dashboard` → `modules/core/containers/dashboard.container.tsx`

---

## 🎯 **Component Classification Decision Tree**

```txt
Is this component used directly in a route?
├── YES → containers/
└── NO → Is this a full page layout?
    ├── YES → views/ (if domain uses Container/View pattern)
    └── NO → Is this reusable within the feature?
        ├── YES → components/
        └── NO → Is this generic across all features?
            ├── YES → shared/components/
            └── NO → components/ (feature-specific)
```

## 📦 **Component Types**

### **CONTAINERS** - Smart Page-Level Components

- **Route entry point** (directly used in routes)
- **Page-level component** (represents a full page/screen)
- **Contains business logic** (hooks, state, API calls)
- **Orchestrates other components** (composes views + components)

### **VIEWS** - Dumb Page-Level Components (Container/View pattern only)

- **Page-level presentation** (represents full page UI)
- **Receives props only** (no hooks, no state, no API calls)
- **Pure UI rendering** (only layout, styling, conditional rendering)
- **1:1 relationship with container** (each container has matching view)

### **COMPONENTS** - Reusable Feature Components

- **Reusable within feature** (used by multiple views/containers)
- **Feature-specific logic** (not generic enough for shared/)
- **Encapsulated functionality** (complete, self-contained component)
- **Can be smart or dumb** (business logic is okay here)

### **SHARED COMPONENTS** - Cross-Domain Components

- **Generic across all features** (buttons, modals, error boundaries)
- **No business logic** (pure UI or generic utilities)
- **Highly reusable** (used by multiple domains)

## 🎯 **Quick Decision Questions**

### Question 1: "What domain am I working in?"

| Domain Example | Pattern Used | When to use |
|--------|----------------|-------------|
| **`auth/`** | Containers only | Authentication, login, signup, user sessions |
| **`home/`** | Container/View | Home page, landing page functionality |
| **`core/`** | Container/View | Main business logic, dashboard, core features |
| **`products/`** | Container/View | Product catalog, product details |
| **`orders/`** | Containers only | Order management, checkout |
| **`shared/`** | Components only | Generic UI, utilities, cross-cutting concerns |

> **Note**: Use whatever domain names make sense for your business. Each domain can choose the pattern that fits best.

### Question 2: Domain Questions

**🏗️ Am I working with business entities my app manages?**

#### ✅ Put it in a DOMAIN if you answer YES to any

1. **"Is this about your app's main entities?"**
   - User authentication, sessions → `modules/auth`
   - Home page content, landing data → `modules/home`
   - Core business features → `modules/core`
   - Error handling, loading states → `shared/components`

2. **"Does this fetch or save data about your business entities?"**
   - API calls for auth → `modules/auth/services`
   - Home page data → `modules/home/services`
   - Core business data → `modules/core/services`

3. **"Is this a rule about how your business entities work?"**
   - "Users must be logged in" → `modules/auth/hooks/use-auth`
   - "Home displays latest content" → `modules/home/hooks/use-home-data`
   - "Core features require permissions" → `modules/core/hooks/use-permissions`

4. **"Will multiple pages need this entity logic?"**
   - Auth state across app → `modules/auth/hooks`
   - Home-specific widgets → `modules/home/components`
   - Core business components → `modules/core/components`

#### 🌟 **Real Examples from Your App:**

| What I'm building | Is it about your business entities? | Where it goes |
|-------------------|---------------------------|---------------|
| User login form | YES - Auth | `modules/auth/components/` |
| Home page card | YES - Home content | `modules/home/components/` |
| Dashboard widget | YES - Core business | `modules/core/components/` |
| Generic button | NO - Reusable UI | `shared/components/` |
| Error boundary | NO - App infrastructure | `shared/components/error-boundary/` |

## 🤔 **What's NOT Domain-Specific? (Important!)**

### ❌ **DON'T put these in domain modules:**

1. **Generic UI that works anywhere:**
   - Buttons, modals, inputs, spinners → `shared/components/`
   - Date pickers, tooltips → `shared/components/`

2. **App-wide concerns:**
   - Error boundaries → `shared/components/error-boundary/`
   - Global navigation → `shared/components/`
   - Loading spinners → `shared/components/`
   - Theme/styling → `shared/styles/`

### ✅ **Examples of what IS domain-specific:**

| Example Domains | What Goes There |
|-----------------|-----------------|
| **`auth`** | Login forms, auth state, user sessions, permissions |
| **`home`** | Landing content, home widgets, welcome screens |
| **`core`** | Main business features, dashboard components, core workflows |
| **`products`** | Product listings, product details, product search |
| **`orders`** | Order management, checkout flows, order history |
| **`dashboard`** | Analytics, reports, admin features |

> **Adapt these to your business domains** - e.g., `customers/`, `inventory/`, `billing/`, `settings/`, etc.

## 🆕 **Create NEW Domain vs Use Existing?**

### **Create a NEW domain (`modules/[new-name]/`) when:**

1. **Your app deals with a completely new type of business entity**

   ```txt
   Existing: modules/auth/ (users)
   Adding: Product catalog logic
   Decision: Products ≠ Auth → Create modules/products/

   Existing: modules/home/, modules/core/
   Adding: Order management
   Decision: Orders are new business domain → Create modules/orders/
   ```

2. **You can finish this sentence: "My app manages ____"**
   - Current: "Auth, Home content, Core business"
   - Future: "Products, Orders, Customers, Analytics"

### **Use existing domain when:**

- New logic is clearly about an existing domain
- You can put it in existing folders: `/services`, `/hooks`, `/components`

### **🚨 Warning: Don't over-create domains!**

```txt
❌ Bad: modules/user-auth/, modules/user-profile/, modules/user-settings/
✅ Good: modules/auth/ (with auth, profile, settings inside)

❌ Bad: modules/home-content/, modules/home-widgets/, modules/home-stats/
✅ Good: modules/home/ (with content, widgets, stats inside)
```

## 📁 **Example Project Structure**

### **Sample Folder Organization** (adapt to your domains)

```txt
src/modules/
├── auth/                    # 🔐 Authentication Domain (containers only)
│   ├── components/          # Auth-specific components
│   ├── containers/          # Auth route entry points
│   ├── hooks/              # Auth business logic
│   ├── routes/             # Auth routing
│   ├── services/           # Auth API calls
│   └── store/              # Auth state (singular)
├── home/                    # 🏠 Home Domain (Container/View pattern)
│   ├── components/          # Home-specific components
│   │   └── card/           # Example: home card component
│   ├── containers/          # Home route entry points
│   ├── hooks/              # Home business logic
│   ├── routes/             # Home routing
│   ├── services/           # Home API calls
│   ├── stores/             # Home state (plural)
│   ├── types/              # Home type definitions
│   └── views/              # Home presentation components
├── core/                    # 🎯 Core Business Domain (Container/View pattern)
│   ├── components/          # Core business components
│   ├── containers/          # Core route entry points
│   ├── hooks/              # Core business logic
│   ├── routes/             # Core routing
│   ├── services/           # Core API calls
│   └── store/              # Core state (singular)
└── shared/                  # 🔧 Cross-cutting concerns
    ├── components/          # Generic UI components
    │   ├── error-boundary/  # Error handling components
    │   │   ├── default-error-fallback.tsx
    │   │   ├── error-boundary.tsx
    │   │   └── utils/
    │   │       ├── handle-error.ts
    │   │       └── throw-error.ts
    │   ├── loading-spinner.tsx
    │   ├── navigation.tsx
    │   └── ui/              # Generic UI components
    │       └── button.tsx
    ├── hooks/              # Generic hooks
    ├── stores/             # Global state
    └── utils/              # Generic utilities
```

## 🔄 **Domain-Specific Patterns**

### **Pattern 1: Auth Domain (Containers Only)**

```typescript
// ✅ modules/auth/containers/login.container.tsx
export function LoginContainer() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (credentials) => {
    await login(credentials);
    navigate('/dashboard');
  };
  
  // Renders UI directly - no separate view
  return (
    <div className="login-page">
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
```

### **Pattern 2: Home Domain (Container/View Pattern)**

```typescript
// ✅ modules/home/containers/home.container.tsx
export function HomeContainer() {
  const { data, loading, error } = useHomeData();
  
  return (
    <HomeView
      data={data}
      loading={loading}
      error={error}
    />
  );
}

// ✅ modules/home/views/home.view.tsx
export function HomeView({ data, loading, error }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} />;
  
  return (
    <div className="home-page">
      {data.map(item => (
        <HomeCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### **Pattern 3: Component Co-location (Complex Components)**

For complex components, you can co-locate related files:

```typescript
// ✅ modules/home/components/card/
card/
├── index.ts                      # Barrel export
├── card.tsx                      # Main component
├── card.test.tsx                 # Unit tests
├── card.stories.tsx              # Storybook stories
├── card.styles.ts                # Styles
├── hooks/                        # Component-specific hooks (if complex)
│   └── use-card-logic.ts
├── helpers/                      # Component-specific helpers (if complex)
│   ├── filter-rows.helper.ts
│   └── sort-data.helper.ts
└── stores/                       # Component-specific stores (if complex)
    ├── table.store.ts
    └── card.store.ts
```

#### **When to Use Component Co-location:**

✅ **Use component-specific folders when:**

- **Component has complex business logic** (multiple hooks, utilities)
- **Component has multiple sub-components** that need coordination
- **Component has specific helpers** not reusable elsewhere
- **Component benefits from testing** logic separate from UI

✅ **Don't use co-location when:**

- **Simple presentation component** (just props in, JSX out)
- **No component-specific logic** (pure UI component)
- **Used only once** (might be overkill)

## 🔧 **Utils and Helpers Decision Guide**

### **Where to Put Utility Functions and Helpers:**

```txt
Is this utility used by multiple domains?
├── YES → shared/utils/
└── NO → Is this used by multiple components in one domain?
    ├── YES → modules/[domain]/utils/ (if domain has this folder)
    └── NO → Is this specific to one component?
        ├── YES → modules/[domain]/components/[component]/helpers/
        └── NO → modules/[domain]/utils/ (create if needed)
```

### **Utility Categories:**

| **Utility Type** | **Where it Goes** | **Example** |
|------------------|-------------------|-------------|
| **Generic utilities** | `shared/utils/` | Date formatting, string helpers, validation |
| **Domain-specific utilities** | `modules/[domain]/utils/` | Business logic helpers, domain calculations |
| **Component-specific helpers** | `modules/[domain]/components/[component]/helpers/` | Sorting logic, filtering functions |
| **Error utilities** | `shared/components/error-boundary/utils/` | Error handling, error formatting |

### **Real Examples:**

```typescript
// ✅ shared/utils/ - Generic utilities
export const formatDate = (date: Date) => { /* ... */ }
export const generateId = () => { /* ... */ }
export const debounce = (fn: Function, delay: number) => { /* ... */ }

// ✅ modules/auth/utils/ - Domain-specific utilities  
export const validatePassword = (password: string) => { /* ... */ }
export const hashPassword = (password: string) => { /* ... */ }
export const checkPermissions = (user: User, resource: string) => { /* ... */ }

// ✅ modules/products/components/product-table/helpers/ - Component-specific
export const sortProductsByPrice = (products: Product[]) => { /* ... */ }
export const filterProductsByCategory = (products: Product[], category: string) => { /* ... */ }

// ✅ shared/components/error-boundary/utils/ - Error utilities
export const handleError = (error: Error, context: string) => { /* ... */ }
export const throwError = (message: string) => { /* ... */ }
```

### **Naming Conventions:**

- **Files**: `kebab-case.ts` (e.g., `date-helpers.ts`, `string-utils.ts`)
- **Helper files**: `kebab-case.helper.ts` (e.g., `sort-data.helper.ts`)
- **Functions**: `camelCase` (e.g., `formatCurrency`, `validateEmail`)

### **🎯 Quick Decision for Utils:**

1. **Used by multiple domains?** → `shared/utils/`
2. **Domain-specific business logic?** → `modules/[domain]/utils/`
3. **Component-specific logic?** → `modules/[domain]/components/[component]/helpers/`
4. **Error handling?** → `shared/components/error-boundary/utils/`

## 📋 **Decision Matrix**

| I want to... | Where should it go? | Example |
|--------------|-------------------|---------|
| Create auth route | `modules/auth/containers/` | `login.container.tsx` |
| Create home route | `modules/home/containers/` | `home.container.tsx` |
| Create core route | `modules/core/containers/` | `dashboard.container.tsx` |
| Create home page layout | `modules/home/views/` | `home.view.tsx` |
| Fetch auth data | `modules/auth/services/` | `auth.api.ts` |
| Display home card | `modules/home/components/` | `home-card.tsx` |
| Create auth hooks | `modules/auth/hooks/` | `use-auth.ts` |
| Make reusable button | `shared/components/` | `button.tsx` |
| Add error boundary | `shared/components/error-boundary/` | `custom-error-fallback.tsx` |
| Create utility function | Domain or `shared/utils/` | Depends on usage |

## 🚦 **Red Flags - When You're Doing It Wrong**

### ❌ WRONG: Mixing Concerns

```txt
❌ modules/home/containers/home-api.ts          # API in container folder
❌ modules/auth/services/auth-header.tsx        # UI component in services
❌ shared/auth-logic.ts                         # Domain logic in shared
```

### ✅ RIGHT: Clear Separation

```txt
✅ modules/auth/services/auth.api.ts            # Domain API calls
✅ modules/home/containers/home.container.tsx   # Page logic
✅ modules/home/views/home.view.tsx             # Page UI (if using Container/View)
✅ shared/components/button.tsx                 # Reusable UI
```

## 🎨 **Naming Conventions**

### **Files & Folders**

- **Folders**: `kebab-case` (e.g., `home-card`, `user-profile`)
- **Components**: `kebab-case.tsx` (e.g., `home-card.tsx`)
- **Hooks**: `kebab-case.ts` starting with `use` (e.g., `use-home-data.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `home.types.ts`)
- **Services**: `kebab-case.api.ts` (e.g., `home.api.ts`)
- **Stores**: `kebab-case.store.ts` (e.g., `home.store.ts`)
- **Utils**: `kebab-case.ts` (e.g., `date-helpers.ts`, `string-utils.ts`)
- **Helpers**: `kebab-case.helper.ts` (e.g., `sort-data.helper.ts`)

### **Component Naming Patterns**

- **Containers**: `{page-name}.container.tsx`
- **Views**: `{page-name}.view.tsx` (Container/View pattern only)
- **Components**: `{component-name}.tsx` or `{component-name}/` folder

## 🧩 **Complex Scenarios**

### **Multiple Forms on One Page**

✅ **Correct Pattern**: One Container + One View (if domain uses Container/View) + Form Components

```typescript
// ✅ modules/core/containers/settings.container.tsx
export function SettingsContainer() {
  const [profileData, setProfileData] = useState();
  const [preferencesData, setPreferencesData] = useState();
  
  const handleProfileSubmit = (data) => {
    // Container handles business logic
    submitProfile(data);
  };
  
  return (
    <SettingsView
      onProfileSubmit={handleProfileSubmit}
      onPreferencesSubmit={handlePreferencesSubmit}
    />
  );
}

// ✅ modules/core/views/settings.view.tsx (if using Container/View pattern)
export function SettingsView({ onProfileSubmit, onPreferencesSubmit }) {
  return (
    <div className="settings-page">
      <div className="grid grid-cols-2 gap-8">
        <ProfileForm onSubmit={onProfileSubmit} />
        <PreferencesForm onSubmit={onPreferencesSubmit} />
      </div>
    </div>
  );
}
```

### **Complex Components with Logic/UI Separation**

For components with complex internal logic, use component-level separation:

```typescript
// ✅ modules/home/components/user-stats/user-stats.logic.tsx
export function UserStats({ data }) {
  const { processedStats, loading, error } = useUserStats(data);
  
  return (
    <UserStatsUI 
      stats={processedStats}
      loading={loading}
      error={error}
    />
  );
}

// ✅ modules/home/components/user-stats/user-stats.ui.tsx
export function UserStatsUI({ stats, loading, error }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="user-stats">
      {/* Pure UI rendering */}
    </div>
  );
}
```

## 🛡️ **Error Boundary Integration**

Your app has a robust error boundary system in `shared/components/error-boundary/`:

```typescript
// ✅ Using error boundaries in containers
import { ErrorBoundary } from '@/shared/components/error-boundary';

export function HomeContainer() {
  return (
    <ErrorBoundary>
      <HomeView {...props} />
    </ErrorBoundary>
  );
}

// ✅ Custom error handling
import { handleError } from '@/shared/components/error-boundary/utils';

export function useHomeData() {
  const query = useQuery({
    queryFn: fetchHomeData,
    onError: (error) => handleError(error, 'Failed to load home data'),
  });
  
  return query;
}
```

## 🤷‍♂️ "I'm Still Not Sure..." Super Simple Guide

### 🎯 Answer These 3 Questions

#### 1. **"What domain is this related to?"**

| If it's about... | Put it in... | Example |
|------------------|--------------|---------|
| Authentication, users, sessions | **`modules/auth/`** | Login form → `auth/components/` |
| Home page, landing content | **`modules/home/`** | Home stats → `home/components/` |
| Core business features | **`modules/core/`** | Dashboard → `core/containers/` |
| Your main business entities | **`modules/[domain]/`** | Product form → `products/components/` |
| Generic UI, utilities | **`shared/`** | Button → `shared/components/` |
| Domain-specific utilities | **`modules/[domain]/utils/`** | Auth validation → `auth/utils/` |
| Component-specific helpers | **Component folder** | Table sorting → `data-table/helpers/` |

> **Replace with your actual domains** - the pattern is the same regardless of domain names.

#### 2. **"Is this used in routes or just as a component?"**

| Question | Route Entry = Container | Component = Components |
|----------|------------------------|----------------------|
| Used directly in router? | `containers/` | `components/` |
| Represents full page? | `containers/` (+ `views/` if domain uses pattern) | `components/` |
| Reusable within domain? | `components/` | `components/` |

#### 3. **"The Magic Questions" (Answer honestly!)**

```txt
🔮 Can I use this exact code in a completely different app?
├─ YES → Put in `shared/`
└─ NO → Keep reading...

🔮 Is this specific to auth/home/core domain?
├─ YES → Put in `modules/[domain]/`
└─ NO → Put in `shared/`
```

### 🚨 **When You're Really Stuck:**

1. **Look at existing patterns** - Follow what's already there
2. **Start in `containers/`** - You can always refactor later
3. **Check if similar components exist** - Copy the pattern
4. **Ask: "Which business domain does this belong to?"** - Use your actual domain names

## 🏗️ **Pattern Examples by Domain Type**

### **Authentication Domain Pattern:**

```typescript
// ✅ modules/auth/containers/login.container.tsx - Route entry
// ✅ modules/auth/components/login-form.tsx - Reusable form
// ✅ modules/auth/hooks/use-auth.ts - Auth business logic
// ✅ modules/auth/services/auth.api.ts - Auth API calls
```

### **Feature Domain Pattern (e.g., home, products, orders):**

```typescript
// ✅ modules/[domain]/containers/[page].container.tsx - Route entry
// ✅ modules/[domain]/views/[page].view.tsx - Page layout (if using Container/View)
// ✅ modules/[domain]/components/[feature]/[feature].tsx - Domain-specific component
// ✅ modules/[domain]/hooks/use-[domain]-data.ts - Domain business logic
```

### **Shared Components Pattern:**

```typescript
// ✅ shared/components/loading-spinner.tsx - Generic UI
// ✅ shared/components/error-boundary/ - Error handling
// ✅ shared/components/ui/button.tsx - Generic button
// ✅ shared/hooks/use-query.ts - Generic hook
```

> **Replace `[domain]` with your actual domain names** like `products`, `orders`, `customers`, etc.

## 🎯 **Quick Reference: "Where Does This Go?"**

| What you're building | Ask yourself | Answer |
|---------------------|--------------|---------|
| Login page | Auth route entry? | `modules/auth/containers/` |
| Domain page | Domain route + Container/View? | `modules/[domain]/containers/` + `views/` |
| Business feature page | Main business route? | `modules/[domain]/containers/` |
| Domain-specific form | Specific to one domain? | `modules/[domain]/components/` |
| Loading spinner | Generic across domains? | `shared/components/` |
| Error boundary | App infrastructure? | `shared/components/error-boundary/` |
| Domain state hook | Domain business logic? | `modules/[domain]/hooks/` |
| Generic utility | Used by multiple domains? | `shared/utils/` |
| Domain utility | Domain-specific logic? | `modules/[domain]/utils/` |
| Component helper | Component-specific logic? | `modules/[domain]/components/[component]/helpers/` |
| Error utility | Error handling? | `shared/components/error-boundary/utils/` |

> **Examples**: Replace `[domain]` with `products`, `orders`, `dashboard`, `settings`, etc.

## 🚀 **Quick Start Checklist**

Before creating anything, ask:

- [ ] **What domain is this?** → Your business domain (e.g., `auth`, `products`, `orders`) or `shared`
- [ ] **Is this a route entry point?** → `containers/`
- [ ] **Does domain use Container/View pattern?** → Also create in `views/`
- [ ] **Is this reusable within domain?** → `components/`
- [ ] **Is this generic across domains?** → `shared/components/`
- [ ] **Does this manage domain state?** → Domain `stores/` or `store/`
- [ ] **Is this a utility function?** → Follow utils decision tree:
  - [ ] **Used by multiple domains?** → `shared/utils/`
  - [ ] **Domain-specific business logic?** → `modules/[domain]/utils/`
  - [ ] **Component-specific helper?** → `modules/[domain]/components/[component]/helpers/`
  - [ ] **Error handling utility?** → `shared/components/error-boundary/utils/`

## 💡 **Pro Tips**

1. **When in doubt, follow existing patterns** - Look at existing domains for examples
2. **Each domain can choose its pattern** - Some use Container/View, others containers-only
3. **Keep domains independent** - Don't import one domain into another directly
4. **Use shared for cross-cutting** - Error boundaries, generic UI, utilities
5. **Containers can use multiple domains** - That's the point of composition!

## 🎊 **Benefits of This Architecture**

✅ **Clear Domain Boundaries** - Each business concern is isolated  
✅ **Flexible Patterns** - Each domain can use the pattern that fits best  
✅ **Easy to Navigate** - Developers know exactly where to find/place code  
✅ **Highly Testable** - Test containers and views separately  
✅ **Scalable** - Add new domains or routes easily  
✅ **Team-Friendly** - Different teams can own different domains  
✅ **Error-Resilient** - Robust error boundaries throughout  

## 📚 **Related Documentation**

- [**🏗️ Architecture Guidelines**](./ARCHITECTURE.md) - Detailed architectural patterns
- [**📦 Component Classification**](./COMPONENT_CLASSIFICATION.md) - Deep dive into component types
- [**📁 Folder Organization**](./FOLDER_ORGANIZATION.md) - Detailed folder structure guide

---

Remember: The goal is **maintainable, testable, and scalable** code. These guidelines help you achieve that by keeping concerns separated, domains independent, and patterns consistent.
