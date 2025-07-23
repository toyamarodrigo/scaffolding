# 🤖 Claude Code Workflows

## 📋 Documentation Loading Patterns

### Core Context (Always Load First)

```bash
@CLAUDE.md
```

### Task-Specific Context Loading

#### Creating New Features

```bash
@CLAUDE.md @docs/DEVELOPER_GUIDE.md @docs/COMPONENT_CLASSIFICATION.md
```

#### Refactoring Components

```bash
@CLAUDE.md @docs/ARCHITECTURE.md @docs/FOLDER_ORGANIZATION.md
```

#### Setting Up Tests

```bash
@CLAUDE.md @docs/TESTING.md
```

#### Routing Changes

```bash
@CLAUDE.md @docs/ROUTING.md
```

#### Complex Architectural Questions

```bash
@CLAUDE.md @docs/ARCHITECTURE.md @docs/DEVELOPER_GUIDE.md @docs/COMPONENT_CLASSIFICATION.md
```

## 🎯 Smart Prompting Patterns

### 1. Architecture-Aware Development

```bash
@CLAUDE.md "I need to create a user profile editing form. Follow the project's domain architecture and component classification."
```

### 2. Pattern-Following Implementation

```bash
@CLAUDE.md @docs/COMPONENT_CLASSIFICATION.md "Create a product search component. Which domain should it go in and what pattern should I follow?"
```

### 3. Testing Strategy

```bash
@CLAUDE.md @docs/TESTING.md "Set up comprehensive tests for the auth login flow following the project's testing patterns."
```

### 4. Edge Case Resolution

```bash
@CLAUDE.md "I need to share user notifications between auth, home, and core domains. What's the best approach following our architecture?"
```

## 🔧 MCP Integration Patterns

### Context-Aware File Operations

```bash
# Claude will understand the domain structure and suggest appropriate locations
@CLAUDE.md "Create a new authentication hook and place it in the correct location"

# Result: Creates file at modules/auth/hooks/use-new-auth-feature.ts
```

### Pattern-Based Code Generation

```bash
@CLAUDE.md @docs/COMPONENT_CLASSIFICATION.md "Generate a dashboard container following the core domain's Container/View pattern"

# Claude will:
# 1. Check that core uses Container/View pattern
# 2. Create both container and view files
# 3. Follow naming conventions
# 4. Include proper error boundaries
```

### Architecture Validation

```bash
@CLAUDE.md "Review this component placement and suggest improvements based on our architecture"

# Claude will validate against:
# - Domain boundaries
# - Component classification rules
# - Naming conventions
# - Pattern consistency
```

## 📚 Documentation Memory Management

### Progressive Context Loading

```bash
# Start minimal
@CLAUDE.md

# Add specific context as needed
@docs/COMPONENT_CLASSIFICATION.md

# Load examples when stuck
@src/modules/auth/components/*/  # Load auth patterns
@src/modules/home/containers/*/  # Load home patterns
```

### Context Refresh Patterns

```bash
# When switching domains
@CLAUDE.md @src/modules/core/  # Load core domain patterns

# When working on complex features
@CLAUDE.md @docs/ARCHITECTURE.md @docs/DEVELOPER_GUIDE.md

# When debugging edge cases
@CLAUDE.md # Check edge cases section
```

## 🎯 Workflow Examples

### Example 1: Creating New Domain Feature

```bash
# Step 1: Load context
@CLAUDE.md @docs/DEVELOPER_GUIDE.md

# Step 2: Ask architecture question
"I need to add order management functionality. Should this be a new domain or part of core?"

# Step 3: Follow guided implementation
"Create the order domain following the Container/View pattern like the home domain"
```

### Example 2: Cross-Domain Integration

```bash
# Step 1: Load context with edge cases
@CLAUDE.md

# Step 2: Reference edge case
"I need to implement real-time notifications across domains. I see there's a pattern for this in the edge cases section."

# Step 3: Implement following documented pattern
"Implement the WebSocket service pattern for notifications"
```

### Example 3: Testing Setup

```bash
# Step 1: Load testing context
@CLAUDE.md @docs/TESTING.md

# Step 2: Domain-specific setup
"Set up E2E tests for the auth domain following the domain-based organization pattern"

# Claude creates:
# - tests/e2e/auth/login.spec.ts
# - tests/fixtures/auth-data.ts
# - tests/utils/auth-helpers.ts
```

## 🔄 Iterative Development

### Pattern Recognition

```bash
@CLAUDE.md @src/modules/home/components/card/

# Claude learns the pattern from existing home components
"Create a similar stats component for the home domain"
```

### Consistency Checking

```bash
@CLAUDE.md @src/modules/

# Claude can validate across all domains
"Check if all domains are following consistent patterns and suggest improvements"
```

## 💡 Pro Tips for Claude Usage

### 1. Always Start with CLAUDE.md

This gives Claude the architectural context needed for all decisions.

### 2. Load Specific Docs for Complex Tasks

Don't overload context - load only what's needed for the current task.

### 3. Reference Existing Patterns

Use @src/modules/[domain]/ to load existing patterns as examples.

### 4. Use Edge Cases Section

The CLAUDE.md edge cases section helps with complex scenarios.

### 5. Validate Decisions

Ask Claude to validate architectural decisions against the loaded documentation.
