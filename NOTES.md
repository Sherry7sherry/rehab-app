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
  -> workout/report prototype
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

## Known Prototype Limitations

- No backend.
- No auth.
- No persistence.
- No real camera access.
- No real pose detection.
- No real video demos.
- No actual payment/subscription.
- Some UI images are generated placeholders.
- Workout player is not yet driven by a session runtime.

## GitHub Handoff

Suggested issue title:

```text
Continue FlowMove MVP from clickable prototype to data-driven PWA
```

Suggested PR title:

```text
Add FlowMove mobile PWA prototype and product logic docs
```

