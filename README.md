# RRI STEER

**Security Thinking for Ethical and Effective Research**

A structured reflection tool that helps academic researchers identify and think through the dual-use and security implications of their research. Designed for UK-based PIs writing grant applications, but useful for any researcher considering responsible innovation.

Built by [Dr Paul-Enguerrand Fady](https://fady.phd) at the [Centre for Long-Term Resilience](https://www.longtermresilience.org/).

## What it does

- Walks researchers through a structured assessment of dual-use concerns based on the materials, methods, and technologies in their research
- Surfaces considerations they might not have encountered (ACDP hazard groups, Australia Group agents, CWC chemicals, Wassenaar dual-use items, gain-of-function categories, information hazards)
- Produces a two-axis assessment: **Concern Level** (how inherently dual-use the research is) x **Preparedness** (how well the researcher has addressed it)
- Assembles template text for the ethics/RRI section of grant applications
- Supports three modes: **Standard** (no AI, nothing leaves your device), **Augmented** (AI-assisted classification), and **Express** (paste and auto-classify)

## What it doesn't do

- Does not replace institutional review (ethics committees, biosafety committees, export control)
- Does not store any information about you or your research
- Is not endorsed by UKRI or any other funding body
- Does not generate text with AI (all writing output is template assembly)

## Quick start

```bash
cd app
npm install
npm run dev         # Frontend on http://localhost:5173
```

For augmented/express modes (optional):
```bash
cp .env.example .env  # Add your Anthropic API key
npm run dev:server    # Backend on http://localhost:3000
```

## Production

```bash
cd app
npm run build
npm start             # Serves frontend + API on port 3000
```

## Deploy to Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new)

Set one environment variable: `ANTHROPIC_API_KEY` (optional — standard mode works without it).

## Project structure

```
app/
  src/
    components/     UI components (Stepper, AssessmentGrid, DeepDiveQuestion)
    pages/          Page-level components for each assessment step
    hooks/          React hooks (useAssessment, useTheme)
    lib/            Scoring engine, template assembly, API client
    data/           JSON data files (questions, taxonomies, funders)
    types/          TypeScript type definitions
  server.ts         Express backend (API proxy for Anthropic)
docs/               Design decisions, assessment flow, scoring framework
```

## Design documents

- [Design Decisions](docs/design_decisions.md) — all 20 design questions and their resolutions
- [Assessment Flow](docs/assessment_flow.md) — complete question sequence with branching logic
- [Scoring Framework](docs/scoring_framework.md) — two-axis scoring model
- [Template Assembly](docs/template_assembly.md) — modular text blocks for RRI section drafting
- [Tech Stack](docs/tech_stack.md) — technology choices with rationale

## Licence

Apache 2.0 — see [LICENSE](LICENSE). Chosen for the explicit patent grant, which protects organisations that fork and modify the tool.

## Privacy

Standard mode: your research content never leaves your device. Augmented/Express modes: text is sent to the Anthropic API for classification only, never stored or used for training. See the in-app [Privacy page](docs/design_decisions.md) for full details.
