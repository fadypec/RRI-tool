# RRI Dual-Use Assessment Tool

## What This Is

A structured reflection tool that helps UK academic researchers (primarily PIs writing grant applications) identify dual-use and security implications of their research. Built as an open-source proof of concept by the Centre for Long-Term Resilience (CLTR) for eventual handoff to UKRI or an institutional adopter.

This is **not** an LLM wrapper. It is a thinking tool with template-assembled writing output. The core product works with zero AI dependency.

## The Problem

- UKRI grant applications include a 500-word ethics/RRI section that researchers routinely underthink
- Academics lack security training and don't know what they don't know about dual-use
- No existing tool helps researchers assess the security/dual-use dimension of their work
- Existing RRI resources (AREA framework, TAS Hub cards, ORBIT) are abstract and require prior knowledge to apply

## Design Principles

1. **Thinking first, writing second.** The tool walks researchers through structured reflection. Template-assembled writing output is only available after the assessment is complete. No LLM-generated text.

2. **Dual-use/security focus.** Deep assessment for misuse, dual-use, and security concerns. For other RRI dimensions (public engagement, open access, EDI), link to existing resources rather than duplicating them.

3. **Two modes, clearly separated.**
   - **Naive mode:** Structured questionnaire only. No AI. No research text touches a server. This is v1.0.
   - **Augmented mode:** Adds LLM-assisted classification and extraction (opt-in, with real privacy assurances). Enhancement, not dependency.

4. **Activity-based, not domain-based.** Route by what the research involves (biological agents, chemical synthesis, genetic modification, etc.), not by department or discipline. Interdisciplinary research must not be misrouted.

5. **Ephemeral by design.** Nothing stored server-side. Assessment results are exported as PDF/Markdown by the researcher. Prominent warnings about data loss on tab close.

6. **Reflection aid, not authority.** Tone is "Have you considered X?" not "You must do X." The tool is not endorsed by any funder or institution. It does not replace institutional review.

7. **Built for handoff.** Clean code, good documentation, taxonomies in data files (not hard-coded), configurable API key, maintenance guide. Another team should be able to adopt this.

## Architecture Summary

### Core Assessment Flow (Naive Mode)
- Researcher selects activities/materials their research involves (multi-select)
- Tool routes to the union of relevant risk domains
- Structured questions walk through dual-use considerations specific to selected domains
- Tiered output (green/amber/red) with caveats at every tier
- Template assembly produces structured text for the researcher's RRI section
- Funder-specific overlay if researcher specifies their target council
- Export to PDF/Markdown

### Augmented Mode (Adds to Naive)
Three bounded LLM tasks only:
1. **Research description classification** — free-text research summary classified into risk domains (Haiku-class, ~500 tokens)
2. **Entity extraction** — pasted text sections matched against curated risk taxonomies (~2,000 tokens)
3. **Misuse-concern extraction** — researcher's own hunches about potential misuse, classified against known risk categories (~500 tokens)

No LLM-generated prose. No open-ended chat. No text generation.

### Data and Privacy
- Naive mode: no research text ever leaves the researcher's machine
- Augmented mode: Anthropic API with contractual no-training guarantee; data not retained past analysis
- No server-side storage of assessment results, ever
- Browser local storage as optional v1.1+ feature

## Scope

### v1.0 (Naive Mode)
- Life sciences and chemistry risk taxonomies fully populated
- Sources: ACDP hazard groups, Australia Group (biological agents + chemical precursors), CWC scheduled chemicals, Wassenaar dual-use items
- General dual-use path for other domains (information hazards, enabling technologies, export control)
- UKRI council-specific overlays (BBSRC, MRC, EPSRC at minimum)
- Funder-agnostic core — useful even without specifying a funder
- Template assembly for writing output
- PDF/Markdown export
- Tiered results with encouraging, non-alarmist language
- Lightweight user feedback collection post-assessment

### v1.1+ (Augmented Mode)
- LLM classification and extraction
- Prominent mode toggle with privacy explanation
- Ephemeral processing assurances

### Future Considerations
- Radar chart visualisation of risk dimensions (see `docs/feature_longlist.md`)
- Browser local storage for assessment persistence
- Additional domain branches (AI/computing, engineering/physics)
- Additional funder overlays (Wellcome Trust, Horizon Europe)
- Research support staff audit/review mode

## What NOT to Do

- **Do not build an LLM chat interface.** This is not a chatbot. AI is used for three bounded extraction/classification tasks only.
- **Do not generate text with an LLM.** All writing output is template assembly from pre-written, curated content.
- **Do not store user data server-side.** Ephemeral by design. No exceptions.
- **Do not use alarming language.** High-concern results must encourage iteration, not panic. Never "WARNING: Your research poses a serious risk."
- **Do not hard-code risk taxonomies.** They must be in easily updatable data files (JSON/YAML) for handoff maintainability.
- **Do not duplicate existing RRI resources.** Link to TAS Hub cards, Turing Commons, UKRI guidance for non-security RRI dimensions.
- **Do not assume domain from department.** Route by activities and materials, not by discipline.

## Key Documents

- `docs/design_decisions.md` — Full record of all design decisions with rationale
- `docs/design_questions.md` — The 20 questions that shaped the design, with resolution order
- `docs/feature_longlist.md` — Ideas captured for future consideration
- `initial_concept.md` — Original proto-requirements from the requesting academic

## Tech Constraints

- Apache 2.0 licence (chosen over MIT because Apache 2.0 includes an explicit patent grant — important when UKRI or a university forks and modifies the tool, as it protects adopters from patent claims on contributed code)
- Must be deployable by a university IT team or UKRI — no exotic dependencies
- Risk taxonomies in data files, not application code
- API key must be configurable (env var), not baked in
- Frontend must be clean and accessible — adoption depends on low friction
- No user accounts or authentication required for v1.0

## Success Criteria (PoC Phase)

1. A working tool that PIs find useful in user testing
2. Evidence the tool surfaces concerns PIs would have missed
3. At least 10 real users
4. Academic testimonials
