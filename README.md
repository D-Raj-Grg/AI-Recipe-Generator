# 🍳 ChefMate - AI Recipe Generator

> Your AI Kitchen Companion. Transform ingredients into delicious meals in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ChefMate is an intelligent recipe generator powered by AI that helps you create personalized recipes from ingredients you have on hand. Reduce food waste, save time meal planning, and discover new dishes tailored to your dietary preferences.

🌐 **Live Demo:** [https://ai-recipe-generator-raj.vercel.app/](https://ai-recipe-generator-raj.vercel.app/)

---

## ✨ Features

### Core Features
- **🤖 AI-Powered Recipe Generation** - Generate 3-5 personalized recipes in seconds using OpenAI
- **🥗 Dietary Restrictions** - Support for 10+ dietary preferences (vegan, keto, gluten-free, etc.)
- **🌍 Multi-Cuisine Support** - 13 cuisines from Italian to Vietnamese
- **⚡ Smart Ingredient Matching** - Works with partial lists and suggests missing ingredients
- **📱 Mobile-First Design** - Fully responsive with dedicated mobile navigation
- **🌙 Dark Mode** - System-aware theme switching

### User Experience
- **💾 Local Storage** - Save recipes, history, and preferences (privacy-first, no server storage)
- **🔖 Bookmark System** - Save your favorite recipes for quick access
- **📜 Recipe History** - Track the last 20 recipes you've generated or viewed
- **🔍 Search & Filter** - Find recipes by name, cuisine, meal type, or difficulty
- **🎲 Surprise Me** - Random recipe generation for when you're feeling adventurous
- **🖨️ Print-Friendly** - Clean print layouts optimized for A4 paper
- **🔗 Easy Sharing** - Share recipes via Twitter, Facebook, WhatsApp, or copy link

### Advanced Features
- **📊 Serving Size Adjuster** - Scale recipes from 0.5x to 3x servings
- **📈 Nutritional Information** - Estimated calories, protein, carbs, and fat per serving
- **⏱️ Cooking Time Filters** - Filter by prep time (15min, 30min, 60min+)
- **🍽️ Occasion-Based Browsing** - Quick weeknight dinners, meal prep, party appetizers
- **♿ Full Accessibility** - WCAG AA compliant with keyboard navigation and screen reader support
- **🚀 Performance Optimized** - Server-side rendering, code splitting, and optimized bundles

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/D-Raj-Grg/AI-Recipe-Generator.git
   cd AI-Recipe-Generator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Framework & Language
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### State & Data
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **localStorage** - Client-side recipe persistence
- **[OpenAI API](https://platform.openai.com/)** - GPT-4o for recipe generation

### Developer Experience
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **pnpm** - Fast, disk space efficient package manager

### Analytics & Performance
- **[Vercel Analytics](https://vercel.com/analytics)** - Privacy-friendly analytics
- **[Speed Insights](https://vercel.com/docs/speed-insights)** - Real user monitoring

---

## 📁 Project Structure

```
AI-Recipe-Generator/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── api/                  # API routes
│   │   │   └── recipe/
│   │   │       └── generate/     # Recipe generation endpoint
│   │   ├── contact/              # Contact page
│   │   ├── explore/              # Recipe exploration page
│   │   ├── faq/                  # FAQ page
│   │   ├── generate/             # Main recipe generator
│   │   ├── history/              # Recipe history page
│   │   ├── preferences/          # User preferences page
│   │   ├── privacy/              # Privacy policy
│   │   ├── recipe/[id]/          # Recipe detail pages
│   │   ├── saved/                # Bookmarked recipes
│   │   ├── terms/                # Terms of service
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   ├── globals.css           # Global styles
│   │   ├── not-found.tsx         # 404 page
│   │   ├── error.tsx             # Error boundary
│   │   ├── sitemap.ts            # Sitemap generation
│   │   └── robots.ts             # Robots.txt
│   ├── components/               # React components
│   │   ├── filters/              # Filter components
│   │   ├── navigation/           # Navigation components
│   │   ├── recipe/               # Recipe-related components
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/                      # Utility libraries
│   │   ├── analytics.ts          # Event tracking utilities
│   │   ├── openai.ts             # OpenAI client
│   │   ├── prompts.ts            # Recipe generation prompts
│   │   ├── types/                # TypeScript types
│   │   └── utils.ts              # Helper functions
│   └── store/                    # State management
│       └── useRecipeStore.ts     # Zustand store
├── public/                       # Static assets
│   ├── icon.svg                  # Favicon
│   └── manifest.json             # PWA manifest
├── .env.local.example            # Environment variables template
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── CLAUDE.md                     # Development guide
├── PRD.md                        # Product requirements
├── PLANNING.md                   # Product planning
└── TASKS.md                      # Task tracker
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Orange/Amber gradient (`hsl(32 95% 44%)`) - Appetizing warmth
- **Secondary:** Emerald (`hsl(160 84% 39%)`) - Fresh, healthy
- **Accent:** Rose (`hsl(346 77% 50%)`) - Spicy, exciting
- **Background (Light):** Warm cream (`hsl(33 100% 97%)`)
- **Background (Dark):** Deep slate (`hsl(222 47% 11%)`)

All colors use CSS variables with separate light/dark mode values. Components reference colors via Tailwind classes like `bg-primary`, `text-muted-foreground`.

### Typography
- **System Fonts** - Native font stack for optimal performance
- **Font Sizes** - Minimum 16px for readability
- **Line Height** - Optimized for reading recipes

---

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Create production build
pnpm start            # Run production build locally
pnpm lint             # Run ESLint

# Testing
pnpm lint             # Check code quality

# Dependencies
pnpm install          # Install all dependencies
pnpm add <package>    # Add new dependency
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/D-Raj-Grg/AI-Recipe-Generator)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `NEXT_PUBLIC_APP_URL` - Your production URL
4. Deploy!

Vercel automatically enables:
- ✅ Analytics
- ✅ Speed Insights
- ✅ Automatic HTTPS
- ✅ CDN distribution
- ✅ Preview deployments

### Other Platforms
- **Netlify:** Use `next build` and deploy the `.next` folder
- **Docker:** Dockerfile can be added for containerized deployment
- **Self-hosted:** Run `pnpm build && pnpm start` on your server

---

## 🔒 Privacy & Security

ChefMate follows a **privacy-first** approach:

- ✅ **No server-side storage** - All recipes stored locally in your browser
- ✅ **Minimal data collection** - Only anonymous analytics via Vercel
- ✅ **OpenAI API** - Ingredient data sent temporarily for generation only
- ✅ **No tracking cookies** - GDPR compliant by design
- ✅ **Open source** - Full code transparency

See [Privacy Policy](/privacy) for details.

---

## 💰 Cost Estimates

### OpenAI API Costs
- **GPT-4o:** ~$0.005 per recipe generation (recommended)
- **GPT-4o-mini:** ~$0.0001 per recipe generation (budget-friendly)

With 15 recipes/hour rate limiting:
- **GPT-4o:** ~$0.075/hour max (~$54/month at full capacity)
- **GPT-4o-mini:** ~$0.0015/hour max (~$1/month at full capacity)

### Hosting (Vercel)
- **Hobby Plan:** FREE (includes 100GB bandwidth, Analytics)
- **Pro Plan:** $20/month (for production apps with custom domains)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Quick start for contributors:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `pnpm lint` and `pnpm build` to verify
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[OpenAI](https://openai.com/)** - For the amazing GPT-4o model
- **[Vercel](https://vercel.com/)** - For hosting and deployment platform
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful component library
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework

---

## 📧 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/D-Raj-Grg/AI-Recipe-Generator/issues)
- **Discussions:** [GitHub Discussions](https://github.com/D-Raj-Grg/AI-Recipe-Generator/discussions)
- **Email:** support@chefmate.app
- **Website:** [https://ai-recipe-generator-raj.vercel.app/](https://ai-recipe-generator-raj.vercel.app/)

---

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Recipe generation
- [x] Ingredient input
- [x] Dietary restrictions
- [x] Recipe detail pages

### Phase 2: Personalization ✅
- [x] Bookmark system
- [x] Recipe history
- [x] Preferences management
- [x] Serving size adjustment

### Phase 3: Discovery ✅
- [x] Explore page
- [x] Search functionality
- [x] Print/share features
- [x] Mobile navigation

### Phase 4: Polish 🔄 (Current)
- [x] Legal pages (Terms, Privacy, FAQ, Contact)
- [x] Footer with links
- [x] Analytics integration
- [ ] Performance optimization
- [ ] Cross-browser testing

### Future Enhancements 🚀
- [ ] User accounts (optional cloud sync)
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Recipe ratings and reviews
- [ ] Social features (share recipes with community)
- [ ] Mobile app (React Native)
- [ ] Recipe image generation (DALL-E)
- [ ] Voice input for ingredients
- [ ] Multi-language support

---

<div align="center">

**Made with ❤️ by the ChefMate Team**

⭐ Star us on GitHub if you like ChefMate!

[Website](https://ai-recipe-generator-raj.vercel.app/) • [Report Bug](https://github.com/D-Raj-Grg/AI-Recipe-Generator/issues) • [Request Feature](https://github.com/D-Raj-Grg/AI-Recipe-Generator/issues)

</div>
