"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  ChefHat,
  Sparkles,
  Leaf,
  Zap,
  Clock,
  Users,
  Heart,
  Apple,
  Egg,
  Fish,
  Cookie,
  Pizza,
  Salad
} from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [ingredients, setIngredients] = useState("")

  const foodIcons = [
    { Icon: Apple, delay: 0, x: -20, y: -20 },
    { Icon: Egg, delay: 0.2, x: 20, y: -30 },
    { Icon: Fish, delay: 0.4, x: -30, y: 10 },
    { Icon: Cookie, delay: 0.6, x: 30, y: 20 },
    { Icon: Pizza, delay: 0.8, x: -10, y: 30 },
    { Icon: Salad, delay: 1.0, x: 10, y: -10 },
  ]

  const features = [
    {
      icon: Sparkles,
      title: "No Shopping Needed",
      description: "Use what you already have in your kitchen"
    },
    {
      icon: Leaf,
      title: "Personalized to Your Diet",
      description: "Respects all dietary restrictions and preferences"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get creative recipes in seconds with AI"
    }
  ]

  const popularRecipes = [
    {
      name: "Garlic Butter Chicken",
      time: "30 min",
      servings: 4,
      difficulty: "Easy",
      image: "🍗"
    },
    {
      name: "Veggie Stir Fry",
      time: "20 min",
      servings: 2,
      difficulty: "Beginner",
      image: "🥗"
    },
    {
      name: "Pasta Carbonara",
      time: "25 min",
      servings: 3,
      difficulty: "Intermediate",
      image: "🍝"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Logo size="md" />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Animated Food Icons */}
            <div className="relative mb-8 h-32">
              {foodIcons.map(({ Icon, delay, x, y }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 0.6,
                    scale: 1,
                    y: [y, y - 10, y],
                  }}
                  transition={{
                    opacity: { delay, duration: 0.5 },
                    scale: { delay, duration: 0.5 },
                    y: {
                      delay: delay + 0.5,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    marginLeft: `${x * 3}px`,
                    marginTop: `${y}px`
                  }}
                >
                  <Icon className="h-12 w-12 text-primary/40" />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <ChefHat className="h-16 w-16 text-primary" />
              </motion.div>
            </div>

            {/* Hero Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Turn Your Ingredients Into{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Delicious Meals
              </span>{" "}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-8 text-lg text-muted-foreground md:text-xl"
            >
              Your AI Kitchen Companion - Generate personalized recipes from whatever you have in your kitchen
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mx-auto mb-12 max-w-2xl"
            >
              <div className="flex flex-col gap-3 rounded-2xl border-2 border-primary/20 bg-card p-4 shadow-xl sm:flex-row">
                <Input
                  type="text"
                  placeholder="What ingredients do you have? (e.g., chicken, rice, tomatoes)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0"
                />
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg"
                  asChild
                >
                  <a href="/generate">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Recipes
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 rounded-full bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Popular Recipes
              </h2>
              <p className="text-muted-foreground">
                Get inspired by these delicious AI-generated recipes
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularRecipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-xl">
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 text-8xl">
                      {recipe.image}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{recipe.name}</CardTitle>
                      <CardDescription className="flex flex-wrap gap-3 pt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {recipe.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {recipe.servings}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {recipe.difficulty}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        View Recipe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 hover:border-primary"
                asChild
              >
                <a href="/generate">
                  Explore More Recipes
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground">
                Your AI Kitchen Companion - Making cooking easier, one recipe at a time
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
