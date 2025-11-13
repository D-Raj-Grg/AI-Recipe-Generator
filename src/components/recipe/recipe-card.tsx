"use client"

import { motion } from "framer-motion"
import { Clock, ChefHat, Users, Bookmark, BookmarkCheck } from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/types/recipe"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { bookmarkedRecipes, bookmarkRecipe, unbookmarkRecipe } = useRecipeStore()
  const isBookmarked = bookmarkedRecipes.some((r) => r.id === recipe.id)

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      unbookmarkRecipe(recipe.id)
    } else {
      bookmarkRecipe(recipe)
    }
  }

  const difficultyColor = {
    beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
  }[recipe.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Recipe Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {getRecipeEmoji(recipe.cuisine, recipe.mealType)}
          </div>

          {/* Bookmark Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleBookmarkToggle}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-xl line-clamp-2">{recipe.name}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className={difficultyColor}>
              {recipe.difficulty}
            </Badge>
            <Badge variant="outline">{recipe.cuisine}</Badge>
            {recipe.mealType.slice(0, 2).map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{recipe.totalTime}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{recipe.servings}</span>
            </div>
          </div>

          {/* Nutrition Highlight */}
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-2">Nutrition (per serving)</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-sm font-semibold">{recipe.nutrition.calories}</p>
                <p className="text-xs text-muted-foreground">cal</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{recipe.nutrition.protein}g</p>
                <p className="text-xs text-muted-foreground">protein</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{recipe.nutrition.carbs}g</p>
                <p className="text-xs text-muted-foreground">carbs</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{recipe.nutrition.fat}g</p>
                <p className="text-xs text-muted-foreground">fat</p>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <Button className="w-full" variant="default" asChild>
            <a href={`/recipe/${recipe.id}`}>
              View Full Recipe
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
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
