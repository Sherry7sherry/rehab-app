# FlowMove Notes

## Current State

FlowMove is currently a static, browser-runnable prototype in `prototype/`. It should be treated as a clickable product logic prototype, not production code.

The prototype now includes:

- Refined Stitch-inspired mobile UI.
- Realistic assessment images generated for the seven movement assessment steps.
- Content model in `prototype/data/flowmove-content.js`.
- Screening/risk evaluator in `prototype/data/screening-rules.js`.
- Mock assessment scoring in `prototype/data/assessment-engine.js`.
- Rule-based recommendation in `prototype/data/recommendation-engine.js`.
- Session runtime v0 in `prototype/app.js`, including active session state, exercise progression, skipped/completed exercises, cue events, and elapsed time.
- Runtime-informed report generation v0, with some remaining hard-coded report presentation content.

Current Git baseline:

- Local branch for continued work: `codex/continue-from-github`
- Upstream branch: `origin/main`
- Remote repository: `Sherry7sherry/rehab-app`

## Major Decisions

- MVP platform: mobile-first PWA, not native app.
- Native apps later should reuse backend, content model, recommendation logic, reports, and design language.
- Start with one unified exercise library plus path-specific variants/modules.
- Product paths:
  - Postpartum Recovery
  - Women's Corrective Pilates
- Future path:
  - Remote Rehab Companion for clinics and physical therapists
- MVP should avoid medical diagnosis/treatment claims.

## Current User Journey

```text
Welcome
  -> Goal Selection
  -> Path-specific Screening
  -> Training Preferences
  -> Camera Setup
  -> Baseline Assessment Intro
  -> Movement Assessment
  -> Movement Profile
  -> Recommended Plan
  -> Today
  -> Session Preview
  -> Workout Player
  -> Session Complete
  -> Post-Session Report
  -> Progress
```

## Current Data Flow

```text
goals + path
  -> screening answers
  -> screening result
  -> assessment result
  -> recommendation result
  -> session preview
  -> session runtime
  -> workout player
  -> session report
  -> progress history
```

## Safety Behavior

High-risk examples block normal training and show Safety Warning:

- postpartum not cleared for exercise
- bleeding
- dizziness
- sharp pain
- pelvic heaviness
- significant C-section scar pain
- high pain/discomfort
- recent injury or surgery

Caution examples continue but downgrade recommendation to gentle:

- leakage
- mild C-section scar pain
- abdominal separation concern
- pelvic floor concern
- moderate discomfort
- long sitting

## Assessment v0

The seven movement assessment steps are:

1. Standing posture check
2. Shoulder mobility reach
3. Squat to chair
4. Hip hinge
5. Glute bridge
6. Heel tap
7. Single-leg balance

The current assessment engine is mock-based. It produces:

- movement scores
- Core Control
- Mobility
- Stability
- Alignment
- recommendation signals
- first priority module

## Recommendation v0

The recommendation engine is rule-based and explainable. It reads:

- user path
- selected goals
- readiness
- screening signals
- assessment signals

It outputs:

- module
- exercise variants
- intensity
- duration
- recommendation reasons
- next adjustment

## Session Runtime v0

The GitHub baseline now creates an active session from the recommendation result.

The session object tracks:

- path
- module id/title/summary
- selected exercise variants
- current exercise index
- completed exercise variant ids
- skipped exercise variant ids
- cue events
- elapsed seconds
- started/completed timestamps

The workout player advances through variants one by one and can complete, skip, or end a session early.

Next runtime improvements:

- persist active and completed sessions in `localStorage`
- make browser refresh recover the current state
- add paused/demo-only/camera-denied states
- make progress and report screens read fully from session history

## Known Prototype Limitations

- No backend.
- No auth.
- No persistence.
- No real camera access.
- No real pose detection.
- No real video demos.
- No actual payment/subscription.
- Some UI images are generated placeholders.
- Some report and progress content is still static presentation copy.

## GitHub Handoff

Suggested issue title:

```text
Continue FlowMove MVP from clickable prototype to data-driven PWA
```

Suggested PR title:

```text
Add FlowMove mobile PWA prototype and product logic docs
```
