# Template Assembly System

This document defines the modular text blocks that are assembled into draft RRI section text based on the researcher's assessment results. The assembled output follows the structural pattern observed in successful UKRI applications.

## Design Principles

1. **Modular.** Small blocks that combine. No monolithic paragraphs.
2. **Placeholder-driven.** Researcher fills in specifics — the tool never invents details about their research.
3. **Tone: reflective, not declarative.** "We have considered..." not "There are no risks."
4. **Honest.** Templates acknowledge dual-use dimensions rather than minimising them.
5. **500-word target.** The assembled output should land at 300-450 words, leaving room for the researcher to add specifics.

## Assembly Logic

```
1. Opening statement (based on concern level)
2. For each concern from Phase 3 (ordered by signal strength):
   → Concern identification block
   → Matched mitigation block
3. Safeguard acknowledgment (based on Phase 5)
4. Funder-specific overlay (if funder selected in Phase 1)
5. Closing commitment
```

---

## 1. Opening Statements

### 1a. Opening: Low Concern
> We have considered the ethical and responsible research implications of the proposed work. While the research does not raise specific dual-use or security concerns, we recognise that responsible practice requires ongoing awareness of how research outcomes could be applied beyond their intended context.

### 1b. Opening: Moderate Concern
> We have considered the ethical and responsible research implications of the proposed work and identified areas with dual-use considerations that warrant reflection and active management. The following outlines the specific considerations identified and the measures in place to address them.

### 1c. Opening: Significant Concern
> The proposed research involves areas with significant dual-use and security implications, which we have carefully considered as part of our research design. We recognise that work of this nature requires robust governance and proactive risk management. The following describes the specific dual-use dimensions identified, the safeguards in place, and our approach to responsible conduct throughout the project.

---

## 2. Concern Identification Blocks

Each block is triggered by a specific Phase 3 signal. Multiple blocks can be combined.

### 2-BIO-AGENT: Regulated Biological Agent
> The proposed research involves work with [PLACEHOLDER: organism name], classified as ACDP Hazard Group [PLACEHOLDER: group number]. [IF AUSTRALIA_GROUP: This organism also appears on the Australia Group list of biological agents, which carries additional oversight and export control considerations.]

### 2-BIO-GOF: Gain-of-Function Work
> Our research involves [PLACEHOLDER: specific enhancement, e.g., "characterising transmissibility determinants of" / "engineering enhanced stability in"] [PLACEHOLDER: organism]. We recognise that work which could [PLACEHOLDER: specific gain-of-function category, e.g., "enhance transmissibility" / "expand host range" / "confer resistance to therapeutics"] falls within internationally recognised categories of dual-use research of concern.

### 2-BIO-TRANSFER: Method Transferability
> The methods and techniques developed in this project could, in principle, be applied to organisms beyond our study system, including [PLACEHOLDER: specific higher-risk organisms or classes of organism to which the methods could transfer, e.g., "ACDP Hazard Group 3 pathogens in the same family" / "select agents with similar receptor biology"]. To manage this transferability risk, we will [PLACEHOLDER: specific measures, e.g., "limit methodological detail in publications to what is necessary for reproducibility" / "restrict access to detailed protocols to authorised collaborators"].

### 2-BIO-PROTOCOL: Protocol Information Hazard
> The proposed work will generate detailed protocols for [PLACEHOLDER: technique/method] that could, if applied without appropriate safeguards, enable work with dangerous biological agents by individuals without specialist training. To mitigate this, we will [PLACEHOLDER: specific measures, e.g., "omit critical parameters from published methods" / "require material transfer agreements before sharing protocols" / "publish a summary methodology with full details available only on request to qualified laboratories"].

### 2-SYNBIO-DENOVO: De Novo Synthesis
> The project involves [PLACEHOLDER: "synthesis of" / "ordering of"] synthetic nucleic acid sequences [PLACEHOLDER: from a commercial provider / using in-house synthesis]. We have considered the dual-use implications of these sequences, particularly their potential to encode [PLACEHOLDER: specific concern, e.g., "pathogenicity-associated functions" / "toxin components"].

### 2-SYNBIO-CONSTRUCT: Pathogen-Transferable Constructs
> The genetic constructs developed in this project could potentially function in [PLACEHOLDER: specific pathogenic organisms or classes]. We have assessed this risk and will manage it through [PLACEHOLDER: specific measures, e.g., "engineering genetic safeguards (kill switches / auxotrophic dependencies) into all constructs" / "maintaining all construct work under CL2 containment" / "restricting construct distribution to collaborators under material transfer agreements"].

### 2-CHEM-CONTROLLED: Controlled Chemical Substances
> The proposed research involves [PLACEHOLDER: chemical name(s)], which [PLACEHOLDER: "appears on CWC Schedule [1/2/3]" / "is listed as an Australia Group chemical precursor"]. We will comply with all applicable regulatory requirements, specifically [PLACEHOLDER: specific compliance measures, e.g., "maintaining OPCW-compliant records of synthesis and use" / "operating under our institution's CWC licence" / "limiting quantities to those strictly necessary for the research"].

### 2-CHEM-INTERMEDIATE: Controlled Intermediates
> Our synthesis route involves intermediates that appear on controlled lists, specifically [PLACEHOLDER: intermediate name and list]. Although these are not our target products, we will manage their presence through [PLACEHOLDER: specific measures, e.g., "minimising quantities and residence times of controlled intermediates" / "conducting these steps under fume hood with appropriate PPE and waste disposal" / "exploring alternative routes that avoid controlled intermediates where feasible"].

### 2-CHEM-ROUTE: Adaptable Synthesis Route
> We recognise that the synthesis methods developed in this project could, in principle, be adapted for the production of [PLACEHOLDER: specific harmful agents or classes of concern]. To manage this risk, we will [PLACEHOLDER: specific measures, e.g., "limit publication of step-by-step synthesis details for the most sensitive transformations" / "discuss publication strategy with the journal editor under their dual-use review policy" / "focus published methods on the analytical rather than preparative aspects of the work"].

### 2-CHEM-DISPERSAL: Dispersal Mechanisms
> The project involves development of [PLACEHOLDER: aerosolisation / encapsulation / dispersal methods] for [PLACEHOLDER: intended legitimate application, e.g., "drug delivery" / "agricultural spraying" / "environmental monitoring"]. We recognise that these methods could be misused for delivery of harmful agents. To mitigate this, we will [PLACEHOLDER: specific measures, e.g., "design systems with parameters unsuitable for weaponisation" / "restrict access to dispersal equipment specifications" / "publish performance data without detailed engineering schematics"].

### 2-TECH-WASSENAAR: Wassenaar-Listed Technology
> The research involves [PLACEHOLDER: technology/equipment] which appears on the Wassenaar Arrangement dual-use list. We have consulted with [PLACEHOLDER: "our institution's export control officer" / "the relevant compliance team"] and will [PLACEHOLDER: specific compliance measures, e.g., "obtain the necessary export licences prior to any international transfer" / "ensure all project staff are briefed on export control obligations" / "maintain auditable records of technology access and use"].

### 2-TECH-WEAPONS: Weapons Applicability
> We recognise that the technology developed in this project has potential applications in [PLACEHOLDER: weapons development / military targeting / autonomous weapons systems]. To ensure responsible development, we will [PLACEHOLDER: specific measures, e.g., "restrict the project scope to exclude weapons-applicable configurations" / "implement use-case limitations in any released software" / "engage with [specific ethics board or advisory body] to review the project's direction at defined milestones"].

### 2-TECH-AI: AI/ML Misuse Potential
> The AI/ML capabilities developed in this project could [PLACEHOLDER: "lower the expertise barrier for" / "automate aspects of" / "assist in planning"] [PLACEHOLDER: specific harmful application]. To address this, we have [PLACEHOLDER: specific measures, e.g., "designed the model architecture to exclude [specific dangerous capability]" / "implemented output filtering to prevent generation of [specific harmful content]" / "restricted training data to exclude [specific sensitive data]"] and will [PLACEHOLDER: dissemination measures, e.g., "release model weights only to vetted researchers under a responsible use licence" / "publish findings without releasing the trained model" / "engage with the Partnership on AI's responsible publication framework"].

### 2-TECH-SURVEILLANCE: Surveillance Applications
> The technology developed in this project has potential applications in surveillance, tracking, or monitoring of individuals. We have assessed these risks, specifically [PLACEHOLDER: specific concerns, e.g., "the potential for [technology] to be deployed for mass surveillance without consent" / "the risk that [capability] could be used to target vulnerable populations"]. To mitigate this, we will [PLACEHOLDER: specific measures, e.g., "build privacy-preserving constraints into the system architecture" / "publish an ethical use framework alongside any released tools" / "restrict licensing to applications that meet defined human rights criteria"].

### 2-TECH-CYBER: Cybersecurity Dual-Use
> Our research involves [PLACEHOLDER: "discovery of novel vulnerabilities in" / "development of tools that could bypass" / "offensive capabilities for"] [PLACEHOLDER: specific systems]. To manage the dual-use risk, we will [PLACEHOLDER: specific disclosure and publication measures, e.g., "follow coordinated disclosure through [NCSC / CERT / vendor], allowing [X days] for patching before publication" / "publish defensive findings only, withholding exploit code" / "restrict tool distribution to authorised security researchers under a responsible use agreement"].

### 2-TECH-QUANTUM: Quantum Technology Implications
> The quantum [PLACEHOLDER: computing / sensing / communications] capabilities developed in this project have implications for [PLACEHOLDER: "existing cryptographic infrastructure" / "covert detection capabilities" / "secure communications"]. We have assessed these implications with [PLACEHOLDER: "our institution's security team" / "NCSC guidance on quantum-safe cryptography" / "relevant ATAS requirements"] and will [PLACEHOLDER: specific measures, e.g., "engage with the NCSC regarding responsible disclosure of cryptographic implications" / "restrict access to quantum sensing calibration data" / "publish capability demonstrations without detailed implementation specifications"].

### 2-TECH-MATERIALS: Advanced Materials
> The advanced materials developed in this project ([PLACEHOLDER: specific materials]) have potential dual-use applications in [PLACEHOLDER: specific concern, e.g., "stealth coatings for military platforms" / "enhanced armour penetration" / "radiological shielding for illicit purposes"]. To manage this, we will [PLACEHOLDER: specific measures, e.g., "focus published characterisation on civilian applications" / "consult with our export control officer regarding material transfer restrictions" / "limit synthesis scale to quantities appropriate for research rather than production"].

### 2-TECH-ROBOTICS: Autonomous Platforms
> The autonomous [PLACEHOLDER: platform type] developed in this project has capabilities that could be adapted for [PLACEHOLDER: "payload delivery" / "autonomous targeting" / "circumventing physical security"]. To prevent misuse, we will [PLACEHOLDER: specific measures, e.g., "implement geofencing and payload-weight limitations in all platform firmware" / "design the control architecture to require human-in-the-loop authorisation for navigation beyond defined boundaries" / "publish research on perception and planning algorithms without releasing integrated autonomous operation software"].

### 2-INFO-ROADMAP: Publication as Roadmap
> We recognise that detailed publication of our methods and results could provide a roadmap for [PLACEHOLDER: specific harmful applications]. To manage this, we will [PLACEHOLDER: specific publication strategy, e.g., "submit to journals with established dual-use review policies" / "publish a high-level methodology with sensitive parameters available only to verified researchers on request" / "discuss the scope of methodological disclosure with [institutional biosafety committee / co-authors / journal editor] prior to submission"].

### 2-INFO-BARRIER: Barrier Lowering
> Our research may lower the [PLACEHOLDER: "expertise" / "cost" / "access"] barriers for [PLACEHOLDER: specific harmful capability]. To balance the benefits of open science with this risk, we will [PLACEHOLDER: specific balancing measures, e.g., "publish the scientific findings and principles openly while restricting access to operational tools, datasets, or protocols" / "include explicit dual-use warnings in publications" / "engage with [specific community / funder / advisory body] to develop a responsible dissemination plan before results are finalised"].

### 2-CROSS-EXPORT: Export Control
> The proposed international collaboration involves partners in [PLACEHOLDER: country/region] and touches on areas subject to export controls. We have consulted with our institution's export control officer and will comply with all applicable regulations.

### 2-CROSS-MILITARY: Military Applications
> We recognise that aspects of this research — specifically [PLACEHOLDER: which aspects, e.g., "the targeting algorithms" / "the material properties under extreme conditions" / "the autonomous navigation capabilities"] — have potential military or intelligence applications. We will manage this through [PLACEHOLDER: specific measures, e.g., "maintaining the project's civilian research focus and declining defence-sector funding for this work" / "establishing an advisory board including ethics expertise to review any defence-adjacent applications" / "ensuring that any engagement with defence stakeholders is transparent and approved by the institutional research governance office"].

---

## 3. Mitigation Blocks

Matched to concern types. Each describes the typical response.

### 3-MIT-CONTAINMENT: Biosafety Containment
> All work with [PLACEHOLDER: agent] will be conducted at Containment Level [PLACEHOLDER: level] in [PLACEHOLDER: facility name], in accordance with institutional biosafety requirements and the Health and Safety Executive's guidance on the Genetically Modified Organisms (Contained Use) Regulations 2014.

### 3-MIT-RISK-ASSESSMENT: Formal Risk Assessment
> A formal, project-specific risk assessment will be conducted [PLACEHOLDER: "has been conducted" if already done] in accordance with [PLACEHOLDER: "the BBSRC/MRC joint policy on research misuse" / "institutional biosafety requirements" / "HSE guidance"], covering both biosafety and biosecurity dimensions.

### 3-MIT-ALTERNATIVE: Lower-Risk Alternatives Considered
> We have considered alternative, lower-risk experimental approaches, including [PLACEHOLDER: e.g., "use of attenuated strains" / "in silico modelling" / "surrogate organisms" / "protein components rather than whole agents"]. [PLACEHOLDER: "We have adopted [alternative] where feasible." / "The use of [chosen approach] is necessary because [justification]."]

### 3-MIT-PUBLICATION: Responsible Publication
> We are committed to responsible publication practices. All outputs will be reviewed for sensitive content prior to submission, and we will consider whether detailed methodological information should be [PLACEHOLDER: "omitted from public versions" / "shared only through controlled channels" / "discussed with the journal editor under dual-use review policies"].

### 3-MIT-ACCESS: Access Controls
> Access to [PLACEHOLDER: "materials" / "data" / "equipment" / "protocols"] is restricted to [PLACEHOLDER: "named personnel with appropriate training" / "authorised laboratory members" / "individuals with DBS/security clearance"]. [PLACEHOLDER: specific access control details].

### 3-MIT-SCREENING: Sequence / Order Screening
> Synthetic nucleic acid orders are placed through providers that screen against controlled sequence databases. Additionally, we [PLACEHOLDER: "conduct internal review of all sequences prior to ordering" / "maintain records of all synthetic material ordered"].

### 3-MIT-DISCLOSURE: Responsible Vulnerability Disclosure
> We will follow responsible disclosure practices for any security vulnerabilities discovered during this research, working with [PLACEHOLDER: "the National Cyber Security Centre" / "affected vendors" / "the CERT Coordination Center"] to ensure vulnerabilities are addressed before detailed publication.

### 3-MIT-EXPORT: Export Control Compliance
> We will comply with all applicable export control regulations, including the Export Control Order 2008 and relevant EU regulations. Our institution's export control officer has been consulted and [PLACEHOLDER: "has confirmed no licence is required" / "is assisting with the licence application process"].

---

## 4. Safeguard Acknowledgment Blocks

Based on Phase 5 responses.

### 4-SAFE-OVERSIGHT: Institutional Oversight Confirmed
> This research operates under the oversight of [PLACEHOLDER: "our institutional biosafety committee" / "the university research ethics committee" / "the institutional GM safety committee"], which has [PLACEHOLDER: "approved the project" / "been consulted and will review the project prior to commencement"].

### 4-SAFE-RISK-DONE: Risk Assessment Already Conducted
> A formal risk assessment has been completed covering the dual-use dimensions of this project. This assessment is held by [PLACEHOLDER: institutional body] and will be reviewed [PLACEHOLDER: "annually" / "at key project milestones" / "if significant changes to the research plan occur"].

### 4-SAFE-CONSULTED: Specialist Consultation
> We have consulted with [PLACEHOLDER: "our institutional biosafety officer" / "the university's biosecurity advisor" / "our departmental safety coordinator"] regarding the specific risks identified in this project. Their recommendations have been incorporated into our risk management plan.

### 4-SAFE-NONE: No Oversight in Place (Gentle Prompt)
> We will engage with our institution's research governance office to determine what oversight mechanisms are appropriate for this work, and will seek relevant approvals prior to commencing experimental activities.

### 4-SAFE-PARTIAL: Partial Oversight
> [PLACEHOLDER: specific oversight already in place]. We will additionally [PLACEHOLDER: "conduct a formal risk assessment" / "consult with a biosecurity specialist" / "seek approval from the institutional biosafety committee"] to strengthen our governance framework for this project.

---

## 5. Funder-Specific Overlays

Appended when a specific funder is selected.

### 5-FUNDER-BBSRC-MRC: BBSRC or MRC
> In accordance with the BBSRC/MRC joint policy on managing risks of research misuse, we have assessed the potential for this research to be used for harmful purposes, to cause harm through accidental release, or to be targeted for malicious intent. Specifically, we have:
> - Designed our study considering lower-risk alternative approaches, [PLACEHOLDER: e.g., "selecting attenuated strains where feasible" / "concluding that the chosen approach is necessary because [justification]"]
> - Conducted [PLACEHOLDER: "a formal risk assessment" / "an initial risk assessment, with a full project-specific assessment planned prior to commencement"]
> - Planned a responsible approach to sharing findings by [PLACEHOLDER: specific sharing strategy, e.g., "reviewing all publications for sensitive content prior to submission" / "engaging with journal dual-use policies"]

### 5-FUNDER-EPSRC: EPSRC
> Consistent with EPSRC's Framework for Responsible Innovation (AREA), we have sought to:
> - **Anticipate** potential impacts of this research, by [PLACEHOLDER: specific anticipatory measures, e.g., "conducting a dual-use risk assessment prior to commencing experimental work" / "mapping potential downstream applications of our methods"]
> - **Reflect** on its wider implications, in particular [PLACEHOLDER: specific implications identified during Phase 4, e.g., "the potential for our trained models to lower expertise barriers for harmful applications" / "the transferability of our synthesis methods to controlled substances"]
> - **Engage** with [PLACEHOLDER: specific stakeholders, e.g., "our institutional biosafety committee" / "public dialogue participants through [event/mechanism]" / "industry partners with expertise in responsible deployment"]
> - **Act** on these considerations by [PLACEHOLDER: specific actions taken, e.g., "incorporating access controls into our research design from the outset" / "adopting a staged publication strategy with pre-submission security review" / "building in annual risk reassessment milestones"]

### 5-FUNDER-WELLCOME: Wellcome Trust
> In line with Wellcome's expectations for responsible conduct of research, we have considered the potential for misuse of our research outcomes and have implemented risk management measures including [PLACEHOLDER: specific measures, e.g., "pre-commencement biosecurity risk assessment" / "restricted access to sensitive materials" / "responsible publication review"]. We will store all research data and materials for a minimum of 10 years in accordance with Wellcome's policy, with sensitive data held under [PLACEHOLDER: specific security arrangements, e.g., "encrypted storage with role-based access controls"].

### 5-FUNDER-HORIZON: Horizon Europe
> This research has been assessed against the Horizon Europe ethics self-assessment framework. The dual-use dimensions identified above have been documented in the Ethics Issues Table accompanying this proposal. Specific measures to address the flagged ethics issues include [PLACEHOLDER: measures corresponding to Ethics Issues Table entries, e.g., "dual-use review of all deliverables by the project ethics board" / "an ethics work package (WP[X]) dedicated to monitoring and managing misuse risk throughout the project"].

---

## 6. Closing Commitment Blocks

### 6-CLOSE-STANDARD: Standard Closing
> We are committed to maintaining awareness of the dual-use dimensions of this research throughout the project lifecycle. We will review our risk assessment at [PLACEHOLDER: "annual intervals" / "key project milestones"] and in response to any significant changes in the research direction or new developments in the field. Any emerging concerns will be raised with [PLACEHOLDER: appropriate institutional body] promptly.

### 6-CLOSE-GREEN: Low Concern Closing
> While no specific dual-use concerns have been identified, we remain committed to responsible research practices and will remain alert to any emerging ethical or security implications as the project progresses. Should concerns arise, we will seek appropriate guidance from our institution's research governance office.

### 6-CLOSE-SIGNIFICANT: Significant Concern Closing (Reinforced)
> Given the significant dual-use dimensions of this work, we have embedded ongoing risk monitoring into the project management structure. Risk assessments will be reviewed [PLACEHOLDER: frequency], and we will notify [PLACEHOLDER: "our institutional biosafety committee and the funder" / "the relevant oversight bodies"] of any significant changes in risk profile. We are committed to ensuring that this research contributes to [PLACEHOLDER: positive outcome] while minimising the potential for harmful applications.

---

## 7. Broader RRI Links (Always Appended)

This section is not assembled text but a structured list of links, always included at the end of the output.

> **For broader RRI considerations beyond dual-use and security:**
> - Public engagement: [TAS Hub RRI Prompts and Practice Cards](https://tas.ac.uk/responsible-research-innovation/)
> - Open access: [UKRI Open Access Policy](https://www.ukri.org/manage-your-award/publishing-your-research-findings/making-your-research-publications-open-access/)
> - Equity, diversity and inclusion: [UKRI EDI guidance](https://www.ukri.org/what-we-do/supporting-healthy-research-and-innovation-culture/equality-diversity-and-inclusion/)
> - Environmental sustainability: [UKRI Environmental Sustainability guidance](https://www.ukri.org/manage-your-award/good-research-resource-hub/environmental-sustainability/)
> - Research integrity: [UK Concordat to Support Research Integrity](https://ukrio.org/research-integrity/the-concordat-to-support-research-integrity/)
> - AREA framework self-reflection: [ORBIT RRI Self-Assessment Tool](https://orbit-rri.org/tools/self-assessment-tool/)

---

## Assembly Examples

### Example A: Moderate concern, BBSRC application, biosafety committee in place

**Triggers:** Australia Group organism, method transferability, biosafety oversight confirmed, no formal risk assessment yet.

**Assembled output (blocks: 1b → 2-BIO-AGENT → 2-BIO-TRANSFER → 3-MIT-CONTAINMENT → 3-MIT-RISK-ASSESSMENT → 4-SAFE-PARTIAL → 5-FUNDER-BBSRC-MRC → 6-CLOSE-STANDARD):**

> We have considered the ethical and responsible research implications of the proposed work and identified areas with dual-use considerations that warrant reflection and active management. The following outlines the specific considerations identified and the measures in place to address them.
>
> The proposed research involves work with [organism name], classified as ACDP Hazard Group [X]. This organism also appears on the Australia Group list of biological agents, which carries additional oversight and export control considerations. The methods and techniques developed in this project could, in principle, be applied to organisms beyond our study system, including organisms with higher biosecurity implications. We have considered this transferability as part of our risk assessment.
>
> All work with [organism name] will be conducted at Containment Level [X] in [facility name], in accordance with institutional biosafety requirements and the Health and Safety Executive's guidance on the Genetically Modified Organisms (Contained Use) Regulations 2014. A formal, project-specific risk assessment will be conducted in accordance with the BBSRC/MRC joint policy on research misuse, covering both biosafety and biosecurity dimensions.
>
> This research operates under the oversight of our institutional biosafety committee, which has been consulted and will review the project prior to commencement. We will additionally conduct a formal risk assessment and consult with a biosecurity specialist to strengthen our governance framework for this project.
>
> In accordance with the BBSRC/MRC joint policy on managing risks of research misuse, we have assessed the potential for this research to be used for harmful purposes, to cause harm through accidental release, or to be targeted for malicious intent. We are committed to the principles of self-governance, proportionate risk management, and responsible sharing outlined in this policy.
>
> We are committed to maintaining awareness of the dual-use dimensions of this research throughout the project lifecycle. We will review our risk assessment at key project milestones and in response to any significant changes in the research direction. Any emerging concerns will be raised with our institutional biosafety committee promptly.

**Word count:** ~280. Leaves ~220 words for the researcher to add specifics and broader RRI considerations.

---

### Example B: Significant concern, EPSRC application, no oversight yet

**Triggers:** AI/ML misuse potential, barrier lowering, no institutional oversight.

**Assembled output (blocks: 1c → 2-TECH-AI → 2-INFO-BARRIER → 3-MIT-PUBLICATION → 3-MIT-ACCESS → 4-SAFE-NONE → 5-FUNDER-EPSRC → 6-CLOSE-SIGNIFICANT):**

> The proposed research involves areas with significant dual-use and security implications, which we have carefully considered as part of our research design. We recognise that work of this nature requires robust governance and proactive risk management. The following describes the specific dual-use dimensions identified, the safeguards in place, and our approach to responsible conduct throughout the project.
>
> The AI/ML capabilities developed in this project could lower the expertise barrier for [specific harmful application]. We have considered these dual-use dimensions in our research design and dissemination strategy. Our research may lower the expertise, cost, or access barriers for [specific harmful capability]. We have considered how to balance the benefits of open science with the risks of enabling harmful applications.
>
> We are committed to responsible publication practices. All outputs will be reviewed for sensitive content prior to submission, and we will consider whether detailed methodological information should be shared only through controlled channels. Access to trained models and datasets is restricted to named personnel with appropriate training.
>
> We will engage with our institution's research governance office to determine what oversight mechanisms are appropriate for this work, and will seek relevant approvals prior to commencing experimental activities.
>
> Consistent with EPSRC's Framework for Responsible Innovation (AREA), we have sought to:
> - **Anticipate** potential impacts of this research, by [conducting a dual-use risk assessment / mapping downstream applications of our methods]
> - **Reflect** on its wider implications, in particular [the potential for our trained models to lower expertise barriers for harmful applications]
> - **Engage** with [our institutional research governance office / public dialogue participants] to ensure diverse perspectives inform our approach
> - **Act** on these considerations by [incorporating access controls into our research design from the outset / adopting a staged publication strategy with pre-submission security review]
>
> Given the significant dual-use dimensions of this work, we have embedded ongoing risk monitoring into the project management structure. Risk assessments will be reviewed annually, and we will notify the relevant oversight bodies of any significant changes in risk profile. We are committed to ensuring that this research contributes to [positive outcome] while minimising the potential for harmful applications.

**Word count:** ~310. Leaves ~190 words for specifics.

---

### Example C: Low concern, no specific funder

**Triggers:** No specific dual-use concerns, standard activity categories, no funder overlay.

**Assembled output (blocks: 1a → 6-CLOSE-GREEN):**

> We have considered the ethical and responsible research implications of the proposed work. While the research does not raise specific dual-use or security concerns, we recognise that responsible practice requires ongoing awareness of how research outcomes could be applied beyond their intended context.
>
> While no specific dual-use concerns have been identified, we remain committed to responsible research practices and will remain alert to any emerging ethical or security implications as the project progresses. Should concerns arise, we will seek appropriate guidance from our institution's research governance office.

**Word count:** ~85. The researcher will need to add broader RRI considerations (engagement, open access, EDI) to fill the 500-word section. The tool links to resources for these dimensions.

---

## Notes for Implementation

1. **Blocks are stored as JSON** in `data/templates/writing_templates.json`. Each block has an ID, the template text, a list of placeholders, and the trigger conditions (which Phase 3 signals activate it).

2. **Placeholder format:** `[PLACEHOLDER: description]` in the template text. The UI highlights these and prompts the researcher to fill them in. Unfilled placeholders are rendered in the export with the description text as a reminder.

3. **Ordering:** Concern blocks are ordered by signal strength (significant before moderate before note). Within the same signal level, biological concerns come before chemical, which come before technology.

4. **Deduplication:** If a concern triggers both a specific block and a more general one (e.g., both 2-BIO-GOF and 2-BIO-AGENT for the same organism), the more specific block takes precedence and the general block is suppressed.

5. **Funder overlay:** Appended as a distinct paragraph, not merged into other blocks. This keeps it clean for researchers applying to multiple funders — they can swap the overlay.

6. **Word count display:** The UI shows a running word count of the assembled text, against the 500-word UKRI target. The count updates as the researcher fills in placeholders.