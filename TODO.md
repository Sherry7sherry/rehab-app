# FlowMove TODO

## Highest Priority

1. Harden workout session runtime v0.
   - Keep the GitHub version as the current baseline.
   - Add local persistence for the active session and completed session history.
   - Handle browser refresh, back navigation, skipped assessment, and early session exit.
   - Replace remaining hard-coded copy in the player with session/recommendation data.

2. Make post-session reports truly data-driven.
   - Use completed exercises, skipped exercises, cue events, assessment signals, and recommendation context.
   - Produce path-specific `whatImproved`, `needsAttention`, `nextAdjustment`, and movement quality score.
   - Remove remaining hard-coded report examples once the report generator covers the main paths.

3. Add persistence before backend.
   - Save onboarding path, screening answers, assessment result, recommendation, session history, and readiness to `localStorage`.
   - Add a simple reset/debug control for prototype testing.
   - Keep the data shape close to the future TypeScript model.

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
- Make Progress tab read from real session history instead of fixed example entries.

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
- Add persistence layer:
  - local storage first
  - backend later
- Add authentication after the core loop is stable.
- Add Stripe only after subscription value is testable.
