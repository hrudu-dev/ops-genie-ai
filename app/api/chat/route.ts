import { NextRequest, NextResponse } from 'next/server'
import { generate, gemini25Flash } from '@/lib/genkit'
import { saveChatMessage } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await generate({
      model: gemini25Flash,
      prompt: `You are an AI assistant for OpsGenie AI, a console for MSPs and IT teams. Help with IT troubleshooting, system monitoring, and technical support. Keep responses concise and helpful.

User: ${message}`,
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