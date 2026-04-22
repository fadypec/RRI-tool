import express from 'express'
import path from 'path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '50kb' }))
app.use(helmet())

// In production, serve the Vite build
app.use(express.static(path.join(import.meta.dirname, 'dist')))

// Rate limiter for the analyze endpoint: 20 requests per minute per IP
const analyzeRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a minute.' },
})

// Anthropic client — only initialised if API key is present
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

/**
 * POST /api/analyze
 *
 * Augmented mode endpoint. Accepts research text and a task type,
 * forwards to Anthropic for classification/extraction, returns structured response.
 *
 * The API key stays server-side — never exposed to the client.
 */
app.post('/api/analyze', analyzeRateLimiter, async (req, res) => {
  if (!anthropic) {
    res.status(503).json({
      error: 'Augmented mode is not available — no API key configured.',
      detail: 'The server does not have an ANTHROPIC_API_KEY environment variable set. Augmented mode requires this to function. Standard (naive) mode works without it.',
    })
    return
  }

  const { task, text } = req.body

  if (!task || !text) {
    res.status(400).json({ error: 'Missing required fields: task, text' })
    return
  }

  if (typeof text !== 'string' || text.length > 10000) {
    res.status(400).json({ error: 'Text must be a string under 10,000 characters' })
    return
  }

  const SYSTEM_PROMPT = `You are a research classification assistant for a dual-use assessment tool. You analyse research descriptions and extract structured information. You NEVER generate speculative or alarmist content. You respond ONLY with valid JSON.`

  const taskPrompts: Record<string, string> = {
    // Task 1: Classify research description into activity/material categories
    classify: `Classify the following research description into relevant activity/material categories for dual-use assessment. Return a JSON object with:
- "categories": array of category IDs from this list: bio-agents, bio-gm, bio-pathogen, bio-gof, bio-denovo, bio-tissue, chem-synthesis, chem-precursors, chem-toxic, chem-dispersal, chem-explosives, tech-ai, tech-robotics, tech-dualuse-equip, tech-nuclear, tech-materials, tech-quantum, tech-surveillance, tech-cyber, tech-info-hazard, cross-intl, cross-military, cross-publication
- "confidence": "high" | "medium" | "low"
- "reasoning": one sentence explaining the classification

Research description:
"""
${text}
"""`,

    // Task 2: Extract entities (agents, chemicals, methods) from pasted text
    extract: `Extract specific entities relevant to dual-use assessment from the following research text. Return a JSON object with:
- "organisms": array of {name, acdp_hazard_group (if known, else null)}
- "chemicals": array of {name, controlled_list (if known: "CWC-S1", "CWC-S2", "CWC-S3", "AG", or null)}
- "methods": array of strings describing key methods/techniques
- "technologies": array of strings describing key technologies/equipment
- "potential_concerns": array of strings noting any dual-use relevant observations

Only include items explicitly mentioned or directly implied. Do not speculate.

Research text:
"""
${text}
"""`,

    // Task 3: Classify researcher's misuse concerns
    misuse: `The researcher has described their own concerns about potential misuse of their research. Classify these concerns against known risk categories. Return a JSON object with:
- "concerns": array of {category, description, risk_level ("low" | "moderate" | "significant")}
  where category is one of: "biological_weapons", "chemical_weapons", "information_hazard", "surveillance_misuse", "military_application", "barrier_lowering", "environmental_harm", "other"
- "additional_considerations": array of strings noting risk categories the researcher may not have mentioned but should consider (based ONLY on what they described, not speculation)

Researcher's concerns:
"""
${text}
"""`,
  }

  const prompt = taskPrompts[task]
  if (!prompt) {
    res.status(400).json({ error: `Unknown task: ${task}. Valid tasks: classify, extract, misuse` })
    return
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = response.content[0]
    if (content.type === 'text') {
      // Parse the JSON response
      try {
        const parsed = JSON.parse(content.text)
        res.json({ result: parsed })
      } catch {
        // If the model didn't return valid JSON, return the raw text
        res.json({ result: content.text, warning: 'Response was not valid JSON' })
      }
    } else {
      res.status(500).json({ error: 'Unexpected response format from API' })
    }
  } catch (err) {
    console.error('Anthropic API error:', err)
    res.status(500).json({ error: 'Failed to process request. Please try again.' })
  }
})

// SPA fallback — serve index.html for all non-API routes
// Express 5 uses '{*path}' instead of '*' for catch-all
app.get('{*path}', (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`RRI STEER server running on port ${PORT}`)
  if (!anthropic) {
    console.log('⚠ No ANTHROPIC_API_KEY set — augmented mode is disabled')
  }
})
