# RRI Tool Design Questions

Generated during initial design conversation, April 2026. These questions must be resolved before development begins. They are grouped thematically but should be addressed in dependency order (see "Resolution Order" at the end).

---

## A. Fundamental Purpose & Philosophy

### Q1. Thinking tool vs. writing tool?
The proto-requirements say "identification of implications" and "suggested mitigations" — that's assessment. But the UKRI context implies the output is a 500-word text block for a grant application. These pull in different directions. A thinking tool that helps researchers genuinely reflect is more defensible and less likely to be gamed. A writing tool is what researchers will actually want. Which is the priority, or is it both — and if both, how do we prevent the thinking step from being skipped?

### Q2. What happens when the tool finds nothing?
If a researcher uses the tool and no significant concerns are identified, is that a green light? Or should the tool always surface something to reflect on? The Netherlands Quickscan explicitly warns that a clean score "is no guarantee there are no dual-use aspects." How prominently should the tool caveat its own limitations?

### Q3. Who bears responsibility for the output?
If a researcher relies on the tool and the RRI section is later judged inadequate (or worse, they miss a genuine risk), what is the tool's position? This affects everything from disclaimers to how confidently the tool frames its output.

---

## B. Scope & Boundaries

### Q4. Full RRI vs. dual-use/security focus?
The AREA framework covers public engagement, gender equity, open access, environmental impact, societal transformation — not just misuse risk. The proto-requirements mention "security context" specifically. Do we cover all of RRI (matching what UKRI actually asks), or specifically the security/dual-use dimension that researchers most struggle with? The former is a much bigger project. The latter is more tractable and more novel.

### Q5. Which funder(s) at initial operational capability?
Different UKRI councils have genuinely different emphases. BBSRC/MRC have an explicit joint dual-use/misuse policy. EPSRC has the AREA framework but is non-prescriptive. ESRC cares about human-subjects ethics. Do we start with one council, or cover the common UKRI Funding Service question that all councils share?

### Q6. How narrow is "life sciences first"?
Within life sciences, the dual-use landscape is well-mapped (ACDP hazard groups, Australia Group lists, Select Agent lists). Chemical engineering overlaps with chemical weapons conventions and Wassenaar dual-use chemical precursors. How tightly do we scope the initial domain?

### Q7. Beyond UKRI?
Wellcome Trust uses different application forms. Horizon Europe has the Ethics Issues Table. Do we want to support other funders eventually, or is this a UKRI-specific tool?

---

## C. Users & User Journey

### Q8. Who is the primary user?
PIs writing grants? Early-career researchers? Research support staff who advise PIs? Institutional ethics officers? Each has different knowledge levels and needs. The proto-requirements suggest researchers themselves, but institutional research offices might be the more scalable adoption path.

### Q9. When in the grant-writing process?
Early (shaping research design)? Mid (drafting the application)? Late (filling in the RRI section at the end, which is what most researchers actually do)? The earlier the intervention, the more genuinely useful. But the later intervention is what people will actually use.

### Q10. What is the input modality?
"Private upload of papers/grant applications" suggests full-text document analysis. Alternatively, the researcher could describe their work by answering questions. Full-text analysis is where AI is needed (and where API costs accrue). Structured questionnaire input avoids AI entirely for the assessment step.

---

## D. The AI Question

### Q11. Could version 1.0 work with no AI at all?
A well-designed decision tree + domain-specific checklists + funder-specific templates could deliver significant value without any LLM. The Netherlands Quickscan is just 15 yes/no questions and it's published in a peer-reviewed journal. Would we consider a "no-AI v1" that proves the concept, with AI features added later?

### Q12. If AI is used, for what specifically?
Three bounded uses that avoid the "open LLM access" problem:
- **Document parsing:** Extract research methods, biological agents, chemical precursors, technologies from uploaded text, then match against curated risk lists
- **Contextual question generation:** Based on extracted elements, generate follow-up questions the researcher should consider
- **Draft text assistance:** Help compose the UKRI section based on the completed assessment

Each is bounded, cacheable, and auditable. Which are most valuable?

### Q13. Cost model for AI features?
If document parsing uses an LLM, each upload costs money. Who pays? Could cheaper models (Haiku) handle extraction while expensive models handle generation? Could extraction be done with NLP/NER without an LLM at all?

---

## E. Data, Privacy & Trust

### Q14. How is research IP protected?
Researchers uploading grant applications before submission are sharing novel, unpublished ideas. What is the data handling model? On-premise? Ephemeral processing (no storage)? This is a potential dealbreaker for adoption — and a strong argument for the "no-AI, structured questionnaire" approach where the tool never sees the research content.

### Q15. Is the assessment itself sensitive?
If the tool identifies dual-use concerns in someone's research, is that assessment record something that could be FOI'd? Used against them? This matters for institutional deployment.

---

## F. Validation & Maintenance

### Q16. How do we validate correctness?
If the tool identifies dual-use concerns under the BBSRC/MRC joint policy, how do we know it is correct? Could we partner with institutional biosafety committees for validation?

### Q17. Who maintains the knowledge base?
Funder policies change (BBSRC/MRC updated their dual-use statement October 2025). ACDP hazard group classifications evolve. New threats emerge. Is this a one-person project, or does it need institutional backing for ongoing maintenance?

### Q18. Could this be an open-source community effort?
Risk taxonomies and decision trees could be maintained by the research security community. The RRI Prompts and Practice Cards are CC-BY 4.0. Is there an existing community that would contribute?

---

## G. Adoption & Impact

### Q19. Voluntary or mandated?
If researchers use it voluntarily, uptake will be low — the people who need it most are least likely to seek it out. If institutions mandate it, institutional buy-in is required. If UKRI recommended it, that changes everything. What is the adoption theory?

### Q20. What does success look like?
More researchers identifying dual-use concerns they would have missed? Better-written RRI sections? Fewer "no ethical issues" cop-outs? Institutional adoption metrics? A published validation study?

---

## Resolution Order

These questions have dependencies. The recommended resolution order is:

**Phase 1 — Architectural forks** (determines everything else):
- Q1 (thinking vs. writing tool)
- Q4 (full RRI vs. dual-use focus)
- Q10 (document upload vs. questionnaire)
- Q11 (AI v1 vs. no-AI v1)

**Phase 2 — Scope definition** (depends on Phase 1):
- Q5 (which funders)
- Q6 (domain scope)
- Q7 (beyond UKRI)
- Q8 (primary user)
- Q9 (when in workflow)

**Phase 3 — Design decisions** (depends on Phase 2):
- Q2 (empty results handling)
- Q3 (responsibility model)
- Q12 (specific AI uses)
- Q13 (cost model)
- Q14 (IP protection)
- Q15 (assessment sensitivity)

**Phase 4 — Sustainability** (depends on Phase 3):
- Q16 (validation)
- Q17 (maintenance)
- Q18 (open source)
- Q19 (adoption model)
- Q20 (success metrics)
