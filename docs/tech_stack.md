# Tech Stack

Chosen for simplicity, handoff-readiness, and alignment with the developer's existing infrastructure.

---

## Architecture: Single-Service Deployment

```
┌─────────────────────────────────────────────┐
│                  Railway                     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │          Node.js Service            │    │
│  │                                     │    │
│  │  Express server                     │    │
│  │  ├── Serves static frontend (Vite)  │    │
│  │  └── /api/analyze endpoint          │    │
│  │       └── Proxies to Anthropic API  │    │
│  │           (API key stays server-    │    │
│  │            side, never exposed)     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │        Supabase (optional)          │    │
│  │  One table: anonymous feedback      │    │
│  │  + session count for usage metrics  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘

Browser (client-side only):
├── Questionnaire logic and branching
├── Scoring engine (all computation in-browser)
├── Assessment grid visualisation (SVG)
├── Template assembly (string interpolation from JSON)
├── PDF export (client-side generation)
└── Optional: calls /api/analyze for augmented mode only
```

One repo. One Railway service. One deployment. The Express server is ~30 lines of code — it serves the Vite build output as static files and exposes a single API endpoint for the Anthropic proxy.

---

## Frontend

| Choice | Rationale |
|--------|-----------|
| **React** | Most widely known frontend framework. Maximises the pool of developers who can maintain this after handoff. University IT teams and UKRI developers are more likely to have React experience than Svelte or Vue. |
| **Vite** | Modern, fast build tool. Industry standard for React projects. Zero-config for most use cases. Builds to static files that Express serves directly. |
| **TypeScript** | Type safety helps maintainability and handoff. The questionnaire branching logic and scoring engine benefit from explicit types. |
| **Tailwind CSS** | Utility-first CSS framework. Fast to develop, consistent styling, widely known. No custom CSS files to maintain. |
| **shadcn/ui** | Component library built on Tailwind + Radix UI. Provides accessible, polished components (buttons, dialogs, toggles, comboboxes, cards, progress indicators) out of the box. Importantly, shadcn/ui is *copied into your codebase* as source files, not installed as a package — so there's no dependency to break on handoff. |

### Key Frontend Libraries

| Library | Purpose | Why this one |
|---------|---------|--------------|
| **react-hook-form** | Multi-step questionnaire with branching | Lightweight, performant, good for complex multi-step forms. Handles conditional fields well. |
| **shadcn/ui Combobox** (built on cmdk) | Searchable autocomplete for organism/chemical lookups (Phase 3A.1, 3C.1) | Accessible, keyboard-navigable, built into shadcn/ui. Searches against local JSON data — no API call needed. |
| **Custom SVG component** | 2D assessment grid (Concern Level vs Preparedness) | The grid is simple enough (3x3 with a dot and colour gradient) that a charting library would be overkill. A React component rendering inline SVG is ~100 lines, zero dependencies, fully customisable. |
| **jsPDF + html2canvas** | Client-side PDF export | Generates PDF entirely in the browser. No server round-trip, no data exposure. Captures the assessment result page as rendered. |
| **Markdown export** | Alternative to PDF | Simple string construction from the assessment results. Uses the same template assembly logic as the on-screen output. No library needed. |

---

## Backend (Minimal)

| Choice | Rationale |
|--------|-----------|
| **Express** | The thinnest possible Node.js server. One file. Serves static files + one API route. Universally understood. |
| **Single endpoint: POST /api/analyze** | Receives text from augmented mode, forwards to Anthropic API with the appropriate system prompt, returns structured response. API key stored as Railway environment variable, never exposed to the client. |
| **No database for core functionality** | The app is ephemeral by design. No sessions, no user accounts, no stored assessments. |

The entire backend is approximately:

```
express()
  .use(express.static('dist'))       // serve Vite build
  .use(express.json())
  .post('/api/analyze', async (req, res) => {
    // Forward to Anthropic, return structured response
  })
  .get('*', (req, res) => {
    res.sendFile('dist/index.html')   // SPA fallback
  })
  .listen(PORT)
```

---

## Supabase (Optional — Feedback + Analytics Only)

The core app does NOT need Supabase. However, since the developer already has a Supabase account, it can be used for two lightweight purposes:

1. **Anonymous session counting** — one row inserted per completed assessment (no user data, just a timestamp and the tier result). Satisfies success criterion #3 ("at least 10 users").
2. **Feedback collection** — stores the post-assessment feedback responses ("Did this surface anything new? Did it miss anything?").

**One table, two columns of note:**

```sql
create table assessments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  concern_level text,         -- 'low' | 'moderate' | 'significant'
  preparedness text,          -- 'not_addressed' | 'partial' | 'well_managed'
  domains_selected text[],    -- which activity categories were selected
  surfaced_new boolean,       -- feedback: did it surface anything new?
  missed_anything text,       -- feedback: free text (optional)
  mode text                   -- 'naive' | 'augmented'
);
```

**No user-identifying information. No research content. No assessment details.** Just aggregate-level data for measuring impact.

If Supabase feels like unnecessary complexity, this can be replaced with a simple JSON log file on Railway, or dropped entirely. The core app functions identically without it.

---

## Risk Taxonomy Data

Stored as JSON files in the repo under `data/taxonomies/`:

```
data/
  taxonomies/
    acdp_hazard_groups.json        # ACDP Approved List of Biological Agents
    australia_group_bio.json        # Australia Group biological agents
    australia_group_chem.json       # Australia Group chemical precursors
    cwc_schedules.json              # CWC Scheduled Chemicals (1, 2, 3)
    wassenaar_dual_use.json         # Wassenaar Arrangement dual-use items
  templates/
    writing_templates.json          # Pre-written paragraph templates for assembly
    funder_guidance.json            # Council-specific supplementary guidance
  questions/
    phase2_categories.json          # Activity/material selection options
    phase3a_biological.json         # Biological agents question set
    phase3b_synbio.json             # Genetic modification question set
    phase3c_chemical.json           # Chemical hazards question set
    phase3d_technology.json         # Technology question set
    phase3e_infohazard.json         # Information hazards question set
    phase4_reflection.json          # Misuse reflection prompts
    phase5_safeguards.json          # Existing safeguards options
  scoring/
    scoring_rules.json              # Scoring rules for each question
    tier_thresholds.json            # Aggregation rules for concern level
```

All assessment logic is driven by these data files. The application code reads them and applies generic branching/scoring logic. This means:
- Taxonomies can be updated without touching application code
- New domains can be added by creating new question JSON files
- Scoring rules can be adjusted without redeploying the frontend
- Handoff recipients can update content without understanding React

---

## Hosting & Deployment

| Aspect | Detail |
|--------|--------|
| **Platform** | Railway (railway.app) |
| **Plan** | Hobby ($5/month, includes $5 credit — likely covers full usage) |
| **App sleeping** | Enabled. Service sleeps after 10 min of inactivity, wakes on next request. Cold start ~2-3s. Acceptable for a PoC. |
| **Environment variables** | `ANTHROPIC_API_KEY` (required for augmented mode), `SUPABASE_URL` + `SUPABASE_ANON_KEY` (optional, for feedback) |
| **Deployment** | Auto-deploy from GitHub on push to main. Railway detects Node.js, runs `npm run build`, starts the Express server. |
| **Custom domain** | Railway supports custom domains. Could use a CLTR subdomain if desired. |
| **Handoff** | "Deploy on Railway" button in README. Receiving org clones repo, clicks button, sets one env var (`ANTHROPIC_API_KEY`), done. Also runs on any Node.js-capable platform (Render, Fly.io, a VPS, etc.) with zero Railway-specific code. |

### Estimated Monthly Cost

| Component | Cost |
|-----------|------|
| Railway Hobby plan | $5/month (included credits cover a low-traffic app with sleeping enabled) |
| Supabase | $0 (free tier: 500MB database, 50K rows, 500K edge function invocations) |
| Anthropic API (augmented mode) | <$1/month at <100 augmented assessments/month |
| **Total** | **~$5/month** |

---

## Development Tooling

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager (faster, more disk-efficient than npm; widely used) |
| **ESLint + Prettier** | Code quality and formatting |
| **Vitest** | Unit tests (native Vite integration, same config) |
| **Playwright** | E2E testing for the questionnaire flow (optional, good for validation test cases from Q16) |

---

## What We Deliberately Avoided

| Avoided | Why |
|---------|-----|
| **Next.js** | SSR/SSG not needed. Adds complexity. Telemetry can interfere with Railway app sleeping. React + Vite + Express is simpler and more transparent. |
| **Database for core app** | Ephemeral by design. A database would create a data store of research risk profiles, which we explicitly don't want. |
| **User authentication** | No accounts needed. The tool is anonymous. Auth would add friction and reduce adoption. |
| **Docker** | Railway's Nixpacks auto-detects Node.js and builds without a Dockerfile. Simpler for handoff. Docker can be added later if an adopting org needs it. |
| **Serverless functions** | A persistent Express server is simpler to reason about and debug than Lambda/Cloud Functions. The API proxy is one endpoint. |
| **Heavy charting libraries** | D3.js, Chart.js, Recharts — all overkill for a 3x3 grid with a dot. Custom SVG is simpler, smaller, and fully controlled. If the radar chart (feature longlist) is added later, Recharts can be introduced then. |

---

## Licence Note

Apache 2.0 was chosen over MIT because it includes an explicit patent grant. This protects any organisation that forks and modifies the tool (likely UKRI or a university) from patent claims on contributed code. This matters more for institutional adoption than for individual developers.
