/** The three operating modes of the tool */
export type Mode = 'naive' | 'augmented' | 'express'

/** Theme preference */
export type Theme = 'light' | 'dark'

/** Which step the user is on */
export type Step =
  | 'welcome'
  | 'context'
  | 'research-profile'
  | 'deep-dive'
  | 'reflection'
  | 'safeguards'
  | 'results'

/** Activity/material categories from Phase 2 */
export interface CategoryGroup {
  id: string
  title: string
  items: CategoryItem[]
}

export interface CategoryItem {
  id: string
  label: string
  helpText?: string
  /** Which Phase 3 domain branches this triggers */
  triggers: DomainBranch[]
}

/** The domain-specific deep dive branches */
export type DomainBranch =
  | 'biological'
  | 'synbio'
  | 'chemical'
  | 'technology'
  | 'info-hazard'

/** Signal strength from an individual question */
export type SignalLevel = 'none' | 'note' | 'moderate' | 'significant'

/** A concern identified during the assessment */
export interface Concern {
  id: string
  signal: SignalLevel
  title: string
  description: string
  /** Which template blocks this concern triggers */
  templateBlocks: string[]
  /** Whether this concern came from an affirmative "yes" or an "unsure" answer */
  source: 'affirmative' | 'uncertain'
}

/** The two-axis result */
export type ConcernLevel = 'low' | 'moderate' | 'significant'
export type Preparedness = 'not_addressed' | 'partial' | 'well_managed'

export interface AssessmentResult {
  concernLevel: ConcernLevel
  preparedness: Preparedness
  concerns: Concern[]
  /** Which funder was selected (if any) */
  funder?: string
  /** Which categories were selected in Phase 2 */
  selectedCategories: string[]
  /** Which domain branches were activated */
  activeBranches: DomainBranch[]
}

/** A funder option */
export interface FunderOption {
  id: string
  label: string
  /** Which template overlay to use */
  templateOverlay?: string
}

/** Phase 5: safeguards */
export interface SafeguardResponses {
  oversight: string[]
  mitigationSteps: string[]
}
