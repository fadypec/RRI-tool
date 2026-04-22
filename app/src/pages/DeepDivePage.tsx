import { useState } from 'react'
import { DeepDiveQuestion } from '@/components/DeepDiveQuestion'
import type { DomainBranch as DomainBranchType, Concern, SignalLevel } from '@/types/assessment'

import biologicalData from '@/data/questions/phase3_biological.json'
import synbioData from '@/data/questions/phase3_synbio.json'
import chemicalData from '@/data/questions/phase3_chemical.json'
import technologyData from '@/data/questions/phase3_technology.json'
import infohazardData from '@/data/questions/phase3_infohazard.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainData = { id: string; title: string; description: string; questions: any[] }

const DOMAIN_DATA: Record<string, DomainData> = {
  biological: biologicalData,
  synbio: synbioData,
  chemical: chemicalData,
  technology: technologyData,
  'info-hazard': infohazardData,
}

/** Map from category IDs to which specific questions they should show */
const CATEGORY_TO_QUESTIONS: Record<string, string[]> = {
  // Bio categories → biological domain questions
  'bio-agents': ['bio-organism-hazard', 'bio-australia-group', 'bio-method-transfer', 'bio-protocol-hazard'],
  'bio-pathogen': ['bio-organism-hazard', 'bio-australia-group', 'bio-gof-categories', 'bio-method-transfer', 'bio-protocol-hazard'],
  'bio-gof': ['bio-organism-hazard', 'bio-gof-categories', 'bio-method-transfer', 'bio-protocol-hazard'],
  'bio-tissue': ['bio-organism-hazard'],
  // Synbio categories
  'bio-gm': ['synbio-capability', 'synbio-gof-overlap', 'synbio-denovo', 'synbio-pathogen-transfer'],
  'bio-denovo': ['synbio-capability', 'synbio-denovo', 'synbio-pathogen-transfer'],
  // Chemical categories
  'chem-synthesis': ['chem-controlled-lists', 'chem-intermediates', 'chem-route-adapt', 'chem-novel-toxicity'],
  'chem-precursors': ['chem-controlled-lists', 'chem-intermediates'],
  'chem-toxic': ['chem-controlled-lists', 'chem-novel-toxicity'],
  'chem-dispersal': ['chem-dispersal'],
  'chem-explosives': ['chem-controlled-lists', 'chem-novel-toxicity'],
  // Tech categories → specific tech questions
  'tech-ai': ['tech-weapons', 'tech-ai-misuse'],
  'tech-robotics': ['tech-weapons', 'tech-robotics'],
  'tech-dualuse-equip': ['tech-wassenaar', 'tech-weapons'],
  'tech-nuclear': ['tech-wassenaar', 'tech-weapons'],
  'tech-materials': ['tech-wassenaar', 'tech-materials'],
  'tech-quantum': ['tech-quantum'],
  'tech-surveillance': ['tech-weapons', 'tech-surveillance'],
  'tech-cyber': ['tech-cyber'],
  'tech-info-hazard': ['info-roadmap', 'info-barrier', 'info-restricted-pub'],
  // Cross-cutting
  'cross-intl': ['tech-wassenaar'],
  'cross-military': ['tech-weapons'],
  'cross-publication': ['info-roadmap', 'info-barrier', 'info-restricted-pub'],
}

interface DeepDivePageProps {
  activeBranches: DomainBranchType[]
  selectedCategories: string[]
  onComplete: (concerns: Concern[]) => void
  onBack: () => void
}

export function DeepDivePage({ activeBranches, selectedCategories, onComplete, onBack }: DeepDivePageProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({})
  const [activeDomainIndex, setActiveDomainIndex] = useState(0)

  // Build the set of question IDs that should be shown, based on selected categories
  const activeQuestionIds = new Set<string>()
  for (const cat of selectedCategories) {
    const questionIds = CATEGORY_TO_QUESTIONS[cat]
    if (questionIds) {
      for (const qId of questionIds) activeQuestionIds.add(qId)
    }
  }

  const activeDomains = activeBranches
    .map(b => {
      const data = DOMAIN_DATA[b]
      if (!data) return null
      // Filter questions to only those relevant to selected categories
      const filteredQuestions = data.questions.filter((q: { id: string }) => activeQuestionIds.has(q.id))
      if (filteredQuestions.length === 0) return null
      return { ...data, questions: filteredQuestions }
    })
    .filter(Boolean) as DomainData[]

  if (activeDomains.length === 0) {
    // No domains active — skip to reflection
    return (
      <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
        <div className="max-w-[720px] w-full">
          <h1 className="font-[family-name:var(--font-display)] text-3xl mb-3">Deep Dive</h1>
          <p className="text-[var(--color-ink-muted)] mb-8">
            No specific activity categories were selected, so no domain-specific questions apply.
            You can proceed to the reflection step.
          </p>
          <div className="flex gap-4">
            <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm">
              &larr; Back
            </button>
            <button onClick={() => onComplete([])} className="px-6 py-3 rounded-lg bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-sm">
              Continue to reflection &rarr;
            </button>
          </div>
        </div>
      </section>
    )
  }

  const currentDomain = activeDomains[activeDomainIndex]
  const isLastDomain = activeDomainIndex === activeDomains.length - 1

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleFollowUpAnswer = (questionId: string, answer: string) => {
    setFollowUpAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNextDomain = () => {
    if (isLastDomain) {
      // Compute concerns from all answers
      const concerns = computeConcerns()
      onComplete(concerns)
    } else {
      setActiveDomainIndex(prev => prev + 1)
    }
  }

  const handlePrevDomain = () => {
    if (activeDomainIndex > 0) {
      setActiveDomainIndex(prev => prev - 1)
    } else {
      onBack()
    }
  }

  const computeConcerns = (): Concern[] => {
    const concerns: Concern[] = []
    const seenIds = new Set<string>()

    for (const domain of activeDomains) {
      for (const question of domain.questions) {
        const answer = answers[question.id]
        if (!answer) continue

        for (const rule of question.signals) {
          let matches = false
          if (rule.when === 'any-selected' && Array.isArray(answer) && answer.length > 0) {
            matches = !answer.every((a: string) => a.endsWith('-none') || a.endsWith('-no') || a.endsWith('-na'))
          } else if (typeof answer === 'string' && answer === rule.when) {
            matches = true
          } else if (Array.isArray(answer) && answer.includes(rule.when)) {
            matches = true
          }

          if (matches && !seenIds.has(rule.concernId)) {
            seenIds.add(rule.concernId)
            // Determine source: "unsure" answers → uncertain, everything else → affirmative
            const isUnsure = (typeof answer === 'string' && answer === 'unsure') ||
              rule.when === 'unsure' ||
              rule.concernId.endsWith('-unsure')
            concerns.push({
              id: rule.concernId,
              signal: rule.signal as SignalLevel,
              title: rule.concernTitle,
              description: rule.concernDescription,
              templateBlocks: rule.templateBlocks,
              source: isUnsure ? 'uncertain' : 'affirmative',
            })
          }
        }

        // Check follow-up signals
        if (question.followUp?.signals && followUpAnswers[question.id]) {
          for (const rule of question.followUp.signals) {
            if (followUpAnswers[question.id] === rule.when && !seenIds.has(rule.concernId)) {
              seenIds.add(rule.concernId)
              const isUnsure = followUpAnswers[question.id] === 'unsure' ||
                rule.concernId.endsWith('-unsure')
              concerns.push({
                id: rule.concernId,
                signal: rule.signal as SignalLevel,
                title: rule.concernTitle,
                description: rule.concernDescription,
                templateBlocks: rule.templateBlocks,
                source: isUnsure ? 'uncertain' : 'affirmative',
              })
            }
          }
        }
      }
    }

    // Sort: significant first, then moderate, then note
    const order: Record<string, number> = { significant: 0, moderate: 1, note: 2, none: 3 }
    concerns.sort((a, b) => (order[a.signal] ?? 3) - (order[b.signal] ?? 3))

    return concerns
  }

  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        {/* Domain tabs */}
        {activeDomains.length > 1 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {activeDomains.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActiveDomainIndex(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  i === activeDomainIndex
                    ? 'bg-[var(--color-accent)] text-white'
                    : i < activeDomainIndex
                    ? 'bg-[var(--color-tier-low-bg)] text-[var(--color-tier-low)]'
                    : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-light)]'
                }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        )}

        <h1 className="font-[family-name:var(--font-display)] text-3xl mb-2">
          {currentDomain.title}
        </h1>
        <p className="text-[var(--color-ink-muted)] mb-8">{currentDomain.description}</p>

        {currentDomain.questions.map(question => (
          <DeepDiveQuestion
            key={question.id}
            question={question}
            answer={answers[question.id] ?? (question.type === 'multi-select' ? [] : '')}
            followUpAnswer={followUpAnswers[question.id]}
            onAnswer={handleAnswer}
            onFollowUpAnswer={handleFollowUpAnswer}
          />
        ))}

        <div className="flex gap-4 mt-8">
          <button onClick={handlePrevDomain} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
            &larr; {activeDomainIndex > 0 ? 'Previous domain' : 'Back'}
          </button>
          <button onClick={handleNextDomain} className="px-6 py-3 rounded-lg bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-sm hover:-translate-y-px hover:shadow-lg transition-all">
            {isLastDomain ? 'Continue to reflection' : 'Next domain'} &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
