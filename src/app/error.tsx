"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />
      <div className="flex items-center justify-center px-4 py-20">
        <Card className="max-w-2xl w-full border-destructive/50">
          <CardContent className="pt-12 pb-12 text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-3xl font-bold mb-2">Something Went Wrong</h1>
            <p className="text-muted-foreground mb-8">
              We encountered an error while processing your request. This has been logged and we&apos;ll look into it.
            </p>
            {error.message && (
              <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {error.message}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={reset}>
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
