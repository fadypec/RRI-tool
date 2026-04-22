import { useState } from 'react'
import { classifyMisuseConcerns } from '@/lib/api'
import type { DomainBranch, Mode } from '@/types/assessment'

const REFLECTION_PROMPTS: Record<string, { domain: string; prompt: string }[]> = {
  biological: [
    {
      domain: 'Biological research',
      prompt: 'Imagine your research is completely successful. A non-specialist reads your published paper. What is the most harmful thing they could do with the knowledge and methods you have described?',
    },
  ],
  synbio: [
    {
      domain: 'Synthetic biology',
      prompt: 'Consider the genetic constructs and synthesis methods in your work. If someone with basic molecular biology training replicated your approach, what is the most dangerous outcome — intentionally or accidentally?',
    },
  ],
  chemical: [
    {
      domain: 'Chemical research',
      prompt: 'Consider the full synthesis route you are developing. If someone with basic chemistry training followed your published methods, what is the most dangerous product they could make — intentionally or accidentally?',
    },
  ],
  technology: [
    {
      domain: 'Technology research',
      prompt: 'Consider your technology in the hands of an actor with harmful intent. What is the worst realistic misuse scenario? What would they need beyond your published work to carry it out?',
    },
  ],
  'info-hazard': [
    {
      domain: 'Information hazard',
      prompt: 'If your complete methodology and results were made freely available online, who might use them in ways you did not intend? What would be the consequences?',
    },
  ],
}

const GENERAL_PROMPT = {
  domain: 'General',
  prompt: 'Beyond deliberate misuse, could your research cause accidental harm — through environmental release, unintended consequences of application, or misunderstanding of your findings?',
}

interface ReflectionPageProps {
  activeBranches: DomainBranch[]
  mode: Mode
  onSetMode: (mode: Mode) => void
  onNext: () => void
  onBack: () => void
}

export function ReflectionPage({ activeBranches, mode, onSetMode, onNext, onBack }: ReflectionPageProps) {
  const [reflected, setReflected] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [augmentedText, setAugmentedText] = useState('')
  const [augmentedLoading, setAugmentedLoading] = useState(false)
  const [augmentedError, setAugmentedError] = useState('')

  // Gather prompts for active branches
  const prompts = activeBranches
    .flatMap(b => REFLECTION_PROMPTS[b] || [])
    .concat(GENERAL_PROMPT)

  // Remove duplicates by prompt text
  const seen = new Set<string>()
  const uniquePrompts = prompts.filter(p => {
    if (seen.has(p.prompt)) return false
    seen.add(p.prompt)
    return true
  })

  const allReflected = uniquePrompts.every((_, i) => reflected[i.toString()])

  const handleAugmentedContinue = async () => {
    if (!augmentedText.trim()) {
      onNext()
      return
    }
    setAugmentedLoading(true)
    setAugmentedError('')
    try {
      await classifyMisuseConcerns(augmentedText)
      onNext()
    } catch (err) {
      setAugmentedError(err instanceof Error ? err.message : 'Failed to analyze. Is the server running?')
    } finally {
      setAugmentedLoading(false)
    }
  }

  if (mode === 'augmented') {
    return (
      <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
        <div className="max-w-[720px] w-full">
          <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
            Misuse Reflection
          </h1>
          <p className="text-[var(--color-ink-muted)] mb-8">
            Based on your understanding of your research, describe potential misuse applications
            and any concerns you have about how your work could be applied by others.
          </p>

          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5 mb-6">
            <label className="block text-sm font-semibold mb-3">
              What potential misuse applications could there be if your research is successful?
              What concerns, if any, do you have about how your research could be applied by others?
            </label>
            <textarea
              value={augmentedText}
              onChange={e => setAugmentedText(e.target.value)}
              placeholder="Describe your concerns in your own words. The AI will map these against known risk categories and may surface additional considerations..."
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-warm)] text-sm leading-relaxed min-h-[150px] resize-y focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <p className="text-xs text-[var(--color-ink-light)] mt-2">
              Your text will be processed by AI to extract and classify concerns.
              It is not stored after analysis.
            </p>
          </div>

          {augmentedError && (
            <div className="p-4 bg-[var(--color-tier-significant-bg)] border border-[var(--color-tier-significant)] border-opacity-30 rounded-lg mb-6">
              <p className="text-sm text-[var(--color-tier-significant)] m-0">{augmentedError}</p>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
              &larr; Back
            </button>
            <button
              onClick={handleAugmentedContinue}
              disabled={augmentedLoading}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                augmentedLoading
                  ? 'bg-[var(--color-border)] text-[var(--color-ink-light)] cursor-not-allowed'
                  : 'bg-[var(--color-ink)] text-[var(--color-surface)] hover:-translate-y-px hover:shadow-lg'
              }`}
            >
              {augmentedLoading ? 'Analyzing...' : 'Continue to safeguards \u2192'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Naive mode
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
          Misuse Reflection
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-8">
          Take a moment to seriously consider each prompt below. These are the heart of the assessment —
          they ask you to think like someone who might want to misuse your work.
        </p>

        {uniquePrompts.map((prompt, i) => (
          <div key={i} className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5 mb-4">
            <div className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink-light)] mb-3">
              {prompt.domain}
            </div>
            <p className="text-[0.95rem] leading-relaxed mb-4 italic text-[var(--color-ink)]">
              "{prompt.prompt}"
            </p>
            <textarea
              value={notes[i.toString()] ?? ''}
              onChange={e => setNotes(prev => ({ ...prev, [i.toString()]: e.target.value }))}
              placeholder="Optional: jot down your thoughts here for your own reference..."
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-warm)] text-sm leading-relaxed min-h-[60px] resize-y focus:outline-none focus:border-[var(--color-accent)] transition-colors mb-3"
            />
            <button
              role="checkbox"
              aria-checked={!!reflected[i.toString()]}
              onClick={() => setReflected(prev => ({ ...prev, [i.toString()]: !prev[i.toString()] }))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                reflected[i.toString()]
                  ? 'bg-[var(--color-tier-low-bg)] text-[var(--color-tier-low)] border border-[var(--color-tier-low)]'
                  : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-muted)] border border-[var(--color-border)]'
              }`}
            >
              {reflected[i.toString()] ? '✓ I have reflected on this' : 'I have reflected on this'}
            </button>
          </div>
        ))}

        {/* Augmented mode nudge */}
        <div className="bg-[var(--color-accent-light)] border border-[var(--color-accent)] border-opacity-30 rounded-xl p-5 mt-6 mb-8">
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-3">
            <strong className="text-[var(--color-accent)]">Want a richer experience?</strong> Augmented mode
            lets you describe your misuse concerns in your own words. The tool maps them against known risk
            categories and may surface considerations you haven't thought of.
          </p>
          <button
            onClick={() => onSetMode('augmented')}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Switch to augmented mode
          </button>
        </div>

        <div className="flex gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
            &larr; Back
          </button>
          <button
            onClick={onNext}
            disabled={!allReflected}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
              allReflected
                ? 'bg-[var(--color-ink)] text-[var(--color-surface)] hover:-translate-y-px hover:shadow-lg'
                : 'bg-[var(--color-border)] text-[var(--color-ink-light)] cursor-not-allowed'
            }`}
          >
            Continue to safeguards &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
