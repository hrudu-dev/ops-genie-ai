import { NextRequest, NextResponse } from 'next/server'
import { generate, gemini25Flash } from '@/lib/genkit'
import { saveChatMessage } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Input validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message too long (max 1000 characters)' }, { status: 400 })
    }

    // Sanitize input
    const sanitizedMessage = message.trim().replace(/[<>"'&]/g, '')

    const response = await generate({
      model: gemini25Flash,
      prompt: `You are an AI assistant for OpsGenie AI, a console for MSPs and IT teams. Help with IT troubleshooting, system monitoring, and technical support. Keep responses concise and helpful.

User: ${sanitizedMessage}`,
    })

    const responseText = response.text()
    
    // Save to database (optional - requires user authentication)
    // await saveChatMessage({ user_id: 'user-id', message, response: responseText })

    return NextResponse.json({ response: responseText })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}