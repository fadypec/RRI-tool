interface AboutPageProps {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-4xl mb-6">About RRI STEER</h1>

        <div className="space-y-6 text-[var(--color-ink-muted)] leading-relaxed">
          <p>
            RRI STEER — <strong>S</strong>ecurity <strong>T</strong>hinking for <strong>E</strong>thical and <strong>E</strong>ffective <strong>R</strong>esearch — is a structured reflection tool that helps academic researchers identify
            and think through the dual-use and security implications of their research. It is designed
            primarily for UK-based PIs writing grant applications, but is useful for any researcher
            who wants to consider how their work might be misused.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">What it does</h2>
          <p>
            The tool guides you through a structured assessment that identifies potential dual-use
            concerns based on the materials, methods, and technologies in your research. It then
            helps you articulate these considerations in the ethics/RRI section of your grant
            application, using template text that you adapt to your specific situation.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">What it doesn't do</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>It does not replace institutional review (ethics committees, biosafety committees, export control review)</li>
            <li>It does not provide authoritative compliance assessment</li>
            <li>It does not store any information about you or your research</li>
            <li>It is not endorsed by UKRI or any other funding body</li>
          </ul>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Who built it</h2>
          <p>
            RRI STEER was built by{' '}
            <a href="https://fady.phd" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
              Dr Paul-Enguerrand Fady
            </a>{' '}
            at the{' '}
            <a href="https://www.longtermresilience.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
              Centre for Long-Term Resilience
            </a>{' '}
            (CLTR), an independent non-profit think-tank based in London that works to strengthen
            global resilience against extreme risks. This tool is part of CLTR's work on responsible
            innovation and biosecurity.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Open source</h2>
          <p>
            RRI STEER is open source under the Apache 2.0 licence. The source code, risk
            taxonomies, and assessment logic are all publicly available and auditable.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Feedback</h2>
          <p>
            We welcome feedback on the tool's usefulness, accuracy, and coverage. If you find
            that the tool missed something important, or surfaced something that wasn't relevant,
            please let us know — this helps us improve the assessment for all researchers.
          </p>
        </div>

        <button
          onClick={onBack}
          className="mt-10 px-6 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] font-semibold text-sm hover:bg-[var(--color-surface-warm)] transition-colors"
        >
          &larr; Back to assessment
        </button>
      </div>
    </section>
  )
}
