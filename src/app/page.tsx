import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          AI Recipe Generator
        </h1>
        <p className="text-center text-muted-foreground">
          Welcome to your AI-powered recipe generator
        </p>
      </div>
    </main>
  )
}
