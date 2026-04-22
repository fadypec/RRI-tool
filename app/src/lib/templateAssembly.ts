import type { AssessmentResult, ConcernLevel } from '@/types/assessment'

/** Template block definitions — key subset for v1.0 */
const OPENING: Record<ConcernLevel, string> = {
  low: 'We have considered the ethical and responsible research implications of the proposed work. While the research does not raise specific dual-use or security concerns, we recognise that responsible practice requires ongoing awareness of how research outcomes could be applied beyond their intended context.',
  moderate: 'We have considered the ethical and responsible research implications of the proposed work and identified areas with dual-use considerations that warrant reflection and active management. The following outlines the specific considerations identified and the measures in place to address them.',
  significant: 'The proposed research involves areas with significant dual-use and security implications, which we have carefully considered as part of our research design. We recognise that work of this nature requires robust governance and proactive risk management. The following describes the specific dual-use dimensions identified, the safeguards in place, and our approach to responsible conduct throughout the project.',
}

const CLOSING: Record<ConcernLevel, string> = {
  low: 'While no specific dual-use concerns have been identified, we remain committed to responsible research practices and will remain alert to any emerging ethical or security implications as the project progresses. Should concerns arise, we will seek appropriate guidance from our institution\'s research governance office.',
  moderate: 'We are committed to maintaining awareness of the dual-use dimensions of this research throughout the project lifecycle. We will review our risk assessment at [PLACEHOLDER: "annual intervals" / "key project milestones"] and in response to any significant changes in the research direction. Any emerging concerns will be raised with [PLACEHOLDER: appropriate institutional body] promptly.',
  significant: 'Given the significant dual-use dimensions of this work, we have embedded ongoing risk monitoring into the project management structure. Risk assessments will be reviewed [PLACEHOLDER: frequency], and we will notify [PLACEHOLDER: "our institutional biosafety committee and the funder" / "the relevant oversight bodies"] of any significant changes in risk profile. We are committed to ensuring that this research contributes to [PLACEHOLDER: positive outcome] while minimising the potential for harmful applications.',
}

const FUNDER_OVERLAYS: Record<string, string> = {
  '5-FUNDER-BBSRC-MRC': `In accordance with the BBSRC/MRC joint policy on managing risks of research misuse, we have assessed the potential for this research to be used for harmful purposes, to cause harm through accidental release, or to be targeted for malicious intent. Specifically, we have:
- Designed our study considering lower-risk alternative approaches, [PLACEHOLDER: e.g., "selecting attenuated strains where feasible" / "concluding that the chosen approach is necessary because [justification]"]
- Conducted [PLACEHOLDER: "a formal risk assessment" / "an initial risk assessment, with a full project-specific assessment planned prior to commencement"]
- Planned a responsible approach to sharing findings by [PLACEHOLDER: specific sharing strategy]`,

  '5-FUNDER-EPSRC': `Consistent with EPSRC's Framework for Responsible Innovation (AREA), we have sought to:
- **Anticipate** potential impacts of this research, by [PLACEHOLDER: specific anticipatory measures]
- **Reflect** on its wider implications, in particular [PLACEHOLDER: specific implications identified]
- **Engage** with [PLACEHOLDER: specific stakeholders]
- **Act** on these considerations by [PLACEHOLDER: specific actions taken]`,

  '5-FUNDER-WELLCOME': `In line with Wellcome's expectations for responsible conduct of research, we have considered the potential for misuse of our research outcomes and have implemented risk management measures including [PLACEHOLDER: specific measures]. We will store all research data and materials for a minimum of 10 years in accordance with Wellcome's policy, with sensitive data held under [PLACEHOLDER: specific security arrangements].`,

  '5-FUNDER-HORIZON': `This research has been assessed against the Horizon Europe ethics self-assessment framework. The dual-use dimensions identified above have been documented in the Ethics Issues Table accompanying this proposal. Specific measures to address the flagged ethics issues include [PLACEHOLDER: measures corresponding to Ethics Issues Table entries].`,
}

const SAFEGUARD_BLOCKS: Record<string, string> = {
  well_managed: 'This research operates under the oversight of [PLACEHOLDER: institutional body], which has [PLACEHOLDER: "approved the project" / "been consulted and will review the project prior to commencement"]. A formal risk assessment has been completed covering the dual-use dimensions of this project.',
  partial: '[PLACEHOLDER: specific oversight already in place]. We will additionally [PLACEHOLDER: "conduct a formal risk assessment" / "consult with a biosecurity specialist" / "seek approval from the institutional biosafety committee"] to strengthen our governance framework for this project.',
  not_addressed: 'We will engage with our institution\'s research governance office to determine what oversight mechanisms are appropriate for this work, and will seek relevant approvals prior to commencing experimental activities.',
}

export function assembleTemplate(result: AssessmentResult): string {
  const sections: string[] = []

  // 1. Opening
  sections.push(OPENING[result.concernLevel])

  // 2. Concern-specific blocks — only include affirmative concerns in the draft text.
  // "Unsure" concerns are advisory (shown in the assessment) but shouldn't appear as
  // statements in a grant application.
  if (result.concerns.length > 0) {
    const affirmativeConcerns = result.concerns
      .filter(c => c.signal !== 'none' && c.source === 'affirmative')
      .map(c => c.description)
    if (affirmativeConcerns.length > 0) {
      sections.push(affirmativeConcerns.join('\n\n'))
    }
  }

  // 3. Safeguard acknowledgment
  sections.push(SAFEGUARD_BLOCKS[result.preparedness])

  // 4. Funder overlay
  if (result.funder) {
    // Find the template overlay for this funder
    const funderOverlayId = getFunderOverlay(result.funder)
    if (funderOverlayId && FUNDER_OVERLAYS[funderOverlayId]) {
      sections.push(FUNDER_OVERLAYS[funderOverlayId])
    }
  }

  // 5. Closing
  sections.push(CLOSING[result.concernLevel])

  return sections.join('\n\n')
}

function getFunderOverlay(funderId: string): string | undefined {
  const map: Record<string, string> = {
    bbsrc: '5-FUNDER-BBSRC-MRC',
    mrc: '5-FUNDER-BBSRC-MRC',
    epsrc: '5-FUNDER-EPSRC',
    wellcome: '5-FUNDER-WELLCOME',
    horizon: '5-FUNDER-HORIZON',
  }
  return map[funderId]
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length
}

export function generateMarkdown(result: AssessmentResult, templateText: string): string {
  const lines = [
    '# RRI STEER Assessment Report',
    '',
    `**Date:** ${new Date().toLocaleDateString('en-GB')}`,
    `**Concern Level:** ${result.concernLevel.charAt(0).toUpperCase() + result.concernLevel.slice(1)}`,
    `**Preparedness:** ${result.preparedness.replace(/_/g, ' ')}`,
    '',
    '---',
    '',
    '## Concerns Identified',
    '',
  ]

  if (result.concerns.length === 0) {
    lines.push('No specific dual-use concerns were identified based on your responses.')
  } else {
    for (const concern of result.concerns) {
      lines.push(`### ${concern.title}`)
      lines.push(`**Signal:** ${concern.signal}`)
      lines.push('')
      lines.push(concern.description)
      lines.push('')
    }
  }

  lines.push('---', '', '## Draft RRI Text', '', templateText, '')
  lines.push('---', '', '*This assessment was generated by RRI STEER, an independent tool developed by the Centre for Long-Term Resilience. It is not endorsed by UKRI or any other funding body. It does not replace institutional review.*')

  return lines.join('\n')
}
