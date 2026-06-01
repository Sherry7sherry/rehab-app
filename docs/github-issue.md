# Issue: Continue FlowMove MVP from clickable prototype to data-driven PWA

## Context

FlowMove is a mobile-first PWA prototype for an AI Pilates coach focused on women's recovery, alignment, and everyday strength.

The current repo contains a frontend-only prototype that validates the full user journey:

```text
onboarding -> screening -> baseline assessment -> movement profile -> recommendation -> session preview -> workout -> report
```

## Current Implementation

Implemented locally:

- Stitch-inspired mobile UI.
- Postpartum and Corrective Pilates paths.
- Structured screening state.
- Safety/risk rules.
- Seven movement assessment steps with realistic instructional images and phone placement guidance.
- Mock assessment scoring.
- Rule-based recommendation engine.
- Data-driven session preview.
- Prototype report generation.
- Project docs for product, UX, and architecture.

Important files:

- `README.md`
- `NOTES.md`
- `TODO.md`
- `prototype/app.js`
- `prototype/data/flowmove-content.js`
- `prototype/data/screening-rules.js`
- `prototype/data/assessment-engine.js`
- `prototype/data/recommendation-engine.js`

## Next Work

Recommended next milestone:

Build workout session runtime v0.

Acceptance criteria:

- Session is generated from recommendation result.
- Workout player progresses through exercise variants one by one.
- Runtime tracks completed/skipped exercises.
- Runtime records mock cue events.
- Session report uses runtime data instead of static report templates only.

## Safety Boundary

The MVP should remain non-diagnostic and avoid medical treatment claims.

Use conservative language and route high-risk symptoms to clinician consultation.

