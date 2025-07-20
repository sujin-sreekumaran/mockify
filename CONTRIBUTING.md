# Contributing to Mockify

Thank you for your interest in contributing to Mockify! We welcome contributions from developers of all skill levels.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm
- Git

### Setting Up Development Environment

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/sujin-sreekumaran/mockify.git
   cd mockify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Components**: Follow the existing component patterns
- **Styling**: Use Tailwind CSS classes
- **Naming**: Use descriptive, camelCase names for variables and functions
- **Files**: Use PascalCase for component files, camelCase for utilities

### Component Structure

```typescript
// Component template
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ComponentProps } from "@/types";

interface YourComponentProps {
  // Props definition
}

export const YourComponent: React.FC<YourComponentProps> = (
  {
    // Props destructuring
  }
) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="your-classes">
      {/* Component content */}
    </motion.div>
  );
};
```

### Adding New Platforms

1. **Create platform configuration** in `src/lib/platforms/`
2. **Add TypeScript types** in `src/types/index.ts`
3. **Create preview component** in `src/components/platform-previews/`
4. **Add platform icon** to `src/components/ui/PlatformSelector.tsx`
5. **Update main page** to include the new platform
6. **Add tests** for the new platform

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build test
npm run build
```

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Examples

```bash
git commit -m "feat: add Discord platform support"
git commit -m "fix: resolve message overflow in mobile view"
git commit -m "docs: update installation instructions"
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the bug
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Provide mockups** if applicable

## 🔍 Code Review Process

1. **Submit Pull Request** with clear description
2. **Automated checks** must pass (linting, type checking, build)
3. **Code review** by maintainers
4. **Address feedback** if any
5. **Merge** once approved

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Community

- **GitHub Discussions**: For questions and general discussion
- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions

## 📄 License

By contributing to Mockify, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Mockify! 🎉
