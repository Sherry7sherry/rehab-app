# FlowMove TODO

## Highest Priority

1. Build workout session runtime v0.
   - Generate a session object from the recommendation result.
   - Play through exercise variants one by one.
   - Track current exercise index, completed/skipped exercises, cue events, and elapsed time.
   - Make the workout player data-driven instead of fixed to one mock exercise.

2. Generate session reports from session runtime data.
   - Use completed exercises, cue events, assessment signals, and recommendation context.
   - Produce `whatImproved`, `needsAttention`, and `nextAdjustment`.
   - Keep reports template-based first.

3. Convert prototype data model to TypeScript types.
   - `Exercise`
   - `ExerciseVariant`
   - `ProgramModule`
   - `AssessmentMovement`
   - `AssessmentResult`
   - `ScreeningResult`
   - `RecommendationResult`
   - `Session`
   - `SessionReport`

4. Start Next.js PWA project skeleton.
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

## Safety

- Refine high-risk vs caution screening rules.
- Add safety copy for:
  - pelvic heaviness
  - leakage
  - bleeding
  - dizziness
  - sharp pain
  - recent surgery
  - high pain score
- Keep all safety language non-diagnostic.

## UX/UI

- Improve workout player with per-exercise demo image/video.
- Add clearer camera setup states:
  - camera enabled
  - camera denied
  - demo-only mode
  - tracking confidence low
- Improve Progress tab with real history once session runtime exists.
- Add empty states for skipped assessment and demo-only mode.
- Compress long recommendation logic copy on small screens.

## Future Technical Work

- Add real browser camera access with `navigator.mediaDevices.getUserMedia`.
- Prototype pose estimation with MediaPipe or MoveNet.
- Add persistence layer:
  - local storage first
  - backend later
- Add authentication after the core loop is stable.
- Add Stripe only after subscription value is testable.

