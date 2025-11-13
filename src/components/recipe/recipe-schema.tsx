import type { Recipe } from "@/lib/types/recipe"

interface RecipeSchemaProps {
  recipe: Recipe
}

export function RecipeSchema({ recipe }: RecipeSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "recipeCategory": recipe.mealType.join(", "),
    "recipeCuisine": recipe.cuisine,
    "recipeYield": `${recipe.servings} servings`,
    "totalTime": `PT${recipe.totalTime}M`,
    "prepTime": `PT${recipe.prepTime}M`,
    "cookTime": `PT${recipe.cookTime}M`,
    "recipeIngredient": recipe.ingredients.map(
      (ing) => `${ing.amount} ${ing.unit} ${ing.item}`.trim()
    ),
    "recipeInstructions": recipe.instructions.map((inst, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": inst.instruction,
      ...(inst.timing && { "duration": inst.timing }),
      ...(inst.temperature && { "temperature": inst.temperature }),
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} calories`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "fiberContent": `${recipe.nutrition.fiber}g`,
      "sugarContent": `${recipe.nutrition.sugar}g`,
      "sodiumContent": `${recipe.nutrition.sodium}mg`,
    },
    ...(recipe.tips && recipe.tips.length > 0 && {
      "tips": recipe.tips
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
