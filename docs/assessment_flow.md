# Assessment Flow: Question Sequence and Branching Logic

This document describes the complete question flow for the dual-use/security assessment. It covers both naive and augmented modes, noting where they diverge.

See `assessment_flow.png` for a visual flowchart of the branching logic.

---

## Phase 0: Welcome and Mode Selection

### Screen 0a: Welcome
Brief explanation of what the tool does and doesn't do:
- "This tool helps you reflect on the dual-use and security implications of your research."
- "It is a reflection aid, not a compliance check. It does not replace institutional review."
- "Nothing you enter is stored on our servers."

### Screen 0b: Mode Selection
Prominent toggle with clear explanation:

**Naive mode (default):**
> "Questionnaire only. Your research content never leaves your machine. No AI is used."

**Augmented mode:**
> "Adds AI-assisted analysis of text you choose to share. Uses the Anthropic API — your text is processed but never stored or used for training. [Learn more about our privacy commitments]"

User must actively opt into augmented mode; naive is the default.

---

## Phase 1: Context

### Screen 1a: Funder (optional)
"Are you writing this for a specific funder?"

Options:
- BBSRC
- MRC
- EPSRC
- ESRC
- NERC
- AHRC
- Innovate UK
- Wellcome Trust
- Horizon Europe
- Other (free text)
- No specific funder / general reflection

This does NOT gate any content — it adds funder-specific supplementary guidance at the output stage.

### Screen 1b: Grant stage (optional)
"What stage is your application at?"

Options:
- Early — still shaping the research design
- Mid — drafting the application
- Late — completing the ethics/RRI section
- Post-submission — reviewing an existing project
- Not a grant application — general reflection

This informs the tone of the output (e.g., late-stage gets "consider whether this changes your methodology" prompts; early-stage gets "you have time to design around this" framing).

---

## Phase 2: Research Characterisation (the routing step)

This is where naive and augmented modes diverge most significantly.

### Naive Mode — Screen 2n: Activity/Material Selection

"Which of the following does your research involve? Select all that apply."

**Biological materials and methods:**
- [ ] Biological agents (bacteria, viruses, fungi, prions, toxins)
- [ ] Genetic modification or synthetic biology
- [ ] Pathogen characterisation, culturing, or enhancement
- [ ] Gain-of-function research (enhancing transmissibility, virulence, host range, immune evasion, or resistance to therapeutics)
- [ ] De novo synthesis of genetic material or whole organisms
- [ ] Work with human or animal tissue, cells, or biological samples

**Chemical materials and methods:**
- [ ] Chemical synthesis or processing
- [ ] Work with chemical precursors on controlled lists (CWC, Australia Group)
- [ ] Novel toxic compounds or pharmaceutically active substances
- [ ] Aerosol generation, dispersal, or delivery mechanisms
- [ ] Work with explosives, propellants, or energetic materials

**Technology and information:**
- [ ] Autonomous systems, AI, or machine learning
- [ ] Dual-use equipment (fermenters, centrifuges, spray dryers, etc.)
- [ ] Nuclear or radiological materials
- [ ] Surveillance, monitoring, or tracking technologies
- [ ] Encryption, cybersecurity, or offensive cyber capabilities
- [ ] Data or methods that could lower barriers to creating dangerous agents or materials

**Cross-cutting:**
- [ ] International collaboration (particularly with countries subject to export controls or sanctions)
- [ ] Work that could have military or intelligence applications
- [ ] Research outputs that could enable harmful actions if published in detail

- [ ] None of the above — my research does not involve any of these

Each item has a (?) icon that expands a brief explanation with examples, so researchers unfamiliar with the categories can self-identify. For example:

> **Gain-of-function research:** Research that alters an organism to give it new or enhanced capabilities. Examples include engineering a virus to be more transmissible, increasing a pathogen's resistance to existing treatments, or expanding the range of hosts an organism can infect. Even if this is not the primary aim of your work, select this if your methods could produce these effects.

### Augmented Mode — Screen 2a: Research Description

"Briefly describe your research in 2-3 sentences. Focus on what you're doing and what materials or methods are involved."

[Free text input, ~100 word limit]

LLM classifies the description into the same activity/material categories as the naive multi-select.

**Screen 2a-confirm:** The tool shows the researcher which categories were identified:
> "Based on your description, your research appears to involve: **Genetic modification or synthetic biology**, **Biological agents**, and **Work with chemical precursors**. Is this correct?"
>
> [Confirm] [Edit selections manually]

The researcher can adjust — the LLM classification is a starting point, not final.

---

## Phase 3: Domain-Specific Deep Dive

Based on the categories selected/identified in Phase 2, the tool presents relevant question sets. If multiple categories were selected, questions from all relevant domains are shown (the union, not the intersection). Questions are presented in logical groups, not as a single monolithic list.

### 3A: Biological Agents and Pathogens
*Triggered by: Biological agents, Pathogen characterisation/enhancement, Gain-of-function*

**3A.1** "Which organisms or biological agents does your research involve?"
- Free text (naive) or extracted from pasted text (augmented)
- Tool checks against ACDP Hazard Group classifications and Australia Group biological agents list
- If a match is found, the tool surfaces the classification with context:
  > "You mentioned *Mycobacterium tuberculosis*. This is classified as ACDP Hazard Group 3 and is on the Australia Group list of biological agents. Have you considered the containment and oversight requirements this implies?"

**3A.2** "Does your research involve any of the following?" (select all that apply)
- [ ] Enhancing transmissibility of a pathogen
- [ ] Enhancing virulence or pathogenicity
- [ ] Expanding host range
- [ ] Enhancing resistance to therapeutics or vaccines
- [ ] Enhancing immune evasion
- [ ] Rendering a population more susceptible to an agent
- [ ] Generating or reconstituting an eradicated or extinct agent

(These are the seven categories from the US DURC policy — widely recognised internationally as the canonical gain-of-function concern list.)

**3A.3** "Could the methods or techniques you are developing be applied to organisms other than your study organism — including organisms that could be weaponised?"
- Yes / No / Unsure
- If Yes or Unsure: "Have you considered how to manage this transferability risk? [Guidance link]"

**3A.4** "Does your research produce detailed protocols that could enable someone without specialist training to work with dangerous biological agents?"
- Yes / No / Unsure
- This is the "information hazard" question for biology.

### 3B: Genetic Modification and Synthetic Biology
*Triggered by: Genetic modification/synthetic biology, De novo synthesis*

**3B.1** "What organisms are being modified or constructed?"
- Free text / extracted

**3B.2** "What capabilities are being engineered or what functions are being modified?"
- Free text / extracted
- Tool checks for overlap with gain-of-function concern categories (3A.2)

**3B.3** "Does your work involve synthesising genetic sequences de novo?"
- Yes / No
- If Yes: "Could these sequences, or parts of them, encode proteins or functions associated with pathogenicity, toxicity, or immune evasion?"
  - Yes / No / Unsure

**3B.4** "Could your genetic constructs be transferred to, or function in, pathogenic organisms?"
- Yes / No / Unsure

### 3C: Chemical Hazards
*Triggered by: Chemical synthesis, Chemical precursors, Novel toxic compounds, Aerosol generation, Explosives*

**3C.1** "Does your research involve any chemicals on the following controlled lists?"
- Chemical Weapons Convention Schedules 1, 2, or 3
- Australia Group chemical precursors list
- Provide searchable/browsable reference within the tool, with common names alongside systematic names

**3C.2** "Does your synthesis route use or produce intermediates that appear on controlled lists, even if they are not your target product?"
- Yes / No / Unsure
- This catches researchers who don't realise their intermediates are controlled.

**3C.3** "Could your synthesis methods or routes be adapted to produce chemical weapons agents or their precursors?"
- Yes / No / Unsure

**3C.4** "Does your research involve novel compounds with significant toxicity, or methods for enhancing the toxicity or bioavailability of existing compounds?"
- Yes / No / Unsure

**3C.5** "Does your work involve aerosolisation, encapsulation, or dispersal mechanisms that could be adapted for delivery of harmful agents?"
- Yes / No / Unsure

### 3D: Technology and Dual-Use Equipment
*Triggered by: Dual-use equipment, AI/autonomous systems, Nuclear/radiological, Surveillance, Cyber*

**3D.1** "Does your research involve equipment or technology on the Wassenaar Arrangement dual-use list?"
- Provide searchable reference
- Common examples: certain centrifuges, fermenters, spray dryers, CNC machine tools, specific sensors

**3D.2** "Could the technology you are developing be directly applied to weapons development, military targeting, or mass surveillance?"
- Yes / No / Unsure

**3D.3** "Does your AI/ML work involve any of the following?"
- [ ] Training models on data related to dangerous agents or weapons
- [ ] Developing capabilities that could assist in planning or executing attacks
- [ ] Creating tools that could automate the design of harmful agents
- [ ] Lowering the expertise barrier for dangerous activities
- [ ] Generating content that could enable bioweapons, chemical weapons, or cyberattacks

**3D.4** "Does your technology have applications in surveillance, tracking, or monitoring of individuals or populations?"
- Yes / No / Unsure
- If Yes: "Have you considered the implications for privacy, civil liberties, and potential misuse by authoritarian regimes?"

### 3E: Information Hazards and Publication Risk
*Triggered by: Data/methods as barrier-lowering, Research outputs enabling harm, OR triggered as a cross-cutting module for any amber/red items from 3A-3D*

**3E.1** "If your research is published in full detail, could it provide a 'roadmap' that would meaningfully assist someone seeking to cause harm?"
- Yes / No / Unsure

**3E.2** "Does your research lower the expertise, cost, or access barriers for creating dangerous agents, weapons, or capabilities?"
- Yes / No / Unsure

**3E.3** "Have you considered whether any aspect of your results should be published with restricted detail, or shared only through controlled channels?"
- Yes / No / Not applicable

---

## Phase 4: Misuse Reflection

This is the core "thinking" step — where the researcher is asked to engage with the dual-use dimension of their own work directly.

### Naive Mode — Screen 4n: Structured Prompts

Present 3-4 targeted reflection prompts based on the categories identified. Examples:

For biological research:
> "Imagine your research is completely successful. A non-specialist reads your published paper. What is the most harmful thing they could do with the knowledge and methods you have described?"

For chemical research:
> "Consider the full synthesis route you are developing. If someone with basic chemistry training followed your published methods, what is the most dangerous product they could make — intentionally or accidentally?"

For technology research:
> "Consider your technology in the hands of an actor with harmful intent. What is the worst realistic misuse scenario? What would they need beyond your published work to carry it out?"

General (always shown):
> "Beyond deliberate misuse, could your research cause accidental harm — through environmental release, unintended consequences of application, or misunderstanding of your findings?"

These are reflection prompts — the tool does not collect answers in naive mode. They are presented for the researcher to think about, with a "I have reflected on this" acknowledgement button to proceed.

### Augmented Mode — Screen 4a: Free-Text Misuse Reflection

> "Based on your understanding of your research, what potential misuse applications could there be if your work is successful? What concerns, if any, do you have about how your research could be applied by others?"

[Free text input]

LLM extracts and classifies the concerns against known risk categories, and may surface additional considerations:
> "You mentioned concern about [X]. This aligns with [risk category]. Have you also considered [related concern that the researcher did not mention]?"

---

## Phase 5: Existing Safeguards

### Screen 5a: Current Oversight
"What institutional oversight or safeguards currently apply to your research?" (select all that apply)

- [ ] Institutional biosafety committee review
- [ ] Research ethics committee (REC) review
- [ ] Home Office licence (for animal research)
- [ ] NHS REC approval (for human participants)
- [ ] GM safety committee approval
- [ ] Export control review
- [ ] Institutional security review
- [ ] None of the above
- [ ] I'm not sure what applies

If "None" or "Not sure": the tool flags this gently:
> "Consider contacting your institution's research governance office to understand what oversight may apply to your work. This is especially important given the activity areas you've identified."

### Screen 5b: Risk Mitigation Already in Place
"Have you already taken any of the following steps?" (select all that apply)

- [ ] Conducted a formal risk assessment
- [ ] Consulted with a biosafety or biosecurity officer
- [ ] Discussed dual-use implications with collaborators
- [ ] Considered alternative lower-risk approaches
- [ ] Planned for responsible publication (e.g., omitting sensitive details)
- [ ] None of the above

This information feeds into the output — if safeguards are already in place, the output acknowledges and builds on them rather than suggesting the researcher start from scratch.

---

## Phase 6: Results and Output

### Screen 6a: Tiered Assessment Summary

Based on all inputs, present a tiered result:

**Green — Low concern:**
> "Based on your responses, no specific dual-use or security concerns were identified. This does not guarantee the absence of such concerns — the assessment is only as good as the information provided."
> - General good-practice guidance for the researcher's activity areas
> - Links to broader RRI resources (TAS Hub cards, Turing Commons, etc.)
> - Funder-specific guidance if applicable

**Amber — Moderate concern:**
> "Your research touches areas with dual-use considerations that are worth reflecting on. This is common for work in [domain] — well-established frameworks exist for managing these risks."
> - Specific concerns identified, framed as "Have you considered..."
> - Suggested mitigation approaches
> - Pointers to relevant institutional oversight (e.g., "Your work with [agent] may require biosafety committee review")
> - Funder-specific requirements if applicable

**Red — Significant concern:**
> "Your research involves areas with significant dual-use or security implications. This is not unusual for cutting-edge work in [domain], and many successfully funded projects have navigated similar considerations."
> - Specific concerns with detailed context
> - Strong (but non-alarmist) recommendation to seek specialist advice
> - "This concern may require changes to your methodology, not just documentation in your RRI section"
> - Specific institutional contacts to consider (biosafety committee, export control officer, etc.)
> - Examples of how other researchers have addressed similar concerns

### Screen 6b: Template-Assembled Writing Output

Available only after the researcher has reviewed the full assessment.

Presents a structured draft skeleton for the RRI section, assembled from pre-written templates based on:
- The tier result
- The specific concerns identified
- The safeguards already in place
- The funder (if specified)

Example assembled output:
> "The proposed research involves [activity categories identified]. We have considered the dual-use implications of this work, particularly [specific concerns from the assessment].
>
> To mitigate these risks, [mitigation approaches — drawn from templates matching the specific concerns]. [Institutional oversight already in place, from Phase 5 responses].
>
> [Funder-specific language if applicable, e.g., 'In accordance with the BBSRC/MRC joint policy on research misuse, we have...']
>
> [Ongoing monitoring commitment template]."

The researcher edits and adapts this — it is a starting skeleton, not a finished section.

### Screen 6c: Broader RRI Pointers

Links to existing resources for non-security RRI dimensions:
- Public engagement: TAS Hub RRI Prompts and Practice Cards
- Open access: UKRI Open Access Policy guidance
- EDI: UKRI EDI guidance
- Environmental impact: relevant funder guidance
- Research integrity: UK Concordat to Support Research Integrity

### Screen 6d: Export and Warning

**[Download Assessment (PDF)]** **[Download Assessment (Markdown)]**

Prominent warning:
> "Your assessment results are not stored on our servers. If you close this page without downloading, your results will be permanently lost."

Optional feedback prompt:
> "Did this assessment surface anything you hadn't previously considered? [Yes / No]"
> "Did it miss anything you think it should have caught? [Free text, optional]"

Browser `beforeunload` event warns if the user hasn't downloaded.

---

## Branching Logic Summary

The flow is linear with conditional branches:

```
Phase 0 (Welcome + Mode) → Phase 1 (Context) → Phase 2 (Routing)
                                                      ↓
                                    ┌─────────────────┼─────────────────┐
                                    ↓                 ↓                 ↓
                                Phase 3A-B        Phase 3C          Phase 3D
                                (Bio/Synbio)      (Chemical)        (Tech)
                                    ↓                 ↓                 ↓
                                    └─────────────────┼─────────────────┘
                                                      ↓
                                                  Phase 3E
                                            (Information Hazards)
                                            [if any amber/red from 3A-3D,
                                             or if selected in Phase 2]
                                                      ↓
                                                  Phase 4
                                            (Misuse Reflection)
                                                      ↓
                                                  Phase 5
                                            (Existing Safeguards)
                                                      ↓
                                                  Phase 6
                                            (Results + Output)
```

Multiple Phase 3 branches can be active simultaneously (union of all selected categories). The researcher sees all relevant questions, grouped by domain, not interleaved.
