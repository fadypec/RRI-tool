import funders from '@/data/questions/funders.json'

const GRANT_STAGES = [
  { id: 'early', label: 'Early — still shaping the research design' },
  { id: 'mid', label: 'Mid — drafting the application' },
  { id: 'late', label: 'Late — completing the ethics/RRI section' },
  { id: 'post', label: 'Post-submission — reviewing an existing project' },
  { id: 'general', label: 'Not a grant application — general reflection' },
]

interface ContextPageProps {
  funder: string | undefined
  grantStage: string | undefined
  onSetFunder: (id: string | undefined) => void
  onSetGrantStage: (id: string | undefined) => void
  onNext: () => void
  onBack: () => void
}

export function ContextPage({ funder, grantStage, onSetFunder, onSetGrantStage, onNext, onBack }: ContextPageProps) {
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
          A little context
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-8">
          These are optional. They help the tool tailor its guidance to your specific situation.
        </p>

        {/* Funder selection */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            Are you writing this for a specific funder?
          </h3>
          <div role="radiogroup" aria-label="Funder selection" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {funders.map(f => (
              <button
                key={f.id}
                role="radio"
                aria-checked={funder === f.id}
                onClick={() => onSetFunder(funder === f.id ? undefined : f.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                  funder === f.id
                    ? 'bg-[var(--color-accent)] text-white shadow-sm'
                    : 'bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grant stage */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            What stage is your application at?
          </h3>
          <div role="radiogroup" aria-label="Grant stage" className="flex flex-col gap-2">
            {GRANT_STAGES.map(s => (
              <button
                key={s.id}
                role="radio"
                aria-checked={grantStage === s.id}
                onClick={() => onSetGrantStage(grantStage === s.id ? undefined : s.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                  grantStage === s.id
                    ? 'bg-[var(--color-accent-light)] border-2 border-[var(--color-accent)] text-[var(--color-ink)]'
                    : 'bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors"
          >
            &larr; Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-lg bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-sm hover:-translate-y-px hover:shadow-lg transition-all"
          >
            Continue &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
