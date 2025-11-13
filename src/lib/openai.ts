import OpenAI from 'openai'

// Initialize OpenAI client
// API key should be in .env.local as OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Validate API key is present
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  OPENAI_API_KEY is not set in environment variables')
}

/**
 * Generate a recipe using OpenAI
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
    const response = await openai.chat.completions.create({
      model: options?.model || 'gpt-4o-mini', // Using cost-efficient model
      messages: [
        {
          role: 'system',
          content: 'You are a professional chef and recipe expert. Generate creative, practical, and delicious recipes based on user requirements. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: options?.temperature || 0.8, // Higher for creative variations
      max_tokens: options?.maxTokens || 2500,
      response_format: { type: 'json_object' }
    })

    return response.choices[0]?.message?.content || null
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
