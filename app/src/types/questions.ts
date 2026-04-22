import type { SignalLevel } from './assessment'

/** A single question in a deep-dive domain */
export interface DeepDiveQuestion {
  id: string
  text: string
  helpText?: string
  type: 'yes-no-unsure' | 'multi-select' | 'autocomplete' | 'free-text'
  /** For multi-select type */
  options?: { id: string; label: string; signal: SignalLevel }[]
  /** Signal rules based on answer */
  signals: SignalRule[]
  /** Follow-up question shown conditionally */
  followUp?: {
    condition: 'yes' | 'unsure' | 'any-selected'
    text: string
    type: 'yes-no-unsure' | 'free-text'
    signals?: SignalRule[]
  }
}

export interface SignalRule {
  /** Which answer triggers this signal */
  when: string
  /** The signal level produced */
  signal: SignalLevel
  /** Concern ID for the scoring engine */
  concernId: string
  /** Human-readable concern title */
  concernTitle: string
  /** Description shown in results */
  concernDescription: string
  /** Template blocks triggered */
  templateBlocks: string[]
}

/** A complete domain branch */
export interface DomainBranch {
  id: string
  title: string
  description: string
  questions: DeepDiveQuestion[]
}
