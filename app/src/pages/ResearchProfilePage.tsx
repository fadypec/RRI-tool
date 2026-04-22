import { useCallback, useState } from 'react'
import type { DomainBranch } from '@/types/assessment'
import categories from '@/data/questions/phase2_categories.json'

interface ResearchProfilePageProps {
  selectedCategories: string[]
  onToggleCategory: (id: string) => void
  onUpdateBranches: (branches: DomainBranch[]) => void
  onNext: () => void
  onBack: () => void
}

export function ResearchProfilePage({
  selectedCategories,
  onToggleCategory,
  onUpdateBranches,
  onNext,
  onBack,
}: ResearchProfilePageProps) {
  const [openHelp, setOpenHelp] = useState<string | null>(null)

  const handleToggle = useCallback((itemId: string) => {
    onToggleCategory(itemId)

    // Recompute active branches from the updated selection
    const newSelected = selectedCategories.includes(itemId)
      ? selectedCategories.filter(id => id !== itemId)
      : [...selectedCategories, itemId]

    const allTriggers = new Set<DomainBranch>()
    for (const group of categories) {
      for (const item of group.items) {
        if (newSelected.includes(item.id)) {
          for (const t of item.triggers) {
            allTriggers.add(t as DomainBranch)
          }
        }
      }
    }
    onUpdateBranches(Array.from(allTriggers))
  }, [selectedCategories, onToggleCategory, onUpdateBranches])

  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">
          What does your research involve?
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-8">
          Select all that apply. Each selection activates relevant assessment questions in the next step.
        </p>

        {categories.map(group => (
          <div key={group.id} className="mb-8">
            <div className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink-light)] pb-2 mb-3 border-b border-[var(--color-border)]">
              {group.title}
            </div>

            {group.items.map(item => {
              const checked = selectedCategories.includes(item.id)
              const helpVisible = openHelp === item.id
              return (
                <div key={item.id} className="mb-0.5">
                  <div className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    checked ? 'bg-[var(--color-accent-light)]' : 'hover:bg-[var(--color-surface-warm)]'
                  }`}>
                    <button
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => handleToggle(item.id)}
                      className="flex items-start gap-3 flex-1 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 rounded-lg"
                    >
                      <span className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        checked
                          ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                          : 'border-[var(--color-border-strong)] bg-[var(--color-surface-card)]'
                      }`} aria-hidden="true">
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span className="text-[0.95rem] leading-relaxed">{item.label}</span>
                    </button>
                    {item.helpText && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setOpenHelp(helpVisible ? null : item.id) }}
                        aria-expanded={helpVisible}
                        aria-label={`More information about ${item.label}`}
                        className="w-5 h-5 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 mt-0.5 text-[0.6rem] font-bold text-[var(--color-ink-light)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      >
                        ?
                      </button>
                    )}
                  </div>
                  {helpVisible && item.helpText && (
                    <div className="ml-11 mr-8 mb-2 mt-1 px-3 py-2 text-sm text-[var(--color-ink-muted)] bg-[var(--color-surface-warm)] rounded-lg leading-relaxed">
                      {item.helpText.split(/(https?:\/\/[^\s)]+)/).map((part: string, i: number) =>
                        part.match(/^https?:\/\//) ? (
                          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline break-all">{
                            // Show a short label instead of full URL
                            part.includes('opcw.org') ? 'CWC Schedules' :
                            part.includes('australia') ? 'Australia Group list' :
                            part.includes('wassenaar') ? 'Wassenaar list' :
                            part.includes('hse.gov.uk') ? 'ACDP list' :
                            'link'
                          }</a>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}

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
            Continue to deep dive &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
