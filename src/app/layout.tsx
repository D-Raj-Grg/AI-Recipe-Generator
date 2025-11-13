import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Footer } from "@/components/navigation/footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    default: "ChefMate - AI Recipe Generator | Turn Ingredients Into Delicious Meals",
    template: "%s | ChefMate"
  },
  description: "Generate personalized recipes from your ingredients in seconds using AI. ChefMate respects dietary restrictions, reduces food waste, and makes cooking accessible to everyone. Your AI Kitchen Companion.",
  keywords: [
    "AI recipe generator",
    "recipe maker",
    "cooking assistant",
    "ingredient-based recipes",
    "meal planning",
    "dietary restrictions",
    "food waste reduction",
    "personalized recipes",
    "AI cooking",
    "recipe ideas",
    "what to cook",
    "kitchen assistant"
  ],
  authors: [{ name: "ChefMate" }],
  creator: "ChefMate",
  publisher: "ChefMate",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ChefMate - AI Recipe Generator",
    description: "Turn your ingredients into delicious meals with AI. Generate personalized recipes in seconds.",
    siteName: "ChefMate",
  },

  // Twitter
  twitter: {
    card: "summary",
    title: "ChefMate - AI Recipe Generator",
    description: "Turn your ingredients into delicious meals with AI. Generate personalized recipes in seconds.",
    creator: "@chefmate"
  },

  // Icons
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
  },

  // Manifest
  manifest: "/manifest.json",

  // App
  applicationName: "ChefMate",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChefMate"
  },

  // Other
  category: "food",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
