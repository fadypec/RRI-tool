# Feature Longlist

Ideas captured during design conversations for future consideration. Not committed to scope — these need evaluation during detailed design.

---

## 2026-04-21

### Radar chart for dual-use risk dimensions
Visual radar/spider chart showing the researcher's grant application scored across multiple dual-use/misuse risk dimensions. Input would likely be the methods section or full grant application (requires the augmented/LLM mode). Inspired by the ORBIT maturity model's spider graph approach, but focused on risk rather than RRI maturity.

**Open questions:**
- What are the risk dimensions? (e.g., agent hazard level, enhancement of capability, accessibility of methods, dual-use applicability, information hazard, proliferation risk)
- Is this scored by the structured questionnaire, the LLM extraction, or both?
- How do we avoid false precision — a radar chart implies quantification, which may overstate confidence
- Could this be gamed (researchers adjusting answers to flatten the chart)?
- Is this a useful reflection artefact or a misleading one?

**Note:** The two-axis assessment plot (Concern Level vs. Preparedness) is now a v1.0 core feature, defined in `scoring_framework.md`. The radar chart would be a complementary visualisation showing *which specific dimensions* contribute to the concern level — a drill-down from the assessment plot. Consider this as a v1.1+ enhancement after the core two-axis plot is validated with users.
