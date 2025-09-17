import { configureGenkit } from '@genkit-ai/core'
import { googleAI, gemini15Flash } from '@genkit-ai/googleai'
import { generate } from '@genkit-ai/ai'

export const ai = configureGenkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export { generate, gemini15Flash }