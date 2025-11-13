import Link from "next/link"
import { ChefHat, Home, Search } from "lucide-react"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />
      <div className="flex items-center justify-center px-4 py-20">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-8xl mb-6">🔍</div>
            <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! Looks like this recipe doesn&apos;t exist in our cookbook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/generate">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Generate Recipes
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Recipes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
