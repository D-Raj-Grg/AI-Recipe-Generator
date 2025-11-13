import type { RecipeFilters } from './types/recipe'

/**
 * Generate a recipe generation prompt for OpenAI
 */
export function generateRecipePrompt(
  ingredients: string[],
  filters?: RecipeFilters,
  restrictions?: string[],
  excludeIngredients?: string[],
  count: number = 3
): string {
  const ingredientList = ingredients.join(', ')
  const restrictionList = restrictions?.length ? restrictions.join(', ') : 'none'
  const excludeList = excludeIngredients?.length ? excludeIngredients.join(', ') : 'none'

  const timeConstraint = filters?.timeMax
    ? `Maximum cooking time: ${filters.timeMax} minutes`
    : 'Any cooking time is acceptable'

  const difficultyLevel = filters?.difficulty
    ? `Difficulty level: ${filters.difficulty}`
    : 'Any difficulty level is acceptable'

  const mealTypeConstraint = filters?.mealType
    ? `Meal type: ${filters.mealType}`
    : 'Any meal type'

  const cuisineConstraint = filters?.cuisine
    ? `Cuisine preference: ${filters.cuisine}`
    : 'Any cuisine style'

  return `Generate ${count} creative and delicious recipes using these ingredients: ${ingredientList}.

Requirements:
- ${timeConstraint}
- ${difficultyLevel}
- ${mealTypeConstraint}
- ${cuisineConstraint}
- Dietary restrictions: ${restrictionList}
- Ingredients to avoid: ${excludeList}

Return ONLY a JSON object with this exact structure:
{
  "recipes": [
    {
      "name": "string (creative, appetizing recipe name)",
      "description": "string (one-liner hook that makes the recipe sound delicious)",
      "prepTime": number (preparation time in minutes),
      "cookTime": number (cooking time in minutes),
      "totalTime": number (total time in minutes),
      "servings": number (number of servings),
      "difficulty": "beginner" | "intermediate" | "advanced",
      "cuisine": "string (cuisine type)",
      "mealType": ["string"] (array of meal types: breakfast, lunch, dinner, snack, dessert),
      "ingredients": [
        {
          "id": "string (unique id)",
          "item": "string (ingredient name)",
          "amount": "string (quantity)",
          "unit": "string (measurement unit)",
          "category": "protein" | "vegetable" | "grain" | "dairy" | "fruit" | "spice" | "other",
          "isOptional": boolean
        }
      ],
      "instructions": [
        {
          "step": number,
          "instruction": "string (clear, detailed instruction)",
          "tip": "string (optional cooking tip)",
          "timing": "string (optional timing guidance)",
          "temperature": "string (optional temperature)"
        }
      ],
      "nutrition": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "fiber": number,
        "sodium": number,
        "sugar": number
      },
      "tips": ["string (cooking tips, serving suggestions, etc.)"],
      "substitutions": [
        {
          "original": "string (original ingredient)",
          "replacement": "string (substitute ingredient)",
          "reason": "string (why this substitution works)"
        }
      ]
    }
  ]
}

Important guidelines:
1. Make recipes PRACTICAL and ACHIEVABLE with common kitchen equipment
2. Use REALISTIC portions and measurements
3. Include ACCURATE nutritional estimates
4. Provide CLEAR, step-by-step instructions
5. Suggest USEFUL substitutions for dietary needs
6. Make recipe names CREATIVE and APPETIZING
7. Ensure all recipes RESPECT the dietary restrictions
8. If ingredients list is short, suggest a few optional ingredients to enhance the dish
9. Make sure cooking times are REALISTIC
10. Include helpful cooking tips and techniques

Generate recipes that a home cook would actually want to make!`
}

/**
 * Simplified prompt for quick recipe generation (used in future features)
 */
export function generateQuickRecipePrompt(
  mealType: string,
  cuisine?: string
): string {
  return `Generate 1 delicious ${cuisine || ''} recipe for ${mealType}.

Return ONLY valid JSON with the recipe structure as specified in the main prompt.
Make it creative, practical, and appetizing!`
}

/**
 * Prompt for recipe variations (future feature)
 */
export function generateRecipeVariationPrompt(
  originalRecipe: string,
  variation: 'healthier' | 'spicier' | 'vegetarian' | 'quick'
): string {
  const variationDescriptions = {
    healthier: 'lower in calories and fat, with more vegetables and whole grains',
    spicier: 'with more heat and bold flavors',
    vegetarian: 'replacing all meat with plant-based proteins',
    quick: 'simplified with fewer steps and faster cooking time'
  }

  return `Create a ${variation} variation of this recipe: ${originalRecipe}

Make the variation ${variationDescriptions[variation]}.

Return ONLY valid JSON with the full recipe structure.`
}
