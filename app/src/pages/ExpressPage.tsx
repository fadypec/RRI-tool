import { useState } from 'react'
import { classifyResearch } from '@/lib/api'
import type { DomainBranch } from '@/types/assessment'
import categories from '@/data/questions/phase2_categories.json'

interface ExpressPageProps {
  onComplete: (selectedCategories: string[], activeBranches: DomainBranch[]) => void
  onBack: () => void
}

type ExpressState = 'input' | 'loading' | 'review' | 'error'

export function ExpressPage({ onComplete, onBack }: ExpressPageProps) {
  const [text, setText] = useState('')
  const [state, setState] = useState<ExpressState>('input')
  const [error, setError] = useState('')
  const [inferredCategories, setInferredCategories] = useState<string[]>([])
  const [reasoning, setReasoning] = useState('')

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setState('loading')
    setError('')

    try {
      const result = await classifyResearch(text)
      setInferredCategories(result.categories || [])
      setReasoning(result.reasoning || '')
      setState('review')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze. Is the server running? (npm run dev:server)')
      setState('error')
    }
  }

  const toggleCategory = (id: string) => {
    setInferredCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleConfirm = () => {
    // Compute active branches from confirmed categories
    const branches = new Set<DomainBranch>()
    for (const group of categories) {
      for (const item of group.items) {
        if (inferredCategories.includes(item.id)) {
          for (const t of item.triggers) {
            branches.add(t as DomainBranch)
          }
        }
      }
    }
    onComplete(inferredCategories, Array.from(branches))
  }

  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
          Express Assessment
        </h1>

        {state === 'input' && (
          <>
            <p className="text-[var(--color-ink-muted)] mb-6">
              Paste your research abstract, methods section, or a brief description of your work.
              The tool will identify relevant dual-use categories and route your assessment automatically.
            </p>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Describe your research — what you're studying, what methods you're using, what materials are involved..."
              className="w-full p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] text-[0.95rem] leading-relaxed min-h-[200px] resize-y focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />

            <p className="text-xs text-[var(--color-ink-light)] mt-2 mb-6">
              Your text is sent to the Anthropic API for classification. It is not stored or used for training.
            </p>

            <div className="flex gap-4">
              <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
                &larr; Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!text.trim()}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  text.trim()
                    ? 'bg-[var(--color-accent)] text-white hover:-translate-y-px hover:shadow-lg'
                    : 'bg-[var(--color-border)] text-[var(--color-ink-light)] cursor-not-allowed'
                }`}
              >
                Analyze research &rarr;
              </button>
            </div>
          </>
        )}

        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[var(--color-ink-muted)]">Analyzing your research description...</p>
          </div>
        )}

        {state === 'error' && (
          <>
            <div className="p-5 bg-[var(--color-tier-significant-bg)] border border-[var(--color-tier-significant)] border-opacity-30 rounded-xl mb-6">
              <p className="text-sm font-medium text-[var(--color-tier-significant)] mb-1">Analysis failed</p>
              <p className="text-sm text-[var(--color-ink-muted)] m-0">{error}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setState('input')} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm">
                Try again
              </button>
            </div>
          </>
        )}

        {state === 'review' && (
          <>
            <p className="text-[var(--color-ink-muted)] mb-2">
              Based on your description, the following categories were identified.
              Review and adjust before continuing.
            </p>
            {reasoning && (
              <p className="text-sm text-[var(--color-ink-light)] italic mb-6">"{reasoning}"</p>
            )}

            <div className="space-y-1 mb-8">
              {categories.flatMap(group => group.items).map(item => {
                const selected = inferredCategories.includes(item.id)
                return (
                  <button
                    key={item.id}
                    role="checkbox"
                    aria-checked={selected}
                    onClick={() => toggleCategory(item.id)}
                    className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                      selected ? 'bg-[var(--color-accent-light)]' : 'hover:bg-[var(--color-surface-warm)] opacity-60'
                    }`}
                  >
                    <span aria-hidden="true" className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      selected
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                        : 'border-[var(--color-border-strong)] bg-[var(--color-surface-card)]'
                    }`}>
                      {selected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed">{item.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setState('input')} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
                &larr; Re-analyze
              </button>
              <button
                onClick={handleConfirm}
                disabled={inferredCategories.length === 0}
                className="px-6 py-3 rounded-lg bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-sm hover:-translate-y-px hover:shadow-lg transition-all"
              >
                Confirm and continue &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
