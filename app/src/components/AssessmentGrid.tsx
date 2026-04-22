import React from 'react'
import type { ConcernLevel, Preparedness, Theme } from '@/types/assessment'
import { GRID_LABELS } from '@/lib/scoring'

interface Props {
  concernLevel: ConcernLevel
  preparedness: Preparedness
  theme: Theme
}

const CONCERN_LEVELS: ConcernLevel[] = ['significant', 'moderate', 'low']
const PREPAREDNESS_LEVELS: Preparedness[] = ['not_addressed', 'partial', 'well_managed']
const PREPAREDNESS_LABELS: Record<Preparedness, string> = {
  not_addressed: 'Not addressed',
  partial: 'Partially',
  well_managed: 'Well-managed',
}

/** Day mode cell colors */
const DAY_COLORS: Record<string, { bg: string; text: string }> = {
  'significant-not_addressed': { bg: '#e89898', text: '#4a1a1a' },
  'significant-partial':       { bg: '#e8be80', text: '#4a3010' },
  'significant-well_managed':  { bg: '#88c498', text: '#1a3a22' },
  'moderate-not_addressed':    { bg: '#dca870', text: '#3e2810' },
  'moderate-partial':          { bg: '#ccc478', text: '#3a3810' },
  'moderate-well_managed':     { bg: '#6cb888', text: '#14382a' },
  'low-not_addressed':         { bg: '#bab470', text: '#34320e' },
  'low-partial':               { bg: '#80b468', text: '#1e3410' },
  'low-well_managed':          { bg: '#4ca870', text: '#0e3020' },
}

/** Night mode cell colors */
const NIGHT_COLORS: Record<string, { bg: string; text: string }> = {
  'significant-not_addressed': { bg: '#7a3030', text: '#f0c8c8' },
  'significant-partial':       { bg: '#7a5520', text: '#f0dab0' },
  'significant-well_managed':  { bg: '#286838', text: '#b0e0c0' },
  'moderate-not_addressed':    { bg: '#6a4418', text: '#ecd4a8' },
  'moderate-partial':          { bg: '#5e5818', text: '#e0dca0' },
  'moderate-well_managed':     { bg: '#1a5c40', text: '#98d8b8' },
  'low-not_addressed':         { bg: '#505018', text: '#d8d498' },
  'low-partial':               { bg: '#2a5c22', text: '#b0dc98' },
  'low-well_managed':          { bg: '#147040', text: '#88e0a8' },
}

export function AssessmentGrid({ concernLevel, preparedness, theme }: Props) {
  const isDark = theme === 'dark'
  const colorMap = isDark ? NIGHT_COLORS : DAY_COLORS

  return (
    <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-center text-[var(--color-ink-light)] text-sm font-medium mb-6">
        Concern Level vs. Preparedness
      </h3>

      <div className="flex items-center justify-center gap-0">
        {/* Y-axis title */}
        <div
          className="text-[0.65rem] font-semibold tracking-widest uppercase text-[var(--color-ink-light)] mr-3 shrink-0"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          Concern Level
        </div>

        {/* Grid */}
        <div>
          <div
            className="grid gap-[5px]"
            style={{ gridTemplateColumns: 'auto repeat(3, minmax(100px, 140px))' }}
          >
            {CONCERN_LEVELS.map((cl) => (
              <React.Fragment key={`row-${cl}`}>
                {/* Y-axis tick */}
                <div className="flex items-center justify-end pr-3 text-xs font-medium text-[var(--color-ink-muted)] capitalize">
                  {cl}
                </div>

                {PREPAREDNESS_LEVELS.map(prep => {
                  const isActive = cl === concernLevel && prep === preparedness
                  const key = `${cl}-${prep}`
                  const colors = colorMap[key]
                  const label = GRID_LABELS[cl]?.[prep] ?? ''

                  return (
                    <div
                      key={key}
                      className="relative rounded-xl grid place-items-center text-center transition-all duration-500 whitespace-pre-line px-2 py-3"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        opacity: isActive ? 1 : 0.45,
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.78rem',
                        lineHeight: '1.5',
                        minHeight: '90px',
                        animation: isActive ? 'spotlight-pulse 2.5s ease-in-out infinite' : 'none',
                        boxShadow: isActive ? `0 0 20px 4px ${colors.bg}40` : 'none',
                      }}
                    >
                      {label}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}

            {/* X-axis labels */}
            <div /> {/* empty corner */}
            {PREPAREDNESS_LEVELS.map(prep => (
              <div key={`xlabel-${prep}`} className="text-center pt-2 text-xs font-medium text-[var(--color-ink-muted)]">
                {PREPAREDNESS_LABELS[prep]}
              </div>
            ))}
          </div>

          {/* X-axis title */}
          <div className="text-center mt-2 text-[0.65rem] font-semibold tracking-widest uppercase text-[var(--color-ink-light)]">
            Preparedness
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spotlight-pulse {
          0%, 100% { box-shadow: 0 0 0 0 transparent; transform: scale(1); }
          50% { box-shadow: 0 0 24px 4px currentColor; transform: scale(1.03); }
        }
      `}</style>
    </div>
  )
}
