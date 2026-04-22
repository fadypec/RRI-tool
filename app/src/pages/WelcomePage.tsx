import type { Mode } from '@/types/assessment'

interface WelcomePageProps {
  mode: Mode
  onSetMode: (mode: Mode) => void
  onNext: () => void
  onNavigatePrivacy: () => void
}

export function WelcomePage({ mode, onSetMode, onNext, onNavigatePrivacy }: WelcomePageProps) {
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-28 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-[3.2rem] leading-[1.15] tracking-tight mb-6">
          A structured lens for{' '}
          <br />
          <em className="text-[var(--color-accent)] italic">dual-use</em> reflection
        </h1>

        <p className="text-lg leading-relaxed text-[var(--color-ink-muted)] mb-6">
          This tool helps you think through the security and dual-use implications of your research.
          It surfaces considerations you might not have encountered and helps you articulate them
          in your grant application.
        </p>

        {/* Disclaimer notice */}
        <div className="flex gap-4 p-5 bg-[var(--color-surface-warm)] rounded-xl border-l-[3px] border-[var(--color-ink-light)] my-8">
          <span className="text-lg shrink-0 mt-0.5">&#9432;</span>
          <div className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
            <p>
              This is an independent tool developed by the Centre for Long-Term Resilience.
              It is <strong className="text-[var(--color-ink)]">not endorsed by UKRI</strong> or any other funding body.
              It is a reflection aid, not a compliance check, and does not replace institutional review.
            </p>
            <p className="mt-2">
              <strong className="text-[var(--color-ink)]">Nothing you enter is stored on our servers.</strong>{' '}
              Your assessment results exist only in your browser session.
            </p>
          </div>
        </div>

        <div className="w-10 h-0.5 bg-[var(--color-border-strong)] my-10" />

        <h2 className="font-[family-name:var(--font-display)] text-2xl mb-2">Choose your mode</h2>
        <p className="text-[var(--color-ink-muted)] mb-6">You can switch modes at any point during the assessment.</p>

        {/* Mode toggle */}
        <div role="radiogroup" aria-label="Assessment mode" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 items-stretch">
          <button
            role="radio"
            aria-checked={mode === 'naive'}
            onClick={() => onSetMode('naive')}
            className={`flex flex-col text-left p-6 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
              mode === 'naive'
                ? 'border-[var(--color-accent)] bg-gradient-to-b from-[var(--color-surface-card)] to-[var(--color-accent-light)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] hover:-translate-y-px'
            }`}
          >
            <span className="inline-block text-[0.65rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--color-tier-low-bg)] text-[var(--color-tier-low)] mb-2">
              Default
            </span>
            <div className="font-[family-name:var(--font-display)] text-xl mb-1">Standard</div>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed m-0">
              Guided questionnaire only. Your research content never leaves your machine. No AI is used.
            </p>
          </button>

          <button
            role="radio"
            aria-checked={mode === 'augmented'}
            onClick={() => onSetMode('augmented')}
            className={`flex flex-col text-left p-6 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
              mode === 'augmented'
                ? 'border-[var(--color-accent)] bg-gradient-to-b from-[var(--color-surface-card)] to-[var(--color-accent-light)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] hover:-translate-y-px'
            }`}
          >
            <span className="inline-block text-[0.65rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] mb-2">
              AI-Assisted
            </span>
            <div className="font-[family-name:var(--font-display)] text-xl mb-1">Augmented</div>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed m-0">
              Questionnaire with AI-assisted text analysis. Your text is processed but never stored.{' '}
              <button onClick={(e) => { e.stopPropagation(); onNavigatePrivacy() }} className="text-[var(--color-accent)] font-medium cursor-pointer hover:underline bg-transparent border-none p-0 inline">Privacy details &rarr;</button>
            </p>
          </button>

          <button
            role="radio"
            aria-checked={mode === 'express'}
            onClick={() => onSetMode('express')}
            className={`flex flex-col text-left p-6 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-1 ${
              mode === 'express'
                ? 'border-[var(--color-accent)] bg-gradient-to-b from-[var(--color-surface-card)] to-[var(--color-accent-light)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] hover:-translate-y-px'
            }`}
          >
            <span className="inline-block text-[0.65rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] mb-2">
              Fastest
            </span>
            <div className="font-[family-name:var(--font-display)] text-xl mb-1">Express</div>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed m-0">
              Paste your research description. AI auto-classifies and routes the assessment. You review and confirm.{' '}
              <button onClick={(e) => { e.stopPropagation(); onNavigatePrivacy() }} className="text-[var(--color-accent)] font-medium cursor-pointer hover:underline bg-transparent border-none p-0 inline">Privacy details &rarr;</button>
            </p>
          </button>
        </div>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-[var(--color-ink)] text-[var(--color-surface)] font-semibold text-base hover:-translate-y-px hover:shadow-lg transition-all"
        >
          Begin assessment &rarr;
        </button>
      </div>
    </section>
  )
}
