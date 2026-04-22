import { useState, useEffect } from 'react'
import { useAssessment } from '@/hooks/useAssessment'
import { useTheme } from '@/hooks/useTheme'
import { Stepper } from '@/components/Stepper'
import { WelcomePage } from '@/pages/WelcomePage'
import { ContextPage } from '@/pages/ContextPage'
import { ResearchProfilePage } from '@/pages/ResearchProfilePage'
import { DeepDivePage } from '@/pages/DeepDivePage'
import { ReflectionPage } from '@/pages/ReflectionPage'
import { SafeguardsPage } from '@/pages/SafeguardsPage'
import { ResultsPage } from '@/pages/ResultsPage'
import { AboutPage } from '@/pages/AboutPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { ExpressPage } from '@/pages/ExpressPage'
import type { DomainBranch } from '@/types/assessment'
import './index.css'

export default function App() {
  const assessment = useAssessment()
  const { theme, toggleTheme } = useTheme()
  const [overlayPage, setOverlayPage] = useState<'about' | 'privacy' | null>(null)

  // Warn before leaving when the user has progressed past the welcome page
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (assessment.currentStepIndex > 0) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [assessment.currentStepIndex])

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Stepper
        steps={assessment.steps}
        currentStep={assessment.currentStep}
        currentStepIndex={assessment.currentStepIndex}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={setOverlayPage}
      />

      <main className="pt-16">
        {overlayPage === 'about' && (
          <AboutPage onBack={() => setOverlayPage(null)} />
        )}
        {overlayPage === 'privacy' && (
          <PrivacyPage onBack={() => setOverlayPage(null)} />
        )}

        {!overlayPage && assessment.currentStep === 'welcome' && (
          <WelcomePage
            mode={assessment.mode}
            onSetMode={assessment.setMode}
            onNext={assessment.nextStep}
            onNavigatePrivacy={() => setOverlayPage('privacy')}
          />
        )}

        {!overlayPage && assessment.currentStep === 'context' && (
          <ContextPage
            funder={assessment.funder}
            grantStage={assessment.grantStage}
            onSetFunder={assessment.setFunder}
            onSetGrantStage={assessment.setGrantStage}
            onNext={assessment.nextStep}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'research-profile' && assessment.mode !== 'express' && (
          <ResearchProfilePage
            selectedCategories={assessment.selectedCategories}
            onToggleCategory={assessment.toggleCategory}
            onUpdateBranches={assessment.updateActiveBranches}
            onNext={assessment.nextStep}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'research-profile' && assessment.mode === 'express' && (
          <ExpressPage
            onComplete={(cats: string[], branches: DomainBranch[]) => {
              // Set categories and branches from express analysis, then skip to deep-dive
              for (const cat of cats) {
                if (!assessment.selectedCategories.includes(cat)) {
                  assessment.toggleCategory(cat)
                }
              }
              assessment.updateActiveBranches(branches)
              // Replace selected categories wholesale
              // Use a small hack: clear and re-set
              assessment.setSelectedCategories(cats)
              assessment.nextStep()
            }}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'deep-dive' && (
          <DeepDivePage
            activeBranches={assessment.activeBranches}
            selectedCategories={assessment.selectedCategories}
            onComplete={(concerns) => {
              assessment.setConcerns(concerns)
              assessment.nextStep()
            }}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'reflection' && (
          <ReflectionPage
            activeBranches={assessment.activeBranches}
            mode={assessment.mode}
            onSetMode={assessment.setMode}
            onNext={assessment.nextStep}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'safeguards' && (
          <SafeguardsPage
            safeguards={assessment.safeguards}
            onUpdate={assessment.setSafeguards}
            onNext={assessment.nextStep}
            onBack={assessment.prevStep}
          />
        )}

        {!overlayPage && assessment.currentStep === 'results' && (
          <ResultsPage
            concerns={assessment.concerns}
            safeguards={assessment.safeguards}
            funder={assessment.funder}
            selectedCategories={assessment.selectedCategories}
            activeBranches={assessment.activeBranches}
            theme={theme}
            onBack={assessment.prevStep}
          />
        )}
      </main>
    </div>
  )
}
