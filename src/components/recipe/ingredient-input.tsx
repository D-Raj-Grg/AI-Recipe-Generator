"use client"

import { useState, KeyboardEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, AlertCircle } from "lucide-react"
import { useRecipeStore } from "@/store/useRecipeStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function IngredientInput() {
  const [input, setInput] = useState("")
  const [excludeInput, setExcludeInput] = useState("")
  const [inputError, setInputError] = useState("")

  const {
    ingredients,
    excludeIngredients,
    addIngredient,
    removeIngredient,
    addExclude,
    removeExclude
  } = useRecipeStore()

  const handleAddIngredient = () => {
    const trimmed = input.trim()

    if (!trimmed) {
      setInputError("Please enter an ingredient")
      return
    }

    if (ingredients.length >= 20) {
      setInputError("Maximum 20 ingredients allowed")
      return
    }

    if (ingredients.includes(trimmed.toLowerCase())) {
      setInputError("Ingredient already added")
      return
    }

    addIngredient(trimmed)
    setInput("")
    setInputError("")
  }

  const handleAddExclude = () => {
    const trimmed = excludeInput.trim()

    if (!trimmed) return

    if (!excludeIngredients.includes(trimmed.toLowerCase())) {
      addExclude(trimmed)
    }

    setExcludeInput("")
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddIngredient()
    }
  }

  const handleExcludeKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddExclude()
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Ingredients Section */}
      <div>
        <Label htmlFor="ingredients" className="text-base font-semibold mb-2 block">
          What ingredients do you have?
        </Label>
        <p className="text-sm text-muted-foreground mb-4">
          Add ingredients you want to use in your recipe (max 20)
        </p>

        <div className="flex gap-2">
          <Input
            id="ingredients"
            placeholder="e.g., chicken, tomatoes, basil"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setInputError("")
            }}
            onKeyPress={handleKeyPress}
            className={inputError ? "border-destructive" : ""}
            aria-invalid={inputError ? "true" : "false"}
            aria-describedby={inputError ? "ingredient-error" : undefined}
          />
          <Button
            onClick={handleAddIngredient}
            disabled={!input.trim() || ingredients.length >= 20}
            size="icon"
            className="shrink-0"
            aria-label="Add ingredient"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {inputError && (
          <p
            id="ingredient-error"
            className="text-sm text-destructive mt-2 flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {inputError}
          </p>
        )}

        {/* Ingredient Tags */}
        <div className="mt-4 flex flex-wrap gap-2 min-h-[2rem]">
          <AnimatePresence mode="popLayout">
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-normal gap-1.5 hover:bg-secondary/80 cursor-pointer"
                  onClick={() => removeIngredient(ingredient)}
                  role="button"
                  aria-label={`Remove ${ingredient}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      removeIngredient(ingredient)
                    }
                  }}
                >
                  {ingredient}
                  <X className="h-3 w-3" aria-hidden="true" />
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {ingredients.length === 0 && (
          <p className="text-sm text-muted-foreground/60 mt-2">
            No ingredients added yet. Start typing to add ingredients!
          </p>
        )}

        {ingredients.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {ingredients.length}/20 ingredients added
          </p>
        )}
      </div>

      <Separator />

      {/* Exclude Ingredients Section */}
      <div>
        <Label htmlFor="exclude" className="text-base font-semibold mb-2 block">
          Ingredients to avoid (optional)
        </Label>
        <p className="text-sm text-muted-foreground mb-4">
          Specify any ingredients you want to exclude from recipes
        </p>

        <div className="flex gap-2">
          <Input
            id="exclude"
            placeholder="e.g., nuts, shellfish"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyPress={handleExcludeKeyPress}
          />
          <Button
            onClick={handleAddExclude}
            disabled={!excludeInput.trim()}
            size="icon"
            variant="outline"
            className="shrink-0"
            aria-label="Add ingredient to exclude"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Exclude Tags */}
        <div className="mt-4 flex flex-wrap gap-2 min-h-[2rem]">
          <AnimatePresence mode="popLayout">
            {excludeIngredients.map((ingredient) => (
              <motion.div
                key={ingredient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="destructive"
                  className="px-3 py-1.5 text-sm font-normal gap-1.5 hover:opacity-80 cursor-pointer"
                  onClick={() => removeExclude(ingredient)}
                  role="button"
                  aria-label={`Remove ${ingredient} from exclusions`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      removeExclude(ingredient)
                    }
                  }}
                >
                  {ingredient}
                  <X className="h-3 w-3" aria-hidden="true" />
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {excludeIngredients.length === 0 && (
          <p className="text-sm text-muted-foreground/60 mt-2">
            No exclusions set. Your recipes can include any ingredients!
          </p>
        )}
      </div>
    </div>
  )
}
