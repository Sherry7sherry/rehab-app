# FlowMove MVP Screen Specification

## Purpose

This document defines the MVP screen-level specification for the FlowMove mobile-first PWA.

It translates the product flow into concrete screens that can be used for UX design, clickable prototypes, and frontend implementation.

MVP screen set:

1. Welcome
2. Goal Selection
3. Postpartum Screening
4. Corrective Pilates Screening
5. Training Preferences
6. Camera Setup
7. Baseline Assessment Intro
8. Movement Assessment
9. Movement Profile Result
10. Recommended Plan Preview
11. Today
12. Session Preview
13. Workout Player
14. Session Complete
15. Post-Session Report
16. Progress
17. Programs
18. Profile
19. Safety Warning

## Global Product Rules

### Platform

- Mobile-first PWA.
- Primary design target is phone browser.
- Desktop should be usable, especially for camera-based sessions.
- UI should feel like an app, not a website.

### Tone

FlowMove should be:

- Warm
- Calm
- Professional
- Encouraging
- Specific
- Non-diagnostic

Avoid:

- Weight-loss-first language
- Intense fitness language
- Medical diagnosis language
- Shame-based body language

### Navigation

Unauthenticated or first-time flow:

> Welcome -> Goal Selection -> Screening -> Training Preferences -> Camera Setup -> Baseline Assessment -> Movement Profile -> Recommended Plan -> Today

Returning user flow:

> Today -> Session Preview -> Workout Player -> Session Complete -> Report -> Progress

Primary app tabs:

- Today
- Progress
- Programs
- Profile

### Safety Language

The app can say:

- "This is not a diagnosis."
- "FlowMove may not be suitable right now."
- "Please consult a qualified clinician before starting."
- "Try a gentler variation."
- "Stop if you feel sharp pain, dizziness, bleeding, or pelvic heaviness."

The app should not say:

- "You have diastasis recti."
- "We treat pelvic floor dysfunction."
- "This plan will fix your pain."
- "This replaces physical therapy."

## Screen 1: Welcome

### Goal

Introduce FlowMove and start the user journey.

### Primary User Question

Can this app help me recover or improve my body safely?

### Content

- Product name: FlowMove
- Headline: "Feel your progress in every movement."
- Supporting copy: "Personalized Pilates-based guidance for recovery, alignment, and everyday strength."
- Primary CTA: "Get Started"
- Secondary CTA: "I already have an account"

### Actions

- Get Started -> Goal Selection
- Sign in -> Auth flow or Today if already authenticated

### Data Needed

- None for MVP static prototype

### Acceptance Criteria

- User understands FlowMove is a guided movement app.
- CTA clearly starts onboarding.
- The screen does not feel like a long marketing landing page.

## Screen 2: Goal Selection

### Goal

Route users into Postpartum Recovery or Women's Corrective Pilates.

### Primary User Question

Which FlowMove path fits me?

### Content

Question:

> What brings you to FlowMove?

Options:

- Postpartum Recovery
- Corrective Pilates
- Posture & Mobility
- Back / Hip / Shoulder Discomfort
- Return to Exercise
- General Strength & Body Control

Microcopy:

> You can update your focus later.

### Actions

- Select one or multiple goals.
- Continue.

### Routing

- If Postpartum Recovery is selected, primary path = Postpartum Recovery.
- Otherwise primary path = Women's Corrective Pilates.

### Data Captured

- selectedGoals
- primaryPath

### Acceptance Criteria

- User can identify a goal quickly.
- Product captures enough information to route screening.
- Postpartum path is clear but not isolated from the broader product.

## Screen 3: Postpartum Screening

### Goal

Understand postpartum context and screen for red flags.

### Primary User Question

Is it safe for me to start this kind of guided movement?

### Content

Questions:

- How many weeks or months postpartum are you?
- Vaginal birth or C-section?
- Have you been cleared for exercise by a clinician?
- Any bleeding, dizziness, sharp pain, pelvic heaviness, or leakage?
- Any C-section scar pain?
- Any known abdominal separation or pelvic floor concern?
- What is your current activity level?

### Actions

- Continue
- Back

### Data Captured

- postpartumDuration
- birthType
- clinicianClearance
- symptoms
- cSectionScarPain
- abdominalSeparationConcern
- pelvicFloorConcern
- activityLevel

### Risk Rules

High-risk triggers:

- Not cleared for exercise
- Bleeding
- Dizziness
- Sharp pain
- Pelvic heaviness
- Significant leakage
- Significant C-section scar pain

MVP behavior:

- Show Safety Warning if high-risk trigger appears.
- For mild concerns, continue with conservative plan flags.

### Acceptance Criteria

- Red flags are captured before assessment.
- The product does not diagnose.
- Users with high-risk answers are gently redirected to clinician consultation.

## Screen 4: Corrective Pilates Screening

### Goal

Understand non-postpartum movement goals, discomfort, and safety considerations.

### Primary User Question

What should FlowMove focus on for my body?

### Content

Questions:

- What is your main focus area?
- Pain or discomfort level from 0 to 10?
- How many hours do you sit per day?
- What is your Pilates experience level?
- What is your current activity level?
- Any recent injury or surgery?

### Actions

- Continue
- Back

### Data Captured

- focusArea
- discomfortLevel
- sittingHours
- pilatesExperience
- activityLevel
- recentInjuryOrSurgery

### Risk Rules

High-risk triggers:

- Pain level 7 or above
- Recent surgery
- Sharp or worsening pain
- Unexplained neurological symptoms if added later

MVP behavior:

- Show Safety Warning for high-risk triggers.
- Moderate discomfort should reduce intensity and avoid challenging variants.

### Acceptance Criteria

- The user can express their primary body goal.
- Safety risks route to warning.
- Corrective path remains non-medicalized.

## Screen 5: Training Preferences

### Goal

Set training frequency, session length, and intensity expectations.

### Primary User Question

How will FlowMove fit into my week?

### Content

Questions:

- How often do you want to train?
- How much time do you have per session?
- What equipment do you have?
- What pace feels right?

Suggested defaults:

- 3 sessions per week
- 10-20 minutes per session
- No equipment
- Gentle or balanced pace

### Actions

- Continue
- Back

### Data Captured

- weeklyFrequency
- sessionLength
- equipment
- preferredPace

### Acceptance Criteria

- Preferences feel lightweight.
- Defaults make it easy to continue.
- Inputs can guide session generation.

## Screen 6: Camera Setup

### Goal

Prepare the user for camera-based assessment and explain permission usage.

### Primary User Question

What does FlowMove need from my camera?

### Content

Setup checklist:

- Place your phone or laptop on a stable surface.
- Keep your full body visible when possible.
- Use good lighting.
- Leave enough space to move.
- Wear clothing that lets your body outline be visible.

Privacy message:

> FlowMove uses your camera to understand movement quality. You can continue without camera feedback, but movement scoring will be limited.

### Actions

- Enable Camera
- Continue Without Camera
- Back

### Data Captured

- cameraPermissionStatus
- cameraMode: enabled or demo-only

### Acceptance Criteria

- User understands the purpose of camera access.
- User has a fallback if they do not grant access.
- The app does not block all progress if camera is denied.

## Screen 7: Baseline Assessment Intro

### Goal

Explain the baseline assessment and set expectations.

### Primary User Question

What will this assessment tell me?

### Content

Copy:

> FlowMove will look at a few simple movements to understand your current movement profile. This is not a diagnosis.

Assessment list:

- Standing posture check
- Shoulder mobility reach
- Squat to chair
- Hip hinge
- Glute bridge
- Dead bug or heel tap
- Single-leg balance

### Actions

- Start Assessment
- Skip for Now
- Back

### Data Captured

- assessmentStarted
- assessmentSkipped

### Acceptance Criteria

- User understands the assessment is about movement quality.
- Diagnostic expectations are avoided.
- User can skip if needed.

## Screen 8: Movement Assessment

### Goal

Guide the user through 5-7 baseline movements.

### Primary User Question

Am I doing this correctly enough for FlowMove to assess me?

### Content

For each movement:

- Movement name
- Short instruction
- Demo area
- Camera preview
- Rep or timer indicator
- Tracking quality indicator
- Safety stop
- Skip movement

### Actions

- Start movement
- Complete movement
- Skip movement
- Stop assessment

### Data Captured

- movementId
- completionStatus
- poseMetrics if available
- trackingConfidence
- manualSkipped

### MVP Static Prototype Behavior

- Use mock assessment progress.
- Use simulated feedback such as "Tracking looks good" or "Step back so your full body is visible."

### Acceptance Criteria

- User can complete the sequence without confusion.
- Camera and non-camera states are both supported.
- The app handles skipped movements gracefully.

## Screen 9: Movement Profile Result

### Goal

Turn assessment output into a clear movement profile.

### Primary User Question

What did FlowMove learn about my body?

### Content

Movement profile metrics:

- Core Control
- Mobility
- Stability
- Alignment

Summary example:

> Your FlowMove profile shows strong shoulder mobility, moderate hip control, and room to improve core stability and left-right balance.

### Actions

- View My Plan
- Retake Assessment

### Data Displayed

- assessmentSummary
- metricScores
- modulePriorities
- trackingConfidenceNote if needed

### Acceptance Criteria

- Results feel specific and encouraging.
- No medical diagnosis is implied.
- User understands why the plan will be personalized.

## Screen 10: Recommended Plan Preview

### Goal

Show the user's first plan and make starting feel easy.

### Primary User Question

What should I do next?

### Content

Plan details:

- User path
- Starting focus modules
- Weekly frequency
- Session length
- First session preview

Postpartum example:

- Path: Postpartum Recovery
- Starting focus: Foundation Reset + Deep Core Rebuild
- Weekly plan: 3 sessions
- Session length: 12-15 minutes

Corrective example:

- Path: Women's Corrective Pilates
- Starting focus: Posture Reset + Hip & Glute Stability
- Weekly plan: 3 sessions
- Session length: 15-20 minutes

### Actions

- Start Today's Session
- Go to Today
- Adjust Preferences

### Acceptance Criteria

- User understands the plan is based on their path and assessment.
- The first session CTA is obvious.
- Plan is not overwhelming.

## Screen 11: Today

### Goal

Serve as the daily home screen and action hub.

### Primary User Question

What should I do today?

### Content

- Greeting
- User path label
- Today's recommended session
- Readiness check
- Key focus
- Last session insight
- Weekly progress snapshot

Readiness check:

> How does your body feel today?

Options:

- Good
- Tired
- Sore
- Pain or discomfort

### Actions

- Start Session
- Choose readiness
- View last report
- View progress

### Data Needed

- userProfile
- today's session
- latestReport
- progressSummary

### Acceptance Criteria

- User can start today's session quickly.
- The page gives one clear next action.
- Returning users see continuity from the last session.

## Screen 12: Session Preview

### Goal

Prepare the user for the session before starting.

### Primary User Question

What am I about to do, and is it right for me today?

### Content

- Session title
- Focus modules
- Estimated duration
- Exercise list
- Intensity
- Equipment
- Camera setup note
- Safety note

### Actions

- Start
- Swap to easier session
- Back

### Data Needed

- sessionPlan
- exerciseVariants
- readinessState

### Acceptance Criteria

- User knows time commitment and focus.
- User can choose easier version.
- Safety note is visible but not alarming.

## Screen 13: Workout Player

### Goal

Guide the user through the session with demo, camera feedback, and progress.

### Primary User Question

How do I move well right now?

### Content

- Current exercise name
- Demo video or placeholder
- Camera view
- Rep/timer progress
- Real-time feedback
- Next exercise preview
- Easier variation control
- Pause and stop controls

### Actions

- Start exercise
- Pause
- Resume
- Easier variation
- Skip exercise
- End session

### Feedback Examples

- Slow down.
- Keep your pelvis stable.
- Avoid arching your lower back.
- Keep knees aligned.
- Reduce your range of motion.
- Try the easier variation.
- Good control on this rep.

### Data Captured

- exerciseCompletion
- duration
- reps if applicable
- movementQualityScores
- cueEvents
- userRegressions
- skippedExercises

### Acceptance Criteria

- User always knows what to do next.
- Real-time feedback is short and readable.
- Controls are reachable on mobile.
- The user can stop safely at any time.

## Screen 14: Session Complete

### Goal

Confirm completion and invite the user into the report.

### Primary User Question

How did I do?

### Content

- Completion percentage
- Session duration
- Exercises completed
- Movement quality highlight
- Encouraging completion message

### Actions

- View Report
- Done

### Data Needed

- sessionSummary

### Acceptance Criteria

- Completion feels satisfying.
- Report CTA is prominent.
- Summary is brief.

## Screen 15: Post-Session Report

### Goal

Make progress visible and guide the next adjustment.

### Primary User Question

What changed, what improved, and what should I work on next?

### Content

Sections:

- Today's summary
- What improved
- What needs attention
- Body insight
- Next session adjustment
- Progress trend

Example:

> Your pelvis stayed steadier during bridges today, and your breathing was more consistent during core work. Your right hip still showed less stability in balance work, so your next session will include gentle single-side activation.

### Actions

- View Progress
- Save Report
- Share summary later if implemented
- Back to Today

### Data Needed

- report
- movementMetrics
- previousSessionComparison
- nextSessionAdjustment

### Acceptance Criteria

- Report feels specific to the session.
- User sees at least one improvement and one focus area.
- Next action is clear.

## Screen 16: Progress

### Goal

Show medium-term body progress and reinforce retention.

### Primary User Question

Am I improving over time?

### Content

- Core Control trend
- Mobility trend
- Stability trend
- Alignment trend
- 7-day progress
- 30-day progress
- Session history
- Recent improvements
- Current focus areas

### Actions

- Open session report
- Retake assessment
- View programs

### Data Needed

- progressMetrics
- reportHistory
- assessmentHistory

### Acceptance Criteria

- User can understand progress without reading too much.
- Trends connect to training reports.
- Encourages return usage.

## Screen 17: Programs

### Goal

Show available modules and allow users to understand or browse their plan.

### Primary User Question

What can I work on in FlowMove?

### Content

Postpartum modules:

- Foundation Reset
- Deep Core Rebuild
- Pelvis & Hip Stability
- Posture & Mobility
- Strength & Return to Exercise
- Symptom-Aware Adaptation

Corrective modules:

- Posture Reset
- Hip & Glute Stability
- Back-Friendly Strength
- Shoulder Mobility
- Core Control
- Balance & Alignment
- Desk Body Reset

### Actions

- Open module
- Start recommended session
- Save module for later

### Data Needed

- modules
- userPath
- moduleEligibility

### Acceptance Criteria

- Modules feel personalized by path.
- User is not overwhelmed by a raw exercise library.
- Locked or not-yet-recommended modules explain why gently.

## Screen 18: Profile

### Goal

Let users manage settings, path, safety info, and subscription.

### Primary User Question

Can I adjust my FlowMove experience?

### Content

- User path
- Goals
- Training preferences
- Screening answers
- Camera settings
- Privacy settings
- Subscription
- Safety disclaimer
- Sign out

### Actions

- Edit goals
- Edit training preferences
- Retake screening
- Manage subscription
- Manage camera permission

### Data Needed

- userProfile
- settings
- subscriptionStatus

### Acceptance Criteria

- User can update key settings.
- Safety and privacy controls are easy to find.
- Path switching is possible but should prompt re-screening.

## Screen 19: Safety Warning

### Goal

Handle red flags safely without making the product feel punitive.

### Primary User Question

Why am I being stopped or redirected?

### Content

Example:

> FlowMove may not be suitable right now. Please consult a qualified clinician before starting or continuing.

Optional context:

> Some symptoms need professional guidance before guided exercise is appropriate.

### Actions

- I understand
- Update my answers
- Continue with gentle education only if allowed by product policy

### Trigger Sources

- Postpartum screening
- Corrective screening
- Readiness check
- Workout stop event
- User-reported symptoms

### Acceptance Criteria

- User gets a clear safety message.
- No diagnosis is given.
- The user can correct accidental answers.
- High-risk users are not routed into normal training.

## Prototype Priorities

### Must Prototype First

- Welcome
- Goal Selection
- Screening
- Movement Profile Result
- Today
- Session Preview
- Workout Player
- Post-Session Report

### Can Be Simpler In First Prototype

- Camera Setup
- Movement Assessment
- Progress
- Programs
- Profile

### Can Be Stubbed

- Auth
- Payment
- Account management
- Real pose detection
- Video asset library

## Next Design Decisions

Before visual design or implementation, decide:

- Should onboarding require account creation before or after assessment?
- Should baseline assessment be mandatory or skippable?
- What exact red flag answers fully block training versus allow conservative mode?
- What mock data should represent a postpartum user and a corrective Pilates user?
- What should the first clickable prototype demonstrate in 5 minutes?

