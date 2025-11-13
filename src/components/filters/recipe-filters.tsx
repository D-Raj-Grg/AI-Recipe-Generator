"use client"

import { useRecipeStore } from "@/store/useRecipeStore"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, MapPin, Utensils, ShieldAlert } from "lucide-react"

const CUISINES = [
  "Any", "Italian", "Chinese", "Mexican", "Indian", "Japanese", "Thai",
  "French", "Greek", "Mediterranean", "American", "Korean", "Vietnamese"
]

const MEAL_TYPES = [
  "Any", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Appetizer"
]

const DIETARY_RESTRICTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "Halal",
  "Kosher"
]

export function RecipeFilters() {
  const {
    filters,
    dietaryRestrictions,
    updateFilters,
    addRestriction,
    removeRestriction
  } = useRecipeStore()

  const handleDietaryToggle = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      removeRestriction(restriction)
    } else {
      addRestriction(restriction)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary" />
          Recipe Preferences
        </h3>
      </div>

      {/* Cooking Time */}
      <div className="space-y-2">
        <Label htmlFor="time" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Max Cooking Time
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="time"
            type="number"
            min="5"
            max="300"
            placeholder="Minutes"
            value={filters.timeMax || ""}
            onChange={(e) => updateFilters({ timeMax: e.target.value ? parseInt(e.target.value) : undefined })}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">min</span>
        </div>
        {filters.timeMax && (
          <p className="text-xs text-muted-foreground">
            Recipes under {filters.timeMax} minutes
          </p>
        )}
      </div>

      <Separator />

      {/* Difficulty Level */}
      <div className="space-y-2">
        <Label htmlFor="difficulty" className="flex items-center gap-2">
          <ChefHat className="h-4 w-4" />
          Difficulty Level
        </Label>
        <Select
          value={filters.difficulty || "any"}
          onValueChange={(value) => updateFilters({ difficulty: value === "any" ? undefined : value as any })}
        >
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Any difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Difficulty</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Cuisine Type */}
      <div className="space-y-2">
        <Label htmlFor="cuisine" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Cuisine Type
        </Label>
        <Select
          value={filters.cuisine || "Any"}
          onValueChange={(value) => updateFilters({ cuisine: value === "Any" ? undefined : value })}
        >
          <SelectTrigger id="cuisine">
            <SelectValue placeholder="Any cuisine" />
          </SelectTrigger>
          <SelectContent>
            {CUISINES.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Meal Type */}
      <div className="space-y-2">
        <Label htmlFor="mealType" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          Meal Type
        </Label>
        <Select
          value={filters.mealType || "Any"}
          onValueChange={(value) => updateFilters({ mealType: value === "Any" ? undefined : value })}
        >
          <SelectTrigger id="mealType">
            <SelectValue placeholder="Any meal" />
          </SelectTrigger>
          <SelectContent>
            {MEAL_TYPES.map((meal) => (
              <SelectItem key={meal} value={meal}>
                {meal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Dietary Restrictions */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          Dietary Restrictions
        </Label>
        <div className="space-y-2.5">
          {DIETARY_RESTRICTIONS.map((restriction) => (
            <div key={restriction} className="flex items-center space-x-2">
              <Checkbox
                id={restriction}
                checked={dietaryRestrictions.includes(restriction)}
                onCheckedChange={() => handleDietaryToggle(restriction)}
              />
              <label
                htmlFor={restriction}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {restriction}
              </label>
            </div>
          ))}
        </div>

        {dietaryRestrictions.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {dietaryRestrictions.map((restriction) => (
                <Badge key={restriction} variant="secondary" className="text-xs">
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
