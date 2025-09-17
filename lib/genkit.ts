import { configureGenkit } from '@genkit-ai/core'
import { googleAI } from '@genkit-ai/googleai'
import { generate } from '@genkit-ai/ai'

export const ai = configureGenkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export { generate }
export const gemini25Flash = 'googleai/gemini-2.5-flash'