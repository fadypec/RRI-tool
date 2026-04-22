/**
 * Client for the augmented mode API.
 * Calls POST /api/analyze which proxies to Anthropic.
 * The API key never touches the browser.
 */

export interface ClassifyResult {
  categories: string[]
  confidence: 'high' | 'medium' | 'low'
  reasoning: string
}

export interface ExtractResult {
  organisms: { name: string; acdp_hazard_group: number | null }[]
  chemicals: { name: string; controlled_list: string | null }[]
  methods: string[]
  technologies: string[]
  potential_concerns: string[]
}

export interface MisuseResult {
  concerns: { category: string; description: string; risk_level: string }[]
  additional_considerations: string[]
}

async function callApi<T>(task: string, text: string): Promise<T> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task, text }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(err.error || `API error: ${res.status}`)
  }

  const data = await res.json()
  return data.result as T
}

/** Classify a research description into activity/material categories */
export function classifyResearch(description: string): Promise<ClassifyResult> {
  return callApi<ClassifyResult>('classify', description)
}

/** Extract entities (organisms, chemicals, methods, technologies) from research text */
export function extractEntities(text: string): Promise<ExtractResult> {
  return callApi<ExtractResult>('extract', text)
}

/** Classify researcher's own misuse concerns against known risk categories */
export function classifyMisuseConcerns(text: string): Promise<MisuseResult> {
  return callApi<MisuseResult>('misuse', text)
}
