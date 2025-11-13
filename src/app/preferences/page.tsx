"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChefHat,
  ArrowLeft,
  Trash2,
  BookmarkCheck,
  History,
  ShieldAlert,
  RotateCcw,
  Check
} from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { MainNav } from "@/components/navigation/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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

export default function PreferencesPage() {
  const {
    bookmarkedRecipes,
    recipeHistory,
    dietaryRestrictions,
    preferences,
    clearHistory,
    clearBookmarks,
    removeRestriction,
    updatePreferences
  } = useRecipeStore()

  const [showSuccess, setShowSuccess] = useState(false)

  const handleClearHistory = () => {
    clearHistory()
    showSuccessMessage()
  }

  const handleClearBookmarks = () => {
    clearBookmarks()
    showSuccessMessage()
  }

  const handleResetAll = () => {
    clearHistory()
    clearBookmarks()
    // Clear all dietary restrictions
    dietaryRestrictions.forEach(restriction => {
      removeRestriction(restriction)
    })
    // Reset preferences to defaults
    updatePreferences({
      skillLevel: 'beginner',
      servingPreference: 4,
      theme: 'system'
    })
    showSuccessMessage()
  }

  const showSuccessMessage = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="mb-6 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <AlertDescription className="text-emerald-700 dark:text-emerald-400 ml-2">
                Changes saved successfully!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Bookmarked Recipes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Saved Recipes</CardTitle>
                    <CardDescription>
                      You have {bookmarkedRecipes.length} bookmarked recipe{bookmarkedRecipes.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
                {bookmarkedRecipes.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear all bookmarks?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove all {bookmarkedRecipes.length} bookmarked recipes. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearBookmarks}>
                          Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {bookmarkedRecipes.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No bookmarked recipes yet. Start generating and save your favorites!
                </p>
              ) : (
                <div className="space-y-2">
                  {bookmarkedRecipes.slice(0, 5).map((recipe) => (
                    <Link
                      key={recipe.id}
                      href={`/recipe/${recipe.id}`}
                      className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{recipe.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {recipe.cuisine} • {recipe.totalTime}min
                          </p>
                        </div>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>
                    </Link>
                  ))}
                  {bookmarkedRecipes.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center pt-2">
                      And {bookmarkedRecipes.length - 5} more...
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recipe History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Recipe History</CardTitle>
                    <CardDescription>
                      Recent recipes you&apos;ve viewed or generated
                    </CardDescription>
                  </div>
                </div>
                {recipeHistory.length > 0 && (
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
                        <AlertDialogAction onClick={handleClearHistory}>
                          Clear History
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {recipeHistory.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No recipe history yet. Generated recipes will appear here.
                </p>
              ) : (
                <div className="space-y-2">
                  {recipeHistory.slice(0, 5).map((recipe) => (
                    <Link
                      key={recipe.id}
                      href={`/recipe/${recipe.id}`}
                      className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{recipe.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {recipe.cuisine} • {recipe.totalTime}min
                          </p>
                        </div>
                        <Badge variant="secondary">{recipe.difficulty}</Badge>
                      </div>
                    </Link>
                  ))}
                  {recipeHistory.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center pt-2">
                      And {recipeHistory.length - 5} more...
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dietary Restrictions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Dietary Restrictions</CardTitle>
                  <CardDescription>
                    Active dietary preferences for recipe generation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {dietaryRestrictions.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No dietary restrictions set. Add them in the recipe generation filters.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {dietaryRestrictions.map((restriction) => (
                    <Badge
                      key={restriction}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => {
                        removeRestriction(restriction)
                        showSuccessMessage()
                      }}
                    >
                      {restriction}
                      <span className="ml-1.5">×</span>
                    </Badge>
                  ))}
                </div>
              )}
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                Manage dietary restrictions in the recipe generation page filters.
              </p>
            </CardContent>
          </Card>

          {/* User Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Default settings for recipe generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Skill Level</p>
                  <Badge variant="outline" className="capitalize">
                    {preferences.skillLevel || 'beginner'}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Default Servings</p>
                  <Badge variant="outline">
                    {preferences.servingPreference || 4} servings
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Storage</p>
                  <p className="text-sm text-muted-foreground">
                    All data is stored locally in your browser
                  </p>
                </div>
                <Badge variant="secondary">Local Storage</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that will clear all your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset All Preferences
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all preferences?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear all bookmarks, history, dietary restrictions, and preferences.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleResetAll}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
