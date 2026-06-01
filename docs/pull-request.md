# PR: Add FlowMove mobile PWA prototype and product logic docs

## Summary

This PR adds the initial FlowMove mobile-first PWA prototype and project handoff documentation.

Included:

- Clickable frontend prototype in `prototype/`.
- FlowMove product memory and architecture docs.
- Content model for exercises, variants, modules, cues, safety tags, assessment movements, and report templates.
- Screening/risk rules.
- Mock assessment scoring engine.
- Rule-based recommendation engine.
- Realistic generated assessment images showing movement examples and suggested phone placement.
- README/TODO/NOTES for continuing work on another machine.

## How To Run

```bash
cd prototype
python3 -m http.server 4174
```

Open:

```text
http://127.0.0.1:4174
```

## Current Product Flow

```text
Welcome
  -> Goal Selection
  -> Screening
  -> Training Preferences
  -> Camera Setup
  -> Baseline Assessment
  -> Movement Profile
  -> Recommended Plan
  -> Today
  -> Session Preview
  -> Workout Player
  -> Session Report
```

## Validation

Manual checks performed locally:

- `node --check prototype/app.js`
- `node --check prototype/data/flowmove-content.js`
- `node --check prototype/data/screening-rules.js`
- `node --check prototype/data/assessment-engine.js`
- `node --check prototype/data/recommendation-engine.js`

Browser smoke-tested:

- high-risk screening routes to Safety Warning
- caution screening downgrades session recommendation
- assessment completion creates movement profile
- assessment signals change recommendation module

## Next Steps

- Build workout session runtime v0.
- Convert data/rule models to TypeScript.
- Start formal Next.js PWA implementation.
- Add persistence after the core loop is stable.

