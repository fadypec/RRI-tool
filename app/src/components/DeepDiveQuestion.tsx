import { useState } from 'react'

interface QuestionOption {
  id: string
  label: string
  signal: string
}

interface QuestionData {
  id: string
  text: string
  helpText?: string
  type: 'yes-no-unsure' | 'multi-select' | 'free-text'
  options?: QuestionOption[]
  followUp?: {
    condition: string
    text: string
    type: string
    signals?: unknown[]
  }
}

interface Props {
  question: QuestionData
  answer: string | string[]
  followUpAnswer?: string
  onAnswer: (questionId: string, answer: string | string[]) => void
  onFollowUpAnswer?: (questionId: string, answer: string) => void
}

export function DeepDiveQuestion({ question, answer, followUpAnswer, onAnswer, onFollowUpAnswer }: Props) {
  const [helpOpen, setHelpOpen] = useState(false)

  const showFollowUp = question.followUp && (
    (question.followUp.condition === 'yes' && answer === 'yes') ||
    (question.followUp.condition === 'unsure' && answer === 'unsure') ||
    (question.followUp.condition === 'any-selected' && Array.isArray(answer) && answer.length > 0 &&
      !answer.every(a => a.endsWith('-no') || a.endsWith('-none') || a.endsWith('-na')))
  )

  return (
    <div className="mb-8 p-5 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl">
      <div className="flex items-start gap-2 mb-4">
        <p className="text-[0.95rem] font-medium leading-relaxed flex-1">{question.text}</p>
        {question.helpText && (
          <button
            onClick={() => setHelpOpen(!helpOpen)}
            aria-expanded={helpOpen}
            aria-label="More information"
            className="text-xs font-semibold text-[var(--color-ink-light)] hover:text-[var(--color-accent)] shrink-0 w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-colors"
          >
            ?
          </button>
        )}
      </div>

      {helpOpen && question.helpText && (
        <div className="text-sm text-[var(--color-ink-muted)] bg-[var(--color-surface-warm)] p-3 rounded-lg mb-4 leading-relaxed">
          {question.helpText.split(/(https?:\/\/[^\s)]+)/).map((part, i) =>
            part.match(/^https?:\/\//) ? (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline break-all">{part}</a>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      )}

      {/* Yes / No / Unsure */}
      {question.type === 'yes-no-unsure' && (
        <div className="flex gap-2" role="radiogroup" aria-label={question.text}>
          {(['yes', 'no', 'unsure'] as const).map(opt => (
            <button
              key={opt}
              role="radio"
              aria-checked={answer === opt}
              onClick={() => onAnswer(question.id, opt)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 ${
                answer === opt
                  ? 'bg-[var(--color-accent)] text-white shadow-sm'
                  : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-muted)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Multi-select */}
      {question.type === 'multi-select' && question.options && (
        <div className="flex flex-col gap-1" role="group" aria-label={question.text}>
          {question.options.map(opt => {
            const selected = Array.isArray(answer) && answer.includes(opt.id)
            return (
              <button
                key={opt.id}
                role="checkbox"
                aria-checked={selected}
                onClick={() => {
                  const current = Array.isArray(answer) ? answer : []
                  const next = selected
                    ? current.filter(id => id !== opt.id)
                    : [...current, opt.id]
                  onAnswer(question.id, next)
                }}
                className={`flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
                  selected ? 'bg-[var(--color-accent-light)]' : 'hover:bg-[var(--color-surface-warm)]'
                }`}
              >
                <span className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  selected
                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                    : 'border-[var(--color-border-strong)] bg-[var(--color-surface-card)]'
                }`} aria-hidden="true">
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-sm leading-relaxed">{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Free text */}
      {question.type === 'free-text' && (
        <textarea
          value={typeof answer === 'string' ? answer : ''}
          onChange={e => onAnswer(question.id, e.target.value)}
          placeholder="Describe briefly..."
          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-warm)] text-sm leading-relaxed min-h-[80px] resize-y focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      )}

      {/* Follow-up */}
      {showFollowUp && question.followUp && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-[var(--color-accent-light)]">
          <p className="text-sm font-medium mb-3 text-[var(--color-ink-muted)]">{question.followUp.text}</p>
          {question.followUp.type === 'yes-no-unsure' && (
            <div className="flex gap-2" role="radiogroup" aria-label={question.followUp.text}>
              {(['yes', 'no', 'unsure'] as const).map(opt => (
                <button
                  key={opt}
                  role="radio"
                  aria-checked={followUpAnswer === opt}
                  onClick={() => onFollowUpAnswer?.(question.id, opt)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 ${
                    followUpAnswer === opt
                      ? 'bg-[var(--color-accent)] text-white shadow-sm'
                      : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-muted)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
