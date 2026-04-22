import { useState, useCallback } from 'react'
import type {
  Mode,
  Step,
  DomainBranch,
  Concern,
  SafeguardResponses,
} from '@/types/assessment'

const STEPS: Step[] = [
  'welcome',
  'context',
  'research-profile',
  'deep-dive',
  'reflection',
  'safeguards',
  'results',
]

export function useAssessment() {
  const [mode, setMode] = useState<Mode>('naive')
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [funder, setFunder] = useState<string | undefined>()
  const [grantStage, setGrantStage] = useState<string | undefined>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeBranches, setActiveBranches] = useState<DomainBranch[]>([])
  const [concerns, setConcerns] = useState<Concern[]>([])
  const [safeguards, setSafeguards] = useState<SafeguardResponses>({
    oversight: [],
    mitigationSteps: [],
  })

  const currentStepIndex = STEPS.indexOf(currentStep)

  const nextStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep)
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1])
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep)
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1])
    }
  }, [currentStep])

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories(prev => {
      const next = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
      return next
    })

    // Recompute active branches from all selected categories
    // This is handled in the component that calls toggleCategory
  }, [])

  const updateActiveBranches = useCallback((branches: DomainBranch[]) => {
    setActiveBranches(branches)
  }, [])

  return {
    // State
    mode,
    currentStep,
    currentStepIndex,
    funder,
    grantStage,
    selectedCategories,
    activeBranches,
    concerns,
    safeguards,
    steps: STEPS,

    // Actions
    setMode,
    setSelectedCategories,
    nextStep,
    prevStep,
    setFunder,
    setGrantStage,
    toggleCategory,
    updateActiveBranches,
    setConcerns,
    setSafeguards,
  }
}
