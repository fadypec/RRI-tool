import type { SafeguardResponses } from '@/types/assessment'

const OVERSIGHT_OPTIONS = [
  { id: 'biosafety', label: 'Institutional biosafety committee review' },
  { id: 'rec', label: 'Research ethics committee (REC) review' },
  { id: 'home-office', label: 'Home Office licence (animal research)' },
  { id: 'nhs-rec', label: 'NHS REC approval (human participants)' },
  { id: 'gm-safety', label: 'GM safety committee approval' },
  { id: 'export-control', label: 'Export control review' },
  { id: 'security-review', label: 'Institutional security review' },
  { id: 'none', label: 'None of the above' },
  { id: 'unsure', label: "I'm not sure what applies" },
]

const MITIGATION_OPTIONS = [
  { id: 'risk-assessment', label: 'Conducted a formal risk assessment' },
  { id: 'biosecurity-consult', label: 'Consulted with a biosafety or biosecurity officer' },
  { id: 'collaborator-discussion', label: 'Discussed dual-use implications with collaborators' },
  { id: 'lower-risk-alternatives', label: 'Considered alternative lower-risk approaches' },
  { id: 'responsible-publication', label: 'Planned for responsible publication (e.g., omitting sensitive details)' },
  { id: 'none', label: 'None of the above' },
]

interface SafeguardsPageProps {
  safeguards: SafeguardResponses
  onUpdate: (safeguards: SafeguardResponses) => void
  onNext: () => void
  onBack: () => void
}

export function SafeguardsPage({ safeguards, onUpdate, onNext, onBack }: SafeguardsPageProps) {
  const toggleOversight = (id: string) => {
    let next: string[]
    if (id === 'none' || id === 'unsure') {
      next = safeguards.oversight.includes(id) ? [] : [id]
    } else {
      next = safeguards.oversight.filter(o => o !== 'none' && o !== 'unsure')
      next = next.includes(id) ? next.filter(o => o !== id) : [...next, id]
    }
    onUpdate({ ...safeguards, oversight: next })
  }

  const toggleMitigation = (id: string) => {
    let next: string[]
    if (id === 'none') {
      next = safeguards.mitigationSteps.includes(id) ? [] : [id]
    } else {
      next = safeguards.mitigationSteps.filter(m => m !== 'none')
      next = next.includes(id) ? next.filter(m => m !== id) : [...next, id]
    }
    onUpdate({ ...safeguards, mitigationSteps: next })
  }

  const noOversight = safeguards.oversight.includes('none') || safeguards.oversight.includes('unsure')

  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
          Existing Safeguards
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-8">
          Tell us what institutional oversight and risk management measures are already in place.
          This helps us tailor the output — acknowledging what you've done rather than suggesting you start from scratch.
        </p>

        {/* Oversight */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            What institutional oversight or safeguards currently apply to your research?
          </h3>
          <div className="flex flex-col gap-1">
            {OVERSIGHT_OPTIONS.map(opt => {
              const selected = safeguards.oversight.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() => toggleOversight(opt.id)}
                  className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                    selected ? 'bg-[var(--color-accent-light)]' : 'hover:bg-[var(--color-surface-warm)]'
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
                  <span className="text-[0.95rem] leading-relaxed">{opt.label}</span>
                </button>
              )
            })}
          </div>

          {noOversight && (
            <div className="mt-4 p-4 bg-[var(--color-tier-moderate-bg)] border border-[var(--color-tier-moderate)] border-opacity-30 rounded-lg">
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                Consider contacting your institution's research governance office to understand what oversight
                may apply to your work. This is especially important given the activity areas you've identified.
              </p>
            </div>
          )}
        </div>

        {/* Mitigation steps */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            Have you already taken any of the following steps?
          </h3>
          <div className="flex flex-col gap-1">
            {MITIGATION_OPTIONS.map(opt => {
              const selected = safeguards.mitigationSteps.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() => toggleMitigation(opt.id)}
                  className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                    selected ? 'bg-[var(--color-accent-light)]' : 'hover:bg-[var(--color-surface-warm)]'
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
                  <span className="text-[0.95rem] leading-relaxed">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
            &larr; Back
          </button>
          <button onClick={onNext} className="px-6 py-3 rounded-lg bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-sm hover:-translate-y-px hover:shadow-lg transition-all">
            See results &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
