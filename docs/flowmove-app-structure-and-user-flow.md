# FlowMove App Structure And User Flow

## Purpose

This document turns the FlowMove product concept into an app-level structure that can guide product design, UX wireframes, engineering planning, and future PRD iterations.

The MVP platform is a mobile-first PWA. FlowMove should be implemented as a web app that feels like an app, supports phone and desktop camera use, and can later evolve into native iOS and Android apps after product validation.

FlowMove has two MVP user paths:

1. Postpartum Recovery
2. Women's Corrective Pilates

The app should feel like one unified women's movement product, while giving each user a path-specific experience.

## Product Experience Principle

FlowMove should not feel like a generic workout library. It should feel like a guided body recovery coach that:

- Understands why the user came.
- Screens for basic safety risks.
- Assesses movement quality.
- Builds a personalized training plan.
- Gives camera-based feedback during movement.
- Explains progress after every session.

Core experience loop:

> Assess -> Train -> Feedback -> Report -> Adapt -> Progress

## App-Level Navigation

The navigation should be designed mobile-first. On phones, use a bottom tab bar. On desktop, the same hierarchy can become a left sidebar or compact top navigation while preserving the same route structure.

MVP primary tabs:

1. Today
2. Progress
3. Programs
4. Profile

Optional future tabs:

- Coach
- Messages
- Clinician

### Today

The daily action hub. This should be the first screen after onboarding.

Primary content:

- Today's recommended session
- User path label
- Readiness check
- Key focus for today
- Start session button
- Last session insight
- Weekly progress snapshot

Example:

> Today's focus: Core Control + Hip Stability

### Progress

Shows progress trends and body insights.

Primary content:

- Core Control
- Mobility
- Stability
- Alignment
- 7-day and 30-day trends
- Session history
- Before/after movement comparison
- Recent improvements
- Areas needing attention

### Programs

Shows available modules and planned sessions.

Postpartum modules:

- Foundation Reset
- Deep Core Rebuild
- Pelvis & Hip Stability
- Posture & Mobility
- Strength & Return to Exercise
- Symptom-Aware Adaptation

Corrective Pilates modules:

- Posture Reset
- Hip & Glute Stability
- Back-Friendly Strength
- Shoulder Mobility
- Core Control
- Balance & Alignment
- Desk Body Reset

### Profile

User account, settings, health preferences, camera settings, and safety information.

Primary content:

- User path
- Goals
- Screening answers
- Exercise level
- Camera setup
- Privacy settings
- Subscription
- Safety disclaimer
- Clinician consultation reminder

## MVP Screen List

Because FlowMove is a PWA, every screen should work in a narrow mobile viewport first. Desktop layouts can add more space for camera preview, session detail, and progress charts, but should not introduce a different product model.

### Pre-Onboarding

1. Welcome
2. Value proposition
3. Account creation or guest start
4. Privacy and camera explanation

### Onboarding

5. Goal selection
6. User path routing
7. Path-specific safety screening
8. Training background
9. Camera setup
10. Baseline assessment introduction

### Assessment

11. Assessment camera calibration
12. Movement assessment sequence
13. Assessment processing
14. Movement profile result
15. Recommended plan preview

### Main App

16. Today
17. Session preview
18. Workout player
19. Real-time movement feedback
20. Session complete
21. Post-session report
22. Progress dashboard
23. Program modules
24. Module detail
25. Exercise detail
26. Profile and settings

### Safety And Exception Screens

27. Red flag warning
28. Exercise regression suggestion
29. Camera unavailable fallback
30. Low confidence tracking warning
31. Clinician consultation recommendation

## Complete New User Flow

### Step 1: Welcome

Goal:

- Establish what FlowMove does.
- Build trust without sounding medical.

Suggested headline:

> Feel your progress in every movement.

Suggested support text:

> Personalized Pilates-based guidance for recovery, alignment, and everyday strength.

Primary CTA:

> Get Started

Secondary CTA:

> I already have an account

### Step 2: Privacy And Camera Explanation

Goal:

- Explain why camera access is needed.
- Reduce user anxiety.

Core message:

- FlowMove uses the camera to understand movement quality.
- The app gives feedback on alignment, stability, range, tempo, symmetry, and control.
- Privacy settings should be clear before camera permission.

CTA:

> Continue

### Step 3: Goal Selection

Question:

> What brings you to FlowMove?

Options:

- Postpartum Recovery
- Corrective Pilates
- Posture & Mobility
- Back / Hip / Shoulder Discomfort
- Return to Exercise
- General Strength & Body Control

Routing:

- If "Postpartum Recovery" is selected, route to postpartum screening.
- Otherwise route to corrective Pilates screening.

Important:

- Users can choose more than one goal.
- The primary path should still be one of: Postpartum Recovery or Women's Corrective Pilates.

### Step 4A: Postpartum Screening

Questions:

- How many weeks or months postpartum are you?
- Vaginal birth or C-section?
- Have you been cleared for exercise by a clinician?
- Any bleeding, dizziness, sharp pain, pelvic heaviness, or leakage?
- Any C-section scar pain?
- Any known abdominal separation or pelvic floor concern?
- What is your current activity level?

Risk handling:

- If high-risk answers are selected, show a clinician consultation recommendation.
- If mild concerns are selected, allow conservative onboarding with lower-intensity modules.
- If no concerns are selected, continue to training background.

### Step 4B: Corrective Pilates Screening

Questions:

- What is your main focus area?
- Pain or discomfort level from 0 to 10?
- How many hours do you sit per day?
- What is your Pilates experience level?
- What is your current activity level?
- Any recent injury or surgery?

Risk handling:

- Recent surgery or high pain should trigger a clinician consultation recommendation.
- Moderate discomfort should trigger conservative exercise choices.
- Low discomfort should continue normally.

### Step 5: Training Background

Questions:

- How often do you want to train?
- How much time do you have per session?
- What equipment do you have?
- Do you prefer gentle, balanced, or challenging sessions?

MVP defaults:

- 3 sessions per week
- 10-20 minutes per session
- No equipment required

### Step 6: Camera Setup

Goal:

- Prepare the user for assessment and future movement feedback.

Setup requirements:

- Full body visible if possible.
- Phone or laptop stable.
- Good lighting.
- Enough space to move.
- Side or front view depending on exercise.

Fallback:

- Allow users to continue with demo-only mode if camera access is denied.
- Demo-only mode should not provide movement accuracy scoring.

### Step 7: Baseline Assessment Intro

Purpose:

- Explain what the assessment measures.
- Avoid diagnostic language.

Suggested copy:

> FlowMove will look at a few simple movements to understand your current movement profile. This is not a diagnosis.

Assessment movements:

- Standing posture check
- Shoulder mobility reach
- Squat to chair
- Hip hinge
- Glute bridge
- Dead bug or heel tap
- Single-leg balance

### Step 8: Movement Assessment Sequence

Each movement screen should include:

- Movement name
- Short demo
- Setup instruction
- Start button
- Camera view
- Rep or timer indicator
- Safety stop option
- Skip option

Assessment feedback should be light during baseline. Full coaching can appear during training sessions.

### Step 9: Movement Profile Result

Output:

- Core Control
- Mobility
- Stability
- Alignment

Example:

> Your FlowMove profile shows strong shoulder mobility, moderate hip control, and room to improve core stability and left-right balance.

Important:

- Do not say the user has a medical condition.
- Do not diagnose diastasis recti, pelvic floor dysfunction, or injury.

### Step 10: Recommended Plan Preview

Postpartum example:

- Path: Postpartum Recovery
- Starting focus: Foundation Reset + Deep Core Rebuild
- Weekly plan: 3 sessions per week
- Session length: 12-15 minutes

Corrective Pilates example:

- Path: Women's Corrective Pilates
- Starting focus: Posture Reset + Hip & Glute Stability
- Weekly plan: 3 sessions per week
- Session length: 15-20 minutes

CTA:

> Start Today's Session

## Returning User Flow

### Step 1: Today Tab

Shows:

- Today's recommended session
- Readiness check
- Last insight
- Progress snapshot

Example readiness check:

> How does your body feel today?

Options:

- Good
- Tired
- Sore
- Pain or discomfort

Adaptation:

- Good: normal plan
- Tired: lower tempo or shorter session
- Sore: mobility and recovery emphasis
- Pain or discomfort: ask location and intensity, then regress or recommend consultation

### Step 2: Session Preview

Shows:

- Session focus
- Estimated time
- Exercises
- Intensity
- Equipment
- Camera setup needed
- Safety notes

CTA:

> Start

### Step 3: Workout Player

Core UI:

- Demo video
- Camera view
- Current exercise
- Rep/timer progress
- Real-time feedback
- Next exercise preview
- Pause
- Stop
- Easier variation

Real-time feedback examples:

- Slow down.
- Keep your pelvis stable.
- Avoid arching your lower back.
- Keep knees aligned.
- Reduce your range of motion.
- Try the easier variation.
- Good control on this rep.

### Step 4: Session Complete

Shows:

- Completion percentage
- Exercises completed
- Session duration
- Movement quality summary

CTA:

> View Report

### Step 5: Post-Session Report

Report sections:

- Today's summary
- What improved
- What needs attention
- Body insight
- Next session adjustment
- Progress trend

Example:

> Your pelvis stayed steadier during bridges today, and your breathing was more consistent during core work. Your right hip still showed less stability in balance work, so your next session will include gentle single-side activation.

## Path-Specific Product Behavior

### Postpartum Recovery Behavior

Default style:

- Conservative
- Breath-led
- Pressure-aware
- Symptom-aware
- Gentle progression

Prioritize:

- Foundation Reset
- Deep Core Rebuild
- Pelvic floor awareness
- Pelvis and hip stability

Avoid early:

- High-load core
- Sit-ups or crunch-like patterns
- Long planks
- Aggressive twisting
- High impact
- Breath-holding

Regression triggers:

- Pelvic heaviness
- Leakage
- Sharp pain
- Dizziness
- Bleeding
- C-section scar pain
- Abdominal doming or coning
- Bearing down

### Women's Corrective Pilates Behavior

Default style:

- Alignment-focused
- Mobility and stability balanced
- Moderate progression
- Low-impact strength

Prioritize based on assessment:

- Posture Reset
- Hip & Glute Stability
- Back-Friendly Strength
- Shoulder Mobility
- Core Control
- Balance & Alignment

Regression triggers:

- High pain score
- Recent injury or surgery
- Sharp pain during movement
- Poor control under load
- Camera-detected instability

## Recommendation Logic

Recommendation inputs:

- User path
- Safety screening
- Goals
- Baseline assessment
- Readiness check
- Session performance
- Report trends

Recommendation outputs:

- Today's module
- Exercise selection
- Exercise variant
- Session intensity
- Session duration
- Real-time cue priority
- Next-session adjustment

Example postpartum logic:

- If user has no red flags but shows abdominal coning during heel taps, assign Foundation Reset and Deep Core Rebuild with easier core variants.
- If user shows pelvis shifting in balance and bridge movements, assign Pelvis & Hip Stability.
- If user reports pelvic heaviness, pause progression and recommend clinician consultation.

Example corrective Pilates logic:

- If user sits 8+ hours and shows limited shoulder mobility, prioritize Posture Reset and Shoulder Mobility.
- If user shows poor hip hinge and low glute control, prioritize Hip & Glute Stability and Back-Friendly Strength.
- If user reports pain above a safe threshold, reduce intensity and avoid loaded movements.

## Data Objects Needed For MVP

### User Profile

- User ID
- User path
- Goals
- Postpartum status
- Screening answers
- Training preferences
- Camera permission status
- Subscription status

### Movement Assessment

- Assessment ID
- User ID
- Date
- Movement scores
- Confidence level
- Notes
- Suggested module priorities

### Exercise

- Exercise ID
- Base movement name
- Category
- Target areas
- Difficulty
- Required camera view
- Detection rules
- Common errors
- Cue library
- Contraindications and caution tags

### Exercise Variant

- Variant ID
- Base exercise ID
- User path tags
- Difficulty
- Regression/progression relationship
- Cue emphasis
- Safety notes

### Program Module

- Module ID
- Path
- Goal
- Exercise variants
- Progression rules
- Regression rules

### Session

- Session ID
- User ID
- Module focus
- Exercises
- Duration
- Completion status
- Movement quality scores

### Report

- Report ID
- Session ID
- Summary
- Improvements
- Needs attention
- Next-session adjustment
- Progress metrics

## MVP Success Criteria

Product success signals:

- Users complete onboarding and baseline assessment.
- Users understand their movement profile.
- Users start the first recommended session.
- Users complete at least 2-3 sessions in the first week.
- Users read post-session reports.
- Users return because they feel progress is specific and visible.
- Paid users value camera feedback, adaptive plans, and progress tracking.

## Open Product Questions

Questions to resolve next:

- Should FlowMove require baseline assessment before the first session, or allow a quick-start mode?
- What is the minimum viable camera feedback accuracy for launch?
- Should reports be fully AI-generated, template-based, or hybrid?
- How much user health data should be stored in MVP?
- Should users be allowed to switch paths after onboarding?
- Should postpartum users be able to enter clinician clearance date?
- Should FlowMove support desktop web first, mobile web first, or native mobile first?
