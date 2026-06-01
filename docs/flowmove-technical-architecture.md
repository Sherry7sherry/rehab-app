# FlowMove Technical Architecture

## Purpose

This document defines the recommended technical architecture for the FlowMove MVP.

The MVP should be built as a mobile-first PWA, while preserving as much future reuse as possible for native iOS and Android apps.

Main principle:

> Build the product brain once. Let Web/PWA be the first client.

## Platform Strategy

### MVP Platform

FlowMove MVP should be:

- Mobile-first web app
- PWA-ready
- Usable on phone browsers
- Usable on desktop browsers
- Camera-enabled through browser APIs

### Future Platform Path

1. PWA MVP
2. Improved PWA with installability and reminders
3. Native iOS app
4. Native Android app

Native apps should reuse the backend, content model, recommendation logic, exercise library, reporting logic, user data model, and design language.

## Recommended Stack

Recommended MVP stack:

- Frontend: Next.js + React + TypeScript
- Styling: Tailwind CSS or a small design-token-based styling system
- PWA: Web app manifest + service worker when needed
- Pose detection: browser-compatible pose estimation library such as MediaPipe or MoveNet
- Backend: Node.js/TypeScript API or a managed backend
- Database: PostgreSQL
- Auth: managed auth provider or custom email/social auth
- Payments: Stripe for web subscription testing
- Storage: object storage for optional video/image assets, thumbnails, and generated reports
- Analytics: product analytics for funnel, retention, and session events

The exact stack can be adjusted, but the architecture should keep business logic separate from UI components.

## Architecture Layers

FlowMove should be split into reusable layers:

1. Content Layer
2. Domain Layer
3. Recommendation Layer
4. Pose And Movement Layer
5. API Layer
6. Client Layer
7. Data Layer
8. Analytics Layer

## 1. Content Layer

The content layer stores product knowledge and training assets.

Includes:

- Exercise library
- Exercise variants
- Program modules
- Cue library
- Safety notes
- Report templates
- Onboarding questions
- Screening questions
- User-facing copy

This layer should be platform-independent. It should not depend on React components or browser APIs.

Example content objects:

- Exercise
- ExerciseVariant
- ProgramModule
- SafetyRule
- Cue
- ReportTemplate

Future native reuse:

- Native apps can consume the same exercise library, module definitions, cue text, and report templates.

## 2. Domain Layer

The domain layer contains core business rules.

Includes:

- User path routing
- Safety screening evaluation
- Red flag detection
- Exercise eligibility
- Progression and regression rules
- Session completion rules
- Scoring normalization
- Subscription entitlement rules

This layer should be written as pure TypeScript functions where possible.

Good:

- `evaluateSafetyScreening(input)`
- `selectUserPath(goals)`
- `getEligibleExerciseVariants(userProfile, assessment)`
- `calculateMovementScore(poseMetrics)`

Avoid:

- Embedding core rules directly inside page components.
- Hardcoding path logic in UI buttons.
- Mixing camera implementation with recommendation rules.

Future native reuse:

- A React Native app can reuse TypeScript domain functions.
- A fully native Swift/Kotlin app can still mirror this layer through shared API decisions.

## 3. Recommendation Layer

The recommendation layer decides what the user should do next.

Inputs:

- User path
- User goals
- Safety screening
- Baseline movement assessment
- Readiness check
- Session history
- Movement quality trends
- Subscription tier

Outputs:

- Today's module
- Session duration
- Exercise variants
- Exercise order
- Intensity
- Cue priorities
- Regression/progression
- Next-session adjustment

MVP recommendation can start rule-based.

Example:

- If postpartum user shows abdominal coning during core assessment, prioritize Foundation Reset and Deep Core Rebuild with easier variants.
- If corrective Pilates user sits 8+ hours and has limited shoulder mobility, prioritize Posture Reset and Shoulder Mobility.
- If user reports high pain, regress session and recommend clinician consultation.

Future direction:

- Rule-based engine first.
- Hybrid rule + AI summary later.
- Clinician-adjustable recommendation rules for B2B later.

## 4. Pose And Movement Layer

This layer handles camera input, pose detection, movement metrics, and exercise-specific quality checks.

Sub-layers:

- Camera adapter
- Pose detector adapter
- Pose normalization
- Movement metric extraction
- Exercise quality evaluator
- Real-time cue selector

### Browser MVP

Browser implementation:

- Uses `navigator.mediaDevices.getUserMedia`
- Runs pose detection in browser where possible
- Supports front and side camera views
- Shows camera permission and tracking quality states

### Future Native

Native implementation:

- Replaces browser camera adapter with native camera.
- May use native ML runtime or optimized pose libraries.
- Reuses exercise quality definitions where possible.

Important architecture rule:

> Keep movement evaluation rules separate from the camera adapter.

Example:

- Camera adapter: gets video frames.
- Pose detector: returns body landmarks.
- Exercise evaluator: checks whether knees, pelvis, spine, and tempo meet criteria.

This makes native migration much easier.

## 5. API Layer

The API layer should expose platform-neutral product capabilities.

Core API areas:

- Auth
- User profile
- Onboarding
- Safety screening
- Assessment
- Session plan
- Session results
- Reports
- Progress
- Subscription

Example endpoints:

- `POST /api/onboarding`
- `POST /api/screening/evaluate`
- `POST /api/assessment`
- `GET /api/session/today`
- `POST /api/session/:id/complete`
- `GET /api/reports/:sessionId`
- `GET /api/progress`

Native apps should be able to use the same API later.

## 6. Client Layer

The client layer is the user interface.

MVP client:

- Next.js PWA
- Mobile-first layout
- Desktop-compatible layout
- Bottom tab navigation on mobile
- Camera-first workout experience

Future clients:

- React Native iOS
- React Native Android
- Possible clinician web dashboard

Client layer should not own core product logic. It should call domain functions, APIs, and recommendation outputs.

## 7. Data Layer

Recommended database:

- PostgreSQL

Core tables or collections:

- users
- user_profiles
- screening_responses
- assessments
- assessment_movements
- exercises
- exercise_variants
- program_modules
- sessions
- session_exercises
- movement_metrics
- reports
- subscriptions

Content data can start as version-controlled JSON/TS files during MVP, then move to database-backed CMS/admin tools later.

## 8. Analytics Layer

Analytics are critical because MVP risk is product validation, not just feature delivery.

Track:

- Landing to signup conversion
- Onboarding completion
- Safety screening drop-off
- Camera permission acceptance
- Baseline assessment completion
- First session start
- First session completion
- Report view rate
- Second session return
- Week 1 retention
- Subscription trial start
- Subscription conversion

Important events:

- `onboarding_started`
- `path_selected`
- `screening_completed`
- `camera_permission_granted`
- `assessment_started`
- `assessment_completed`
- `session_started`
- `exercise_completed`
- `session_completed`
- `report_viewed`
- `subscription_started`

## Reuse Plan For Native App

### Highly Reusable

- Product positioning
- User paths
- Onboarding questions
- Screening rules
- Exercise library
- Exercise variants
- Program modules
- Recommendation rules
- Report templates
- Data model
- Backend APIs
- Subscription entitlement logic
- Movement scoring rules
- Design tokens
- Product analytics definitions

### Partially Reusable

- React components, if future app uses React Native and components are planned carefully.
- State management patterns.
- TypeScript types.
- Validation schemas.
- Copy and localization files.

### Usually Rebuilt Or Adapted

- Native UI screens
- Camera permissions
- Real-time camera rendering
- Native pose model runtime
- Push notifications
- App Store and Google Play subscriptions
- HealthKit and Google Fit integrations
- Offline storage
- Native app lifecycle behavior

## MVP Implementation Phases

### Phase 1: Product Skeleton

Build:

- Mobile-first app shell
- Bottom navigation
- Welcome
- Goal selection
- Screening flows
- Today tab
- Static program modules
- Static progress shell

Goal:

- Validate app structure and product flow without pose detection.

### Phase 2: Assessment And Recommendation

Build:

- Baseline assessment flow
- Mock or lightweight camera setup
- Rule-based movement profile
- Rule-based recommended plan
- Session preview

Goal:

- Validate assessment-to-plan experience.

### Phase 3: Workout Player

Build:

- Exercise player
- Timer and rep flow
- Demo media support
- Easier variation
- Session completion
- Template-based post-session report

Goal:

- Validate guided training completion.

### Phase 4: Pose Feedback MVP

Build:

- Browser camera permission
- Pose detector integration
- Tracking confidence
- 2-3 exercise-specific evaluators
- Real-time cue display
- Movement quality score

Goal:

- Validate whether camera feedback is useful and technically stable.

### Phase 5: Progress And Subscription

Build:

- Progress dashboard
- Report history
- Stripe trial/subscription
- Free vs paid feature gating
- Analytics funnel

Goal:

- Validate retention and willingness to pay.

## Key Technical Risks

### Camera And Pose Reliability

Risks:

- Poor lighting
- Small rooms
- Partial body visibility
- Different device cameras
- Loose clothing
- User positioning errors

Mitigation:

- Clear setup guidance
- Tracking confidence indicator
- Camera setup test
- Allow manual fallback
- Start with simple movements

### Real-Time Performance

Risks:

- Mobile browser CPU limitations
- Battery drain
- Lag during pose detection

Mitigation:

- Use lightweight model settings
- Evaluate only needed landmarks
- Limit initial feedback complexity
- Run at acceptable frame intervals instead of every frame if needed

### Safety And Liability

Risks:

- User interprets app as medical diagnosis.
- User exercises despite red flags.
- Postpartum symptoms require clinician care.

Mitigation:

- Conservative copy
- Safety screening
- Red flag warnings
- Clear non-diagnostic language
- Easy stop and regress options

### Recommendation Quality

Risks:

- Plan feels generic.
- User does not trust report.
- Wrong progression damages confidence.

Mitigation:

- Rule-based clarity first
- Explain why a module was chosen
- Show specific movement observations
- Progress conservatively

## Near-Term Engineering Decisions

Decisions to make before coding:

- Next.js app router or another React framework?
- Managed backend or custom API?
- Postgres provider?
- Auth provider?
- Pose library for browser MVP?
- Whether demo videos are hosted, generated, or initially represented by placeholders?
- Whether exercise content starts in JSON/TS files or a database?
- Whether reports are template-only first or AI-assisted from the beginning?

