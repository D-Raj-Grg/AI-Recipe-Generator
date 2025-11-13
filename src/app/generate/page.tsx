"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChefHat, Sparkles, AlertCircle } from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { IngredientInput } from "@/components/recipe/ingredient-input"
import { RecipeFilters } from "@/components/filters/recipe-filters"
import { RecipeGrid } from "@/components/recipe/recipe-grid"
import { LoadingState } from "@/components/recipe/loading-state"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    ingredients,
    filters,
    dietaryRestrictions,
    excludeIngredients,
    currentRecipes,
    setRecipes
  } = useRecipeStore()

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
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      console.error("Recipe generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">ChefMate</h1>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

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

              {/* Generate Button */}
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
