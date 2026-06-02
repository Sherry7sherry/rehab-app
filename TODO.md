# FlowMove TODO

## Highest Priority

1. Harden workout session runtime v0.
   - Keep the GitHub version as the current baseline.
   - Add paused and ended-early states.
   - Add stronger browser back/navigation handling.
   - Replace remaining hard-coded copy in the player with session/recommendation data.

2. Make post-session reports truly data-driven.
   - Add richer path-specific tone variants.
   - Add per-exercise movement notes once pose detection or deterministic mock scoring is available.
   - Add before/after comparison against previous completed sessions.

3. Improve prototype persistence controls.
   - Add a simple reset/debug control for prototype testing.
   - Add migration/version handling if persisted state shape changes.
   - Keep `localStorage` data shape close to the future TypeScript model.

4. Convert prototype data model to TypeScript types.
   - `Exercise`
   - `ExerciseVariant`
   - `ProgramModule`
   - `AssessmentMovement`
   - `AssessmentResult`
   - `ScreeningResult`
   - `RecommendationResult`
   - `Session`
   - `SessionReport`

5. Start Next.js PWA project skeleton.
   - Preserve the current prototype behavior.
   - Move content/rule engines into typed modules.
   - Keep UI mobile-first.

## Product Logic

- Replace mock assessment scores with deterministic mock scenarios for postpartum and corrective paths.
- Add more realistic scoring dimensions per movement:
  - alignment
  - stability
  - range of motion
  - tempo
  - symmetry
  - control
- Add path-specific report tone.
- Add readiness check into session runtime, not only recommendation.
- Add path switching with re-screening.
- Add previous-session comparison into Progress tab.

## Safety

- Refine high-risk vs caution screening rules.
- Add safety copy for:
  - pelvic heaviness
  - leakage
  - bleeding
  - dizziness
  - sharp pain
  - radiating pain
  - recent surgery
  - high pain score
- Keep all safety language non-diagnostic.

## UX/UI

- Improve workout player with per-exercise demo image/video.
- Add workout states for preparing, active exercise, paused, completed, and ended early.
- Add clearer camera setup states:
  - camera enabled
  - camera denied
  - demo-only mode
  - tracking confidence low
- Add empty states for skipped assessment and demo-only mode.
- Compress long recommendation logic copy on small screens.

## Future Technical Work

- Add real browser camera access with `navigator.mediaDevices.getUserMedia`.
- Prototype pose estimation with MediaPipe or MoveNet.
- Add backend persistence after local prototype data shape is stable.
- Add authentication after the core loop is stable.
- Add Stripe only after subscription value is testable.
