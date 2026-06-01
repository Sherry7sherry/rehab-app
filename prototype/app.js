const state = {
  screen: "welcome",
  path: null,
  goals: [],
  readiness: "Good",
  tab: "today",
  assessmentStep: 0,
  completedAssessmentMovementIds: [],
  skippedAssessmentMovementIds: [],
  assessmentResult: null,
  recommendationResult: null,
  activeSession: null,
  sessionHistory: [],
  risk: false,
  screeningResult: null,
  postpartumScreening: {
    postpartumDuration: "6_12_weeks",
    birthType: "vaginal",
    clinicianClearance: "cleared",
    symptoms: [],
    cSectionScarPain: "none",
    abdominalSeparationConcern: "no",
    pelvicFloorConcern: "no",
    activityLevel: "very_gentle"
  },
  correctiveScreening: {
    focusArea: "posture",
    discomfortLevel: "low",
    sittingHours: "4_7",
    pilatesExperience: "new",
    activityLevel: "light",
    recentInjuryOrSurgery: "no"
  }
};

const defaultPostpartumScreening = {
  ...state.postpartumScreening,
  symptoms: [...state.postpartumScreening.symptoms]
};
const defaultCorrectiveScreening = { ...state.correctiveScreening };

const goals = [
  {
    id: "postpartum",
    title: "Postpartum Recovery",
    text: "Core rebuilding, pelvic floor awareness, posture, and confidence after birth."
  },
  {
    id: "corrective",
    title: "Corrective Pilates",
    text: "Alignment, mobility, balance, and body control through low-impact movement."
  },
  {
    id: "discomfort",
    title: "Back / Hip / Shoulder Discomfort",
    text: "Low-impact movement when everyday tension or discomfort is your main focus."
  }
];
const goalIds = goals.map((goal) => goal.id);

const content = window.FlowMoveContent;
const screening = window.FlowMoveScreening;
const assessmentEngine = window.FlowMoveAssessment;
const recommendationEngine = window.FlowMoveRecommendation;
const assessmentMoves = content.assessmentMovements;
const STORAGE_KEY = "flowmove.prototype.state.v1";
const PERSISTED_KEYS = [
  "screen",
  "path",
  "goals",
  "readiness",
  "tab",
  "assessmentStep",
  "completedAssessmentMovementIds",
  "skippedAssessmentMovementIds",
  "assessmentResult",
  "recommendationResult",
  "activeSession",
  "sessionHistory",
  "risk",
  "screeningResult",
  "postpartumScreening",
  "correctiveScreening"
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function persistState() {
  try {
    const snapshot = PERSISTED_KEYS.reduce((memo, key) => {
      memo[key] = state[key];
      return memo;
    }, {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    // Storage can fail in private browsing; the prototype should still run.
  }
}

function hydrateState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    PERSISTED_KEYS.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(saved, key)) {
        state[key] = saved[key];
      }
    });
    state.goals = Array.isArray(state.goals) ? state.goals.filter((goal) => goalIds.includes(goal)) : [];
    state.completedAssessmentMovementIds = Array.isArray(state.completedAssessmentMovementIds)
      ? state.completedAssessmentMovementIds
      : [];
    state.skippedAssessmentMovementIds = Array.isArray(state.skippedAssessmentMovementIds)
      ? state.skippedAssessmentMovementIds
      : [];
    state.sessionHistory = Array.isArray(state.sessionHistory) ? state.sessionHistory : [];
    state.postpartumScreening = { ...clone(defaultPostpartumScreening), ...(state.postpartumScreening || {}) };
    state.correctiveScreening = { ...clone(defaultCorrectiveScreening), ...(state.correctiveScreening || {}) };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getVariant(id) {
  return content.exerciseVariants.find((variant) => variant.id === id);
}

function getExercise(id) {
  return content.exercises.find((exercise) => exercise.id === id);
}

function getModule(id) {
  return content.programModules.find((module) => module.id === id);
}

function moduleForToday() {
  return recommendationForToday().module;
}

function sessionVariantsForToday() {
  return recommendationForToday().variants;
}

function recommendationForToday() {
  const recommendation = recommendationEngine.recommend({ state, content });
  state.recommendationResult = recommendation;
  return recommendation;
}

function variantLabel(variant) {
  if (variant.reps) return `${variant.reps} reps`;
  return `${Math.round((variant.durationSec || 60) / 60)} min`;
}

function getVariantCues(variant) {
  const exercise = getExercise(variant.exerciseId);
  const cueIds = exercise?.cueIds || [];
  return cueIds
    .map((id) => content.cueLibrary.find((cue) => cue.id === id))
    .filter(Boolean);
}

function buildSessionFromRecommendation(recommendation, options = {}) {
  const startedAt = Date.now();
  const variants = recommendation.variants.map((variant, index) => {
    const exercise = getExercise(variant.exerciseId);
    const cues = getVariantCues(variant);
    const estimatedSec = variant.durationSec || (variant.reps || 8) * 12;

    return {
      id: `${startedAt}-${variant.id}-${index}`,
      variantId: variant.id,
      exerciseId: variant.exerciseId,
      name: variant.name,
      category: exercise?.category || "movement",
      targetAreas: exercise?.targetAreas || [],
      capabilities: exercise?.capabilities || [],
      cues,
      estimatedSec,
      reps: variant.reps || null,
      durationSec: variant.durationSec || null,
      status: "pending"
    };
  });

  return {
    id: `session-${startedAt}`,
    path: recommendation.path,
    moduleId: recommendation.module.id,
    moduleTitle: recommendation.module.title,
    moduleSummary: recommendation.module.summary,
    intensity: options.easier ? "Gentle" : recommendation.intensity,
    plannedDurationMin: options.easier ? Math.min(10, recommendation.durationMin) : recommendation.durationMin,
    recommendationSignals: recommendation.signals,
    recommendationReasons: recommendation.reasons,
    nextAdjustment: recommendation.nextAdjustment,
    startedAt,
    currentIndex: 0,
    completedExerciseIds: [],
    skippedExerciseIds: [],
    cueEvents: [],
    elapsedSec: 0,
    status: "active",
    exercises: variants
  };
}

function startSession(options = {}) {
  const recommendation = recommendationForToday();
  state.activeSession = buildSessionFromRecommendation(recommendation, options);
  setScreen("workout");
}

function currentSessionExercise() {
  return state.activeSession?.exercises[state.activeSession.currentIndex] || null;
}

function recordCueEvent(session, exercise, cue) {
  if (!cue) return;
  session.cueEvents.push({
    exerciseId: exercise.exerciseId,
    variantId: exercise.variantId,
    cueId: cue.id,
    category: cue.category,
    text: cue.text,
    atSec: session.elapsedSec
  });
}

function advanceSession(action = "complete") {
  const session = state.activeSession || buildSessionFromRecommendation(recommendationForToday());
  state.activeSession = session;
  const exercise = currentSessionExercise();

  if (!exercise) {
    finishSession();
    return;
  }

  exercise.status = action === "skip" ? "skipped" : "completed";
  session.elapsedSec += action === "skip" ? 15 : exercise.estimatedSec;

  if (action === "skip") {
    session.skippedExerciseIds.push(exercise.variantId);
  } else {
    session.completedExerciseIds.push(exercise.variantId);
    recordCueEvent(session, exercise, exercise.cues[0]);
  }

  if (session.currentIndex >= session.exercises.length - 1) {
    finishSession();
    return;
  }

  session.currentIndex += 1;
  render();
}

function finishSession() {
  if (!state.activeSession) {
    state.activeSession = buildSessionFromRecommendation(recommendationForToday());
  }

  state.activeSession.status = "complete";
  state.activeSession.completedAt = Date.now();
  state.sessionHistory = [
    state.activeSession,
    ...state.sessionHistory.filter((session) => session.id !== state.activeSession.id)
  ];
  setScreen("complete");
}

function sessionCompletionPercent(session = state.activeSession) {
  if (!session?.exercises?.length) return 0;
  return Math.round((session.completedExerciseIds.length / session.exercises.length) * 100);
}

function completedSessionOrFallback() {
  if (state.activeSession) return state.activeSession;
  if (state.sessionHistory.length) return state.sessionHistory[0];
  return buildSessionFromRecommendation(recommendationForToday());
}

function scoreSession(session) {
  if (!session?.exercises?.length) return 0;
  const completed = session.completedExerciseIds.length;
  const skipped = session.skippedExerciseIds.length;
  return Math.max(52, Math.min(96, 68 + completed * 5 - skipped * 7));
}

function sessionElapsedMinutes(session) {
  return Math.max(1, Math.round((session?.elapsedSec || 0) / 60));
}

function formatSessionDate(timestamp) {
  if (!timestamp) return "Today";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(timestamp));
}

function latestCompletedSession() {
  return state.sessionHistory.find((session) => session.status === "complete") || null;
}

function sessionPrimaryFocus(session) {
  const capabilities = session?.exercises?.flatMap((exercise) => exercise.capabilities || []) || [];
  const counts = capabilities.reduce((memo, capability) => {
    memo[capability] = (memo[capability] || 0) + 1;
    return memo;
  }, {});
  const [primary] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ["control"];
  return humanizeCapability(primary);
}

function progressMetrics() {
  const assessment = state.assessmentResult?.metricScores;
  const completedSessions = state.sessionHistory.filter((session) => session.status === "complete");
  const sessionLift = Math.min(10, completedSessions.length * 2);
  const fallback = metrics[state.path || "corrective"].reduce((memo, [name, value]) => {
    memo[name] = value;
    return memo;
  }, {});

  return {
    coreControl: Math.min(96, (assessment?.coreControl || fallback["Core Control"]) + sessionLift),
    mobility: Math.min(96, (assessment?.mobility || fallback.Mobility) + Math.round(sessionLift / 2)),
    stability: Math.min(96, (assessment?.stability || fallback.Stability) + sessionLift),
    alignment: Math.min(96, (assessment?.alignment || fallback.Alignment) + Math.round(sessionLift / 2))
  };
}

function recentWeeklyBars() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const sessions = state.sessionHistory.filter((session) => session.status === "complete").slice(0, 7).reverse();
  return days.map((day, index) => {
    const session = sessions[index];
    return [day, session ? scoreSession(session) : 4, Boolean(session)];
  });
}

function todayInsight() {
  const latest = latestCompletedSession();
  if (!latest) {
    return state.path === "postpartum"
      ? "Start with a gentle foundation session today so FlowMove can begin tracking core control and pressure-aware movement."
      : "Complete your first session today so FlowMove can start tracking alignment, mobility, and body control.";
  }
  const report = generateSessionReport(latest);
  return `${report.whatImproved} ${report.nextAdjustment}`;
}

function generateSessionReport(session) {
  const template = content.reportTemplates[state.path === "postpartum" ? "postpartum" : "corrective"];
  const completed = session.completedExerciseIds.length;
  const skipped = session.skippedExerciseIds.length;
  const cueCategories = Array.from(new Set(session.cueEvents.map((event) => event.category)));
  const primaryCue = cueCategories[0] ? humanizeCapability(cueCategories[0]) : "Control";
  const assessmentSignals = state.assessmentResult?.signals || [];
  const signalNote = assessmentSignals.length
    ? ` Your current plan also reflects assessment signals like ${assessmentSignals.slice(0, 2).map(humanizeCapability).join(" and ")}.`
    : "";

  return {
    score: scoreSession(session),
    headline:
      completed === session.exercises.length
        ? "Beautifully balanced today, Sarah."
        : "A thoughtful, body-aware session today.",
    whatImproved:
      completed > 0
        ? `You completed ${completed} ${completed === 1 ? "exercise" : "exercises"} with extra attention to ${primaryCue.toLowerCase()}.`
        : template.improved,
    needsAttention:
      skipped > 0
        ? `${skipped} ${skipped === 1 ? "exercise was" : "exercises were"} skipped, so the next session should stay conservative.${signalNote}`
        : `${template.attention}${signalNote}`,
    nextAdjustment: session.nextAdjustment || template.next,
    primaryFocus: sessionPrimaryFocus(session),
    completed,
    skipped,
    elapsedMin: sessionElapsedMinutes(session),
    completion: sessionCompletionPercent(session)
  };
}

function humanizeCapability(value) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const metrics = {
  postpartum: [
    ["Core Control", 62],
    ["Mobility", 74],
    ["Stability", 58],
    ["Alignment", 71]
  ],
  corrective: [
    ["Core Control", 68],
    ["Mobility", 61],
    ["Stability", 64],
    ["Alignment", 59]
  ]
};

const $app = document.querySelector("#app");

function setScreen(screen) {
  state.screen = screen;
  window.scrollTo({ top: 0, behavior: "instant" });
  render();
}

function selectGoal(id) {
  state.goals = [id];
  state.path = id === "postpartum" ? "postpartum" : "corrective";
  render();
}

function continueFromGoals() {
  if (!state.path) state.path = "corrective";
  setScreen(state.path === "postpartum" ? "postpartum-screening" : "corrective-screening");
}

function setRisk(value) {
  state.risk = value;
  if (value) setScreen("safety");
}

function updatePostpartumScreening(key, value) {
  state.postpartumScreening[key] = value;
  render();
}

function updateCorrectiveScreening(key, value) {
  state.correctiveScreening[key] = value;
  render();
}

function togglePostpartumSymptom(symptom) {
  const symptoms = state.postpartumScreening.symptoms;
  state.postpartumScreening.symptoms = symptoms.includes(symptom)
    ? symptoms.filter((item) => item !== symptom)
    : [...symptoms, symptom];
  render();
}

function continuePostpartumScreening() {
  const result = screening.evaluatePostpartum(state.postpartumScreening);
  state.screeningResult = result;
  if (result.status === "block") {
    setRisk(true);
    return;
  }
  setScreen("preferences");
}

function continueCorrectiveScreening() {
  const result = screening.evaluateCorrective(state.correctiveScreening);
  state.screeningResult = result;
  if (result.status === "block") {
    setRisk(true);
    return;
  }
  setScreen("preferences");
}

function goMain(tab = "today") {
  state.tab = tab;
  state.screen = "main";
  render();
}

function shell(content, options = {}) {
  $app.className = `screen${options.tabs ? " has-tabs" : ""}`;
  $app.innerHTML = content + (options.tabs ? tabs() : "");
}

function topbar(backTarget) {
  return `
    <div class="topbar">
      ${backTarget ? `<button class="icon-button" onclick="setScreen('${backTarget}')" aria-label="Back">‹</button>` : `<div class="brand">FlowMove</div>`}
      <span class="mini">${state.path === "postpartum" ? "Postpartum" : "Corrective"}</span>
    </div>
  `;
}

function tabs() {
  const tabItems = [
    ["today", "Today", "▣"],
    ["progress", "Progress", "⌁"],
    ["programs", "Programs", "⌘"],
    ["profile", "Profile", "♙"]
  ];
  return `
    <nav class="bottom-tabs" aria-label="Primary">
      ${tabItems
        .map(
          ([id, label, icon]) => `
            <button class="tab ${state.tab === id ? "active" : ""}" onclick="goMain('${id}')">
              <b>${icon}</b>
              <span>${label}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function welcome() {
  shell(`
    <section class="hero">
      <div class="hero-header">
        <div class="brand">FlowMove</div>
        <button class="icon-button" aria-label="Language">◎</button>
      </div>
      <div class="hero-visual" aria-hidden="true"></div>
      <div class="hero-content">
        <div class="pill">AI-powered posture alignment</div>
        <h1>Feel your progress in every movement.</h1>
        <p class="lead">Personalized Pilates-based guidance for recovery, alignment, and everyday strength.</p>
        <div class="stack">
          <button class="btn" onclick="setScreen('goals')">Get Started</button>
          <button class="btn secondary" onclick="goMain('today')">I already have an account</button>
        </div>
        <div class="value-grid">
          <div class="value-card"><b>✧</b><span>Recovery</span></div>
          <div class="value-card"><b>⌁</b><span>Alignment</span></div>
        </div>
        <div class="footer-wordmark">Crafted for graceful precision</div>
      </div>
    </section>
  `);
}

function goalSelection() {
  const hasSelection = state.goals.length > 0;
  shell(`
    <section class="view goal-selection-page">
      <div class="goal-topbar">
        <button class="goal-back" onclick="setScreen('welcome')" aria-label="Back">←</button>
        <div class="goal-brand">FlowMove</div>
        <span></span>
      </div>

      <div class="goal-progress" aria-label="Step 1 of 6"><i></i></div>

      <div class="goal-intro">
        <h2>What brings you to FlowMove?</h2>
        <p>Select the focus area that best aligns with your current recovery or movement goals.</p>
      </div>

      <div class="goal-option-list">
        ${goals
          .map(
            (goal) => `
              <button class="goal-radio-option ${state.goals.includes(goal.id) ? "selected" : ""}" onclick="selectGoal('${goal.id}')">
                <span>${goal.title}</span>
                <i aria-hidden="true"></i>
              </button>
            `
          )
          .join("")}
      </div>

      <div class="goal-photo-panel" aria-hidden="true"></div>

      <button class="goal-continue ${hasSelection ? "ready" : ""}" onclick="continueFromGoals()" ${hasSelection ? "" : "disabled"}>Continue</button>
    </section>
  `);
}

function postpartumScreening() {
  const answers = state.postpartumScreening;
  shell(`
    <section class="view">
      ${topbar("goals")}
      <div class="screen-intro">
        <p class="eyebrow">Safety screening</p>
        <h2>First, a few postpartum safety checks.</h2>
        <p class="copy">FlowMove is movement guidance, not medical diagnosis. These answers help us choose a safer starting point.</p>
      </div>
      <div class="stack">
        ${selectField("How long postpartum are you?", "postpartumDuration", answers.postpartumDuration, [
          ["6_12_weeks", "6-12 weeks"],
          ["3_6_months", "3-6 months"],
          ["6_12_months", "6-12 months"],
          ["12_24_months", "12-24 months"]
        ], "updatePostpartumScreening")}
        ${selectField("Birth type", "birthType", answers.birthType, [
          ["vaginal", "Vaginal birth"],
          ["c_section", "C-section"],
          ["prefer_not", "Prefer not to say"]
        ], "updatePostpartumScreening")}
        ${selectField("Clinician clearance", "clinicianClearance", answers.clinicianClearance, [
          ["cleared", "Yes, cleared for exercise"],
          ["not_yet", "Not yet"],
          ["not_sure", "Not sure"]
        ], "updatePostpartumScreening")}
        ${symptomChips("Any symptoms today?", [
          ["leakage", "Leakage"],
          ["pelvic_heaviness", "Pelvic heaviness"],
          ["sharp_pain", "Sharp pain"],
          ["dizziness", "Dizziness"],
          ["bleeding", "Bleeding"]
        ], answers.symptoms)}
        ${selectField("C-section scar pain", "cSectionScarPain", answers.cSectionScarPain, [
          ["none", "None"],
          ["mild", "Mild"],
          ["significant", "Significant"]
        ], "updatePostpartumScreening")}
        ${selectField("Abdominal separation concern", "abdominalSeparationConcern", answers.abdominalSeparationConcern, [
          ["no", "No"],
          ["yes", "Yes"],
          ["not_sure", "Not sure"]
        ], "updatePostpartumScreening")}
        ${selectField("Pelvic floor concern", "pelvicFloorConcern", answers.pelvicFloorConcern, [
          ["no", "No"],
          ["yes", "Yes"],
          ["not_sure", "Not sure"]
        ], "updatePostpartumScreening")}
        ${selectField("Current activity level", "activityLevel", answers.activityLevel, [
          ["very_gentle", "Very gentle"],
          ["light_walking", "Light walking"],
          ["some_pilates", "Some Pilates"],
          ["regular", "Regular exercise"]
        ], "updatePostpartumScreening")}
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="continuePostpartumScreening()">Continue</button>
      <button class="btn secondary" onclick="setRisk(true)">Preview safety warning</button>
    </section>
  `);
}

function correctiveScreening() {
  const answers = state.correctiveScreening;
  shell(`
    <section class="view">
      ${topbar("goals")}
      <div class="screen-intro">
        <p class="eyebrow">Movement profile</p>
        <h2>Tell us what your body needs most.</h2>
        <p class="copy">We will use this to shape your first assessment and plan.</p>
      </div>
      <div class="stack">
        ${selectField("Main focus area", "focusArea", answers.focusArea, [
          ["posture", "Posture"],
          ["back", "Back"],
          ["hips", "Hips"],
          ["shoulders", "Shoulders"],
          ["knees", "Knees"],
          ["full_body", "Full body"]
        ], "updateCorrectiveScreening")}
        ${selectField("Pain or discomfort", "discomfortLevel", answers.discomfortLevel, [
          ["low", "0-2 low"],
          ["mild", "3-4 mild"],
          ["moderate", "5-6 moderate"],
          ["high", "7+ high"]
        ], "updateCorrectiveScreening")}
        ${selectField("Sitting time per day", "sittingHours", answers.sittingHours, [
          ["under_4", "Less than 4 hours"],
          ["4_7", "4-7 hours"],
          ["8_plus", "8+ hours"]
        ], "updateCorrectiveScreening")}
        ${selectField("Pilates experience", "pilatesExperience", answers.pilatesExperience, [
          ["new", "New"],
          ["some", "Some experience"],
          ["regular", "Regular practice"]
        ], "updateCorrectiveScreening")}
        ${selectField("Current activity level", "activityLevel", answers.activityLevel, [
          ["gentle", "Gentle"],
          ["light", "Light"],
          ["active", "Active"]
        ], "updateCorrectiveScreening")}
        ${selectField("Recent injury or surgery?", "recentInjuryOrSurgery", answers.recentInjuryOrSurgery, [
          ["no", "No"],
          ["yes", "Yes"],
          ["not_sure", "Not sure"]
        ], "updateCorrectiveScreening")}
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="continueCorrectiveScreening()">Continue</button>
      <button class="btn secondary" onclick="setRisk(true)">Preview safety warning</button>
    </section>
  `);
}

function field(label, options) {
  return `
    <div class="field">
      <label>${label}</label>
      <select>
        ${options.map((option) => `<option>${option}</option>`).join("")}
      </select>
    </div>
  `;
}

function selectField(label, key, value, options, handler) {
  return `
    <div class="field">
      <label>${label}</label>
      <select onchange="${handler}('${key}', this.value)">
        ${options.map(([optionValue, optionLabel]) => `<option value="${optionValue}" ${value === optionValue ? "selected" : ""}>${optionLabel}</option>`).join("")}
      </select>
    </div>
  `;
}

function symptomChips(label, options, selected = []) {
  return `
    <div class="field">
      <label>${label}</label>
      <div class="choice-row">
        ${options
          .map(
            ([value, option]) => `<button class="chip ${selected.includes(value) ? "selected" : ""}" onclick="togglePostpartumSymptom('${value}')">${option}</button>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function chips(label, options, selected = []) {
  return `
    <div class="field">
      <label>${label}</label>
      <div class="choice-row">
        ${options
          .map(
            (option) => `<button class="chip ${selected.includes(option) ? "selected" : ""}">${option}</button>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function preferences() {
  shell(`
    <section class="view">
      ${topbar(state.path === "postpartum" ? "postpartum-screening" : "corrective-screening")}
      <div class="screen-intro">
        <p class="eyebrow">Training rhythm</p>
        <h2>Make it fit your week.</h2>
        <p class="copy">Short sessions, repeatable rhythm, and low setup friction.</p>
      </div>
      <div class="stack">
        ${field("How often do you want to train?", ["3 sessions per week", "2 sessions per week", "4 sessions per week"])}
        ${field("Time per session", ["10-15 minutes", "15-20 minutes", "20-30 minutes"])}
        ${field("Equipment", ["No equipment", "Mat only", "Band", "Small weights"])}
        ${field("Preferred pace", ["Gentle", "Balanced", "Challenging"])}
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="setScreen('camera')">Continue</button>
    </section>
  `);
}

function cameraSetup() {
  const setupCards = [
    {
      image: "./assets/assessment-standing-real.png",
      label: "1 | Front view",
      detail: "Full body visible"
    },
    {
      image: "./assets/assessment-hip-hinge-real.png",
      label: "2 | Side view",
      detail: "Hips and spine in frame"
    },
    {
      image: "./assets/assessment-glute-bridge-real.png",
      label: "3 | Low floor view",
      detail: "Ribs, pelvis, and mat visible"
    },
    {
      image: "./assets/assessment-balance-real.png",
      label: "4 | Balance view",
      detail: "Leave space around your body"
    }
  ];
  shell(`
    <section class="view camera-setup-page">
      <div class="camera-setup-header">
        <button class="menu-button" onclick="setScreen('preferences')" aria-label="Back"><span></span><span></span></button>
        <div>
          <p class="eyebrow">Camera setup</p>
          <h2>Check your view.</h2>
        </div>
      </div>
      <div class="camera-example-grid">
        ${setupCards.map((card) => `
          <div class="camera-example-card">
            <img src="${card.image}" alt="${card.detail}" />
            <div>
              <strong>${card.label}</strong>
              <span>${card.detail}</span>
            </div>
          </div>
        `).join("")}
      </div>
      <button class="camera-check-button" onclick="setScreen('assessment-intro')">Check My View</button>
      <p class="camera-privacy-note">FlowMove uses local-only AI analysis</p>
      <div class="stack">
        <button class="btn secondary" onclick="setScreen('assessment-intro')">Continue Without Camera</button>
      </div>
    </section>
  `);
}

function assessmentIntro() {
  shell(`
    <section class="view">
      ${topbar("camera")}
      <p class="eyebrow">Baseline</p>
      <h2>A few simple movements to understand your starting point.</h2>
      <p class="copy">This is not a diagnosis. FlowMove looks for movement patterns that help personalize your plan.</p>
      <div class="stack">
        ${assessmentMoves.map((move) => `
          <div class="movement-card">
            <img src="${move.image}" alt="${move.title} setup illustration" />
            <div>
              <h3>${move.title}</h3>
              <p class="mini">${move.view}</p>
              <p class="copy">${move.placement}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="startAssessment()">Start Assessment</button>
      <button class="btn secondary" onclick="skipAssessment()">Skip for Now</button>
    </section>
  `);
}

function startAssessment() {
  state.assessmentStep = 0;
  state.completedAssessmentMovementIds = [];
  state.skippedAssessmentMovementIds = [];
  state.assessmentResult = null;
  setScreen("assessment");
}

function skipAssessment() {
  state.completedAssessmentMovementIds = [];
  state.skippedAssessmentMovementIds = assessmentMoves.map((move) => move.id);
  state.assessmentResult = assessmentEngine.generateMockResult({
    path: state.path || "corrective",
    completedMovementIds: []
  });
  setScreen("profile-result");
}

function assessment() {
  const move = assessmentMoves[state.assessmentStep];
  const progress = Math.round(((state.assessmentStep + 1) / assessmentMoves.length) * 100);
  shell(`
    <section class="view">
      ${topbar("assessment-intro")}
      <p class="eyebrow">Movement ${state.assessmentStep + 1} of ${assessmentMoves.length}</p>
      <h2>${move.title}</h2>
      <div class="assessment-visual">
        <img src="${move.image}" alt="${move.title} setup illustration" />
      </div>
      <div class="card">
        <p class="eyebrow">${move.view}</p>
        <p class="copy">${move.placement}</p>
      </div>
      <div class="progress-line"><i style="width:${progress}%"></i></div>
      <p class="copy">Move slowly. Stop if anything feels sharp, dizzy, heavy, or uncomfortable.</p>
      <div class="split">
        <button class="btn secondary" onclick="nextAssessment('skip')">Skip</button>
        <button class="btn" onclick="nextAssessment('complete')">Complete</button>
      </div>
    </section>
  `);
}

function nextAssessment(action = "complete") {
  const currentMovement = assessmentMoves[state.assessmentStep];
  if (action === "skip") {
    state.skippedAssessmentMovementIds.push(currentMovement.id);
  } else {
    state.completedAssessmentMovementIds.push(currentMovement.id);
  }

  if (state.assessmentStep < assessmentMoves.length - 1) {
    state.assessmentStep += 1;
    render();
  } else {
    state.assessmentResult = assessmentEngine.generateMockResult({
      path: state.path || "corrective",
      completedMovementIds: state.completedAssessmentMovementIds
    });
    setScreen("profile-result");
  }
}

function profileResult() {
  const result =
    state.assessmentResult ||
    assessmentEngine.generateMockResult({
      path: state.path || "corrective",
      completedMovementIds: []
    });
  state.assessmentResult = result;
  const list = [
    ["Core Control", result.metricScores.coreControl],
    ["Mobility", result.metricScores.mobility],
    ["Stability", result.metricScores.stability],
    ["Alignment", result.metricScores.alignment]
  ];
  const topPriority = result.modulePriorities.find((priority) => priority.score > 0);
  shell(`
    <section class="view">
      ${topbar("assessment-intro")}
      <p class="eyebrow">Your FlowMove profile</p>
      <h2>${state.path === "postpartum" ? "A gentle foundation-first plan." : "Alignment and stability come first."}</h2>
      <p class="copy">${result.summary}</p>
      <div class="metric-grid">
        ${list
          .map(
            ([name, value]) => `
              <div class="metric">
                <span>${name}</span>
                <strong>${value}</strong>
                <div class="bar"><i style="width:${value}%"></i></div>
              </div>
            `
          )
          .join("")}
      </div>
      ${topPriority ? `
        <div style="height: 14px"></div>
        <div class="card report-highlight">
          <p class="eyebrow">First priority</p>
          <h3>${topPriority.title}</h3>
          <p class="copy">Matched signals: ${topPriority.matchedSignals.map(humanizeCapability).join(", ")}</p>
        </div>
      ` : ""}
      <div style="height: 18px"></div>
      <button class="btn" onclick="setScreen('plan')">View My Plan</button>
    </section>
  `);
}

function planPreview() {
  const isPostpartum = state.path === "postpartum";
  shell(`
    <section class="view">
      ${topbar("profile-result")}
      <p class="eyebrow">Recommended plan</p>
      <h2>${isPostpartum ? "Postpartum Recovery" : "Women's Corrective Pilates"}</h2>
      <div class="session-card">
        <p class="mini">Starting focus</p>
        <h3>${isPostpartum ? "Foundation Reset + Deep Core Rebuild" : "Posture Reset + Hip Stability"}</h3>
        <div class="focus">
          <span class="chip selected">3x weekly</span>
          <span class="chip selected">${isPostpartum ? "12-15 min" : "15-20 min"}</span>
          <span class="chip selected">No equipment</span>
        </div>
        <p class="copy">${isPostpartum ? "A conservative plan focused on breath, pressure awareness, and gentle core control." : "A low-impact plan focused on posture, mobility, glute activation, and balanced control."}</p>
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="goMain('today')">Start Today's Session</button>
    </section>
  `);
}

function main() {
  const views = {
    today: today(),
    progress: progress(),
    programs: programs(),
    profile: profile()
  };
  shell(views[state.tab], { tabs: true });
}

function today() {
  const isPostpartum = state.path === "postpartum";
  const recommendation = recommendationForToday();
  const insight = todayInsight();
  const readinessOptions = [
    ["Good", "☻"],
    ["Tired", "☾"],
    ["Sore", "⌘"],
    ["Pain or discomfort", "△"]
  ];
  const weeklyBars = recentWeeklyBars();
  return `
    <section class="view today-dashboard">
      <div class="dashboard-topbar">
        <button class="menu-button" aria-label="Menu"><span></span><span></span><span></span></button>
        <div class="dashboard-brand">FlowMove</div>
        <button class="avatar-button" onclick="setScreen('goals')" aria-label="Switch path"><span></span></button>
      </div>
      <div class="screen-intro dashboard-greeting">
        <p class="eyebrow">${isPostpartum ? "Postpartum Recovery" : "Corrective Pilates"}</p>
        <h2>Good morning, Sarah</h2>
      </div>
      <div class="dashboard-session-card">
        <div class="dashboard-session-content">
          <div class="dashboard-badges">
            <span>Recommended</span>
            <span>◷ ${recommendation.durationMin} mins</span>
          </div>
          <h3>${isPostpartum ? "Core Rebuild Foundation" : recommendation.module.title}</h3>
          <button class="dashboard-start" onclick="setScreen('session-preview')">Start Session</button>
        </div>
      </div>

      <div class="dashboard-card ai-card">
        <p class="dashboard-card-title"><span>✣</span> AI Insight</p>
        <p class="insight-copy">"${insight}"</p>
      </div>

      <div class="dashboard-card">
        <p class="dashboard-card-title">Weekly Progress</p>
        <div class="weekly-chart" aria-label="Weekly progress chart">
          ${weeklyBars.map(([day, height, active]) => `
            <div class="chart-day ${active ? "active" : ""}">
              <span class="bar-pill" style="height:${height || 4}px"></span>
              <b>${day}</b>
            </div>
          `).join("")}
        </div>
      </div>

      <h2 class="readiness-title">How are you feeling today?</h2>
      <div class="readiness-grid">
        ${readinessOptions.map(([item, icon]) => `
          <button class="readiness-card ${state.readiness === item ? "selected" : ""}" onclick="state.readiness='${item}'; render()">
            <span>${icon}</span>
            <strong>${item === "Pain or discomfort" ? "Pain /<br />Discomfort" : item}</strong>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function sessionPreview() {
  const isPostpartum = state.path === "postpartum";
  const recommendation = recommendationForToday();
  const module = recommendation.module;
  const variants = recommendation.variants;
  shell(`
    <section class="view">
      ${topbar("main")}
      <div class="screen-intro">
        <p class="eyebrow">Session preview</p>
        <h2>${isPostpartum ? "Foundation Flow" : "Desk Body Reset"}</h2>
      </div>
      <div class="session-card">
        <p class="mini">Focus</p>
        <h3>${module.title}</h3>
        <p class="copy">${module.summary}</p>
        <div class="focus">
          <span class="chip selected">${recommendation.durationMin} min</span>
          <span class="chip selected">${variants.length} exercises</span>
          <span class="chip selected">${recommendation.intensity}</span>
        </div>
        <div class="card report-highlight">
          <p class="eyebrow">Recommendation logic</p>
          <p class="copy">${recommendation.reasons.join(" ")}</p>
        </div>
        <div style="height: 12px"></div>
        <div class="stack">
          ${variants.map((variant, index) => {
            const exercise = getExercise(variant.exerciseId);
            return `
              <div class="exercise-row">
                <b>${index + 1}</b>
                <div>
                  <h3>${variant.name}</h3>
                  <p class="mini">${exercise.capabilities.slice(0, 2).map(humanizeCapability).join(" + ")}</p>
                </div>
                <span class="mini">${variantLabel(variant)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="startSession()">Start</button>
      <button class="btn secondary" onclick="startSession({ easier: true })">Use easier session</button>
    </section>
  `);
}

function workout() {
  if (!state.activeSession || state.activeSession.status !== "active") {
    state.activeSession = buildSessionFromRecommendation(recommendationForToday());
  }

  const session = state.activeSession;
  const exercise = currentSessionExercise();
  const activeCue = exercise?.cues[0]?.text || "Move slowly and stay in control.";
  const progressPercent = Math.round(((session.currentIndex + 1) / session.exercises.length) * 100);
  const imageIndex = Math.min(session.currentIndex, 2);

  shell(`
    <section class="view" style="padding-bottom:0">
      <div class="topbar"><button class="icon-button" onclick="setScreen('session-preview')" aria-label="Close">×</button><div class="brand">${exercise?.name || session.moduleTitle}</div><button class="icon-button" aria-label="Profile">◌</button></div>
      <div class="camera" style="background-image: linear-gradient(180deg, rgba(24, 33, 25, 0.08) 0%, rgba(24, 33, 25, 0.05) 42%, rgba(24, 33, 25, 0.24) 100%), url('./assets/workout-${imageIndex}.jpg')">
        <div class="tracking">AI alignment active</div>
        <div class="cue">${activeCue}</div>
      </div>
      <div class="player-sheet">
        <div class="split">
          <div class="metric"><span>Exercise</span><strong>${session.currentIndex + 1}/${session.exercises.length}</strong></div>
          <div class="metric"><span>Target</span><strong>${exercise ? variantLabel(exercise) : "Done"}</strong></div>
        </div>
        <div class="progress-line"><i style="width:${progressPercent}%"></i></div>
        <p class="copy">${exercise?.capabilities.slice(0, 2).map(humanizeCapability).join(" + ") || session.moduleSummary}</p>
        <div class="split">
          <button class="btn secondary" onclick="advanceSession('skip')">Skip</button>
          <button class="btn" onclick="advanceSession('complete')">${session.currentIndex === session.exercises.length - 1 ? "Finish" : "Next"}</button>
        </div>
        <button class="btn secondary" onclick="finishSession()">End session</button>
      </div>
    </section>
  `);
}

function sessionComplete() {
  const session = completedSessionOrFallback();
  const completed = session.completedExerciseIds.length;
  const elapsedMin = Math.max(1, Math.round(session.elapsedSec / 60));
  const completion = sessionCompletionPercent(session);

  shell(`
    <section class="view centered">
      <p class="eyebrow">Session complete</p>
      <h1>Nice work.</h1>
      <p class="lead">You completed ${completed} ${completed === 1 ? "exercise" : "exercises"} in ${elapsedMin} minutes from ${session.moduleTitle}.</p>
      <div class="metric-grid">
        <div class="metric"><span>Completion</span><strong>${completion}%</strong></div>
        <div class="metric"><span>Cues</span><strong>${session.cueEvents.length}</strong></div>
      </div>
      <div style="height: 18px"></div>
      <button class="btn" onclick="setScreen('report')">View Report</button>
      <button class="btn secondary" onclick="goMain('today')">Done</button>
    </section>
  `);
}

function report() {
  const session = completedSessionOrFallback();
  const report = generateSessionReport(session);
  const replayImage = `./assets/workout-${Math.min(Math.max(session.completedExerciseIds.length - 1, 0), 2)}.jpg`;
  state.tab = "progress";
  shell(`
    <section class="view session-report">
      <div class="journal-topbar">
        <button class="menu-button" onclick="goMain('progress')" aria-label="Menu"><span></span><span></span><span></span></button>
        <div class="journal-brand">FlowMove</div>
        <button class="avatar-photo" onclick="setScreen('goals')" aria-label="Profile"></button>
      </div>

      <div class="session-complete-pill"><span>⌁</span> Session Complete</div>
      <h1>${report.headline.replace(", Sarah.", ",<br />Sarah.")}</h1>

      <div class="quality-ring" aria-label="Movement quality ${report.score}%">
        <span>${report.score}%</span>
        <small>Movement Quality</small>
      </div>

      <div class="report-detail-card improved">
        <div class="report-icon">↗</div>
        <div>
          <h3>What improved</h3>
          <p>${report.whatImproved}</p>
          <div class="report-mini-grid">
            <span>Completion:<b>${report.completion}%</b></span>
            <span>Primary Focus:<b>${report.primaryFocus}</b></span>
          </div>
        </div>
      </div>

      <div class="report-detail-card attention">
        <div class="report-icon">⌗</div>
        <div>
          <h3>What needs attention</h3>
          <p>${report.needsAttention}</p>
        </div>
      </div>

      <div class="replay-card">
        <img src="${replayImage}" alt="Movement replay" />
        <button>${report.completed} completed · ${report.skipped} skipped</button>
      </div>

      <div class="next-adjustment-card">
        <p>▣ Next Session Adjustment</p>
        <h3>${session.moduleTitle}</h3>
        <span>${report.nextAdjustment}</span>
        <button onclick="goMain('progress')">Schedule Next</button>
      </div>

      <div class="report-dots" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>
    </section>
  `, { tabs: true });
}

function progress() {
  const sessions = state.sessionHistory.filter((session) => session.status === "complete");
  const metric = progressMetrics();
  const latest = sessions[0];
  const averageScore = sessions.length
    ? Math.round(sessions.reduce((total, session) => total + scoreSession(session), 0) / sessions.length)
    : 0;
  const latestReport = latest ? generateSessionReport(latest) : null;
  const sessionHistoryRows = sessions.length
    ? sessions.slice(0, 5).map((session) => {
        const score = scoreSession(session);
        return `
          <div class="history-row">
            <img src="./assets/workout-${Math.min(Math.max(session.completedExerciseIds.length - 1, 0), 2)}.jpg" alt="${session.moduleTitle}" />
            <div>
              <h3>${session.moduleTitle}</h3>
              <p>${formatSessionDate(session.completedAt || session.startedAt)} · ${sessionElapsedMinutes(session)} min · ${session.intensity}</p>
            </div>
            <div class="history-score"><strong>${score}%</strong><span>Quality</span></div>
            <b>›</b>
          </div>
        `;
      }).join("")
    : `
      <div class="card">
        <h3>No sessions yet</h3>
        <p class="copy">Complete your first FlowMove session to start building a body journal from real movement data.</p>
        <button class="btn" onclick="goMain('today')">Start Session</button>
      </div>
    `;

  return `
    <section class="view progress-journal">
      <div class="journal-topbar">
        <button class="menu-button" aria-label="Menu"><span></span><span></span><span></span></button>
        <div class="journal-brand">FlowMove</div>
        <button class="avatar-button" onclick="setScreen('goals')" aria-label="Profile"><span></span></button>
      </div>

      <div class="journal-intro">
        <span class="journal-pill">Body Journal</span>
        <h2>Your Evolution</h2>
        <p>${sessions.length
          ? `You've completed ${sessions.length} ${sessions.length === 1 ? "session" : "sessions"}. Your current average movement quality is ${averageScore}%.`
          : "Your progress journal will begin after your first completed session."}</p>
        <div class="range-toggle" aria-label="Progress range">
          <button>7 Days</button>
          <button class="active">30 Days</button>
        </div>
      </div>

      <div class="journal-card curve-card">
        <div class="journal-card-head">
          <div>
            <h3>Core & Mobility</h3>
            <p>${sessions.length ? `${latestReport.primaryFocus} is your strongest recent signal` : "Waiting for first session data"}</p>
          </div>
          <span>⌁</span>
        </div>
        <div class="curve-chart" aria-label="Core and mobility growth chart">
          <svg viewBox="0 0 320 220" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#dfe8db" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#dfe8db" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path class="curve-fill" d="M0 185 C38 165 61 175 82 164 C117 142 132 76 172 102 C210 126 189 190 226 174 C259 159 253 55 286 20 C303 3 312 49 320 82 L320 220 L0 220 Z" />
            <path class="curve-line" d="M0 185 C38 165 61 175 82 164 C117 142 132 76 172 102 C210 126 189 190 226 174 C259 159 253 55 286 20 C303 3 312 49 320 82" />
            <circle cx="63" cy="170" r="4" />
            <circle cx="319" cy="82" r="5" />
          </svg>
          <div class="curve-labels"><span>WK 01</span><span>WK 02</span><span>WK 03</span><span>Current</span></div>
        </div>
      </div>

      <div class="journal-metric-card">
        <div class="metric-title"><span>⚖</span><p>Stability</p></div>
        <div class="metric-value">${metric.stability} <small>/100</small></div>
        <div class="journal-progress-line"><i style="width:${metric.stability}%"></i></div>
      </div>

      <div class="journal-metric-card accent">
        <div class="metric-title"><span>▭</span><p>Alignment</p></div>
        <div class="metric-value">${metric.alignment} <small>% Accuracy</small></div>
        <div class="journal-progress-line"><i style="width:${metric.alignment}%"></i></div>
      </div>

      <div class="growth-card">
        <h3>Recent Growth</h3>
        <div class="growth-item"><span>◎</span><div><strong>${latest ? latest.moduleTitle : "First Session"}</strong><p>${latestReport ? latestReport.whatImproved : "Complete a session to unlock specific movement notes."}</p></div></div>
        <div class="growth-item"><span>◎</span><div><strong>Next Focus</strong><p>${latestReport ? latestReport.nextAdjustment : "FlowMove will adapt your next plan after the first session."}</p></div></div>
      </div>

      <div class="milestone-card">
        <p class="eyebrow">Next Milestone</p>
        <div class="milestone-content">
          <div class="milestone-ring"><span>75%</span></div>
          <div>
            <strong>${state.path === "postpartum" ? "Foundation Consistency" : "Alignment Consistency"}</strong>
            <p>${Math.max(0, 3 - sessions.length)} more completed sessions to unlock a stronger trend view.</p>
          </div>
        </div>
      </div>

      <div class="history-head">
        <h2>Session History</h2>
        <button>${sessions.length} total</button>
      </div>

      <div class="session-history-list">
        ${sessionHistoryRows}
      </div>
    </section>
  `;
}

function programs() {
  const isPostpartum = state.path === "postpartum";
  const pathModules = isPostpartum
    ? [
        {
          id: "foundation_reset",
          title: "Foundation Reset",
          summary: "Breathing mechanics and pelvic floor re-education for the initial weeks.",
          duration: "14 days",
          level: "Gentle",
          icon: "⌁",
          tone: "green",
          locked: false
        },
        {
          id: "deep_core_rebuild",
          title: "Deep Core Rebuild",
          summary: "Focus on the transverse abdominis and pressure-aware core control.",
          duration: "21 days",
          level: "Steady",
          icon: "◎",
          tone: "rose",
          locked: false
        },
        {
          id: "pelvis_hip_stability",
          title: "Pelvis & Hip Stability",
          summary: "Correcting pelvis drift and building a balanced structural base.",
          duration: "14 days",
          level: "Focused",
          icon: "⚖",
          tone: "green",
          locked: false
        },
        {
          id: "posture_mobility_locked",
          title: "Posture & Mobility",
          summary: "Counteracting nursing posture and releasing upper body tension.",
          icon: "✣",
          tone: "neutral",
          locked: true
        },
        {
          id: "return_exercise_locked",
          title: "Strength & Return to Exercise",
          summary: "Dynamic progressions to transition back to your favorite sports.",
          icon: "⌘",
          tone: "neutral",
          locked: true
        }
      ]
    : [
        {
          id: "posture_reset",
          title: "Posture Reset",
          summary: "Shoulder, rib, and upper-back mobility for long sitting days.",
          duration: "14 days",
          level: "Gentle",
          icon: "✣",
          tone: "green",
          locked: false
        },
        {
          id: "hip_glute_stability",
          title: "Hip & Glute Stability",
          summary: "Glute activation, hip control, and balanced lower-body alignment.",
          duration: "21 days",
          level: "Steady",
          icon: "⚖",
          tone: "rose",
          locked: false
        },
        {
          id: "back_friendly_strength",
          title: "Back-Friendly Strength",
          summary: "Low-impact strength with spine-friendly control and measured tempo.",
          duration: "14 days",
          level: "Focused",
          icon: "⌁",
          tone: "green",
          locked: false
        },
        {
          id: "balance_alignment",
          title: "Balance & Alignment",
          summary: "Left-right control and everyday movement confidence.",
          duration: "14 days",
          level: "Control",
          icon: "◎",
          tone: "green",
          locked: false
        },
        {
          id: "advanced_control_locked",
          title: "Strength & Body Control",
          summary: "Progressive Pilates sequences for smoother coordinated strength.",
          icon: "⌘",
          tone: "neutral",
          locked: true
        }
      ];
  return `
    <section class="view programs-path-page">
      <div class="programs-topbar">
        <button class="menu-button" aria-label="Menu"><span></span><span></span><span></span></button>
        <div class="programs-brand">FlowMove</div>
        <button class="avatar-photo" onclick="setScreen('goals')" aria-label="Profile"></button>
      </div>

      <div class="programs-intro">
        <p class="programs-eyebrow">Personalized Path</p>
        <h2>${isPostpartum ? "Postpartum Recovery" : "Corrective Pilates"}</h2>
        <p>${isPostpartum
          ? "A holistic journey to restore your strength, alignment, and confidence from the inside out."
          : "A focused path to improve posture, mobility, balance, and everyday movement control."}</p>
      </div>

      <div class="programs-video-card">
        <img src="./assets/session.jpg" alt="${isPostpartum ? "Postpartum Recovery" : "Corrective Pilates"} intro" />
        <button>▷ Watch Intro</button>
      </div>

      <div class="program-module-list">
        ${pathModules.map((module, index) => `
          <article class="program-module-card ${module.locked ? "locked" : ""}">
            <div class="program-card-top">
              <span class="program-icon ${module.tone}">${module.icon}</span>
              <span class="program-count">${module.locked ? "♙" : String(index + 1).padStart(2, "0") + " / 05"}</span>
            </div>
            <h3>${module.title}</h3>
            <p>${module.summary}</p>
            ${module.locked ? "" : `
              <div class="program-tags">
                <span>${module.duration}</span>
                <span>${module.level}</span>
              </div>
            `}
            <button
              class="program-arrow"
              onclick="${module.locked ? "" : `setScreen('session-preview')`}"
              aria-label="${module.locked ? "Locked module" : `Open ${module.title}`}"
              ${module.locked ? "disabled" : ""}
            >→</button>
          </article>
        `).join("")}
      </div>

      <div class="alignment-scan-card">
        <div>
          <h3>Alignment Scan</h3>
          <p>Check your pelvic tilt in real-time with AI.</p>
        </div>
        <button onclick="setScreen('camera')">Start Scan</button>
      </div>
    </section>
  `;
}

function profile() {
  return `
    <section class="view">
      <div class="topbar"><div class="brand">Profile</div><span class="mini">Settings</span></div>
      <h2>Your FlowMove setup.</h2>
      <div class="stack">
        <div class="card"><h3>User path</h3><p class="copy">${state.path === "postpartum" ? "Postpartum Recovery" : "Women's Corrective Pilates"}</p></div>
        <div class="card"><h3>Training rhythm</h3><p class="copy">3 sessions per week, 10-20 minutes, no equipment.</p></div>
        <div class="card"><h3>Safety</h3><p class="copy">Retake screening when your symptoms, recovery stage, or activity level changes.</p></div>
        <button class="btn secondary" onclick="setScreen('goals')">Edit goals</button>
      </div>
    </section>
  `;
}

function safety() {
  shell(`
    <section class="view safety-page">
      <div class="safety-icon" aria-hidden="true">i</div>
      <h1>Important Safety<br />Information</h1>
      <p class="safety-message">Please consult a qualified clinician before starting if you feel sharp pain, dizziness, bleeding, pelvic heaviness, or worsening symptoms.</p>
      <div class="safety-rule" aria-hidden="true"></div>
      <p class="safety-note">This is not a diagnosis.</p>
      <div class="safety-image" role="img" aria-label="Calm Pilates studio"></div>
      <button class="safety-button" onclick="setScreen(state.path === 'postpartum' ? 'postpartum-screening' : 'corrective-screening')">I Understand <span>→</span></button>
      <p class="terms-note">By continuing, you agree to our terms of service.</p>
    </section>
  `);
}

function render() {
  const routes = {
    welcome,
    goals: goalSelection,
    "postpartum-screening": postpartumScreening,
    "corrective-screening": correctiveScreening,
    preferences,
    camera: cameraSetup,
    "assessment-intro": assessmentIntro,
    assessment,
    "profile-result": profileResult,
    plan: planPreview,
    main,
    "session-preview": sessionPreview,
    workout,
    complete: sessionComplete,
    report,
    safety
  };
  routes[state.screen]();
  persistState();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

hydrateState();
render();
