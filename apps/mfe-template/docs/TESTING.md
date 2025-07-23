# 🧪 Testing Guide

## 🎯 Purpose

This guide provides comprehensive testing patterns for our Domain-Driven microfrontend architecture, covering unit tests, integration tests, and end-to-end (e2e) tests with Playwright.

## 📁 Testing Folder Structure

### **Recommended Structure (Option 1):**

```txt
apps/mfe-template/
├── tests/                           # 🧪 All testing code
│   ├── e2e/                         # 🎭 End-to-end tests
│   │   ├── auth/                    # Domain-based organization
│   │   │   ├── login.spec.ts        # Auth-specific e2e tests
│   │   │   ├── registration.spec.ts
│   │   │   └── password-reset.spec.ts
│   │   ├── home/                    # Home domain e2e tests
│   │   │   ├── home-navigation.spec.ts
│   │   │   ├── home-functionality.spec.ts
│   │   │   └── home-performance.spec.ts
│   │   ├── core/                    # Core domain e2e tests
│   │   │   ├── dashboard.spec.ts
│   │   │   ├── settings.spec.ts
│   │   │   └── user-workflows.spec.ts
│   │   └── shared/                  # Cross-domain e2e tests
│   │       ├── navigation.spec.ts
│   │       ├── error-handling.spec.ts
│   │       └── responsive-design.spec.ts
│   ├── fixtures/                    # 📦 Test data and mocks
│   │   ├── users.ts                 # User test data
│   │   ├── api-responses.ts         # Mock API responses
│   │   ├── test-data.ts             # Static test data
│   │   └── page-objects.ts          # Page object models
│   ├── utils/                       # 🔧 Test utilities
│   │   ├── test-helpers.ts          # Common test actions
│   │   ├── assertions.ts            # Custom assertions
│   │   ├── setup.ts                 # Test setup/teardown
│   │   └── database.ts              # Database helpers
│   └── screenshots/                 # 📸 Visual regression tests
├── playwright.config.ts             # 🎬 Playwright configuration
└── src/                             # 💻 Application source code
    └── modules/                     # Domain modules with unit tests
        ├── auth/
        │   ├── components/
        │   │   ├── login-form/
        │   │   │   ├── login-form.tsx
        │   │   │   ├── login-form.test.tsx    # 🧪 Unit tests
        │   │   │   └── index.ts
        │   │   └── index.ts
        │   ├── containers/
        │   │   ├── login.container.tsx
        │   │   ├── login.container.test.tsx   # 🧪 Integration tests
        │   │   └── index.ts
        │   └── hooks/
        │       ├── use-auth.ts
        │       ├── use-auth.test.ts           # 🧪 Hook tests
        │       └── index.ts
        └── home/
            └── ...
```

## 🎭 End-to-End (E2E) Testing with Playwright

### **File Naming Conventions:**

| **Test Type** | **Convention** | **Example** |
|---------------|----------------|-------------|
| **E2E Tests** | `*.spec.ts` | `login.spec.ts` |
| **Unit Tests** | `*.test.ts` | `login-form.test.ts` |
| **Integration Tests** | `*.test.ts` | `login.container.test.ts` |

### **Domain Organization Benefits:**

✅ **Clear ownership** - Each domain team owns their e2e tests  
✅ **Easier maintenance** - Tests are co-located with related features  
✅ **Parallel execution** - Tests can run in parallel by domain  
✅ **Focused testing** - Domain-specific scenarios are grouped together

### **E2E Test Structure Examples:**

```typescript
// ✅ tests/e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from '../../utils/test-helpers';
import { testUsers } from '../../fixtures/users';

test.describe('Authentication - Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('successful login with valid credentials', async ({ page }) => {
    // ✅ Use test helpers for common actions
    await loginUser(page, testUsers.validUser);
    
    // ✅ Assert on business outcomes
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('user-menu')).toBeVisible();
  });

  test('displays error for invalid credentials', async ({ page }) => {
    await loginUser(page, testUsers.invalidUser);
    
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('login-error')).toContainText('Invalid credentials');
  });

  test('redirects to intended page after login', async ({ page }) => {
    // Navigate to protected page first
    await page.goto('/dashboard/settings');
    await expect(page).toHaveURL('/login');
    
    await loginUser(page, testUsers.validUser);
    
    // Should redirect back to intended page
    await expect(page).toHaveURL('/dashboard/settings');
  });
});
```

```typescript
// ✅ tests/e2e/home/home-functionality.spec.ts
import { test, expect } from '@playwright/test';
import { setupTestData } from '../../utils/setup';

test.describe('Home - Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestData();
    await page.goto('/');
  });

  test('displays home content correctly', async ({ page }) => {
    // ✅ Test domain-specific functionality
    await expect(page.getByTestId('home-stats')).toBeVisible();
    await expect(page.getByTestId('home-cards')).toBeVisible();
    
    // ✅ Verify content loads
    const cards = page.getByTestId('home-card');
    await expect(cards).toHaveCount(3);
  });

  test('home card interactions work correctly', async ({ page }) => {
    const firstCard = page.getByTestId('home-card').first();
    await firstCard.click();
    
    // ✅ Test navigation behavior
    await expect(page).toHaveURL(/\/home\/items\/\d+/);
  });
});
```

## 📦 Test Fixtures and Data

### **User Test Data:**

```typescript
// ✅ tests/fixtures/users.ts
export const testUsers = {
  validUser: {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User'
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  }
};

// ✅ Domain-specific test data
export const homeTestData = {
  sampleCards: [
    { id: '1', title: 'Card 1', description: 'Description 1' },
    { id: '2', title: 'Card 2', description: 'Description 2' },
    { id: '3', title: 'Card 3', description: 'Description 3' }
  ],
  stats: {
    totalUsers: 150,
    activeUsers: 45,
    revenue: 25000
  }
};
```

### **API Response Fixtures:**

```typescript
// ✅ tests/fixtures/api-responses.ts
export const authApiResponses = {
  loginSuccess: {
    user: {
      id: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    },
    token: 'mock-jwt-token',
    expiresIn: 3600
  },
  loginError: {
    error: 'Invalid credentials',
    code: 'AUTH_FAILED'
  }
};

export const homeApiResponses = {
  homeData: {
    cards: homeTestData.sampleCards,
    stats: homeTestData.stats,
    lastUpdated: '2024-01-15T10:30:00Z'
  }
};
```

## 🔧 Test Utilities and Helpers

### **Common Test Actions:**

```typescript
// ✅ tests/utils/test-helpers.ts
import { Page } from '@playwright/test';

export async function loginUser(page: Page, user: { email: string; password: string }) {
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.click('[data-testid="login-button"]');
  
  // Wait for navigation to complete
  await page.waitForURL(/\/dashboard|\/home/);
}

export async function logoutUser(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('[data-testid="logout-button"]');
  await page.waitForURL('/login');
}

export async function navigateToSettings(page: Page) {
  await page.click('[data-testid="user-menu"]');
  await page.click('[data-testid="settings-link"]');
  await page.waitForURL('/settings');
}

export async function fillForm(page: Page, formData: Record<string, string>) {
  for (const [field, value] of Object.entries(formData)) {
    await page.fill(`[data-testid="${field}-input"]`, value);
  }
}

export async function submitForm(page: Page, formTestId: string = 'form') {
  await page.click(`[data-testid="${formTestId}"] [type="submit"]`);
}
```

### **Custom Assertions:**

```typescript
// ✅ tests/utils/assertions.ts
import { Page, expect } from '@playwright/test';

export async function expectLoadingSpinner(page: Page, shouldBeVisible: boolean = true) {
  const spinner = page.getByTestId('loading-spinner');
  if (shouldBeVisible) {
    await expect(spinner).toBeVisible();
  } else {
    await expect(spinner).not.toBeVisible();
  }
}

export async function expectErrorMessage(page: Page, message: string) {
  const errorElement = page.getByTestId('error-message');
  await expect(errorElement).toBeVisible();
  await expect(errorElement).toContainText(message);
}

export async function expectSuccessNotification(page: Page, message?: string) {
  const notification = page.getByTestId('success-notification');
  await expect(notification).toBeVisible();
  
  if (message) {
    await expect(notification).toContainText(message);
  }
}

export async function expectPageTitle(page: Page, title: string) {
  await expect(page).toHaveTitle(title);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(title);
}
```

### **Test Setup and Teardown:**

```typescript
// ✅ tests/utils/setup.ts
import { Page } from '@playwright/test';

export async function setupTestData() {
  // Setup database with test data
  // Clear cache
  // Setup mock API responses
  console.log('Setting up test data...');
}

export async function cleanupTestData() {
  // Clean up database
  // Clear test files
  // Reset state
  console.log('Cleaning up test data...');
}

export async function setupAuthenticatedSession(page: Page) {
  // Set authentication cookies/tokens
  // Skip login flow for tests that need authenticated state
  await page.addInitScript(() => {
    window.localStorage.setItem('auth-token', 'mock-token');
  });
}
```

## 🧪 Unit and Integration Testing Patterns

### **Component Unit Tests (Domain-Based):**

```typescript
// ✅ src/modules/auth/components/login-form/login-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './login-form';

describe('LoginForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders login form correctly', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  test('calls onSubmit with form data', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByTestId('login-button'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('displays validation errors', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByTestId('login-button'));
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });
});
```

### **Container Integration Tests:**

```typescript
// ✅ src/modules/auth/containers/login.container.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginContainer } from './login.container';
import { useAuth } from '../hooks/use-auth';

// Mock the custom hook
jest.mock('../hooks/use-auth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('LoginContainer Integration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
    
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      loading: false,
      error: null
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  test('successful login flow', async () => {
    const mockLogin = jest.fn().mockResolvedValue({ success: true });
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      loading: false,
      error: null
    });

    renderWithProviders(<LoginContainer />);
    
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByTestId('login-button'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
```

### **Custom Hook Tests:**

```typescript
// ✅ src/modules/auth/hooks/use-auth.test.ts
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { authApi } from '../services/auth.api';

jest.mock('../services/auth.api');
const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

describe('useAuth Hook', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
    
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  });

  test('login success flow', async () => {
    const mockLoginResponse = {
      user: { id: '1', email: 'test@example.com' },
      token: 'mock-token'
    };
    
    mockAuthApi.login.mockResolvedValue(mockLoginResponse);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    expect(result.current.user).toEqual(mockLoginResponse.user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('login error handling', async () => {
    const mockError = new Error('Invalid credentials');
    mockAuthApi.login.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      try {
        await result.current.login({
          email: 'invalid@example.com',
          password: 'wrongpassword'
        });
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

## ⚙️ Playwright Configuration

### **Basic Playwright Config:**

```typescript
// ✅ playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',
  
  // Global setup and teardown
  globalSetup: './tests/utils/global-setup.ts',
  globalTeardown: './tests/utils/global-teardown.ts',
  
  // Timeout configurations
  timeout: 30000,
  expect: { timeout: 5000 },
  
  // Parallel execution
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  
  // Retry configuration
  retries: process.env.CI ? 2 : 0,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  // Global test configuration
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Browser configurations
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Development server
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## 🎯 Testing Best Practices

### **E2E Testing Do's ✅**

- **Test user journeys, not implementation details**
- **Use domain-based organization** for better maintainability
- **Use data-testid attributes** for reliable element selection
- **Create reusable test helpers** for common actions
- **Test error scenarios** and edge cases
- **Use Page Object Models** for complex pages
- **Run tests in parallel** for faster feedback
- **Test cross-browser compatibility** on critical flows

### **E2E Testing Don'ts ❌**

- **Don't test every possible combination** - focus on critical paths
- **Don't rely on CSS selectors** - use data-testid instead
- **Don't test API logic in e2e tests** - mock external dependencies
- **Don't make tests dependent on each other** - each test should be independent
- **Don't ignore flaky tests** - fix or remove them
- **Don't test trivial interactions** - focus on business value

### **Unit Testing Do's ✅**

- **Test component behavior, not implementation**
- **Mock external dependencies** (APIs, external services)
- **Test error boundaries and edge cases**
- **Use descriptive test names** that explain the scenario
- **Test custom hooks in isolation**
- **Follow the AAA pattern**: Arrange, Act, Assert

### **Unit Testing Don'ts ❌**

- **Don't test third-party libraries** - trust they work
- **Don't test implementation details** - test public API
- **Don't write tests that duplicate type checking**
- **Don't mock everything** - keep some integration points
- **Don't test trivial functions** unless they have complex logic

## 🗂️ Test Organization by Domain

### **Domain Test Structure:**

Each domain should have its own testing approach:

```txt
src/modules/auth/
├── components/
│   └── login-form/
│       ├── login-form.tsx
│       ├── login-form.test.tsx        # 🧪 Component unit tests
│       └── index.ts
├── containers/
│   ├── login.container.tsx
│   ├── login.container.test.tsx       # 🔗 Integration tests
│   └── index.ts
├── hooks/
│   ├── use-auth.ts
│   ├── use-auth.test.ts               # 🪝 Hook tests
│   └── index.ts
└── services/
    ├── auth.api.ts
    ├── auth.api.test.ts               # 🔧 Service tests
    └── index.ts

tests/e2e/auth/
├── login.spec.ts                      # 🎭 Auth e2e tests
├── registration.spec.ts
└── password-reset.spec.ts
```

## 📊 Test Coverage Strategy

### **Coverage Targets by Layer:**

| **Layer** | **Coverage Target** | **Focus** |
|-----------|-------------------|-----------|
| **Components** | 80-90% | User interactions, edge cases |
| **Containers** | 70-80% | Business logic, data flow |
| **Hooks** | 90-95% | Business logic, state management |
| **Services** | 85-95% | API calls, error handling |
| **E2E** | Critical paths | User journeys, integrations |

### **What to Prioritize:**

1. **High business value features** - Authentication, core workflows
2. **Complex business logic** - Custom hooks, calculations
3. **Error-prone areas** - Form validation, API integration
4. **Cross-browser functionality** - Critical user paths
5. **Performance-critical features** - Data loading, navigation

## 🚀 Running Tests

### **Common Test Commands:**

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests for specific domain
npm run test:e2e -- tests/e2e/auth

# Run e2e tests in headed mode (see browser)
npm run test:e2e -- --headed

# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit -- --watch

# Run all tests with coverage
npm run test:coverage

# Run tests for specific domain
npm run test:unit -- src/modules/auth
```

### **CI/CD Integration:**

```yaml
# ✅ Example GitHub Actions workflow
name: Tests
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔄 Test Data Management

### **Test Database Strategy:**

```typescript
// ✅ tests/utils/database.ts
export class TestDatabase {
  async seedTestData() {
    // Insert test users
    await this.insertUsers(testUsers);
    // Insert test content
    await this.insertHomeData(homeTestData);
  }

  async cleanupTestData() {
    // Remove test data
    await this.clearAllTables();
  }

  async createTestUser(userData: Partial<User>) {
    return await this.insertUser({
      ...testUsers.validUser,
      ...userData
    });
  }
}
```

## 📚 Related Documentation

- [**🏗️ Architecture Guidelines**](./ARCHITECTURE.md) - Understanding the domain structure
- [**📦 Component Classification**](./COMPONENT_CLASSIFICATION.md) - Where to place test files
- [**📁 Folder Organization**](./FOLDER_ORGANIZATION.md) - Following the folder structure
- [**🤔 Developer Guide**](./DEVELOPER_GUIDE.md) - Decision making for test placement

---

This testing strategy ensures your microfrontend remains reliable, maintainable, and scalable while providing confidence in your domain-driven architecture.