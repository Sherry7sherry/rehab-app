# FlowMove

FlowMove is a mobile-first PWA prototype for an AI Pilates coach focused on women's recovery, alignment, and everyday strength.

The product currently supports two MVP user paths:

- **Postpartum Recovery**: conservative, pressure-aware movement for rebuilding core control, pelvic floor awareness, posture, mobility, and confidence after birth.
- **Women's Corrective Pilates**: low-impact Pilates-based movement for posture, mobility, hip stability, balance, and body control.

The prototype is intentionally frontend-only for now. It validates the product journey before backend, real camera access, pose estimation, authentication, or payments are added.

## Current Prototype

Run locally:

```bash
cd prototype
python3 -m http.server 4174
```

Open:

```text
http://127.0.0.1:4174
```

## What Works Today

- Mobile-first PWA app shell.
- Elegant FlowMove visual direction based on the Stitch design exploration.
- Onboarding path selection.
- Postpartum and Corrective Pilates screening flows.
- Safety warning for high-risk screening answers.
- Caution screening answers that downgrade recommendations to gentle sessions.
- Seven baseline assessment movements with realistic instructional images and phone placement guidance.
- Mock assessment scoring.
- Movement profile with Core Control, Mobility, Stability, and Alignment.
- Rule-based recommendation engine.
- Data-driven session preview.
- Workout player prototype.
- Post-session report prototype.
- Progress, Programs, and Profile tabs.

## Key Local Files

- `AGENTS.md`: durable project memory and major product decisions.
- `NOTES.md`: current implementation context and decisions.
- `TODO.md`: next engineering/product tasks.
- `docs/flowmove-app-structure-and-user-flow.md`: full app flow.
- `docs/flowmove-mvp-screen-spec.md`: screen-level MVP spec.
- `docs/flowmove-technical-architecture.md`: recommended architecture and future native reuse plan.
- `prototype/index.html`: prototype entrypoint.
- `prototype/styles.css`: visual system and layout.
- `prototype/app.js`: prototype UI and flow runtime.
- `prototype/data/flowmove-content.js`: content model, exercise library, variants, modules, cues, and report templates.
- `prototype/data/screening-rules.js`: screening/risk evaluator.
- `prototype/data/assessment-engine.js`: mock assessment scoring engine.
- `prototype/data/recommendation-engine.js`: rule-based recommendation engine.

## Current Architecture Direction

FlowMove should remain data-driven:

```text
screening answers + assessment result + readiness
  -> recommendation engine
  -> recommended module
  -> exercise variants
  -> session preview / workout player / report
```

The first production implementation should likely be:

- Next.js + React + TypeScript
- Mobile-first PWA
- Local content model first, database later
- Browser pose estimation after the flow and recommendation logic are stable

## Important Product Boundary

FlowMove is not positioned as a medical diagnostic or treatment product in the MVP.

Use language such as:

- movement guidance
- recovery support
- posture and alignment
- pressure-aware movement
- consult a qualified clinician

Avoid language such as:

- diagnose
- treat
- cure
- replace physical therapy
- fix pelvic floor dysfunction

