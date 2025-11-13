// Recipe type definitions

export interface Ingredient {
  id: string
  item: string
  amount: string
  unit: string
  category?: 'protein' | 'vegetable' | 'grain' | 'dairy' | 'fruit' | 'spice' | 'other'
  isOptional?: boolean
}

export interface Instruction {
  step: number
  instruction: string
  tip?: string
  timing?: string // "until golden brown", "5 minutes"
  temperature?: string // "350°F", "medium heat"
}

export interface NutritionInfo {
  calories: number
  protein: number // grams
  carbs: number // grams
  fat: number // grams
  fiber?: number // grams
  sodium?: number // mg
  sugar?: number // grams
}

export interface Substitution {
  original: string
  replacement: string
  reason?: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  imageUrl?: string
  prepTime: number // minutes
  cookTime: number // minutes
  totalTime: number // minutes
  servings: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  cuisine: string
  mealType: string[]
  ingredients: Ingredient[]
  instructions: Instruction[]
  nutrition: NutritionInfo
  tips: string[]
  substitutions: Substitution[]
  createdAt: Date
  isBookmarked?: boolean
}

export interface RecipeFilters {
  timeMax?: number // minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  mealType?: string // breakfast, lunch, dinner, snack, dessert
  cuisine?: string // Italian, Mexican, Asian, etc.
}

export interface UserPreferences {
  dietaryRestrictions: string[] // vegetarian, vegan, keto, etc.
  allergies: string[] // nuts, dairy, eggs, etc.
  excludedIngredients: string[]
  favoriteCuisines: string[]
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  servingPreference: number
  theme: 'light' | 'dark' | 'system'
}

export interface SearchQuery {
  ingredients: string[]
  timeFilter?: string
  difficultyFilter?: string
  mealType?: string
  cuisine?: string
  restrictions?: string[]
  excludeIngredients?: string[]
}

// API Request/Response types
export interface RecipeGenerationRequest {
  ingredients: string[]
  filters?: RecipeFilters
  restrictions?: string[]
  excludeIngredients?: string[]
  count?: number // How many recipes to generate (default 3)
}

export interface RecipeGenerationResponse {
  recipes: Recipe[]
  generatedAt: Date
}
