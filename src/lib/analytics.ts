/**
 * Analytics utility functions for tracking user events
 * Uses Vercel Analytics for privacy-compliant event tracking
 */

import { track } from "@vercel/analytics"

/**
 * Track recipe generation event
 * @param data - Recipe generation details
 */
export function trackRecipeGeneration(data: {
  ingredientCount: number
  cuisineType?: string
  mealType?: string
  difficulty?: string
  hasRestrictions: boolean
  generatedCount: number
  timeToGenerate?: number
}) {
  track("recipe_generated", {
    ingredient_count: data.ingredientCount,
    cuisine_type: data.cuisineType || "any",
    meal_type: data.mealType || "any",
    difficulty: data.difficulty || "any",
    has_dietary_restrictions: data.hasRestrictions,
    recipes_generated: data.generatedCount,
    ...(data.timeToGenerate !== undefined && { generation_time_ms: data.timeToGenerate }),
  })
}

/**
 * Track recipe bookmark event
 * @param data - Bookmark details
 */
export function trackRecipeBookmark(data: {
  recipeId: string
  action: "add" | "remove"
  cuisineType?: string
  mealType?: string
}) {
  track("recipe_bookmark", {
    recipe_id: data.recipeId,
    action: data.action,
    ...(data.cuisineType && { cuisine_type: data.cuisineType }),
    ...(data.mealType && { meal_type: data.mealType }),
  })
}

/**
 * Track recipe share event
 * @param data - Share details
 */
export function trackRecipeShare(data: {
  recipeId: string
  platform: "twitter" | "facebook" | "whatsapp" | "clipboard" | "native"
  cuisineType?: string
}) {
  track("recipe_shared", {
    recipe_id: data.recipeId,
    platform: data.platform,
    ...(data.cuisineType && { cuisine_type: data.cuisineType }),
  })
}

/**
 * Track recipe print event
 * @param data - Print details
 */
export function trackRecipePrint(data: {
  recipeId: string
  cuisineType?: string
  mealType?: string
}) {
  track("recipe_printed", {
    recipe_id: data.recipeId,
    ...(data.cuisineType && { cuisine_type: data.cuisineType }),
    ...(data.mealType && { meal_type: data.mealType }),
  })
}

/**
 * Track random recipe ("Surprise Me") event
 */
export function trackSurpriseMe() {
  track("surprise_me_clicked")
}

/**
 * Track preferences update event
 * @param data - Preferences details
 */
export function trackPreferencesUpdate(data: {
  hasRestrictions: boolean
  restrictionCount: number
  defaultServings?: number
}) {
  track("preferences_updated", {
    has_dietary_restrictions: data.hasRestrictions,
    restriction_count: data.restrictionCount,
    ...(data.defaultServings !== undefined && { default_servings: data.defaultServings }),
  })
}

/**
 * Track explore page interactions
 * @param data - Explore details
 */
export function trackExplore(data: {
  filterType: "cuisine" | "mealType" | "occasion"
  filterValue: string
  recipeCount: number
}) {
  track("explore_filtered", {
    filter_type: data.filterType,
    filter_value: data.filterValue,
    recipe_count: data.recipeCount,
  })
}

/**
 * Track search event
 * @param data - Search details
 */
export function trackSearch(data: {
  location: "saved" | "history" | "explore"
  hasResults: boolean
  resultCount: number
}) {
  track("search_performed", {
    location: data.location,
    has_results: data.hasResults,
    result_count: data.resultCount,
  })
}

/**
 * Track recipe detail view
 * @param data - Recipe view details
 */
export function trackRecipeView(data: {
  recipeId: string
  source: "generation" | "saved" | "history" | "explore"
  cuisineType?: string
  mealType?: string
}) {
  track("recipe_viewed", {
    recipe_id: data.recipeId,
    source: data.source,
    ...(data.cuisineType && { cuisine_type: data.cuisineType }),
    ...(data.mealType && { meal_type: data.mealType }),
  })
}

/**
 * Track error events
 * @param data - Error details
 */
export function trackError(data: {
  errorType: "generation" | "api" | "network" | "validation"
  errorMessage: string
  context?: string
}) {
  track("error_occurred", {
    error_type: data.errorType,
    error_message: data.errorMessage,
    ...(data.context && { context: data.context }),
  })
}

/**
 * Track serving size adjustment
 * @param data - Serving adjustment details
 */
export function trackServingAdjustment(data: {
  recipeId: string
  originalServings: number
  newServings: number
  multiplier: number
}) {
  track("serving_adjusted", {
    recipe_id: data.recipeId,
    original_servings: data.originalServings,
    new_servings: data.newServings,
    multiplier: data.multiplier,
  })
}
