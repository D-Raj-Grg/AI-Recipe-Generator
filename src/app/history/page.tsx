"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChefHat,
  ArrowLeft,
  Search,
  Trash2,
  History as HistoryIcon,
  RotateCcw
} from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { RecipeCard } from "@/components/recipe/recipe-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HistoryPage() {
  const { recipeHistory, clearHistory } = useRecipeStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [cuisineFilter, setCuisineFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let filtered = [...recipeHistory]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.cuisine.toLowerCase().includes(query)
      )
    }

    // Cuisine filter
    if (cuisineFilter && cuisineFilter !== "all") {
      filtered = filtered.filter((recipe) => recipe.cuisine === cuisineFilter)
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "time") {
      filtered.sort((a, b) => a.totalTime - b.totalTime)
    }

    return filtered
  }, [recipeHistory, searchQuery, cuisineFilter, sortBy])

  // Get unique cuisines from history
  const availableCuisines = useMemo(() => {
    const cuisines = new Set(recipeHistory.map((r) => r.cuisine))
    return Array.from(cuisines).sort()
  }, [recipeHistory])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HistoryIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Recipe History</h1>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/generate">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Generate
              </Link>
            </Button>
          </div>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Recently Viewed Recipes
            </h2>
            <p className="text-muted-foreground">
              {recipeHistory.length} recipe{recipeHistory.length !== 1 ? 's' : ''} in your history (last 20)
            </p>
          </div>

          {recipeHistory.length === 0 ? (
            // Empty State
            <Card className="max-w-2xl mx-auto mt-16">
              <CardContent className="pt-12 pb-12 text-center">
                <HistoryIcon className="h-20 w-20 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-2xl font-semibold mb-2">No History Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Your generated and viewed recipes will appear here for easy access.
                </p>
                <Button size="lg" asChild>
                  <Link href="/generate">
                    <ChefHat className="h-5 w-5 mr-2" />
                    Generate Recipes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filters and Search */}
              <div className="mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search history..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Cuisine Filter */}
                  <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Cuisines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cuisines</SelectItem>
                      {availableCuisines.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="time">Cooking Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredRecipes.length} of {recipeHistory.length} recipes
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear History
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear recipe history?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove all {recipeHistory.length} recipes from your history. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={clearHistory}>
                          Clear History
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Recipe Grid */}
              {filteredRecipes.length === 0 ? (
                <Card className="p-12 text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setCuisineFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <RecipeCard recipe={recipe} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
