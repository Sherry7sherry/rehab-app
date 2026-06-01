window.FlowMoveContent = {
  safetyTags: [
    {
      id: "postpartum_caution",
      label: "Postpartum caution",
      severity: "moderate",
      description: "Use conservative progressions and pressure-aware cueing."
    },
    {
      id: "pelvic_heaviness",
      label: "Pelvic heaviness",
      severity: "high",
      description: "Pause progression and recommend clinician consultation."
    },
    {
      id: "sharp_pain",
      label: "Sharp pain",
      severity: "high",
      description: "Stop training and recommend qualified clinician guidance."
    },
    {
      id: "abdominal_coning",
      label: "Abdominal coning",
      severity: "moderate",
      description: "Regress core loading and emphasize breath-led pressure control."
    },
    {
      id: "recent_surgery",
      label: "Recent surgery",
      severity: "high",
      description: "Do not provide normal training without clinician clearance."
    },
    {
      id: "high_discomfort",
      label: "High discomfort",
      severity: "high",
      description: "Reduce intensity or recommend clinician consultation."
    }
  ],

  cueLibrary: [
    {
      id: "slow_down",
      category: "tempo",
      text: "Slow down and keep the movement smooth."
    },
    {
      id: "pelvis_stable",
      category: "stability",
      text: "Keep your pelvis stable as you move."
    },
    {
      id: "soft_ribs",
      category: "pressure",
      text: "Keep your ribs soft and avoid pushing into pressure."
    },
    {
      id: "avoid_low_back_arch",
      category: "alignment",
      text: "Avoid arching your lower back."
    },
    {
      id: "knees_aligned",
      category: "alignment",
      text: "Keep your knees aligned with your toes."
    },
    {
      id: "reduce_range",
      category: "regression",
      text: "Reduce your range of motion and stay in control."
    },
    {
      id: "easier_variation",
      category: "regression",
      text: "Try the easier variation for this set."
    },
    {
      id: "good_control",
      category: "positive",
      text: "Good control on this rep."
    },
    {
      id: "long_spine",
      category: "alignment",
      text: "Keep your spine long as your hips move back."
    },
    {
      id: "breathe_out",
      category: "breath",
      text: "Exhale gently as you move."
    }
  ],

  assessmentMovements: [
    {
      id: "standing_posture",
      title: "Standing posture check",
      exerciseId: "standing_posture",
      image: "./assets/assessment-standing-real.png",
      view: "Front view",
      placement: "Place your phone 6-8 feet in front, around hip height.",
      measures: ["alignment", "left_right_symmetry", "posture"],
      cameraView: "front"
    },
    {
      id: "shoulder_mobility_reach",
      title: "Shoulder mobility reach",
      exerciseId: "shoulder_reach",
      image: "./assets/assessment-shoulder-reach-real.png",
      view: "Side view",
      placement: "Place your phone beside you so your shoulder and ribs stay visible.",
      measures: ["shoulder_mobility", "rib_control", "posture"],
      cameraView: "side"
    },
    {
      id: "squat_to_chair",
      title: "Squat to chair",
      exerciseId: "squat_to_chair",
      image: "./assets/assessment-squat-chair-real.png",
      view: "Front 3/4 view",
      placement: "Keep the chair and full body in frame. Phone can sit slightly off-center.",
      measures: ["knee_alignment", "hip_control", "balance"],
      cameraView: "front_3_4"
    },
    {
      id: "hip_hinge",
      title: "Hip hinge",
      exerciseId: "hip_hinge",
      image: "./assets/assessment-hip-hinge-real.png",
      view: "Side view",
      placement: "Place your phone beside you so FlowMove can see your spine and hips.",
      measures: ["spine_alignment", "hip_mobility", "posterior_chain_control"],
      cameraView: "side"
    },
    {
      id: "glute_bridge",
      title: "Glute bridge",
      exerciseId: "glute_bridge",
      image: "./assets/assessment-glute-bridge-real.png",
      view: "Side floor view",
      placement: "Place your phone low beside the mat, angled toward your ribs and pelvis.",
      measures: ["pelvis_control", "hip_extension", "core_control"],
      cameraView: "side_low"
    },
    {
      id: "heel_tap",
      title: "Heel tap",
      exerciseId: "heel_tap",
      image: "./assets/assessment-heel-tap-real.png",
      view: "Side floor view",
      placement: "Keep your ribs, pelvis, and legs visible from the side.",
      measures: ["core_control", "pressure_management", "lumbar_control"],
      cameraView: "side_low"
    },
    {
      id: "single_leg_balance",
      title: "Single-leg balance",
      exerciseId: "single_leg_balance",
      image: "./assets/assessment-balance-real.png",
      view: "Front view",
      placement: "Place your phone in front with your full body visible from head to feet.",
      measures: ["balance", "left_right_symmetry", "pelvis_stability"],
      cameraView: "front"
    }
  ],

  exercises: [
    {
      id: "breathing_360",
      name: "360 breathing",
      category: "breath",
      targetAreas: ["ribs", "diaphragm", "pelvic_floor"],
      capabilities: ["pressure_management", "pelvic_floor_awareness"],
      baseDifficulty: 1,
      cameraViews: ["front", "side"],
      cueIds: ["breathe_out", "soft_ribs"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "pelvic_tilt",
      name: "Pelvic tilt",
      category: "core",
      targetAreas: ["pelvis", "deep_core"],
      capabilities: ["pelvis_control", "core_control"],
      baseDifficulty: 1,
      cameraViews: ["side_low"],
      cueIds: ["slow_down", "pelvis_stable", "breathe_out"],
      safetyTagIds: ["postpartum_caution", "abdominal_coning"]
    },
    {
      id: "heel_tap",
      name: "Heel tap",
      category: "core",
      targetAreas: ["deep_core", "hips"],
      capabilities: ["core_control", "pressure_management"],
      baseDifficulty: 2,
      cameraViews: ["side_low"],
      cueIds: ["soft_ribs", "avoid_low_back_arch", "reduce_range"],
      safetyTagIds: ["postpartum_caution", "abdominal_coning"]
    },
    {
      id: "glute_bridge",
      name: "Glute bridge",
      category: "strength",
      targetAreas: ["glutes", "hips", "pelvis"],
      capabilities: ["hip_extension", "pelvis_control", "posterior_chain_strength"],
      baseDifficulty: 2,
      cameraViews: ["side_low"],
      cueIds: ["pelvis_stable", "avoid_low_back_arch", "good_control"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "cat_cow",
      name: "Cat-cow",
      category: "mobility",
      targetAreas: ["spine", "ribs", "pelvis"],
      capabilities: ["spinal_mobility", "breath_coordination"],
      baseDifficulty: 1,
      cameraViews: ["side"],
      cueIds: ["slow_down", "breathe_out"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "clamshell",
      name: "Clamshell",
      category: "strength",
      targetAreas: ["glutes", "hips"],
      capabilities: ["hip_stability", "left_right_symmetry"],
      baseDifficulty: 1,
      cameraViews: ["front_3_4", "side"],
      cueIds: ["pelvis_stable", "slow_down"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "hip_hinge",
      name: "Hip hinge",
      category: "pattern",
      targetAreas: ["hips", "spine", "hamstrings"],
      capabilities: ["hip_mobility", "spine_alignment", "posterior_chain_control"],
      baseDifficulty: 2,
      cameraViews: ["side"],
      cueIds: ["long_spine", "slow_down"],
      safetyTagIds: []
    },
    {
      id: "wall_angel",
      name: "Wall angel",
      category: "mobility",
      targetAreas: ["shoulders", "upper_back"],
      capabilities: ["shoulder_mobility", "posture"],
      baseDifficulty: 2,
      cameraViews: ["front", "side"],
      cueIds: ["soft_ribs", "slow_down"],
      safetyTagIds: []
    },
    {
      id: "thoracic_rotation",
      name: "Thoracic rotation",
      category: "mobility",
      targetAreas: ["upper_back", "ribs", "shoulders"],
      capabilities: ["thoracic_mobility", "breath_coordination"],
      baseDifficulty: 1,
      cameraViews: ["side", "front_3_4"],
      cueIds: ["slow_down", "breathe_out"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "squat_to_chair",
      name: "Squat to chair",
      category: "strength",
      targetAreas: ["hips", "knees", "glutes"],
      capabilities: ["knee_alignment", "hip_control", "functional_strength"],
      baseDifficulty: 2,
      cameraViews: ["front_3_4"],
      cueIds: ["knees_aligned", "slow_down", "good_control"],
      safetyTagIds: []
    },
    {
      id: "single_leg_balance",
      name: "Single-leg balance",
      category: "balance",
      targetAreas: ["feet", "hips", "pelvis"],
      capabilities: ["balance", "pelvis_stability", "left_right_symmetry"],
      baseDifficulty: 2,
      cameraViews: ["front"],
      cueIds: ["pelvis_stable", "reduce_range"],
      safetyTagIds: []
    },
    {
      id: "standing_posture",
      name: "Standing posture check",
      category: "assessment",
      targetAreas: ["whole_body"],
      capabilities: ["alignment", "left_right_symmetry"],
      baseDifficulty: 1,
      cameraViews: ["front"],
      cueIds: ["good_control"],
      safetyTagIds: []
    },
    {
      id: "shoulder_reach",
      name: "Shoulder mobility reach",
      category: "assessment",
      targetAreas: ["shoulders", "ribs"],
      capabilities: ["shoulder_mobility", "rib_control"],
      baseDifficulty: 1,
      cameraViews: ["side"],
      cueIds: ["soft_ribs", "slow_down"],
      safetyTagIds: []
    }
  ],

  exerciseVariants: [
    {
      id: "breathing_360_foundation",
      exerciseId: "breathing_360",
      name: "360 breathing foundation",
      pathTags: ["postpartum", "corrective"],
      difficulty: 1,
      durationSec: 90,
      cueEmphasis: ["breath", "pressure"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "pelvic_tilt_postpartum",
      exerciseId: "pelvic_tilt",
      name: "Pelvic tilt",
      pathTags: ["postpartum"],
      difficulty: 1,
      durationSec: 90,
      cueEmphasis: ["pressure", "pelvis_control"],
      safetyTagIds: ["postpartum_caution", "abdominal_coning"]
    },
    {
      id: "heel_tap_supported",
      exerciseId: "heel_tap",
      name: "Supported heel tap",
      pathTags: ["postpartum", "corrective"],
      difficulty: 2,
      reps: 8,
      cueEmphasis: ["core_control", "pressure"],
      regressionId: "pelvic_tilt_postpartum",
      safetyTagIds: ["postpartum_caution", "abdominal_coning"]
    },
    {
      id: "glute_bridge_low_range",
      exerciseId: "glute_bridge",
      name: "Low-range glute bridge",
      pathTags: ["postpartum"],
      difficulty: 2,
      reps: 8,
      cueEmphasis: ["breath", "pelvis_control"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "glute_bridge_full",
      exerciseId: "glute_bridge",
      name: "Glute bridge",
      pathTags: ["corrective"],
      difficulty: 2,
      reps: 10,
      cueEmphasis: ["hip_extension", "spine_alignment"],
      safetyTagIds: []
    },
    {
      id: "cat_cow_gentle",
      exerciseId: "cat_cow",
      name: "Gentle cat-cow",
      pathTags: ["postpartum", "corrective"],
      difficulty: 1,
      durationSec: 60,
      cueEmphasis: ["mobility", "breath"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "clamshell_basic",
      exerciseId: "clamshell",
      name: "Clamshell",
      pathTags: ["postpartum", "corrective"],
      difficulty: 1,
      reps: 10,
      cueEmphasis: ["hip_stability", "pelvis_control"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "hip_hinge_wall_reach",
      exerciseId: "hip_hinge",
      name: "Hip hinge wall reach",
      pathTags: ["corrective"],
      difficulty: 2,
      reps: 8,
      cueEmphasis: ["spine_alignment", "hip_control"],
      safetyTagIds: []
    },
    {
      id: "wall_angel_basic",
      exerciseId: "wall_angel",
      name: "Wall angel",
      pathTags: ["corrective"],
      difficulty: 2,
      reps: 8,
      cueEmphasis: ["shoulder_mobility", "rib_control"],
      safetyTagIds: []
    },
    {
      id: "thoracic_rotation_open_book",
      exerciseId: "thoracic_rotation",
      name: "Open-book thoracic rotation",
      pathTags: ["postpartum", "corrective"],
      difficulty: 1,
      reps: 6,
      cueEmphasis: ["mobility", "breath"],
      safetyTagIds: ["postpartum_caution"]
    },
    {
      id: "squat_to_chair_controlled",
      exerciseId: "squat_to_chair",
      name: "Controlled squat to chair",
      pathTags: ["corrective"],
      difficulty: 2,
      reps: 8,
      cueEmphasis: ["knee_alignment", "hip_control"],
      safetyTagIds: []
    },
    {
      id: "standing_balance_supported",
      exerciseId: "single_leg_balance",
      name: "Supported standing balance",
      pathTags: ["postpartum", "corrective"],
      difficulty: 1,
      durationSec: 45,
      cueEmphasis: ["balance", "pelvis_stability"],
      safetyTagIds: ["postpartum_caution"]
    }
  ],

  programModules: [
    {
      id: "foundation_reset",
      path: "postpartum",
      title: "Foundation Reset",
      summary: "Breath, pressure awareness, and gentle reconnection.",
      prioritySignals: ["postpartum", "abdominal_coning", "low_core_control"],
      variantIds: ["breathing_360_foundation", "pelvic_tilt_postpartum", "cat_cow_gentle"],
      progressionRule: "Progress when breath remains steady and no pressure symptoms are reported.",
      regressionRule: "Return to breathing-only work if heaviness, leakage, pain, or coning appears."
    },
    {
      id: "deep_core_rebuild",
      path: "postpartum",
      title: "Deep Core Rebuild",
      summary: "Pressure-aware core control with conservative progressions.",
      prioritySignals: ["low_core_control", "abdominal_coning"],
      variantIds: ["breathing_360_foundation", "pelvic_tilt_postpartum", "heel_tap_supported", "glute_bridge_low_range"],
      progressionRule: "Add reps or range only when pelvis control and breathing stay consistent.",
      regressionRule: "Use pelvic tilt and breath work if low back arches or pressure increases."
    },
    {
      id: "pelvis_hip_stability",
      path: "postpartum",
      title: "Pelvis & Hip Stability",
      summary: "Glute activation, hip control, and left-right balance.",
      prioritySignals: ["pelvis_shift", "poor_single_leg_balance", "hip_instability"],
      variantIds: ["glute_bridge_low_range", "clamshell_basic", "standing_balance_supported"],
      progressionRule: "Progress to longer holds when left-right control is steady.",
      regressionRule: "Reduce range and use supported balance if pelvis shifts."
    },
    {
      id: "posture_reset",
      path: "corrective",
      title: "Posture Reset",
      summary: "Shoulder, ribs, and upper-back mobility for long sitting days.",
      prioritySignals: ["long_sitting", "limited_shoulder_mobility", "posture_goal"],
      variantIds: ["cat_cow_gentle", "wall_angel_basic", "thoracic_rotation_open_book"],
      progressionRule: "Progress when shoulder movement stays smooth without rib flare.",
      regressionRule: "Reduce range if neck, shoulder, or low back tension increases."
    },
    {
      id: "hip_glute_stability",
      path: "corrective",
      title: "Hip & Glute Stability",
      summary: "Glute activation, hip control, and balanced lower-body alignment.",
      prioritySignals: ["hip_instability", "poor_hip_hinge", "low_glute_control"],
      variantIds: ["glute_bridge_full", "clamshell_basic", "hip_hinge_wall_reach"],
      progressionRule: "Progress when bridge and hinge stay controlled without low-back compensation.",
      regressionRule: "Reduce range if pelvis shifts or low back takes over."
    },
    {
      id: "back_friendly_strength",
      path: "corrective",
      title: "Back-Friendly Strength",
      summary: "Low-impact strength with spine-friendly control.",
      prioritySignals: ["back_discomfort", "return_to_exercise", "strength_goal"],
      variantIds: ["cat_cow_gentle", "hip_hinge_wall_reach", "glute_bridge_full", "squat_to_chair_controlled"],
      progressionRule: "Progress when tempo, alignment, and control stay consistent.",
      regressionRule: "Switch to mobility if discomfort rises during strength work."
    },
    {
      id: "balance_alignment",
      path: "corrective",
      title: "Balance & Alignment",
      summary: "Left-right control and everyday movement confidence.",
      prioritySignals: ["poor_single_leg_balance", "left_right_asymmetry"],
      variantIds: ["standing_balance_supported", "squat_to_chair_controlled", "glute_bridge_full"],
      progressionRule: "Progress to less support only when pelvis remains level.",
      regressionRule: "Use hand support and shorter holds if control drops."
    }
  ],

  reportTemplates: {
    postpartum: {
      improved: "Your breathing stayed more consistent during core work, and your pelvis moved less during bridges.",
      attention: "Your right hip still showed less control during side-lying work.",
      next: "FlowMove will keep the next session gentle and add one extra single-side stability drill."
    },
    corrective: {
      improved: "Your hip hinge looked smoother, and your shoulders stayed more relaxed during wall angels.",
      attention: "Your right side still loses balance faster during standing control.",
      next: "FlowMove will add one extra single-side stability drill while keeping the session low-impact."
    }
  }
};
