window.FlowMoveScreening = {
  evaluatePostpartum(answers) {
    const highRisk = [];
    const caution = [];

    if (answers.clinicianClearance !== "cleared") {
      highRisk.push("not_cleared_for_exercise");
    }

    for (const symptom of answers.symptoms || []) {
      if (["bleeding", "dizziness", "sharp_pain", "pelvic_heaviness"].includes(symptom)) {
        highRisk.push(symptom);
      }

      if (["leakage", "scar_pain", "abdominal_separation", "pelvic_floor_concern"].includes(symptom)) {
        caution.push(symptom);
      }
    }

    if (answers.cSectionScarPain === "significant") {
      highRisk.push("significant_c_section_scar_pain");
    } else if (answers.cSectionScarPain === "mild") {
      caution.push("mild_c_section_scar_pain");
    }

    if (answers.abdominalSeparationConcern === "yes") {
      caution.push("abdominal_coning");
    }

    if (answers.pelvicFloorConcern === "yes") {
      caution.push("pelvic_floor_concern");
    }

    return this.buildResult({ highRisk, caution, path: "postpartum" });
  },

  evaluateCorrective(answers) {
    const highRisk = [];
    const caution = [];

    if (answers.discomfortLevel === "high") {
      highRisk.push("high_discomfort");
    }

    if (answers.recentInjuryOrSurgery === "yes") {
      highRisk.push("recent_injury_or_surgery");
    }

    if (answers.radiatesOrSharp === "yes") {
      highRisk.push("radiating_or_sharp_pain");
    }

    if (answers.discomfortLevel === "moderate") {
      caution.push("moderate_discomfort");
    }

    if (answers.sittingHours === "8_plus") {
      caution.push("long_sitting");
    }

    return this.buildResult({ highRisk, caution, path: "corrective" });
  },

  buildResult({ highRisk, caution, path }) {
    const uniqueHighRisk = Array.from(new Set(highRisk));
    const uniqueCaution = Array.from(new Set(caution));

    return {
      path,
      status: uniqueHighRisk.length ? "block" : uniqueCaution.length ? "caution" : "clear",
      highRisk: uniqueHighRisk,
      caution: uniqueCaution,
      signals: [...uniqueHighRisk, ...uniqueCaution],
      message: uniqueHighRisk.length
        ? "FlowMove may not be suitable right now. Please consult a qualified clinician before starting."
        : uniqueCaution.length
          ? "FlowMove will start conservatively and avoid harder progressions."
          : "No major safety concerns detected for this prototype flow."
    };
  }
};
