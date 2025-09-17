import { configureGenkit } from '@genkit-ai/core'
import { googleAI } from '@genkit-ai/googleai'

export const ai = configureGenkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export { generate } from '@genkit-ai/ai'
export { gemini15Flash } from '@genkit-ai/googleai'