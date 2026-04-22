import type { Concern, ConcernLevel, Preparedness, SafeguardResponses } from '@/types/assessment'

export function computeConcernLevel(concerns: Concern[]): ConcernLevel {
  // Separate affirmative (from "yes") vs uncertain (from "unsure") concerns
  const affirmative = concerns.filter(c => c.source === 'affirmative')
  const hasAffirmativeSignificant = affirmative.some(c => c.signal === 'significant')
  const affirmativeModerateCount = affirmative.filter(c => c.signal === 'moderate').length

  const allModerateCount = concerns.filter(c => c.signal === 'moderate').length
  const noteCount = concerns.filter(c => c.signal === 'note').length

  // Affirmative significant signal → significant
  if (hasAffirmativeSignificant) return 'significant'

  // Two+ affirmative moderate signals → significant (cross-domain accumulation)
  if (affirmativeModerateCount >= 2) return 'significant'

  // One affirmative concerning signal + unsure signals → can escalate to significant
  if (affirmativeModerateCount >= 1 && allModerateCount >= 2) return 'significant'

  // Any moderate signal (affirmative or uncertain) → moderate
  // But unsure-only (no affirmative) CAPS at moderate, never reaches significant
  if (allModerateCount >= 1 || noteCount >= 3) return 'moderate'

  return 'low'
}

export function computePreparedness(safeguards: SafeguardResponses): Preparedness {
  const hasOversight = safeguards.oversight.length > 0 &&
    !safeguards.oversight.includes('none') &&
    !safeguards.oversight.includes('unsure')

  const hasMitigation = safeguards.mitigationSteps.length > 0 &&
    !safeguards.mitigationSteps.includes('none')

  const hasRiskAssessment = safeguards.mitigationSteps.includes('risk-assessment')

  // Well-managed: relevant oversight + multiple mitigation steps including risk assessment
  if (hasOversight && hasMitigation && hasRiskAssessment) {
    return 'well_managed'
  }

  // Partial: some oversight OR some mitigation
  if (hasOversight || hasMitigation) {
    return 'partial'
  }

  return 'not_addressed'
}

/** Grid cell labels */
export const GRID_LABELS: Record<string, Record<string, string>> = {
  significant: {
    not_addressed: 'Seek specialist\nadvice',
    partial: 'Strengthen\nsafeguards',
    well_managed: 'Strong\ngovernance',
  },
  moderate: {
    not_addressed: 'Action\nneeded',
    partial: 'On\ntrack',
    well_managed: 'Well-\ndocumented',
  },
  low: {
    not_addressed: 'Routine\nawareness',
    partial: 'Good\nstanding',
    well_managed: 'Exemplary',
  },
}

/** Framing text for each cell */
export const CELL_FRAMING: Record<string, Record<string, string>> = {
  significant: {
    not_addressed: 'Your research has significant dual-use dimensions. We recommend seeking specialist advice before proceeding.',
    partial: "You've taken some important steps. Additional oversight would strengthen your position.",
    well_managed: 'Your research has significant dual-use dimensions, which you have proactively addressed. This demonstrates strong research governance practice.',
  },
  moderate: {
    not_addressed: 'Dual-use considerations identified. Consider discussing with your institution\'s research governance office.',
    partial: "You've begun addressing these. The following may help you complete the picture.",
    well_managed: "You've proactively addressed these concerns. Here's how to document them in your RRI section.",
  },
  low: {
    not_addressed: 'No specific concerns identified. General good practice guidance applies.',
    partial: 'No specific concerns, and you\'ve already taken positive steps.',
    well_managed: 'No specific concerns, and your oversight is exemplary. Here\'s how to document this.',
  },
}
