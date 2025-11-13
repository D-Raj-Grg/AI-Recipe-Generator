import { NextResponse } from 'next/server'
import { generateWithOpenAI, isOpenAIConfigured } from '@/lib/openai'
import { generateRecipePrompt } from '@/lib/prompts'
import type { Recipe, RecipeGenerationRequest } from '@/lib/types/recipe'

// Rate limiting map (in-memory, simple implementation)
// In production, use Redis or similar
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT = 15 // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetAt) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Check if OpenAI is configured
    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        {
          error: 'OpenAI API is not configured. Please add OPENAI_API_KEY to your environment variables.'
        },
        { status: 500 }
      )
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: '1 hour'
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body: RecipeGenerationRequest = await request.json()

    // Validate input
    if (!body.ingredients || body.ingredients.length === 0) {
      return NextResponse.json(
        { error: 'At least one ingredient is required' },
        { status: 400 }
      )
    }

    if (body.ingredients.length > 20) {
      return NextResponse.json(
        { error: 'Maximum 20 ingredients allowed' },
        { status: 400 }
      )
    }

    const count = body.count || 3
    if (count < 1 || count > 5) {
      return NextResponse.json(
        { error: 'Recipe count must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Generate prompt
    const prompt = generateRecipePrompt(
      body.ingredients,
      body.filters,
      body.restrictions,
      body.excludeIngredients,
      count
    )

    // Call OpenAI
    const response = await generateWithOpenAI(prompt, {
      model: 'gpt-4o-mini', // Cost-efficient model
      temperature: 0.8,
      maxTokens: 2500
    })

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse response
    const parsed = JSON.parse(response)

    if (!parsed.recipes || !Array.isArray(parsed.recipes)) {
      throw new Error('Invalid response format from OpenAI')
    }

    // Add IDs and timestamps to recipes
    const recipes: Recipe[] = parsed.recipes.map((recipe: any, index: number) => ({
      ...recipe,
      id: `recipe-${Date.now()}-${index}`,
      createdAt: new Date(),
      isBookmarked: false,
      // Ensure ingredients have IDs
      ingredients: recipe.ingredients?.map((ing: any, ingIndex: number) => ({
        ...ing,
        id: ing.id || `ing-${index}-${ingIndex}`
      })) || []
    }))

    // Return recipes
    return NextResponse.json({
      recipes,
      generatedAt: new Date()
    })

  } catch (error: any) {
    console.error('Recipe generation error:', error)

    // Handle specific OpenAI errors
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'OpenAI rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      )
    }

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 500 }
      )
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Failed to generate recipes. Please try again.',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
