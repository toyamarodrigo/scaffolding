import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  type: "app",
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [
    "dist",
    "storybook-static",
    "node_modules",
    "build",
    "coverage",
    "reports",
    "docs/**",
    "*.md",
  ],
  rules: {
    // Basic rules
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // React rules
    "react-refresh/only-export-components": "warn",
    "react/no-prop-types": "off",
    "react/no-forward-ref": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": "off",
    "react/no-nested-component-definitions": "warn",
    "react-dom/no-missing-button-type": "warn",
    "react/no-unstable-default-props": "warn",

    // TypeScript rules
    "ts/consistent-type-definitions": ["error", "type"],
    "ts/no-use-before-define": "off",
    "ts/no-explicit-any": "warn",
    "ts/no-unused-vars": "off", // Handled by unused-imports

    // Node.js rules
    "antfu/no-top-level-await": "off",
    "node/prefer-global/process": "off",
    "node/no-process-env": "off",

    // Unicorn rules - disable problematic ones
    "unicorn/prefer-node-protocol": "off",
    "unicorn/no-instanceof-builtins": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: ["README.md"],
      },
    ],

    // React hooks rules
    "react-hooks-extra/no-unnecessary-use-prefix": "warn",
  },
});
