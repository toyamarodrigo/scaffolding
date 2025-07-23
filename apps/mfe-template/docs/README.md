# 📚 Documentation

## 📖 Architecture Documentation

### [🏗️ Architecture Guide](./ARCHITECTURE.md)

Complete architecture guidelines including:

- Domain-driven design principles
- Feature-based organization
- Folder structure standards
- Best practices and patterns

### [🤔 Developer Guide](./DEVELOPER_GUIDE.md)

Developer decision tree and patterns:

- "Where should I put this code?"
- Domain vs Page vs Component decisions
- Container/View pattern
- Real-world examples and scenarios

### [📁 Folder Organization](./FOLDER_ORGANIZATION.md)

Detailed folder structure and naming:

- Domain internal organization
- Export patterns with index.ts
- File naming conventions
- Real examples for different app types

### [🛣️ Routing Guide](./ROUTING.md)

Feature-based routing patterns:

- Router configuration
- Feature route management
- Route organization
- Adding new routes

### [🧪 Testing Guide](./TESTING.md)

Comprehensive testing patterns:

- E2E testing with Playwright
- Unit and integration testing
- Domain-based test organization
- Test utilities and best practices

## 🚀 Quick Start

1. **New to the project?** Start with [Architecture Guide](./ARCHITECTURE.md)
2. **Adding new code?** Use [Developer Guide](./DEVELOPER_GUIDE.md)
3. **Working with routes?** Check [Routing Guide](./ROUTING.md)
4. **Writing tests?** Follow [Testing Guide](./TESTING.md)

## 📂 Project Structure Overview

```txt
src/modules/
├── [your-domains]/         # Your business domains (replace examples below)
│   ├── components/         # Domain-specific components
│   ├── containers/         # Route entry points
│   ├── views/              # Presentation layer (if using Container/View)
│   ├── hooks/              # Domain business logic
│   ├── services/           # Domain API calls
│   └── routes/             # Domain routing
└── shared/                 # 🔧 Cross-cutting concerns

# Current template examples (replace with your domains):
├── auth/                   # 🔐 Authentication (containers-only pattern)
├── home/                   # 🏠 Landing page (Container/View pattern)
├── core/                   # 🎯 Core business (Container/View + pages pattern)
└── shared/                 # Cross-cutting concerns
```

**Important**: The `auth`, `home`, and `core` domains are template examples. Replace them with domains that match your business (e.g., `products`, `orders`, `customers`, `dashboard`, `billing`, etc.).

## 🤝 Contributing

When adding new features or making changes:

1. Follow the [Developer Guide](./DEVELOPER_GUIDE.md) decision tree
2. Maintain the [Architecture](./ARCHITECTURE.md) patterns
3. Update documentation when adding new patterns
4. Test your changes thoroughly

---

*This documentation reflects the current state of the microfrontend template and should be updated as the architecture evolves.*
