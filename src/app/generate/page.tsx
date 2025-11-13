"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChefHat, Sparkles, AlertCircle, Shuffle } from "lucide-react"
import confetti from "canvas-confetti"
import { useRecipeStore } from "@/store/useRecipeStore"
import { IngredientInput } from "@/components/recipe/ingredient-input"
import { RecipeFilters } from "@/components/filters/recipe-filters"
import { RecipeGrid } from "@/components/recipe/recipe-grid"
import { LoadingState } from "@/components/recipe/loading-state"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Common ingredients for random selection
const COMMON_INGREDIENTS = [
  "chicken", "beef", "pork", "salmon", "shrimp", "eggs", "tofu",
  "rice", "pasta", "potatoes", "bread", "tortillas",
  "tomatoes", "onions", "garlic", "bell peppers", "carrots", "broccoli", "spinach", "mushrooms",
  "cheese", "milk", "butter", "olive oil", "soy sauce",
  "salt", "pepper", "basil", "oregano", "cumin", "paprika"
]

const CUISINES = [
  "Italian", "Mexican", "Chinese", "Japanese", "Indian", "Thai",
  "American", "Mediterranean", "Korean", "French"
]

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    ingredients,
    filters,
    dietaryRestrictions,
    excludeIngredients,
    currentRecipes,
    setRecipes,
    setIngredients,
    updateFilters
  } = useRecipeStore()

  const handleSurpriseMe = () => {
    // Select 3-5 random ingredients
    const numIngredients = Math.floor(Math.random() * 3) + 3 // 3-5 ingredients
    const shuffled = [...COMMON_INGREDIENTS].sort(() => 0.5 - Math.random())
    const selectedIngredients = shuffled.slice(0, numIngredients)

    // Select random cuisine
    const randomCuisine = CUISINES[Math.floor(Math.random() * CUISINES.length)]

    // Update store with random selections
    setIngredients(selectedIngredients)

    updateFilters({
      ...filters,
      cuisine: randomCuisine
    })

    // Automatically generate after a brief delay
    setTimeout(() => {
      handleGenerate()
    }, 500)
  }

  const handleGenerate = async () => {
    // Validation
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient")
      return
    }

    setError(null)
    setIsGenerating(true)
    setRecipes([])

    try {
      const response = await fetch("/api/recipe/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients,
          filters,
          restrictions: dietaryRestrictions,
          excludeIngredients,
          count: 3 // Generate 3 recipes by default
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate recipes")
      }

      const data = await response.json()
      setRecipes(data.recipes)

      // Celebrate with confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      console.error("Recipe generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20 md:pb-0">
      <MainNav />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Generate Your Perfect Recipe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your ingredients, set your preferences, and let AI create delicious recipes just for you.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Input Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Main Input - Ingredients */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <IngredientInput />
              </Card>

              {/* Generate Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || ingredients.length === 0}
                  className="w-full h-14 text-lg"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                      Generating Recipes...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Recipes
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Surprise Me Button */}
                <Button
                  onClick={handleSurpriseMe}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full h-12 text-base border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
                  size="lg"
                >
                  <Shuffle className="h-5 w-5 mr-2" />
                  Surprise Me!
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Let AI pick random ingredients and create a recipe for you
                </p>
              </div>
            </div>

            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <RecipeFilters />
              </Card>
            </div>
          </div>

          {/* Results Section */}
          {isGenerating ? (
            <LoadingState />
          ) : currentRecipes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Your Recipes</h2>
                <p className="text-muted-foreground">
                  We found {currentRecipes.length} delicious recipe{currentRecipes.length !== 1 ? 's' : ''} for you!
                </p>
              </div>
              <RecipeGrid recipes={currentRecipes} />
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ChefHat className="h-20 w-20 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                  Ready to Cook?
                </h3>
                <p className="text-muted-foreground">
                  Add your ingredients and click &quot;Generate Recipes&quot; to get started!
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
