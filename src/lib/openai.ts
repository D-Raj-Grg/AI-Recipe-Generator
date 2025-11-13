import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

// Validate API key is present
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  OPENAI_API_KEY is not set in environment variables')
}

/**
 * Generate a recipe using OpenAI via Vercel AI SDK
 * @param prompt - The prompt to send to OpenAI
 * @param options - OpenAI API options
 * @returns The generated response
 */
export async function generateWithOpenAI(
  prompt: string,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  }
) {
  try {
    const result = await generateText({
      model: openai(options?.model || 'gpt-4o-mini'),
      system: 'You are a professional chef and recipe expert. Generate creative, practical, and delicious recipes based on user requirements. Always respond with valid JSON only, no additional text.',
      prompt: prompt,
      temperature: options?.temperature || 0.8, // Higher for creative variations
    })

    return result.text
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw error
  }
}

/**
 * Check if OpenAI API is configured
 */
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY
}

export { openai }
