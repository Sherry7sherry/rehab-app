window.FlowMoveRecommendation = {
  buildUserSignals(state) {
    const selectedGoals = state.goals || [];
    const signals = new Set();

    if (state.path === "postpartum") signals.add("postpartum");
    if (selectedGoals.includes("posture")) signals.add("posture_goal");
    if (selectedGoals.includes("strength")) signals.add("strength_goal");
    if (selectedGoals.includes("corrective")) signals.add("alignment_goal");

    if (state.readiness === "Tired") signals.add("low_energy");
    if (state.readiness === "Sore") signals.add("recovery_needed");
    if (state.readiness === "Pain or discomfort") signals.add("discomfort_today");

    for (const signal of state.screeningResult?.signals || []) {
      signals.add(signal);
    }

    for (const signal of state.assessmentResult?.signals || []) {
      signals.add(signal);
    }

    // Mock baseline signals until real assessment scoring exists.
    if (!state.assessmentResult && state.path === "postpartum") {
      signals.add("low_core_control");
      signals.add("pelvis_shift");
    } else if (!state.assessmentResult) {
      signals.add("long_sitting");
      signals.add("limited_shoulder_mobility");
    }

    return Array.from(signals);
  },

  recommend({ state, content }) {
    const signals = this.buildUserSignals(state);
    const path = state.path === "postpartum" ? "postpartum" : "corrective";
    const modules = content.programModules.filter((module) => module.path === path);
    const scoredModules = modules
      .map((module) => {
        const matchedSignals = module.prioritySignals.filter((signal) => signals.includes(signal));
        return {
          module,
          matchedSignals,
          score: matchedSignals.length
        };
      })
      .sort((a, b) => b.score - a.score);

    const selectedModule = scoredModules[0]?.module || modules[0];
    const matchedSignals = scoredModules[0]?.matchedSignals || [];
    const variants = selectedModule.variantIds
      .map((id) => content.exerciseVariants.find((variant) => variant.id === id))
      .filter(Boolean);

    const shouldRegress =
      signals.includes("low_energy") ||
      signals.includes("recovery_needed") ||
      signals.includes("discomfort_today") ||
      state.screeningResult?.status === "caution";

    const intensity = shouldRegress ? "Gentle" : path === "postpartum" ? "Conservative" : "Balanced";
    const durationMin = shouldRegress ? 10 : path === "postpartum" ? 14 : 16;

    const reasons = this.explainRecommendation({
      path,
      selectedModule,
      matchedSignals,
      signals,
      shouldRegress
    });

    return {
      path,
      signals,
      module: selectedModule,
      variants,
      intensity,
      durationMin,
      shouldRegress,
      reasons,
      nextAdjustment: shouldRegress
        ? "Today's session is shortened and kept gentle based on your readiness check."
        : selectedModule.progressionRule
    };
  },

  explainRecommendation({ path, selectedModule, matchedSignals, signals, shouldRegress }) {
    const reasons = [];

    if (path === "postpartum") {
      reasons.push("Your postpartum path starts with conservative, pressure-aware movement.");
    } else {
      reasons.push("Your corrective path prioritizes alignment, mobility, and low-impact control.");
    }

    if (matchedSignals.includes("low_core_control")) {
      reasons.push("Your baseline profile suggests core control should be rebuilt before harder progressions.");
    }

    if (matchedSignals.includes("pelvis_shift") || matchedSignals.includes("poor_single_leg_balance")) {
      reasons.push("Your plan includes stability work because pelvis and balance control need attention.");
    }

    if (matchedSignals.includes("long_sitting") || matchedSignals.includes("limited_shoulder_mobility")) {
      reasons.push("Your plan includes posture and shoulder mobility because long sitting can reduce upper-body movement quality.");
    }

    if (matchedSignals.includes("poor_hip_hinge")) {
      reasons.push("Your assessment suggests hip hinge control should be trained before harder strength work.");
    }

    if (matchedSignals.includes("hip_instability")) {
      reasons.push("Your assessment suggests hip stability and lower-body alignment need attention.");
    }

    if (matchedSignals.includes("strength_goal")) {
      reasons.push("Your goal includes strength, so FlowMove keeps strength work low-impact and control-first.");
    }

    if (signals.includes("discomfort_today")) {
      reasons.push("Because you reported discomfort today, FlowMove avoids harder progressions.");
    } else if (state.screeningResult?.status === "caution") {
      reasons.push("Your screening answers suggest a conservative starting point today.");
    } else if (shouldRegress) {
      reasons.push("Your readiness check suggests a gentler session today.");
    }

    reasons.push(`Today's module is ${selectedModule.title}.`);

    return reasons;
  }
};
