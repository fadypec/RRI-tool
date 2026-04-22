interface PrivacyPageProps {
  onBack: () => void
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <section className="min-h-screen flex flex-col items-center px-6 pt-20 pb-16">
      <div className="max-w-[720px] w-full">
        <h1 className="font-[family-name:var(--font-display)] text-4xl mb-6">Privacy</h1>

        <div className="space-y-6 text-[var(--color-ink-muted)] leading-relaxed">
          <p className="text-lg text-[var(--color-ink)]">
            RRI STEER is designed to protect your research and your privacy.
            Here's exactly what happens with your data in each mode.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Standard mode</h2>
          <div className="p-5 bg-[var(--color-tier-low-bg)] border border-[var(--color-tier-low)] border-opacity-30 rounded-xl">
            <p className="font-semibold text-[var(--color-tier-low)] mb-2">Your research content never leaves your device.</p>
            <p className="m-0">
              In standard mode, the tool runs entirely in your browser. Your questionnaire
              answers are processed locally. No data is sent to any server. No AI is used.
              When you close the tab, everything is gone.
            </p>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Augmented and Express modes</h2>
          <p>
            In augmented and express modes, text you choose to share is sent to our server,
            which forwards it to the Anthropic API for classification and extraction. Here's
            what that means:
          </p>

          <h3 className="font-semibold text-[var(--color-ink)] mt-4">What is sent</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Only the specific text you paste or type into the augmented/express input fields</li>
            <li>Nothing else from your assessment — not your questionnaire answers, not your selected categories, not your safeguard responses</li>
          </ul>

          <h3 className="font-semibold text-[var(--color-ink)] mt-4">How it is processed</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Your text is sent to the{' '}
              <a href="https://docs.anthropic.com/en/docs/about-claude/models" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Anthropic API</a>{' '}
              (Claude Haiku) for classification and entity extraction</li>
            <li>The API returns structured data (categories, organisms, chemicals, risk levels) — not generated text</li>
            <li>The structured data is used to populate your assessment, then discarded</li>
          </ul>

          <h3 className="font-semibold text-[var(--color-ink)] mt-4">What is NOT done with your text</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Not stored</strong> — your text is not retained on our server or by Anthropic after processing</li>
            <li><strong>Not used for training</strong> — Anthropic's API terms explicitly state that customer data submitted via the API is not used to train their models (<a href="https://www.anthropic.com/policies/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Anthropic Privacy Policy</a>)</li>
            <li><strong>Not logged</strong> — our server does not log request bodies</li>
            <li><strong>Not shared</strong> — your text is not shared with any third party other than Anthropic for processing</li>
          </ul>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Assessment results</h2>
          <p>
            Your assessment results (the grid position, identified concerns, draft text) exist only
            in your browser session. They are not stored on any server. When you close the tab, they
            are permanently gone unless you have downloaded them.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">Anonymous feedback</h2>
          <p>
            If you choose to answer the feedback question at the end of the assessment ("Did this
            surface anything you hadn't considered?"), only your yes/no answer is recorded — no
            information about your research, your assessment, or your identity.
          </p>

          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] mt-8">No accounts, no tracking</h2>
          <p>
            RRI STEER does not require user accounts, does not use cookies for tracking, and
            does not collect analytics beyond the optional feedback question. The only local storage
            used is your day/night mode preference.
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
