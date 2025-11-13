# Contributing to ChefMate

Thank you for your interest in contributing to ChefMate! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share your ideas for improvements
- 📝 **Improve documentation** - Help make our docs clearer
- 🎨 **Design improvements** - Enhance UI/UX
- 💻 **Code contributions** - Fix bugs or implement features
- 🌍 **Translations** - Help make ChefMate multilingual (future)
- 🧪 **Testing** - Test new features and report feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm (recommended) or npm
- Git for version control
- Basic knowledge of React, Next.js, and TypeScript
- OpenAI API key for testing ([Get one here](https://platform.openai.com/api-keys))

### Fork and Clone

1. **Fork the repository**
   - Click the "Fork" button at the top right of the GitHub page
   - This creates your own copy of the repository

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Recipe-Generator.git
   cd AI-Recipe-Generator
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/D-Raj-Grg/AI-Recipe-Generator.git
   ```

### Setup Development Environment

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OpenAI API key to `.env.local`

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Verify everything works**
   - Open [http://localhost:3000](http://localhost:3000)
   - Try generating a recipe
   - Test dark mode toggle
   - Check mobile responsive design

## 📋 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - UI/styling changes

### 2. Make Your Changes

Follow these guidelines:

#### Code Style
- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow existing ESLint rules
- **Prettier** - Code is auto-formatted (if configured)
- **Components** - Use functional components with hooks
- **Naming** - Use descriptive, camelCase names for variables/functions

#### File Organization
```
src/
├── app/                  # Pages and routes
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── recipe/          # Recipe-specific components
│   ├── filters/         # Filter components
│   └── navigation/      # Navigation components
├── lib/                 # Utilities and helpers
│   ├── types/          # TypeScript type definitions
│   └── utils.ts        # Utility functions
└── store/              # State management
```

#### Component Guidelines
```tsx
// Good component structure
"use client" // Only if needed (client-side hooks, events)

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MyComponentProps {
  title: string
  onAction?: () => void
  className?: string
}

export function MyComponent({ title, onAction, className }: MyComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className={cn("base-classes", className)}>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

#### State Management
- Use **Zustand** for global state (recipe store)
- Use **React hooks** for local component state
- Keep state as local as possible

#### Styling
- **Tailwind CSS** - Use utility classes
- **shadcn/ui** - Use existing components when possible
- **Responsive** - Mobile-first approach
- **Dark mode** - Support light/dark themes

### 3. Write Good Commit Messages

Follow conventional commit format:

```
type(scope): brief description

Longer explanation if needed.
Can be multiple paragraphs.

- Bullet points are fine
- Use present tense: "add" not "added"
- Reference issues: Fixes #123
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Build process, dependencies

**Examples:**
```bash
feat(recipe): add serving size multiplier to recipe cards

fix(api): handle rate limit errors correctly

docs(readme): update installation instructions

style(ui): improve mobile navigation spacing
```

### 4. Test Your Changes

Before submitting, ensure:

```bash
# Lint check
pnpm lint

# Build check
pnpm build

# Manual testing checklist:
# - [ ] Works in light mode
# - [ ] Works in dark mode
# - [ ] Mobile responsive
# - [ ] No console errors
# - [ ] Recipe generation works
# - [ ] Bookmark/save functionality works
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# 1. Go to your fork on GitHub
# 2. Click "Compare & pull request"
# 3. Fill in the PR template
```

## 📝 Pull Request Guidelines

### PR Title Format
```
[Type] Brief description

Examples:
[Feature] Add meal planning calendar
[Fix] Resolve bookmark persistence issue
[Docs] Update contributing guidelines
```

### PR Description Template

Use this template when creating a PR:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Changes Made
- List the specific changes
- Be concise but descriptive
- Link to related issues

## Screenshots (if applicable)
Add screenshots for UI changes

## Testing Checklist
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested on mobile
- [ ] Tested recipe generation
- [ ] No console errors
- [ ] Build succeeds (`pnpm build`)
- [ ] Lint passes (`pnpm lint`)

## Related Issues
Fixes #123
Related to #456
```

### Review Process

1. **Automated Checks**
   - ESLint must pass
   - Build must succeed
   - No TypeScript errors

2. **Code Review**
   - Maintainer will review your code
   - May request changes
   - Be responsive to feedback

3. **Merge**
   - Once approved, PR will be merged
   - Your contribution will be credited

## 🐛 Reporting Bugs

### Before Reporting
1. **Search existing issues** - Your bug may already be reported
2. **Try latest version** - Bug might be fixed
3. **Check documentation** - Make sure it's actually a bug

### Bug Report Template

When creating a bug report, include:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., Windows 11, macOS 13]
- Browser: [e.g., Chrome 120, Safari 17]
- Node version: [e.g., 18.17.0]
- ChefMate version/commit: [e.g., main branch, commit abc123]

## Additional Context
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How would you implement this?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Mockups, examples, references

## Would You Be Willing to Implement This?
- [ ] Yes, I can implement this
- [ ] No, but I can help test
- [ ] No, just suggesting
```

## 📚 Documentation Contributions

Documentation is just as important as code!

### Areas Needing Docs
- API documentation
- Component documentation
- Setup guides
- Troubleshooting guides
- Architecture diagrams

### Documentation Guidelines
- **Clear and concise** - Easy to understand
- **Examples** - Include code examples
- **Up to date** - Matches current codebase
- **Well formatted** - Use Markdown properly

## 🧪 Testing Guidelines

### Manual Testing
For now, ChefMate relies on manual testing:

1. **Recipe Generation**
   - Test with 1-10 ingredients
   - Test with dietary restrictions
   - Test with various cuisines
   - Verify recipes are practical

2. **User Interface**
   - Test all interactive elements
   - Verify responsive design
   - Check dark mode
   - Test navigation

3. **Data Persistence**
   - Save recipes
   - Clear browser data
   - Verify bookmarks persist
   - Check history tracking

### Future: Automated Testing
We plan to add:
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright)
- Component tests (Storybook)

## 🎨 Design Contributions

### Design Guidelines
- **Food-inspired colors** - Orange (primary), Emerald (secondary), Rose (accent)
- **Warm aesthetic** - Inviting, appetizing
- **Accessibility** - WCAG AA compliance
- **Mobile-first** - Design for small screens first

### Submitting Designs
- Create mockups in Figma, Sketch, or similar
- Share link or export to PNG/SVG
- Explain design decisions
- Consider both light and dark modes

## ⚖️ Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Expected Behavior
- **Be respectful** - Treat everyone with respect
- **Be collaborative** - Work together constructively
- **Be patient** - Everyone learns at different paces
- **Be inclusive** - Welcome diverse perspectives

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement
Violations may result in:
- Warning
- Temporary ban
- Permanent ban

Report issues to: support@chefmate.app

## 🤝 Community

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and community discussions
- **Pull Requests** - Code contributions

### Getting Help
- Check [CLAUDE.md](CLAUDE.md) for development guide
- Read [README.md](README.md) for setup
- Ask in GitHub Discussions
- Email: support@chefmate.app

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project documentation
- Given contributor badge

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Quick Reference

```bash
# Setup
git clone [your-fork-url]
pnpm install
cp .env.local.example .env.local
pnpm dev

# Development
git checkout -b feature/my-feature
# Make changes
pnpm lint
pnpm build
git commit -m "feat: add my feature"
git push origin feature/my-feature

# Create PR on GitHub
```

---

Thank you for contributing to ChefMate! 🎉

Every contribution, no matter how small, makes a difference. We appreciate your time and effort in helping make ChefMate better for everyone.

**Happy Coding! 🍳**
