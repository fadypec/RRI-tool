import { useMemo, useRef, useState } from 'react'
import { AssessmentGrid } from '@/components/AssessmentGrid'
import { assembleTemplate, countWords, generateMarkdown } from '@/lib/templateAssembly'
import { computeConcernLevel, computePreparedness, CELL_FRAMING } from '@/lib/scoring'
import type { AssessmentResult, Concern, SafeguardResponses, Theme } from '@/types/assessment'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface ResultsPageProps {
  concerns: Concern[]
  safeguards: SafeguardResponses
  funder: string | undefined
  selectedCategories: string[]
  activeBranches: string[]
  theme: Theme
  onBack: () => void
}

export function ResultsPage({ concerns, safeguards, funder, selectedCategories, activeBranches, theme, onBack }: ResultsPageProps) {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const concernLevel = computeConcernLevel(concerns)
  const preparedness = computePreparedness(safeguards)
  const framing = CELL_FRAMING[concernLevel]?.[preparedness] ?? ''

  const result: AssessmentResult = useMemo(() => ({
    concernLevel,
    preparedness,
    concerns,
    funder,
    selectedCategories,
    activeBranches: activeBranches as AssessmentResult['activeBranches'],
  }), [concernLevel, preparedness, concerns, funder, selectedCategories, activeBranches])

  const templateText = useMemo(() => assembleTemplate(result), [result])
  const wordCount = countWords(templateText)

  const handleDownloadMd = () => {
    const md = generateMarkdown(result, templateText)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rri-steer-assessment-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadPdf = async () => {
    if (!printRef.current) return
    setPdfLoading(true)
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim() || '#faf9f6',
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth - 20
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let yOffset = 10
      let remainingHeight = imgHeight

      // Multi-page support
      while (remainingHeight > 0) {
        if (yOffset > 10) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, yOffset - (imgHeight - remainingHeight), imgWidth, imgHeight)
        remainingHeight -= (pageHeight - 20)
        yOffset = 10
      }

      pdf.save(`rri-steer-assessment-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setPdfLoading(false)
    }
  }

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(templateText)
  }

  const signalColors: Record<string, { bg: string; text: string; border: string }> = {
    significant: {
      bg: 'var(--color-tier-significant-bg)',
      text: 'var(--color-tier-significant)',
      border: 'var(--color-tier-significant)',
    },
    moderate: {
      bg: 'var(--color-tier-moderate-bg)',
      text: 'var(--color-tier-moderate)',
      border: 'var(--color-tier-moderate)',
    },
    note: {
      bg: 'var(--color-tier-low-bg)',
      text: 'var(--color-tier-low)',
      border: 'var(--color-tier-low)',
    },
  }

  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full" ref={printRef}>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl mb-2">Your Assessment</h1>
          <p className="text-[var(--color-ink-muted)]">Based on your responses across all phases</p>
        </div>

        {/* Assessment Grid */}
        <AssessmentGrid concernLevel={concernLevel} preparedness={preparedness} theme={theme} />

        {/* Framing text */}
        <p className="text-center text-sm text-[var(--color-ink-muted)] mt-6 mb-10 leading-relaxed">
          {framing}
        </p>

        {/* Why this assessment */}
        <h3 className="text-sm font-semibold tracking-wide mb-2 mt-10">Why this assessment</h3>
        <p className="text-xs text-[var(--color-ink-light)] mb-4">
          The following factors contributed to your concern level and preparedness rating.
        </p>

        {concerns.length === 0 ? (
          <div className="p-5 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl mb-6">
            <p className="text-sm text-[var(--color-ink-muted)]">
              No specific dual-use concerns were identified based on your responses. This does not guarantee
              the absence of concerns — the assessment is only as good as the information provided.
            </p>
          </div>
        ) : (
          concerns.filter(c => c.signal !== 'none').map(concern => {
            const colors = signalColors[concern.signal] ?? signalColors.note
            return (
              <div
                key={concern.id}
                className="flex gap-4 p-5 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl mb-3"
                style={{ borderLeftWidth: '3px', borderLeftColor: colors.border }}
              >
                <span
                  className="text-[0.65rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded shrink-0 h-fit"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {concern.signal}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-[0.95rem] mb-1">{concern.title}</div>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed m-0">
                    {concern.description}
                  </p>
                </div>
              </div>
            )
          })
        )}

        {/* Template output */}
        <div className="bg-[var(--color-surface-warm)] border border-[var(--color-border)] rounded-xl p-6 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold m-0">Draft RRI text</h3>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${wordCount > 500 ? 'text-[var(--color-tier-significant)]' : 'text-[var(--color-ink-light)]'}`}>
                {wordCount} / 500 words
              </span>
              <button
                onClick={handleCopyTemplate}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface)] transition-colors"
              >
                Copy to clipboard
              </button>
            </div>
          </div>
          <div className="text-[0.95rem] leading-[1.75] whitespace-pre-line">
            {templateText.split(/(\[PLACEHOLDER:[^\]]+\])/).map((part, i) => {
              if (part.startsWith('[PLACEHOLDER:')) {
                return (
                  <span key={i} className="bg-[var(--color-accent-light)] text-[var(--color-accent)] px-1 rounded text-[0.88rem] font-medium">
                    {part}
                  </span>
                )
              }
              return <span key={i}>{part}</span>
            })}
          </div>
        </div>

        {/* Broader RRI links */}
        <div className="mt-8 p-5 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl">
          <h3 className="text-sm font-semibold mb-3">Broader RRI considerations</h3>
          <p className="text-xs text-[var(--color-ink-light)] mb-3">
            For dimensions beyond dual-use and security:
          </p>
          <div className="flex flex-col gap-1.5 text-sm">
            <a href="https://tas.ac.uk/responsible-research-innovation/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">Public engagement — TAS Hub RRI Cards</a>
            <a href="https://www.ukri.org/manage-your-award/publishing-your-research-findings/making-your-research-publications-open-access/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">Open access — UKRI Policy</a>
            <a href="https://www.ukri.org/what-we-do/supporting-healthy-research-and-innovation-culture/equality-diversity-and-inclusion/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">EDI — UKRI Guidance</a>
            <a href="https://ukrio.org/research-integrity/the-concordat-to-support-research-integrity/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">Research integrity — UK Concordat</a>
            <a href="https://www.ukri.org/manage-your-award/good-research-resource-hub/environmental-sustainability/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">Environmental sustainability — UKRI Guidance</a>
            <a href="https://orbit-rri.org/tools/self-assessment-tool/" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">RRI self-reflection — ORBIT Tool</a>
          </div>
        </div>

        {/* Export bar — uses fixed dark colors so it stands out in both modes */}
        <div className="rounded-2xl p-5 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: '#1a1f2e' }}>
          <p className="text-sm m-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <strong style={{ color: '#fff' }}>Your results are not stored.</strong> Download before closing this page.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:-translate-y-px transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {pdfLoading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={handleDownloadMd}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:-translate-y-px transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Download Markdown
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-4 p-5 rounded-xl border-l-[3px] border-[var(--color-ink-light)] mt-4 bg-[var(--color-surface-card)] border border-[var(--color-border)]">
          <span className="text-lg shrink-0">&#9432;</span>
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed m-0">
            This assessment does not replace institutional review. The concern level reflects the inherent
            dual-use characteristics of your research; the preparedness axis reflects the safeguards you
            have described.
          </p>
        </div>

        {/* Feedback */}
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6 mt-8 text-center">
          <h3 className="text-sm font-semibold mb-2">Help us improve</h3>
          <p className="text-xs text-[var(--color-ink-light)] mb-4">Your feedback is anonymous and helps us refine the tool.</p>
          {feedbackGiven === null ? (
            <>
              <p className="text-sm mb-4">Did this assessment surface anything you hadn't previously considered?</p>
              <div role="radiogroup" aria-label="Feedback" className="flex gap-3 justify-center">
                <button role="radio" aria-checked={feedbackGiven === true} onClick={() => setFeedbackGiven(true)} className="px-6 py-2 rounded-lg text-sm font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-warm)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1">Yes</button>
                <button role="radio" aria-checked={feedbackGiven === false} onClick={() => setFeedbackGiven(false)} className="px-6 py-2 rounded-lg text-sm font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-warm)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1">No</button>
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--color-tier-low)]">Thank you for your feedback.</p>
          )}
        </div>

        {/* Back button */}
        <div className="mt-8">
          <button onClick={onBack} className="px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors">
            &larr; Back to safeguards
          </button>
        </div>
      </div>
    </section>
  )
}
