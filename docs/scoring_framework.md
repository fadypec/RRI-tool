# Scoring Framework: How the Tool Determines Green/Amber/Red

This document defines how individual question responses are scored and how those scores are aggregated into the tiered output (green/amber/red).

---

## Design Principles for Scoring

1. **Transparent, not opaque.** The researcher should be able to understand *why* they received a particular tier. No black-box scoring.
2. **Conservative by default.** When in doubt, err toward amber rather than green. A false amber is a mild inconvenience; a false green is a missed risk.
3. **Additive, not averaging.** Multiple moderate concerns should escalate to red, not average out to amber. Dual-use risk compounds.
4. **Anchored to known lists.** Matches against regulated lists (ACDP, Australia Group, CWC, Wassenaar) carry inherent weight — these are things governments have already decided are concerning.

---

## Scoring Layers

The scoring operates in two layers:

### Layer 1: Individual Question Scores

Each question in Phases 3A–3E produces a concern signal:

| Signal | Meaning | Examples |
|--------|---------|----------|
| **None** | No concern identified from this question | "No" to all gain-of-function categories; organism not on any regulated list |
| **Note** | Worth being aware of, but not a specific dual-use concern | Organism is ACDP Hazard Group 2 (common lab organisms); work involves standard chemical synthesis with no controlled substances |
| **Moderate** | A specific dual-use dimension exists that warrants reflection and documentation | Organism is on the Australia Group list; synthesis route passes through a CWC Schedule 3 chemical; AI work could lower expertise barriers |
| **Significant** | A serious dual-use dimension that likely requires specialist advice and may need methodology changes | Gain-of-function work on a Hazard Group 3+ pathogen; de novo synthesis of sequences encoding select agent functions; research directly applicable to weapons development |

### Layer 2: Aggregation into Tiers

Individual signals are aggregated using a **worst-case-plus-accumulation** model:

#### GREEN (Low concern)
- All individual signals are **None** or **Note**
- No matches against any regulated list (ACDP HG3+, Australia Group, CWC Schedule 1/2, Wassenaar)
- No gain-of-function categories selected
- Phase 4 (misuse reflection) completed

#### AMBER (Moderate concern)
Any ONE of the following:
- At least one **Moderate** signal from any Phase 3 question
- Organism matched on a regulated list at a lower concern level (e.g., ACDP HG2 with enhancement work)
- Three or more **Note** signals across different domains (accumulation of low-level concerns)
- "Unsure" responses to critical questions (uncertainty about dual-use dimensions is itself a signal)
- Information hazard questions (3E) triggered with affirmative responses

#### RED (Significant concern)
Any ONE of the following:
- At least one **Significant** signal from any Phase 3 question
- Two or more **Moderate** signals from different domains (cross-domain accumulation)
- Gain-of-function categories selected (3A.2) for a pathogen at ACDP Hazard Group 3 or above
- Match against CWC Schedule 1 chemicals
- Match against Australia Group biological agents list combined with any enhancement work
- De novo synthesis (3B.3) of sequences with pathogenicity/toxicity potential
- Direct weapons applicability confirmed (3D.2, 3D.6)
- Multiple "Unsure" responses to critical questions combined with regulated-list matches

---

## Specific Scoring Rules by Phase

### Phase 3A: Biological Agents and Pathogens

| Condition | Signal |
|-----------|--------|
| Organism is ACDP HG1 | None |
| Organism is ACDP HG2, no enhancement work | Note |
| Organism is ACDP HG2, with any enhancement category from 3A.2 | Moderate |
| Organism is ACDP HG3 | Moderate |
| Organism is ACDP HG3, with any enhancement category from 3A.2 | **Significant** |
| Organism is ACDP HG4 | **Significant** |
| Organism is on Australia Group biological agents list | Moderate |
| Organism is on AG list AND any enhancement category selected | **Significant** |
| Any gain-of-function category from 3A.2 selected (regardless of organism) | Moderate (minimum) |
| Methods transferable to weaponisable organisms (3A.3 = Yes) | Moderate |
| Detailed protocols enabling non-specialist work with dangerous agents (3A.4 = Yes) | Moderate |

### Phase 3B: Genetic Modification and Synthetic Biology

| Condition | Signal |
|-----------|--------|
| Modification of non-pathogenic organism, no pathogenicity functions | Note |
| Modification overlaps with gain-of-function categories | Moderate |
| De novo synthesis, no pathogenicity/toxicity potential | Note |
| De novo synthesis, pathogenicity/toxicity potential = Yes or Unsure | **Significant** |
| Genetic constructs transferable to pathogenic organisms (3B.4 = Yes) | Moderate |
| Genetic constructs transferable to pathogens AND pathogenicity functions | **Significant** |

### Phase 3C: Chemical Hazards

| Condition | Signal |
|-----------|--------|
| No chemicals on any controlled list | None |
| CWC Schedule 3 chemical involved | Moderate |
| CWC Schedule 2 chemical involved | **Significant** |
| CWC Schedule 1 chemical involved | **Significant** |
| Australia Group chemical precursor involved | Moderate |
| Controlled intermediates in synthesis route (3C.2 = Yes) | Moderate |
| Synthesis methods adaptable to CW agent production (3C.3 = Yes) | **Significant** |
| Novel compounds with significant toxicity (3C.4 = Yes) | Moderate |
| Aerosolisation/dispersal mechanisms adaptable for harmful delivery (3C.5 = Yes) | **Significant** |

### Phase 3D: Technology and Dual-Use Equipment

| Condition | Signal |
|-----------|--------|
| Equipment/technology on Wassenaar list | Moderate |
| Technology directly applicable to weapons (3D.2 = Yes) | **Significant** |
| Any AI/ML misuse checklist item selected (3D.3) | Moderate |
| Multiple AI/ML misuse items selected | **Significant** |
| Surveillance applications confirmed (3D.4 = Yes) | Moderate |
| Advanced materials with military-grade or weapons applications (3D.5) | Moderate to Significant (depends on specific selection) |
| Autonomous platforms capable of payload delivery (3D.6) | **Significant** |
| Quantum capabilities threatening cryptographic infrastructure (3D.7) | Moderate |
| Offensive cyber capabilities or CNI vulnerability research (3D.8) | **Significant** |

### Phase 3E: Information Hazards

| Condition | Signal |
|-----------|--------|
| Research provides a "roadmap" for harmful applications (3E.1 = Yes) | Moderate |
| Research lowers expertise/cost/access barriers (3E.2 = Yes) | Moderate |
| Both 3E.1 and 3E.2 = Yes | **Significant** |
| Researcher has not considered restricted publication (3E.3 = No) | Note (but flagged in output) |

---

## Two-Axis Output Model

The output uses two independent axes rather than a single tier. This ensures the concern level stays honest about the research while acknowledging the researcher's preparedness.

### Axis 1 — Concern Level (about the research itself)

Determined by Phase 3 scoring rules above. Reflects the inherent dual-use characteristics of the research. Does NOT change based on safeguards.

| Level | Label |
|-------|-------|
| **Low** | No specific dual-use concerns identified |
| **Moderate** | Dual-use considerations worth reflecting on |
| **Significant** | Significant dual-use dimensions likely requiring specialist input |

### Axis 2 — Preparedness (about the researcher's response)

Determined by Phase 5 responses. Reflects how well the researcher has engaged with dual-use risk management.

| Level | Criteria |
|-------|----------|
| **Well-managed** | Relevant institutional oversight confirmed (Phase 5a) AND multiple mitigation steps taken including a formal risk assessment (Phase 5b) |
| **Partially addressed** | Some institutional oversight OR some mitigation steps, but not comprehensive. E.g., has discussed with collaborators but no formal institutional review. |
| **Not addressed** | "None" or "Not sure" for institutional oversight AND no mitigation steps taken |

### Combined Output Matrix

The two axes produce nine possible combinations. Each has distinct framing:

| | Not addressed | Partially addressed | Well-managed |
|---|---|---|---|
| **Low** | "No specific concerns. General good practice guidance:" | "No specific concerns, and you've already taken positive steps." | "No specific concerns, and your oversight is in place. Here's how to document this." |
| **Moderate** | "Dual-use considerations identified. Consider discussing with your institution's research governance office." | "You've begun addressing these. Consider also [specific additional steps]." | "You've proactively addressed these concerns. Here's how to document them in your RRI section." |
| **Significant** | "Significant dual-use dimensions identified. We recommend seeking specialist advice before proceeding." | "You've taken some important steps. Additional oversight would strengthen your position." | "Your research has significant dual-use dimensions, which you have proactively addressed. This demonstrates strong research governance practice. Here's how to articulate this." |

### Visual Representation: Assessment Plot

The result is displayed as a **dot plotted on a 2D grid**, giving the researcher an instant visual read:

```
                     PREPAREDNESS →
                 Not         Partially      Well-
                addressed    addressed     managed
            ┌────────────┬────────────┬────────────┐
Significant │  Seek      │  Strengthen│  Strong    │
 CONCERN    │  specialist│  safeguards│  governance│
   LEVEL    │  advice    │            │            │
     ↑      ├────────────┼────────────┼────────────┤
 Moderate   │  Action    │  On        │  Well-     │
            │  needed    │  track     │  documented│
            ├────────────┼────────────┼────────────┤
   Low      │  Routine   │  Good      │  Exemplary │
            │  awareness │  standing  │            │
            └────────────┴────────────┴────────────┘
```

**Implementation:** The grid cells use a colour gradient:
- **Bottom-right** (Low + Well-managed): Deep green — best possible outcome
- **Top-left** (Significant + Not addressed): Deep red — strongest call to action
- **Diagonal**: Amber/yellow tones — moderate situations
- The researcher's position is shown as a clearly marked dot with their specific coordinates

The grid must be accompanied by the text explanation (not standalone), but it provides the immediate "where do I stand?" signal that researchers respond to intuitively.

**Design note:** The grid is NOT a traffic light. It deliberately avoids the implication that green = "go ahead without thinking" or red = "stop your research." The labels on the axes make clear that concern level is about the research and preparedness is about the researcher's response. Moving right (improving preparedness) is always achievable; moving down (reducing concern level) may require changes to the research itself.

---

## Edge Cases

### "None of the above" in Phase 2
If the researcher selects no activity/material categories:
- Skip to Phase 6 with a GREEN result
- Caveats are especially prominent: "No activity areas were selected, so no domain-specific assessment was performed. If you are unsure whether your research involves dual-use considerations, consider using augmented mode or consulting your institution's research governance office."

### All "Unsure" responses
"Unsure" answers to critical questions indicate a knowledge gap about dual-use dimensions, which is itself worth flagging. However, uncertainty alone is not positive evidence of risk.
- 1-2 "Unsure" on non-critical questions: no escalation
- "Unsure" on a critical question (gain-of-function, weapons applicability, CWC match): treat as Moderate signal
- **Multiple "Unsure" on critical questions WITHOUT any affirmative concerning signal: caps at Moderate (amber).** There is no positive evidence of risk, only a lack of evidence that risks have been considered.
- **One or more affirmative concerning signals + multiple "Unsure" on other critical questions: escalates to Significant (red).** The combination of a known concern and unexamined areas is genuinely high-risk.

Rationale: Getting a "red" has no material impact on the researcher — the tool has no gatekeeping power. But a red built entirely on uncertainty (rather than evidence) overstates what the tool can claim. Amber + a clear prompt to seek specialist advice achieves the same practical outcome without false precision.

### Contradictory responses
If the researcher selects categories in Phase 2 but answers "No" to all domain-specific questions in Phase 3:
- This is not necessarily contradictory (they may have selected broadly in Phase 2 as a precaution)
- No penalty, but a gentle note: "Your Phase 2 selections suggested potential dual-use dimensions, but no specific concerns were identified in the detailed assessment. This is a reasonable outcome — it may indicate that while your research area has dual-use potential in general, your specific project does not raise particular concerns."

---

## Scoring Transparency

The output MUST show the researcher how their tier was determined. Not a raw score, but a clear explanation:

For AMBER:
> "Your assessment was rated AMBER (moderate concern) because:
> - Your research involves [organism], which is on the Australia Group biological agents list
> - You indicated that your methods could be transferable to other organisms (3A.3)
>
> These are areas worth reflecting on and documenting in your RRI section."

For RED:
> "Your assessment was rated RED (significant concern) because:
> - Your research involves gain-of-function work on an ACDP Hazard Group 3 pathogen
> - Your methods could enhance transmissibility of the agent
>
> This is not unusual for cutting-edge work in this area. Many funded projects navigate similar considerations. The following guidance may help you address these concerns in your research design and your RRI section."

This transparency serves two purposes:
1. The researcher understands and can respond specifically
2. The researcher can identify if the tool has misunderstood their input (important for validation)

**On gaming:** Full transparency means a researcher could theoretically adjust their answers to flatten the concern level. This is acceptable because:
- The tool has no gatekeeping power — a "green" from our tool doesn't grant anything
- A researcher who games the tool to get green still has to face a grant application panel, which will assess the RRI section on its substance
- The tool doesn't make the situation worse than if it didn't exist — a researcher who would game the tool would have written a poor RRI section anyway
- Transparency is essential for trust and adoption, which matters more than anti-gaming for a voluntary reflection aid
