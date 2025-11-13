"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChefHat,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  Share2,
  ArrowLeft,
  Plus,
  Minus,
  Lightbulb,
  AlertCircle
} from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { MainNav } from "@/components/navigation/main-nav"
import { RecipeSchema } from "@/components/recipe/recipe-schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Recipe } from "@/lib/types/recipe"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const recipeId = params.id as string

  const { currentRecipes, bookmarkedRecipes, recipeHistory, bookmarkRecipe, unbookmarkRecipe } = useRecipeStore()

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [servingMultiplier, setServingMultiplier] = useState(1)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Find recipe from current recipes, bookmarks, or history
  useEffect(() => {
    const allRecipes = [...currentRecipes, ...bookmarkedRecipes, ...recipeHistory]
    const found = allRecipes.find((r) => r.id === recipeId)
    setRecipe(found || null)
  }, [recipeId, currentRecipes, bookmarkedRecipes, recipeHistory])

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <MainNav />
        <div className="flex items-center justify-center p-4 mt-20">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Recipe Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The recipe you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/generate">Generate New Recipes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isBookmarked = bookmarkedRecipes.some((r) => r.id === recipe.id)

  const handleBookmark = () => {
    if (isBookmarked) {
      unbookmarkRecipe(recipe.id)
    } else {
      bookmarkRecipe(recipe)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: `Check out this ${recipe.cuisine} recipe: ${recipe.description}`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
    }
  }

  const adjustedServings = Math.round(recipe.servings * servingMultiplier)

  const difficultyColor = {
    beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
  }[recipe.difficulty]

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <RecipeSchema recipe={recipe} />
      <MainNav />

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        {shareSuccess && (
          <Alert className="mb-6 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
            <AlertDescription className="text-emerald-700 dark:text-emerald-400">
              Link copied to clipboard!
            </AlertDescription>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Recipe Header */}
          <div className="mb-8">
            {/* Hero Image Placeholder */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
              <div className="text-9xl">
                {getRecipeEmoji(recipe.cuisine, recipe.mealType)}
              </div>
            </div>

            {/* Title and Meta */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{recipe.name}</h1>
              <p className="text-lg text-muted-foreground">{recipe.description}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={difficultyColor}>
                  {recipe.difficulty}
                </Badge>
                <Badge variant="outline">{recipe.cuisine}</Badge>
                {recipe.mealType.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{recipe.totalTime}</div>
                    <div className="text-sm text-muted-foreground">minutes</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{adjustedServings}</div>
                    <div className="text-sm text-muted-foreground">servings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <ChefHat className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold capitalize">{recipe.difficulty}</div>
                    <div className="text-sm text-muted-foreground">level</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Ingredients & Nutrition */}
            <div className="lg:col-span-1 space-y-6">
              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Ingredients</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
                        disabled={servingMultiplier <= 0.5}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {servingMultiplier}x
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setServingMultiplier(Math.min(3, servingMultiplier + 0.5))}
                        disabled={servingMultiplier >= 3}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                        <div className="flex-1">
                          <span className="font-medium">
                            {ingredient.amount && parseFloat(ingredient.amount)
                              ? (parseFloat(ingredient.amount) * servingMultiplier).toFixed(1).replace(/\.0$/, '')
                              : ingredient.amount
                            } {ingredient.unit}
                          </span>{" "}
                          <span>{ingredient.item}</span>
                          {ingredient.isOptional && (
                            <span className="text-xs text-muted-foreground ml-1">(optional)</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Nutrition */}
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition (per serving)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calories</span>
                      <span className="font-semibold">{recipe.nutrition.calories}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="font-semibold">{recipe.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbs</span>
                      <span className="font-semibold">{recipe.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat</span>
                      <span className="font-semibold">{recipe.nutrition.fat}g</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiber</span>
                      <span className="font-semibold">{recipe.nutrition.fiber}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sugar</span>
                      <span className="font-semibold">{recipe.nutrition.sugar}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sodium</span>
                      <span className="font-semibold">{recipe.nutrition.sodium}mg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Instructions, Tips, Substitutions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold">
                            {instruction.step}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <p className="text-base leading-relaxed">{instruction.instruction}</p>
                          {instruction.timing && (
                            <p className="text-sm text-muted-foreground">
                              ⏱️ {instruction.timing}
                            </p>
                          )}
                          {instruction.temperature && (
                            <p className="text-sm text-muted-foreground">
                              🌡️ {instruction.temperature}
                            </p>
                          )}
                          {instruction.tip && (
                            <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                              <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              <AlertDescription className="text-amber-700 dark:text-amber-300 ml-2">
                                <strong>Tip:</strong> {instruction.tip}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              {recipe.tips && recipe.tips.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Chef&apos;s Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Substitutions */}
              {recipe.substitutions && recipe.substitutions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ingredient Substitutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recipe.substitutions.map((sub, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{sub.original}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium text-primary">{sub.replacement}</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-4">{sub.reason}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Helper function to get emoji based on cuisine/meal type
function getRecipeEmoji(cuisine: string, mealType: string[]): string {
  // Check meal type first
  if (mealType.includes("Breakfast")) return "🍳"
  if (mealType.includes("Dessert")) return "🍰"
  if (mealType.includes("Snack")) return "🥨"

  // Check cuisine
  const cuisineEmojis: Record<string, string> = {
    Italian: "🍝",
    Chinese: "🥡",
    Mexican: "🌮",
    Indian: "🍛",
    Japanese: "🍱",
    Thai: "🍜",
    French: "🥖",
    Greek: "🥙",
    Mediterranean: "🫒",
    American: "🍔",
    Korean: "🍲",
    Vietnamese: "🥢"
  }

  return cuisineEmojis[cuisine] || "🍽️"
}
