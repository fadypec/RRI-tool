# RRI Tool Design Decisions

Decisions made during the design conversation. Each references the question number from `design_questions.md`.

---

## Phase 1 — Architectural Forks

### Q1. Thinking tool vs. writing tool
**Decision: (c) Thinking-first with assembled writing output.**

The tool is primarily a structured reflection/assessment tool. Researchers must complete the thinking process before receiving any writing support. Writing output is template assembly — pre-written, expert-reviewed paragraph templates selected and assembled based on the assessment results. No LLM-generated text. No API cost per use for the writing component.

Rationale: Avoids repackaging an LLM. Template assembly (like legal document assembly) provides useful, structured output without per-use AI costs. The enforced thinking-first sequence prevents gaming.

### Q4. Full RRI vs. dual-use/security focus
**Decision: (c) Dual-use/security core with lightweight pointers for the rest.**

The tool's deep assessment capability focuses on the security, dual-use, and misuse dimension — the area where no existing tool serves researchers well and where the knowledge gap is most acute. For other RRI dimensions (public engagement, open access, EDI, environmental impact), the tool provides intelligent links to existing resources (TAS Hub RRI cards, Turing Commons, UKRI guidance, etc.) rather than duplicating what already exists.

Rationale: Dual-use/security is the most tractable, most novel, and hardest for researchers to self-assess. Other RRI dimensions are already well-served by existing frameworks and resources.

### Q10. Input modality
**Decision: (c) Questionnaire-primary with optional bounded extraction — implemented as a dual-mode architecture.**

The tool has two clearly distinct modes, controlled by a prominent toggle:

- **Standard mode ("no LLM"):** Structured questionnaire only. The researcher answers guided questions — dropdowns, multi-selects from curated lists (ACDP hazard groups, Australia Group agents, Wassenaar categories, etc.), yes/no with explanatory guidance. The tool never sees research text. Zero API cost. Privacy story is bulletproof: "Your research content never leaves your machine."

- **Augmented mode ("LLM-assisted"):** Everything in standard mode, plus the ability to upload or paste sections of the grant application (e.g., methods section) for entity/keyword extraction against curated risk taxonomies. Extraction identifies agents, techniques, materials, and capabilities, then feeds those back into the structured assessment.

The mode toggle must be prominent and clearly explained. Augmented mode requires explicit, informed opt-in with clear assurances:
- Uploaded/pasted data is not retained past the point of analysis
- The underpinning LLM does not train on any data it processes
- These assurances must be real and verifiable, not boilerplate

### Q11. Can v1.0 work without AI?
**Decision: Yes. Standard mode IS v1.0.**

The structured questionnaire (standard mode) is the complete v1.0 product. It must deliver genuine value with no AI dependency whatsoever. Augmented mode is an enhancement added when the extraction pipeline is ready — potentially using lightweight NLP/keyword matching first, upgrading to LLM extraction only if simpler approaches prove insufficient.

Rationale: A no-AI v1.0 proves the concept, eliminates ongoing API costs, provides a bulletproof privacy story, and establishes the core assessment framework that augmented mode builds on top of.

---

## Phase 2 — Scope Definition

### Q5. Which funder(s) at IOC?
**Decision: Funder-agnostic core with optional council-specific overlay.**

The core assessment is funder-agnostic — dual-use/security reflection is valuable regardless of the funding body. An early question in the flow ("Which funder are you applying to?") triggers council-specific supplementary guidance where relevant (e.g., BBSRC/MRC joint dual-use policy obligations, EPSRC AREA framework expectations). The tool should be useful even for non-UKRI applications as part of a general best-practices approach to responsible research.

Rationale: Dual-use/security thinking shouldn't be gated behind a specific funder. Funder-agnostic core maximises utility; council-specific overlays add precision where the funder has explicit requirements.

### Q8. Who is the primary user?
**Decision: PIs writing grant applications.**

The primary user is the PI — the person who actually writes the RRI/ethics section. ECRs and postdocs typically write the scientific/approach sections, not the RRI section, which PIs tend to treat as administrative. This framing is important: the tool must make the reflection feel substantive enough to shift that "admin checkbox" mindset, surfacing genuinely surprising insights about the PI's own work.

Note: Research support staff (pre-award teams) are a potential secondary audience with a different need (review/audit rather than reflection). Not in scope for IOC but worth revisiting.

### Q6. How narrow is "life sciences first"?
**Decision: Activity/material-based routing, not domain-based. Life sciences and chemistry populated at v1.0.**

Academic research does not respect clean disciplinary boundaries. A chemist in a chemistry department working on biomacromolecules in living systems needs life sciences dual-use considerations, not just chemistry ones. Domain-based routing ("select your field") would misroute interdisciplinary researchers.

Instead, routing is based on **what the research involves**, not what department the researcher sits in. Dual-use risk comes from materials and methods, not the discipline.

**Naive mode:** Multi-select question — "Which of the following does your research involve?" with activity/material categories (biological agents, genetic modification, chemical synthesis, biomolecules, pathogens, autonomous systems, dual-use equipment, information hazards, etc.). The tool routes to the union of relevant risk domains triggered by the selected categories. Easier for researchers than identifying their "domain" — they recognise their activities more readily than their dual-use classification.

**Augmented mode:** LLM classifies a short free-text research description (and optionally pasted methods section) into relevant risk domains, and extracts specific agents/methods/materials. This is a classification task — bounded, low-cost (few hundred tokens), reliable, and could run on a Haiku-class model. This handles boundary-crossing and interdisciplinary research naturally, catching things the researcher wouldn't think to flag in a multi-select.

**v1.0 content scope:** Life sciences and chemistry branches are fully populated with domain-specific risk taxonomies (ACDP hazard groups, Australia Group biological agents and chemical precursors, CWC scheduled chemicals, Wassenaar dual-use items). Other domains (AI/computing, engineering/physics) get a lighter "general dual-use considerations" path covering cross-cutting concerns (information hazards, enabling technologies, export control) without deep domain-specific knowledge. The architecture supports adding new domain branches over time.

Rationale: Activity-based routing is conceptually better than domain routing even for single-discipline researchers — a physicist building a centrifuge and a chemical engineer building a centrifuge have identical dual-use considerations.

### Q7. Beyond UKRI?
**Decision: Yes. Funder-agnostic by design.**

Already captured in Q5. The tool is useful for any grant application, not just UKRI. UKRI council-specific overlays are the first funder-specific content, but the architecture supports adding other funders (Wellcome Trust, Horizon Europe, etc.) over time.

### Q9. When in the grant-writing process?
**Decision: Designed for late-stage use, structured to surface early-stage concerns.**

The realistic use case is late-stage — the PI is filling in the RRI section near the end of writing. The tool meets researchers where they are. However, the structured reflection is designed so that it occasionally surfaces concerns that should influence research design, not just documentation. When this happens, the tool explicitly flags it: "This concern may require changes to your methodology, not just documentation in your RRI section. Consider discussing with your institutional biosafety committee / collaborators / etc."

This way the tool doesn't pretend that writing a paragraph is always a sufficient response to a dual-use concern, while accepting that most PIs will encounter it late in the process.

Rationale: Designing for early-stage use and hoping PIs adopt it early is aspirational but unrealistic. Designing for late-stage and letting the tool occasionally push researchers upstream is pragmatic and still achieves genuine impact. Confirmed with the requesting academic user.

---

## Phase 3 — Design Decisions

### Q2. What happens when the tool finds nothing?
**Decision: Tiered output with caveats and best-practice links at every tier.**

Results are presented in tiers (e.g., green/amber/red or equivalent). Even the lowest-concern tier ("no specific dual-use concerns identified based on your responses") still provides:
- General good-practice guidance relevant to the researcher's activity areas
- Prominent caveats: this is not a guarantee; the assessment is only as good as the input; institutional review may still be required
- Links to best-practice resources and further reading

Higher tiers surface specific concerns with increasing specificity and urgency. The tiered approach avoids both false confidence (a clean bill of health) and alert fatigue (flagging everything equally).

### Q3. Who bears responsibility?
**Decision: The tool is a reflection aid, not an authority. "Have you considered X?" not "You must do X."**

The tool is not endorsed by any research council and does not derive authority from any institution, legal framework, or directive. It positions itself as a structured prompt for the researcher's own professional judgment, not as a compliance check or authoritative assessment.

Tone implications:
- "Have you considered..." not "You should..."
- "This may warrant discussion with..." not "You are required to..."
- "Researchers working with [X] typically need to consider..." not "You must address..."

Disclaimer implications: the tool must be clear that it does not replace institutional review (RECs, biosafety committees), funder-specific compliance requirements, or professional judgment. Completing an assessment does not constitute any form of approval or clearance.

### Q12. If AI is used, for what specifically?
**Decision: Three bounded LLM tasks — classification, entity extraction, and misuse-concern extraction. No text generation.**

The LLM has three roles in augmented mode, all classification/extraction:

1. **Research description classification** — short free-text description of the research, classified into relevant activity/material risk domains. Cheap (few hundred tokens), reliable, Haiku-class model sufficient.

2. **Entity extraction from pasted text** — identify specific agents, methods, materials, and technologies in pasted sections (methods, approach, or other relevant sections) and match against curated risk taxonomies.

3. **Misuse-concern extraction** — a free-text prompt asking the researcher something like "What potential misuse applications could there be if your research is successful?" The LLM classifies and maps the researcher's own hunches and suspicions against known risk categories. This harnesses the researcher's domain intuition rather than making assumptions for them. The LLM does not generate its own speculation about misuse — it structures what the researcher has articulated.

Important nuance: dual-use risk is not only in the methods. It can arise from consequences, downstream applications by other actors, or the knowledge/capabilities the research creates. The tool should not assume that only the methods section is relevant — the researcher chooses what to paste, and the misuse-concern prompt captures the consequence dimension explicitly.

No LLM-generated prose or draft text. Template assembly (Q1) handles writing output without API cost.

### Q13. Cost model for AI features?
**Decision: Developer absorbs cost for now. Revisit at scale.**

All three LLM tasks are small and cheap:
- Classification: ~500 tokens in, ~100 out
- Entity extraction: ~2,000 tokens in, ~500 out
- Misuse-concern extraction: ~500 tokens in, ~200 out

Total per augmented assessment: likely under $0.01 at Haiku-class pricing. The developer absorbs API costs directly. This is well within institutional cost appetite for the foreseeable future. If the tool reaches ~10+ regular users, the cost model will be revisited (options include institutional API keys, rate-limited free tier, or institutional licensing).

### Q14. How is research IP protected?
**Decision: Ephemeral by design. No server-side retention. Export-first UX.**

**Naive mode:** The tool never sees research text. No IP exposure whatsoever.

**Augmented mode:** Uses the Anthropic API (not consumer Claude), which has explicit contractual terms that customer data is not used for training. This contractual basis should be cited specifically in the tool's privacy assurances — not just "we don't train on your data" but "here is why."

**Data lifecycle:**
- All assessment data (questionnaire responses, LLM extraction results, tier output, assembled templates) is ephemeral. Nothing is retained server-side after the session ends.
- The tool prominently offers export of the completed assessment as PDF and/or Markdown.
- The download button must be large and unmissable.
- A prominent warning makes clear that results will not be available after the session.
- If the user attempts to close the tab without downloading, a browser warning intercepts ("You have not downloaded your assessment. Results will be permanently lost.").
- As a follow-on option: optional browser local storage with clear explanation ("Click here to store this result in your browser. Nothing is retained on our servers — this uses your browser's local storage only."). This is a v1.1+ consideration, not v1.0.

This approach means no server-side data store of research risk profiles exists at any point. The only copy lives on the researcher's machine, under their control.

### Q15. Is the assessment itself sensitive?
**Decision: Yes — mitigated by ephemeral design. Red-flag language must encourage iteration, not panic.**

A record that says "this research was flagged as high dual-use concern" is sensitive information. Since the tool stores nothing by design (Q14), no trail exists outside of what the researcher downloads to their own machine.

**Language design for high-concern results:**
The tone when surfacing significant concerns must encourage the researcher to iterate and improve their approach, not to panic or stop using the tool. A researcher who gets a "red" result and closes the tab in alarm is a worse outcome than a researcher who never used the tool at all.

Framing principles for high-concern results:
- "Your research touches areas with significant dual-use considerations. This is not unusual for work in [domain] — it means there are well-established frameworks for managing these risks."
- "The following considerations may strengthen your research design and your RRI statement."
- "Many funded projects in this area have successfully addressed similar concerns. Here are approaches other researchers have taken..."
- Never: "WARNING: Your research poses a serious risk" or similar alarming language.

The goal is to normalise dual-use awareness (many legitimate, funded projects have dual-use dimensions) while ensuring the researcher takes the concerns seriously enough to act on them.

---

## Phase 4 — Sustainability

### Q16. How do we validate correctness?
**Decision: Layered validation — expert review + test cases at launch, user feedback post-launch, academic study if traction warrants.**

- **Pre-launch (a):** Small expert panel (biosafety officer, dual-use policy expert, experienced PI) reviews the question sets, decision trees, and risk taxonomies for gaps and errors. Validates the structure, not individual assessments.
- **Pre-launch (b):** Suite of test-case research profiles (synthetic biology project, gain-of-function study, CWC-adjacent chemistry, benign ecology project, interdisciplinary edge cases) verified to produce sensible outputs. Essentially unit tests for the assessment logic.
- **Post-launch (c):** Lightweight user feedback after each assessment — "Did this surface anything you hadn't considered?" and "Did it miss anything you think it should have caught?" Builds ongoing validation data.
- **If traction warrants (d):** Formal academic validation study — run tool against anonymised real grant applications alongside expert assessments, measure agreement. Publishable and would strengthen the case for institutional adoption.

### Q17. Who maintains the knowledge base?
**Decision: Developer maintains for PoC phase. Designed for handoff to UKRI or institutional adopter.**

The tool is a proof of concept, not a long-term personal project. The intended trajectory is:

1. Developer builds PoC and demonstrates value
2. PoC is shown to UKRI or equivalent body (or a university research office)
3. Adopting organisation integrates it into their systems with expert maintenance of taxonomies

**Implications for how we build:**
- Risk taxonomies must be structured as easily updatable data files (JSON/YAML), not hard-coded into application logic
- The codebase must be clean, well-documented, and straightforward for another team to adopt
- No architectural dependency on the developer's personal API key — the key must be configurable/swappable
- Documentation should include a "maintenance guide" explaining what needs periodic review and where to find authoritative sources for each taxonomy
- The tool should be built with handoff in mind from day one

**Maintenance burden during PoC phase:**
Core taxonomies (ACDP, Australia Group, CWC, Wassenaar) are stable enough that a single review pass at launch suffices for a 12-18 month PoC window. Funder policies are the most volatile element but changes are trackable. Annual review would catch most drift.

### Q18. Could this be open-source?
**Decision: Yes. Open-source from the start.**

Open-source is strategically important for the handoff model:
- Lowers adoption barrier for UKRI or universities (no procurement, no licensing, fork and deploy)
- Signals transparency — important for a trust/credibility tool
- Allows the academic community to inspect, validate, and contribute
- Aligns with the open-access and open-science values of the RRI framework itself

### Q19. Voluntary or mandated?
**Decision: Voluntary. The aspiration is a UKRI recommendation, not a mandate.**

The tool has no authority behind it during the PoC phase. UKRI is a slow-moving organisation with massive systemic inertia — even a recommendation would be a significant win. The PoC does not need to demonstrate mandate-readiness; it needs to demonstrate enough value that UKRI (or individual institutions) would want to recommend it to their researchers.

The adoption path is: academic network sharing and word-of-mouth during PoC → institutional pilot(s) → UKRI recommendation if the evidence supports it.

### Q20. What does success look like?
**Decision: Four concrete success criteria for the PoC phase.**

1. A working tool that a panel of PIs finds useful in user testing
2. Evidence that it surfaces dual-use/security concerns that PIs missed (from validation work per Q16)
3. Evidence that at least 10 people have used the tool
4. Testimonials from academics that the tool is useful

The developer works at the Centre for Long-Term Resilience (CLTR), an independent non-profit think-tank based in London focused on reducing extreme risk. CLTR is not a research institution and does not have affiliated research labs or a university research office. However, the developer has an academic network to tap for sharing the tool, gathering feedback, and collecting testimonials.

Note: a published paper is not a success criterion but would strengthen the handoff pitch if time permits. The tool's alignment with CLTR's mission (extreme risk reduction) provides a credible institutional frame for the work.
