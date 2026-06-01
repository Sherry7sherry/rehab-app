window.FlowMoveAssessment = {
  generateMockResult({ path, completedMovementIds }) {
    const isPostpartum = path === "postpartum";
    const completed = new Set(completedMovementIds || []);

    const movementScores = window.FlowMoveContent.assessmentMovements.map((movement, index) => {
      const wasCompleted = completed.size === 0 || completed.has(movement.id);
      const base = isPostpartum ? [64, 72, 58, 61, 60, 55, 57] : [70, 58, 63, 60, 67, 68, 59];
      const score = wasCompleted ? base[index] : null;
      return {
        movementId: movement.id,
        title: movement.title,
        completed: wasCompleted,
        score,
        measures: movement.measures,
        signals: score == null ? ["movement_skipped"] : this.signalsForMovement(movement.id, score, path)
      };
    });

    const allSignals = Array.from(new Set(movementScores.flatMap((item) => item.signals)));
    const metricScores = isPostpartum
      ? {
          coreControl: 62,
          mobility: 74,
          stability: 58,
          alignment: 71
        }
      : {
          coreControl: 68,
          mobility: 61,
          stability: 64,
          alignment: 59
        };

    const modulePriorities = this.modulePrioritiesForSignals({ path, signals: allSignals });

    return {
      id: `assessment_${Date.now()}`,
      path,
      completedAt: new Date().toISOString(),
      movementScores,
      metricScores,
      signals: allSignals,
      modulePriorities,
      summary: this.summaryForResult({ path, metricScores, signals: allSignals })
    };
  },

  signalsForMovement(movementId, score, path) {
    const signals = [];

    if (movementId === "heel_tap" && score < 65) signals.push("low_core_control");
    if (movementId === "glute_bridge" && score < 66) signals.push("pelvis_shift");
    if (movementId === "single_leg_balance" && score < 65) {
      signals.push("poor_single_leg_balance");
      signals.push("left_right_asymmetry");
    }
    if (movementId === "shoulder_mobility_reach" && score < 65) signals.push("limited_shoulder_mobility");
    if (movementId === "hip_hinge" && score < 65) signals.push("poor_hip_hinge");
    if (movementId === "squat_to_chair" && score < 65) signals.push("hip_instability");
    if (movementId === "standing_posture" && score < 65) signals.push("posture_goal");
    if (path === "postpartum" && ["heel_tap", "glute_bridge"].includes(movementId) && score < 65) {
      signals.push("pressure_control_priority");
    }

    return signals;
  },

  modulePrioritiesForSignals({ path, signals }) {
    const modules = window.FlowMoveContent.programModules.filter((module) => module.path === path);
    return modules
      .map((module) => {
        const matchedSignals = module.prioritySignals.filter((signal) => signals.includes(signal));
        return {
          moduleId: module.id,
          title: module.title,
          matchedSignals,
          score: matchedSignals.length
        };
      })
      .sort((a, b) => b.score - a.score);
  },

  summaryForResult({ path, metricScores, signals }) {
    if (path === "postpartum") {
      if (signals.includes("pressure_control_priority")) {
        return "Your FlowMove profile suggests a gentle foundation-first plan, with extra attention on core control, pelvis stability, and pressure-aware movement.";
      }
      return "Your FlowMove profile shows good mobility, with room to rebuild core control and pelvis stability.";
    }

    if (signals.includes("limited_shoulder_mobility")) {
      return "Your FlowMove profile shows room to improve shoulder mobility, posture, and everyday alignment.";
    }

    if (signals.includes("poor_hip_hinge")) {
      return "Your FlowMove profile suggests hip control and back-friendly strength should come first.";
    }

    return `Your FlowMove profile shows Core Control ${metricScores.coreControl}, Mobility ${metricScores.mobility}, Stability ${metricScores.stability}, and Alignment ${metricScores.alignment}.`;
  }
};
