import { useEffect, useState } from 'react'
import type { Step, Theme } from '@/types/assessment'

const STEP_LABELS: Record<Step, string> = {
  welcome: 'Welcome',
  context: 'Context',
  'research-profile': 'Research Profile',
  'deep-dive': 'Deep Dive',
  reflection: 'Reflection',
  safeguards: 'Safeguards',
  results: 'Results',
}

interface StepperProps {
  steps: Step[]
  currentStep: Step
  currentStepIndex: number
  theme: Theme
  onToggleTheme: () => void
  onNavigate: (page: 'about' | 'privacy' | null) => void
}

export function Stepper({ steps, currentStep, currentStepIndex, theme, onToggleTheme, onNavigate }: StepperProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <nav role="navigation" aria-label="Assessment progress" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[var(--color-border)]"
      style={{ background: theme === 'dark' ? 'rgba(26,29,36,0.92)' : 'rgba(250,249,246,0.92)' }}>
      <div className="max-w-[960px] mx-auto flex items-center px-6 py-3">
        <div className="text-sm font-semibold tracking-widest mr-8 shrink-0 uppercase">
          RRI STEER
        </div>

        <div className="flex items-center gap-0 flex-1 overflow-hidden">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              {i > 0 && <div className="w-5 h-px bg-[var(--color-border)] mx-1 shrink-0" />}
              <div className={`flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                i < currentStepIndex ? 'text-[var(--color-tier-low)]' :
                i === currentStepIndex ? 'text-[var(--color-accent)] font-semibold' :
                'text-[var(--color-ink-light)]'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                  i < currentStepIndex ? 'bg-[var(--color-tier-low)]' :
                  i === currentStepIndex ? 'bg-[var(--color-accent)] shadow-[0_0_0_3px_rgba(196,148,58,0.12)]' :
                  'bg-[var(--color-border-strong)]'
                }`} />
                <span className="hidden sm:inline">{STEP_LABELS[step]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hamburger menu */}
        <div className="relative ml-4 shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-card)] flex flex-col items-center justify-center gap-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-warm)] transition-all"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-4 h-[1.5px] bg-[var(--color-ink-muted)] rounded-sm" />
            <span className="block w-4 h-[1.5px] bg-[var(--color-ink-muted)] rounded-sm" />
            <span className="block w-4 h-[1.5px] bg-[var(--color-ink-muted)] rounded-sm" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute top-[calc(100%+8px)] right-0 z-20 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-1 min-w-[200px] shadow-lg">
                <button
                  onClick={() => { onNavigate('about'); setMenuOpen(false) }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] rounded-md hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)] transition-colors"
                >
                  About this tool
                </button>
                <button
                  onClick={() => { onNavigate('privacy'); setMenuOpen(false) }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] rounded-md hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Privacy
                </button>
                <div className="h-px bg-[var(--color-border)] mx-2 my-1" />
                <button
                  onClick={() => { onToggleTheme(); setMenuOpen(false) }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] rounded-md hover:bg-[var(--color-surface-warm)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {theme === 'light' ? 'Switch to night mode' : 'Switch to day mode'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
