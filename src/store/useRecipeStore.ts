import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Recipe,
  RecipeFilters,
  UserPreferences
} from '@/lib/types/recipe'

interface RecipeStore {
  // Current search state
  ingredients: string[]
  filters: RecipeFilters
  dietaryRestrictions: string[]
  excludeIngredients: string[]

  // Generated recipes
  currentRecipes: Recipe[]
  selectedRecipe: Recipe | null
  isGenerating: boolean
  generationError: string | null

  // User data (persisted to localStorage)
  bookmarkedRecipes: Recipe[]
  recipeHistory: Recipe[]
  preferences: UserPreferences

  // Ingredient actions
  addIngredient: (ingredient: string) => void
  removeIngredient: (ingredient: string) => void
  clearIngredients: () => void
  setIngredients: (ingredients: string[]) => void

  // Filter actions
  updateFilters: (filters: Partial<RecipeFilters>) => void
  clearFilters: () => void

  // Dietary restriction actions
  addRestriction: (restriction: string) => void
  removeRestriction: (restriction: string) => void
  setRestrictions: (restrictions: string[]) => void

  // Exclude ingredient actions
  addExclude: (ingredient: string) => void
  removeExclude: (ingredient: string) => void

  // Recipe actions
  setRecipes: (recipes: Recipe[]) => void
  setSelectedRecipe: (recipe: Recipe | null) => void
  setGenerating: (isGenerating: boolean) => void
  setGenerationError: (error: string | null) => void

  // Bookmark actions
  bookmarkRecipe: (recipe: Recipe) => void
  unbookmarkRecipe: (recipeId: string) => void
  isRecipeBookmarked: (recipeId: string) => boolean

  // History actions
  addToHistory: (recipe: Recipe) => void
  clearHistory: () => void

  // Preference actions
  updatePreferences: (prefs: Partial<UserPreferences>) => void
}

const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  allergies: [],
  excludedIngredients: [],
  favoriteCuisines: [],
  skillLevel: 'beginner',
  servingPreference: 4,
  theme: 'system'
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ingredients: [],
      filters: {},
      dietaryRestrictions: [],
      excludeIngredients: [],
      currentRecipes: [],
      selectedRecipe: null,
      isGenerating: false,
      generationError: null,
      bookmarkedRecipes: [],
      recipeHistory: [],
      preferences: defaultPreferences,

      // Ingredient actions
      addIngredient: (ingredient) =>
        set((state) => ({
          ingredients: [...state.ingredients, ingredient.trim()]
        })),

      removeIngredient: (ingredient) =>
        set((state) => ({
          ingredients: state.ingredients.filter((i) => i !== ingredient)
        })),

      clearIngredients: () => set({ ingredients: [] }),

      setIngredients: (ingredients) => set({ ingredients }),

      // Filter actions
      updateFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters }
        })),

      clearFilters: () => set({ filters: {} }),

      // Dietary restriction actions
      addRestriction: (restriction) =>
        set((state) => ({
          dietaryRestrictions: [...state.dietaryRestrictions, restriction]
        })),

      removeRestriction: (restriction) =>
        set((state) => ({
          dietaryRestrictions: state.dietaryRestrictions.filter(
            (r) => r !== restriction
          )
        })),

      setRestrictions: (restrictions) =>
        set({ dietaryRestrictions: restrictions }),

      // Exclude ingredient actions
      addExclude: (ingredient) =>
        set((state) => ({
          excludeIngredients: [...state.excludeIngredients, ingredient]
        })),

      removeExclude: (ingredient) =>
        set((state) => ({
          excludeIngredients: state.excludeIngredients.filter(
            (i) => i !== ingredient
          )
        })),

      // Recipe actions
      setRecipes: (recipes) => set({ currentRecipes: recipes }),

      setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),

      setGenerating: (isGenerating) => set({ isGenerating }),

      setGenerationError: (error) => set({ generationError: error }),

      // Bookmark actions
      bookmarkRecipe: (recipe) =>
        set((state) => {
          const isAlreadyBookmarked = state.bookmarkedRecipes.some(
            (r) => r.id === recipe.id
          )
          if (isAlreadyBookmarked) return state

          return {
            bookmarkedRecipes: [...state.bookmarkedRecipes, recipe]
          }
        }),

      unbookmarkRecipe: (recipeId) =>
        set((state) => ({
          bookmarkedRecipes: state.bookmarkedRecipes.filter(
            (r) => r.id !== recipeId
          )
        })),

      isRecipeBookmarked: (recipeId) => {
        const state = get()
        return state.bookmarkedRecipes.some((r) => r.id === recipeId)
      },

      // History actions
      addToHistory: (recipe) =>
        set((state) => {
          // Remove duplicate if exists
          const filteredHistory = state.recipeHistory.filter(
            (r) => r.id !== recipe.id
          )

          // Add to beginning and keep only last 20
          const newHistory = [recipe, ...filteredHistory].slice(0, 20)

          return { recipeHistory: newHistory }
        }),

      clearHistory: () => set({ recipeHistory: [] }),

      // Preference actions
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs }
        }))
    }),
    {
      name: 'chefmate-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        bookmarkedRecipes: state.bookmarkedRecipes,
        recipeHistory: state.recipeHistory,
        preferences: state.preferences
      })
    }
  )
)
