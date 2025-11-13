"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChefHat,
  Search,
  Compass,
  Clock,
  Users
} from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { RecipeCard } from "@/components/recipe/recipe-card"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CUISINES = [
  { name: "Italian", emoji: "🍝", description: "Pasta, pizza, and Mediterranean flavors" },
  { name: "Chinese", emoji: "🥡", description: "Stir-fries, dumplings, and bold flavors" },
  { name: "Mexican", emoji: "🌮", description: "Tacos, enchiladas, and spicy dishes" },
  { name: "Indian", emoji: "🍛", description: "Curries, naan, and aromatic spices" },
  { name: "Japanese", emoji: "🍱", description: "Sushi, ramen, and delicate flavors" },
  { name: "Thai", emoji: "🍜", description: "Pad Thai, curries, and tropical tastes" },
  { name: "French", emoji: "🥖", description: "Elegant dishes and refined techniques" },
  { name: "Greek", emoji: "🥙", description: "Mediterranean classics with olive oil" },
  { name: "Mediterranean", emoji: "🫒", description: "Healthy, fresh, and vibrant dishes" },
  { name: "American", emoji: "🍔", description: "Comfort food and classic favorites" },
  { name: "Korean", emoji: "🍲", description: "BBQ, kimchi, and fermented flavors" },
  { name: "Vietnamese", emoji: "🥢", description: "Pho, fresh herbs, and light dishes" },
  { name: "Middle Eastern", emoji: "🥙", description: "Hummus, falafel, and rich spices" }
]

const MEAL_TYPES = [
  { name: "Breakfast", emoji: "🍳", description: "Start your day right" },
  { name: "Lunch", emoji: "🥗", description: "Midday meals and light bites" },
  { name: "Dinner", emoji: "🍽️", description: "Evening meals and hearty dishes" },
  { name: "Snack", emoji: "🥨", description: "Quick bites and appetizers" },
  { name: "Dessert", emoji: "🍰", description: "Sweet treats and confections" },
  { name: "Appetizer", emoji: "🥟", description: "Starters and small plates" },
  { name: "Side Dish", emoji: "🥗", description: "Accompaniments and sides" }
]

const OCCASIONS = [
  { name: "Quick Weeknight Dinners", emoji: "⚡", description: "Fast and easy meals under 30 minutes", filter: (recipe: any) => recipe.totalTime <= 30 && recipe.mealType.includes("Dinner") },
  { name: "Weekend Cooking Projects", emoji: "🏡", description: "Complex recipes for when you have time", filter: (recipe: any) => recipe.totalTime > 60 || recipe.difficulty === "Advanced" },
  { name: "Party Appetizers", emoji: "🎉", description: "Crowd-pleasing starters and finger foods", filter: (recipe: any) => recipe.mealType.includes("Appetizer") || recipe.mealType.includes("Snack") },
  { name: "Holiday Specials", emoji: "🎊", description: "Festive dishes for celebrations", filter: (recipe: any) => recipe.totalTime > 60 || (recipe.servings >= 6 && recipe.difficulty !== "Beginner") },
  { name: "Meal Prep Friendly", emoji: "📦", description: "Make ahead and batch cooking recipes", filter: (recipe: any) => recipe.servings >= 4 && recipe.totalTime >= 30 },
  { name: "Kid-Friendly", emoji: "👨‍👩‍👧‍👦", description: "Simple and appealing for children", filter: (recipe: any) => recipe.difficulty === "Beginner" && recipe.totalTime <= 45 }
]

export default function ExplorePage() {
  const { bookmarkedRecipes, recipeHistory } = useRecipeStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("recent")
  const [activeTab, setActiveTab] = useState("cuisines")

  // Combine all available recipes from bookmarks and history
  const allRecipes = useMemo(() => {
    const recipesMap = new Map()

    // Add bookmarked recipes
    bookmarkedRecipes.forEach((recipe) => {
      recipesMap.set(recipe.id, recipe)
    })

    // Add history recipes
    recipeHistory.forEach((recipe) => {
      recipesMap.set(recipe.id, recipe)
    })

    return Array.from(recipesMap.values())
  }, [bookmarkedRecipes, recipeHistory])

  // Filter recipes based on selected cuisine or meal type
  const filteredRecipes = useMemo(() => {
    let filtered = [...allRecipes]

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
    if (selectedCuisine) {
      filtered = filtered.filter((recipe) => recipe.cuisine === selectedCuisine)
    }

    // Meal type filter
    if (selectedMealType) {
      filtered = filtered.filter((recipe) =>
        recipe.mealType.includes(selectedMealType)
      )
    }

    // Occasion filter
    if (selectedOccasion) {
      const occasion = OCCASIONS.find((o) => o.name === selectedOccasion)
      if (occasion) {
        filtered = filtered.filter((recipe) => occasion.filter(recipe))
      }
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "time") {
      filtered.sort((a, b) => a.totalTime - b.totalTime)
    }

    return filtered
  }, [allRecipes, searchQuery, selectedCuisine, selectedMealType, selectedOccasion, sortBy])

  // Get recipe count by cuisine
  const getCuisineCount = (cuisine: string) => {
    return allRecipes.filter((r) => r.cuisine === cuisine).length
  }

  // Get recipe count by meal type
  const getMealTypeCount = (mealType: string) => {
    return allRecipes.filter((r) => r.mealType.includes(mealType)).length
  }

  // Get recipe count by occasion
  const getOccasionCount = (occasionName: string) => {
    const occasion = OCCASIONS.find((o) => o.name === occasionName)
    if (!occasion) return 0
    return allRecipes.filter((r) => occasion.filter(r)).length
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCuisine(null)
    setSelectedMealType(null)
    setSelectedOccasion(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />

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
              Discover New Recipes
            </h2>
            <p className="text-muted-foreground">
              Browse by cuisine, meal type, or occasion from your saved recipes and history
            </p>
          </div>

          {allRecipes.length === 0 ? (
            // Empty State
            <Card className="max-w-2xl mx-auto mt-16">
              <CardContent className="pt-12 pb-12 text-center">
                <Compass className="h-20 w-20 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-2xl font-semibold mb-2">No Recipes to Explore Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Generate some recipes first, and they&apos;ll appear here for you to explore by cuisine and meal type.
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
              {/* Tabs: Cuisines vs Meal Types vs Occasions */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full max-w-2xl grid-cols-3">
                  <TabsTrigger value="cuisines">By Cuisine</TabsTrigger>
                  <TabsTrigger value="mealtypes">By Meal Type</TabsTrigger>
                  <TabsTrigger value="occasions">By Occasion</TabsTrigger>
                </TabsList>

                {/* Cuisines Tab */}
                <TabsContent value="cuisines" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {CUISINES.map((cuisine) => {
                      const count = getCuisineCount(cuisine.name)
                      const isSelected = selectedCuisine === cuisine.name

                      return (
                        <motion.div
                          key={cuisine.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? "ring-2 ring-primary bg-primary/5"
                                : "hover:border-primary/50"
                            } ${count === 0 ? "opacity-50" : ""}`}
                            onClick={() => {
                              if (count > 0) {
                                setSelectedCuisine(isSelected ? null : cuisine.name)
                                setSelectedMealType(null)
                              }
                            }}
                          >
                            <CardContent className="pt-6 pb-6 text-center">
                              <div className="text-4xl mb-2">{cuisine.emoji}</div>
                              <h3 className="font-semibold mb-1">{cuisine.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                {cuisine.description}
                              </p>
                              <Badge variant={count > 0 ? "secondary" : "outline"}>
                                {count} {count === 1 ? "recipe" : "recipes"}
                              </Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Meal Types Tab */}
                <TabsContent value="mealtypes" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {MEAL_TYPES.map((mealType) => {
                      const count = getMealTypeCount(mealType.name)
                      const isSelected = selectedMealType === mealType.name

                      return (
                        <motion.div
                          key={mealType.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? "ring-2 ring-primary bg-primary/5"
                                : "hover:border-primary/50"
                            } ${count === 0 ? "opacity-50" : ""}`}
                            onClick={() => {
                              if (count > 0) {
                                setSelectedMealType(isSelected ? null : mealType.name)
                                setSelectedCuisine(null)
                              }
                            }}
                          >
                            <CardContent className="pt-6 pb-6 text-center">
                              <div className="text-4xl mb-2">{mealType.emoji}</div>
                              <h3 className="font-semibold mb-1">{mealType.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                {mealType.description}
                              </p>
                              <Badge variant={count > 0 ? "secondary" : "outline"}>
                                {count} {count === 1 ? "recipe" : "recipes"}
                              </Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Occasions Tab */}
                <TabsContent value="occasions" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {OCCASIONS.map((occasion) => {
                      const count = getOccasionCount(occasion.name)
                      const isSelected = selectedOccasion === occasion.name

                      return (
                        <motion.div
                          key={occasion.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? "ring-2 ring-primary bg-primary/5"
                                : "hover:border-primary/50"
                            } ${count === 0 ? "opacity-50" : ""}`}
                            onClick={() => {
                              if (count > 0) {
                                setSelectedOccasion(isSelected ? null : occasion.name)
                                setSelectedCuisine(null)
                                setSelectedMealType(null)
                              }
                            }}
                          >
                            <CardContent className="pt-6 pb-6 text-center">
                              <div className="text-4xl mb-2">{occasion.emoji}</div>
                              <h3 className="font-semibold mb-1">{occasion.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                {occasion.description}
                              </p>
                              <Badge variant={count > 0 ? "secondary" : "outline"}>
                                {count} {count === 1 ? "recipe" : "recipes"}
                              </Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Results Section (only show when filter is active) */}
              {(selectedCuisine || selectedMealType || selectedOccasion || searchQuery) && (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {selectedCuisine && `${selectedCuisine} Recipes`}
                        {selectedMealType && `${selectedMealType} Recipes`}
                        {selectedOccasion && `${selectedOccasion}`}
                        {!selectedCuisine && !selectedMealType && !selectedOccasion && searchQuery && "Search Results"}
                      </h3>
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>

                    {/* Search and Sort */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search within results..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      {/* Sort */}
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="time">Cooking Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"}
                    </p>
                  </div>

                  {/* Recipe Grid */}
                  {filteredRecipes.length === 0 ? (
                    <Card className="p-12 text-center">
                      <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or explore a different category
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
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

              {/* Stats Overview (show when no filters active) */}
              {!selectedCuisine && !selectedMealType && !searchQuery && (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Your Recipe Collection</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-3xl font-bold">{allRecipes.length}</div>
                        <div className="text-sm text-muted-foreground">Total Recipes</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-3xl font-bold">
                          {Math.round(allRecipes.reduce((sum, r) => sum + r.totalTime, 0) / allRecipes.length)}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg. Cook Time (min)</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-3xl font-bold">
                          {Math.round(allRecipes.reduce((sum, r) => sum + r.servings, 0) / allRecipes.length)}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg. Servings</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
