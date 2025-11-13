import Link from "next/link"
import { ChefHat, Github, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ChefHat className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold">ChefMate</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered recipe generator that turns your ingredients into delicious meals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/generate" className="text-muted-foreground hover:text-foreground transition-colors">
                  Generate Recipes
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-muted-foreground hover:text-foreground transition-colors">
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link href="/preferences" className="text-muted-foreground hover:text-foreground transition-colors">
                  Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/D-Raj-Grg/AI-Recipe-Generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://ai-recipe-generator-raj.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Live Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ChefMate. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/D-Raj-Grg/AI-Recipe-Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/chefmate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
