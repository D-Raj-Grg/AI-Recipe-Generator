# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ChefMate** is an AI-powered recipe generator that transforms ingredients into personalized meal suggestions. Built with Next.js 15, it uses OpenAI's API to generate creative recipes from user-provided ingredients while respecting dietary restrictions and preferences.

**Current Status:** Phase 1 (25% complete) - Landing page complete, OpenAI integration next
**Target Launch:** December 11, 2025

## Essential Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build (test before committing)
npm run start            # Run production build locally
npm run lint             # Run ESLint

# Git workflow - CRITICAL
# Always develop on the claude/* branch with matching session ID
git push -u origin claude/[branch-name-with-session-id]
# Branch format: claude/descriptive-name-[SESSION_ID]
# Push will fail with 403 if branch doesn't match pattern
```

## Architecture Overview

### Tech Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State:** Zustand (centralized store)
- **Animations:** Framer Motion
- **AI:** OpenAI API (GPT-4o or GPT-4o-mini)
- **Icons:** Lucide React
- **Theme:** next-themes (class-based dark mode)

### Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata & theme provider
│   ├── page.tsx                # Landing page (✅ complete)
│   ├── globals.css             # Tailwind + CSS variables
│   ├── icon.svg                # Favicon
│   ├── generate/               # Recipe generation interface (⏳ next)
│   ├── recipe/[id]/            # Recipe detail pages
│   ├── saved/                  # Bookmarked recipes
│   ├── explore/                # Cuisine/meal browsing
│   └── api/
│       └── recipe/
│           └── generate/       # OpenAI recipe generation endpoint
├── components/
│   ├── ui/                     # shadcn components (Button, Card, Input, etc.)
│   ├── logo.tsx                # ChefMate logo SVG component
│   ├── theme-provider.tsx      # next-themes wrapper
│   ├── theme-toggle.tsx        # Dark/light/system theme switcher
│   ├── recipe/                 # RecipeCard, RecipeDetail, IngredientInput
│   └── filters/                # TimeFilter, DietaryFilter, CuisineFilter
├── lib/
│   ├── utils.ts                # cn() helper for class merging
│   ├── openai.ts               # OpenAI client configuration (⏳ to create)
│   └── prompts.ts              # Recipe generation prompts (⏳ to create)
└── store/
    └── useRecipeStore.ts       # Zustand state (⏳ to create)
```

### State Management Pattern (Zustand)

The app uses a single Zustand store for all state:

```typescript
// /store/useRecipeStore.ts structure
interface RecipeStore {
  // Input state
  ingredients: string[]
  filters: RecipeFilters
  dietaryRestrictions: string[]

  // Generated content
  currentRecipes: Recipe[]
  selectedRecipe: Recipe | null

  // User data (persisted to localStorage)
  bookmarkedRecipes: Recipe[]
  recipeHistory: Recipe[]
  preferences: UserPreferences

  // Actions (imperative methods)
  addIngredient: (ingredient: string) => void
  removeIngredient: (ingredient: string) => void
  updateFilters: (filters: Partial<RecipeFilters>) => void
  setRecipes: (recipes: Recipe[]) => void
  bookmarkRecipe: (recipe: Recipe) => void
  // ... more actions
}
```

### API Route Pattern

```typescript
// /app/api/recipe/generate/route.ts
// POST endpoint that:
// 1. Validates input (ingredients, filters, restrictions)
// 2. Constructs OpenAI prompt with user requirements
// 3. Calls OpenAI API with structured JSON response format
// 4. Transforms response into Recipe[] type
// 5. Handles errors (rate limits, timeouts, API failures)
// 6. Returns { recipes: Recipe[], generatedAt: Date }
```

## Design System

### Color Palette (Food-Inspired)
- **Primary:** Orange/Amber gradient (`hsl(32 95% 44%)`) - appetizing warmth
- **Secondary:** Emerald (`hsl(160 84% 39%)`) - fresh, healthy
- **Accent:** Rose (`hsl(346 77% 50%)`) - spicy, exciting
- **Background (light):** Warm cream (`hsl(33 100% 97%)`)
- **Background (dark):** Deep slate with warm tint (`hsl(222 47% 11%)`)

### CSS Variables
All colors use CSS variables in `globals.css` with separate light/dark values. Components reference via Tailwind classes like `bg-primary`, `text-muted-foreground`, etc.

### Component Conventions
- **shadcn/ui pattern:** Use `cn()` utility for conditional classes
- **Framer Motion:** Wrap components with `<motion.div>` for animations
- **Icons:** Use Lucide React icons (already installed)
- **Responsive:** Mobile-first, use Tailwind breakpoints (sm, md, lg)

## Key Technical Decisions

### OpenAI Integration (Phase 1 - Next Priority)
- **Environment:** `OPENAI_API_KEY` in `.env.local` (CRITICAL - needed before API development)
- **Model:** GPT-4o (better quality) or GPT-4o-mini (cost-efficient) - TBD
- **Temperature:** 0.8 (higher for creative recipe variations)
- **Format:** Structured JSON responses with explicit schema
- **Rate Limiting:** 15 recipes/hour per IP address

### Data Persistence Strategy
- **No database:** All user data stored in localStorage
- **Bookmarks:** Persist as JSON array in localStorage
- **Preferences:** Dietary restrictions, theme, serving preferences
- **History:** Last 20 generated/viewed recipes

### Image Strategy
- **MVP:** Emoji placeholders (no cost, fast)
- **Future:** DALL-E API or Unsplash integration
- **Decision rationale:** Avoid $100-300/month image generation costs for MVP

### Font Strategy
- **System fonts only** (no Google Fonts)
- **Rationale:** Network reliability, performance, no external dependencies
- **Implementation:** `font-sans` class uses system font stack

## Development Workflow

### Before Starting New Features
1. Check `TASKS.md` for current phase and priorities
2. Review `PLANNING.md` for context and acceptance criteria
3. Ensure git branch follows `claude/*-[SESSION_ID]` pattern
4. Run `npm run build` to verify no breaking changes

### Adding New Components
1. shadcn components: Place in `/components/ui/`
2. Feature components: Group by domain (`/components/recipe/`, `/components/filters/`)
3. Use TypeScript interfaces for props
4. Make responsive with Tailwind breakpoints
5. Add dark mode support (test with theme toggle)

### Adding New Pages
1. Follow Next.js App Router conventions
2. Use `Metadata` export for SEO
3. Wrap client interactivity with `"use client"` directive
4. Connect to Zustand store for state management

### API Routes
1. Export `POST` function from `route.ts`
2. Validate input with Zod schemas (recommended)
3. Return `Response` or `NextResponse` objects
4. Handle errors with appropriate status codes (429, 500, etc.)
5. Add rate limiting before production

## Important Files

### Documentation (Read These First)
- `PRD.md` - Complete product requirements and feature specifications
- `PLANNING.md` - 4-week development plan, sprint breakdown, metrics
- `TASKS.md` - Granular task list with checkboxes (update as you complete tasks)

### Configuration
- `components.json` - shadcn/ui configuration (style: default, base color: slate)
- `tailwind.config.ts` - Theme extension with CSS variable references
- `tsconfig.json` - TypeScript config with path aliases (@/*)

### Critical Files for Phase 1
- `/lib/openai.ts` - **TO CREATE:** OpenAI client initialization
- `/lib/prompts.ts` - **TO CREATE:** Recipe generation prompt templates
- `/app/api/recipe/generate/route.ts` - **TO CREATE:** Main API endpoint
- `/store/useRecipeStore.ts` - **TO CREATE:** Zustand state management

## Common Patterns

### Animated Components
```tsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

### Theme-Aware Components
```tsx
// Automatically adapts to light/dark mode via CSS variables
<div className="bg-background text-foreground">
  <Card className="border-border">
    <Button className="bg-primary text-primary-foreground">
      Click Me
    </Button>
  </Card>
</div>
```

### Zustand Store Usage
```tsx
"use client"
import { useRecipeStore } from "@/store/useRecipeStore"

export function MyComponent() {
  const { ingredients, addIngredient } = useRecipeStore()

  return (
    <button onClick={() => addIngredient("chicken")}>
      Add Ingredient
    </button>
  )
}
```

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test in light and dark mode (use theme toggle)
- [ ] Test on mobile viewport (DevTools responsive mode)
- [ ] Verify animations are smooth (60fps)
- [ ] Check loading states work correctly
- [ ] Test error scenarios (API failures, network issues)
- [ ] Run `npm run build` before committing

### Performance Targets
- Lighthouse score > 90
- Recipe generation < 5 seconds
- Page load < 2 seconds
- No layout shift (CLS < 0.1)

## Current Phase: Phase 1 - Core Recipe Generation

### What's Done ✅
- Complete landing page with animations
- Design system (colors, typography, spacing)
- Dark mode support
- Logo, favicon, SEO metadata
- PWA manifest

### What's Next 🔄
1. **OpenAI Integration (Wednesday)**
   - Get API key (check with user)
   - Create `/lib/openai.ts` client
   - Create `/lib/prompts.ts` templates

2. **Recipe Generation API (Thursday)**
   - Build `/app/api/recipe/generate/route.ts`
   - Implement error handling and rate limiting
   - Test with various ingredient combinations

3. **Frontend Interface (Friday)**
   - Create ingredient input with tag system
   - Build filter components (time, difficulty, cuisine)
   - Display recipe results in grid
   - Add loading states with cooking tips

### Success Criteria
- Generate 3-5 recipes in < 5 seconds
- Recipes include name, ingredients, instructions, nutrition
- Proper error handling for API failures
- Mobile-responsive interface

## Git Workflow (CRITICAL)

### Branch Naming Convention
**ALL development MUST happen on branches matching:** `claude/[description]-[SESSION_ID]`

Example: `claude/setup-nextjs-shadcn-dependencies-011CV5CzC5ohzT2CcD2NoQD8`

### Push Behavior
- Use: `git push -u origin claude/[branch-name-with-session-id]`
- Retry on network errors: Up to 4 times with exponential backoff (2s, 4s, 8s, 16s)
- Push will FAIL with 403 if branch doesn't match `claude/*-[SESSION_ID]` pattern

### Commit Messages
Use descriptive, multi-line commit messages with:
- Summary line (50 chars)
- Blank line
- Detailed description with bullet points
- Context about decisions made

## Troubleshooting

### Build Failures
- Check imports use `@/*` alias (not relative paths)
- Verify all components have proper TypeScript types
- Ensure no missing dependencies (`npm install`)
- Check for `"use client"` directive on interactive components

### API Issues
- Verify `OPENAI_API_KEY` in `.env.local`
- Check rate limiting hasn't been exceeded
- Verify API route exports named `POST` function
- Check CORS headers if calling from external source

### Styling Issues
- Verify CSS variables are defined in `globals.css`
- Check Tailwind classes are spelled correctly
- Test in both light and dark mode
- Clear `.next` cache: `rm -rf .next && npm run dev`

## Resources

- **Project Docs:** `PRD.md`, `PLANNING.md`, `TASKS.md`
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **OpenAI API:** https://platform.openai.com/docs
- **Zustand:** https://github.com/pmndrs/zustand

---

**Last Updated:** November 13, 2025
**Current Sprint:** Phase 1 - Week 1 (Recipe Generation)
**Next Review:** November 15, 2025
