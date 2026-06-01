# FlowMove Project Memory

## Core Project Documents

- App structure and user flow: `docs/flowmove-app-structure-and-user-flow.md`
- Technical architecture: `docs/flowmove-technical-architecture.md`

## Project Goal

FlowMove is a production-grade AI Pilates and movement recovery app for women in English-speaking markets. The product helps users assess movement, receive personalized Pilates-based training guidance, evaluate exercise accuracy through a phone or computer camera, and understand their progress after each session.

The central product promise is:

> Help women feel their progress in every movement.

FlowMove should make users feel that their body changes are visible, specific, and safely guided after each session.

## Product Positioning

Product name: FlowMove

Primary positioning:

> AI Pilates coach for women's recovery, alignment, and everyday strength.

FlowMove should feel warm, professional, trustworthy, and non-medicalized. It should not feel like a generic fitness app or a clinical hospital system.

Recommended slogan:

> Feel your progress in every movement.

## Platform Strategy

FlowMove MVP should be built as a mobile-first web app with PWA behavior, not as a native iOS/Android app.

Rationale:

- Faster MVP development and iteration.
- One codebase can support mobile browsers and desktop browsers.
- Easier to validate onboarding, camera-based assessment, training sessions, progress reports, and subscription intent.
- Users can try the product without app store installation friction.
- Browser camera access is sufficient for early pose-detection validation.

Product expectation:

- FlowMove should feel like an app, not a marketing website.
- Mobile layout is the primary experience.
- Desktop web should be supported, especially for laptop camera use.
- PWA installability should be planned early.

Future platform path:

1. Mobile-first PWA MVP.
2. Stronger PWA experience with home-screen install, reminders, and better mobile interactions.
3. Native iOS app after retention and payment willingness are validated.
4. Native Android app after iOS or broader demand is proven.

## Strategic User Scope

FlowMove will launch with two user paths in one product:

1. Postpartum Recovery
2. Women's Corrective Pilates

Future expansion:

3. Remote Rehab Companion for clinics, physical therapists, postpartum recovery studios, and Pilates professionals.

The near-term strategy is to support both postpartum users and broader women's corrective Pilates users, while keeping the product focused on women, Pilates-based movement, recovery, alignment, and camera-based feedback.

## Path 1: Postpartum Recovery

Target users:

- Women approximately 6 weeks to 24 months postpartum.
- Users rebuilding core strength, pelvic floor awareness, posture, mobility, and confidence after birth.
- Users who want safe, gentle, guided at-home movement rather than intense fitness.

Core value:

- Help new mothers safely rebuild movement confidence.
- Support core control, breath control, pelvic floor awareness, posture, hip mobility, and return to exercise.

Language to prefer:

- Postpartum-safe movement
- Rebuild core strength
- Pelvic floor awareness
- Return to movement
- Restore confidence
- Guided recovery

Language to avoid in early product:

- Diagnose
- Treat
- Cure
- Replace physical therapy
- Clinical rehabilitation protocol
- Fix pelvic floor dysfunction

## Path 2: Women's Corrective Pilates

Target users:

- Women roughly 30-55 with posture, mobility, body control, shoulder, back, hip, or knee concerns.
- Women who sit for long hours and want low-impact guided movement.
- Women who want to improve alignment, strength, balance, and daily movement quality through Pilates-based exercise.

Core value:

- Improve posture, mobility, balance, body control, stability, and everyday strength.

Common focus areas:

- Posture and mobility
- Back, hip, shoulder, or knee discomfort
- Pilates strength and control
- Return to exercise
- General wellness and body confidence

## Future Path 3: Remote Rehab Companion

Future target customers:

- Physical therapists
- Postpartum recovery clinics
- Rehabilitation studios
- Pilates professionals

Future value:

- Help professionals assign at-home programs, track adherence, review movement quality, and export progress reports.

This path should not be prioritized in the MVP.

## Medical And Compliance Boundary

Postpartum recovery touches medical rehabilitation, but the MVP should be positioned as wellness, fitness, movement education, and Pilates-based recovery support rather than a medical device or diagnostic tool.

Early FlowMove should:

- Provide safety screening.
- Provide movement education.
- Provide personalized exercise guidance within conservative boundaries.
- Provide progress and movement quality reports.
- Recommend users consult qualified clinicians when red flags appear.

Early FlowMove should not:

- Diagnose medical conditions.
- Claim to treat pelvic floor dysfunction, diastasis recti, prolapse, urinary incontinence, post-surgical issues, or pain conditions.
- Replace clinicians or physical therapists.
- Provide post-surgical rehabilitation prescriptions.
- Promise clinical outcomes.

Sensitive areas:

- Diastasis recti
- Pelvic floor dysfunction
- Urinary incontinence
- Pelvic organ prolapse
- C-section recovery
- Postpartum back pain or pelvic pain
- Bleeding, dizziness, infection, blood clot risk
- Postpartum depression or anxiety

Safe product behavior:

- Screen for red flags.
- Defer to clinician guidance.
- Use softer language such as "support", "awareness", "movement quality", "rebuild", and "return to exercise".

Example safe message:

> FlowMove may not be suitable right now. Please consult a qualified clinician before starting.

## MVP Product Scope

The MVP should prove that users are willing to:

- Complete a guided movement assessment.
- Follow personalized at-home Pilates sessions.
- Use camera-based movement feedback.
- Return because the post-session reports make progress feel visible and meaningful.
- Pay for personalization, feedback, and progress tracking.

## Exercise Architecture

FlowMove should use one unified exercise library at the data and asset level, then personalize through user paths, program modules, exercise variants, and recommendation rules.

Preferred architecture:

- Exercise Library: one source of truth for each base movement.
- Exercise Variants: safer, easier, harder, postpartum-specific, corrective-specific, and symptom-aware versions of a base movement.
- Program Modules: goal-based groupings that call suitable exercises and variants.
- Recommendation Engine: selects modules, exercises, variants, intensity, and progression based on user path, screening, baseline assessment, and training performance.

Product presentation should feel path-specific. Users should see modules such as "Postpartum Core Rebuild", "Pelvis & Hip Stability", or "Posture Reset", not a generic exercise database.

Example:

- Base movement: glute bridge.
- Postpartum use: low range, breath cue, pelvis control, conservative progression.
- Corrective Pilates use: glute activation, hip extension, left-right balance, back-friendly control.
- Future clinician use: therapist-assigned lower-body stability exercise with reportable adherence and movement quality.

Principle:

> Unified library underneath, path-specific experience on top.

## Postpartum Program Logic

FlowMove should not use a rigid postpartum sequence such as "repair pelvis first, then diastasis recti, then core pain." That is too linear, too medicalized, and not a universal clinical standard.

Preferred postpartum logic:

> Foundation first, then symptom-aware and assessment-driven module priority.

Postpartum recovery should be organized around breath, pressure management, pelvic floor awareness, deep core control, pelvis/hip stability, posture, mobility, pain awareness, and return-to-exercise readiness.

Recommended postpartum modules:

1. Foundation Reset
2. Deep Core Rebuild
3. Pelvis & Hip Stability
4. Posture & Mobility
5. Strength & Return to Exercise
6. Symptom-Aware Adaptation

### Foundation Reset

Focus:

- 360 breathing
- Rib-pelvis relationship
- Pelvic floor awareness
- Pressure management
- Gentle core reconnection

This should generally come before higher-load core or strength work.

### Deep Core Rebuild

Focus:

- Transverse abdominis awareness
- Gentle abdominal control
- Pelvic control
- Diastasis recti-aware movement quality
- Avoiding doming, coning, breath-holding, or bearing down

The product should avoid claiming to diagnose or treat diastasis recti. It can use safer language such as "abdominal separation awareness", "deep core rebuilding", and "pressure-aware core control".

### Pelvis & Hip Stability

Focus:

- Glute activation
- Hip control
- Left-right balance
- Pelvis stability
- Lower-body alignment

This module can be prioritized when baseline assessment shows hip instability, poor single-leg balance, pelvis shifting, or asymmetry.

### Posture & Mobility

Focus:

- Thoracic mobility
- Shoulder mobility
- Hip mobility
- Neck and upper-back posture
- Standing and sitting alignment

This module can be prioritized when users report long sitting hours, shoulder/neck stiffness, posture concerns, or limited mobility.

### Strength & Return To Exercise

Focus:

- Gradual load
- Movement confidence
- Squat, hinge, bridge, bird dog, modified plank, and balance progressions
- Readiness for more general Pilates or fitness

This module should progress only when red flags are absent and prior movement quality is stable.

### Symptom-Aware Adaptation

FlowMove should reduce intensity, regress exercises, pause progression, or recommend clinician consultation when users report or demonstrate:

- Pelvic heaviness
- Leakage
- Sharp pain
- Dizziness
- Bleeding
- Increasing pain
- C-section scar pain or unusual pulling
- Abdominal doming or coning
- Bearing down during core work

Example behavior:

- User with strong abdominal coning but no pain: prioritize Foundation Reset and Deep Core Rebuild.
- User with poor single-leg balance and pelvis shifting: prioritize Foundation Reset and Pelvis & Hip Stability.
- User with leakage or pelvic heaviness: avoid progression, provide conservative education, and recommend pelvic floor physical therapy or clinician consultation.
- User with notable back pain: screen severity, reduce loading, emphasize low-risk mobility and gentle stability, and recommend professional help if symptoms are significant.

### MVP Modules

1. Onboarding and path selection
2. Safety screening
3. Baseline movement assessment
4. Personalized training recommendations
5. Camera-based movement feedback
6. Post-session report
7. Progress tracking

### Out Of Scope For MVP

- Medical diagnosis
- Surgical rehab protocols
- Complex pain treatment plans
- Clinician dashboard
- Community/social features
- Nutrition, weight loss, or bodyweight management
- Large comprehensive exercise library
- Wearable integration

## Onboarding

First key question:

> What brings you to FlowMove?

Suggested options:

- Postpartum Recovery
- Corrective Pilates
- Posture & Mobility
- Back / Hip / Shoulder Discomfort
- Return to Exercise
- General Strength & Body Control

If the user selects postpartum recovery, route to postpartum-specific screening.

If the user selects corrective Pilates or another non-postpartum goal, route to the general women's corrective Pilates screening.

## Safety Screening

### Postpartum Questions

- How many weeks or months postpartum are you?
- Vaginal birth or C-section?
- Have you been cleared for exercise by a clinician?
- Any bleeding, dizziness, sharp pain, pelvic heaviness, or leakage?
- Any C-section scar pain?
- Any known diastasis recti or pelvic floor concern?
- Current activity level?

### Corrective Pilates Questions

- Main focus area: posture, back, hips, shoulders, knees, or full body?
- Pain or discomfort level from 0 to 10?
- Sitting hours per day?
- Pilates experience level?
- Current activity level?
- Any recent injury or surgery?

## Baseline Movement Assessment

MVP assessment should use 5-7 simple movements:

- Standing posture check
- Shoulder mobility reach
- Squat to chair
- Hip hinge
- Glute bridge
- Dead bug or heel tap
- Single-leg balance

Assessment dimensions:

- Posture alignment
- Core control
- Hip mobility
- Shoulder mobility
- Balance
- Left-right symmetry
- Movement stability

Assessment output should be a movement profile, not a diagnosis.

Example:

> Your current FlowMove profile shows strong shoulder mobility, moderate hip control, and room to improve core stability and left-right balance.

## Personalized Training Plan

MVP session structure:

- 10-20 minutes per session
- 3 sessions per week
- 5-8 movements per session
- Each movement includes video demonstration, camera detection, real-time feedback, and post-session summary.

### Postpartum Training Goals

- Core rebuilding
- Pelvic floor awareness
- Breath control
- Gentle strength
- Posture restoration
- Return to exercise

### Corrective Pilates Training Goals

- Posture correction
- Hip and spine mobility
- Glute activation
- Shoulder stability
- Balance
- Body control

## Camera-Based Movement Feedback

The first version should focus on practical, high-value feedback instead of complex medical assessment.

Real-time feedback examples:

- Slow down.
- Keep your pelvis stable.
- Avoid arching your lower back.
- Keep knees aligned.
- Reduce your range of motion.
- Try the easier variation.
- Good control on this rep.

Scoring dimensions:

- Alignment
- Stability
- Range of motion
- Tempo
- Symmetry
- Control

## Post-Session Report

The post-session report is a core differentiator. It should help users feel seen and understand what changed.

Report sections:

- Completion summary
- What improved today
- What needs attention
- Movement quality notes
- Next-session adjustment
- Encouraging summary

Example postpartum report:

> Your core control looked steadier today, especially during pelvic tilts. Keep the breathing slow and avoid pushing into pressure or heaviness.

Example corrective Pilates report:

> Your hip control improved during bridges, but your right side still shows less stability. Next session will include more single-side glute activation.

## Progress Tracking

MVP progress metrics:

- Core Control
- Mobility
- Stability
- Alignment

Suggested views:

- 7-day progress
- 30-day progress
- Before/after comparison
- Training streak
- Completed sessions

## Initial Exercise Library

### Postpartum Path

- 360 breathing
- Pelvic tilt
- Heel tap
- Dead bug prep
- Glute bridge
- Cat-cow
- Bird dog prep
- Clamshell
- Side-lying leg lift
- Wall angel
- Modified side plank
- Squat to chair

### Corrective Pilates Path

- Cat-cow
- Hip hinge
- Glute bridge
- Bird dog
- Dead bug
- Wall angel
- Thoracic rotation
- Clamshell
- Side plank prep
- Squat to chair
- Standing balance
- Hamstring mobility drill

## Business Model Hypothesis

Recommended MVP model: freemium subscription.

Free tier:

- One baseline assessment
- 1-2 basic sessions per week
- Simple report

Paid tier:

- Personalized plan
- Camera-based movement feedback
- Complete post-session reports
- Progress trends
- Postpartum and posture-specific programs
- Weekly adaptive plan updates

Possible pricing to test:

- $12.99/month
- $79.99/year
- 7-day free trial

## Product Tone

FlowMove should feel:

- Warm
- Calm
- Professional
- Safe
- Encouraging
- Specific
- Body-aware

FlowMove should avoid:

- Intense fitness language
- Shame-based body language
- Weight-loss-first positioning
- Overly medical or diagnostic tone
- Generic AI assistant wording

The product should communicate that the user is being safely guided, and that small changes in movement quality matter.
