const exercises = [
  // ── Strength ──
  { category: "Strength", name: "Bench Press", defaultSets: 3, defaultReps: 10, description: "Chest, shoulders, triceps" },
  { category: "Strength", name: "Incline Bench Press", defaultSets: 3, defaultReps: 10, description: "Upper chest, shoulders" },
  { category: "Strength", name: "Decline Bench Press", defaultSets: 3, defaultReps: 10, description: "Lower chest" },
  { category: "Strength", name: "Dumbbell Fly", defaultSets: 3, defaultReps: 12, description: "Chest stretch and contraction" },
  { category: "Strength", name: "Push-Up", defaultSets: 3, defaultReps: 15, description: "Chest, shoulders, triceps" },
  { category: "Strength", name: "Squat", defaultSets: 3, defaultReps: 8, description: "Quads, glutes, core" },
  { category: "Strength", name: "Front Squat", defaultSets: 3, defaultReps: 8, description: "Quads, core emphasis" },
  { category: "Strength", name: "Goblet Squat", defaultSets: 3, defaultReps: 12, description: "Quads, glutes" },
  { category: "Strength", name: "Bulgarian Split Squat", defaultSets: 3, defaultReps: 10, description: "Quads, glutes, balance" },
  { category: "Strength", name: "Leg Press", defaultSets: 3, defaultReps: 12, description: "Quads, hamstrings, glutes" },
  { category: "Strength", name: "Romanian Deadlift", defaultSets: 3, defaultReps: 10, description: "Hamstrings, glutes" },
  { category: "Strength", name: "Deadlift", defaultSets: 3, defaultReps: 5, description: "Full posterior chain" },
  { category: "Strength", name: "Sumo Deadlift", defaultSets: 3, defaultReps: 5, description: "Posterior chain, adductors" },
  { category: "Strength", name: "Leg Curl", defaultSets: 3, defaultReps: 12, description: "Hamstrings" },
  { category: "Strength", name: "Leg Extension", defaultSets: 3, defaultReps: 12, description: "Quads" },
  { category: "Strength", name: "Calf Raise", defaultSets: 4, defaultReps: 15, description: "Calves" },
  { category: "Strength", name: "Overhead Press", defaultSets: 3, defaultReps: 10, description: "Shoulders, triceps" },
  { category: "Strength", name: "Arnold Press", defaultSets: 3, defaultReps: 10, description: "All shoulder heads" },
  { category: "Strength", name: "Lateral Raise", defaultSets: 3, defaultReps: 15, description: "Side delts" },
  { category: "Strength", name: "Front Raise", defaultSets: 3, defaultReps: 12, description: "Front delts" },
  { category: "Strength", name: "Face Pull", defaultSets: 3, defaultReps: 15, description: "Rear delts, rotator cuff" },
  { category: "Strength", name: "Barbell Row", defaultSets: 3, defaultReps: 10, description: "Upper back, lats" },
  { category: "Strength", name: "Pendlay Row", defaultSets: 3, defaultReps: 8, description: "Upper back strength" },
  { category: "Strength", name: "Dumbbell Row", defaultSets: 3, defaultReps: 10, description: "Lats, upper back" },
  { category: "Strength", name: "Lat Pulldown", defaultSets: 3, defaultReps: 12, description: "Lats, upper back" },
  { category: "Strength", name: "Pull-Up", defaultSets: 3, defaultReps: 8, description: "Lats, biceps" },
  { category: "Strength", name: "Chin-Up", defaultSets: 3, defaultReps: 8, description: "Lats, biceps emphasis" },
  { category: "Strength", name: "Seated Cable Row", defaultSets: 3, defaultReps: 12, description: "Upper back, lats" },
  { category: "Strength", name: "T-Bar Row", defaultSets: 3, defaultReps: 10, description: "Upper back thickness" },
  { category: "Strength", name: "Triceps Pushdown", defaultSets: 3, defaultReps: 15, description: "Triceps" },
  { category: "Strength", name: "Skull Crusher", defaultSets: 3, defaultReps: 12, description: "Triceps" },
  { category: "Strength", name: "Close-Grip Bench Press", defaultSets: 3, defaultReps: 10, description: "Triceps, chest" },
  { category: "Strength", name: "Dips", defaultSets: 3, defaultReps: 10, description: "Triceps, chest, shoulders" },
  { category: "Strength", name: "Barbell Curl", defaultSets: 3, defaultReps: 12, description: "Biceps" },
  { category: "Strength", name: "Dumbbell Curl", defaultSets: 3, defaultReps: 12, description: "Biceps" },
  { category: "Strength", name: "Hammer Curl", defaultSets: 3, defaultReps: 12, description: "Brachialis, biceps" },
  { category: "Strength", name: "Preacher Curl", defaultSets: 3, defaultReps: 12, description: "Biceps isolation" },
  { category: "Strength", name: "Concentration Curl", defaultSets: 3, defaultReps: 12, description: "Biceps peak" },

  // ── Cardio ──
  { category: "Cardio", name: "Treadmill Run", defaultDuration: 20, description: "Cardio endurance" },
  { category: "Cardio", name: "Outdoor Run", defaultDuration: 30, description: "Outdoor cardio" },
  { category: "Cardio", name: "Cycling", defaultDuration: 30, description: "Low-impact cardio" },
  { category: "Cardio", name: "Stationary Bike", defaultDuration: 20, description: "Indoor cycling" },
  { category: "Cardio", name: "Jump Rope", defaultDuration: 10, description: "High-intensity cardio" },
  { category: "Cardio", name: "Rowing Machine", defaultDuration: 20, description: "Full body cardio" },
  { category: "Cardio", name: "Stair Climber", defaultDuration: 20, description: "Glutes, legs, cardio" },
  { category: "Cardio", name: "Elliptical Trainer", defaultDuration: 25, description: "Low-impact full body" },
  { category: "Cardio", name: "Swimming", defaultDuration: 30, description: "Full body low-impact" },
  { category: "Cardio", name: "HIIT", defaultDuration: 15, description: "High-intensity interval training" },
  { category: "Cardio", name: "Boxing", defaultDuration: 30, description: "Cardio + coordination" },
  { category: "Cardio", name: "Walking", defaultDuration: 30, description: "Low-intensity cardio" },

  // ── Calisthenics ──
  { category: "Calisthenics", name: "Burpee", defaultSets: 3, defaultReps: 15, description: "Full body explosive" },
  { category: "Calisthenics", name: "Mountain Climber", defaultSets: 3, defaultReps: 20, description: "Core, cardio" },
  { category: "Calisthenics", name: "Plank", defaultSets: 3, defaultReps: 0, defaultDuration: 60, description: "Core stability" },
  { category: "Calisthenics", name: "Side Plank", defaultSets: 3, defaultDuration: 45, description: "Obliques" },
  { category: "Calisthenics", name: "Lunge", defaultSets: 3, defaultReps: 12, description: "Quads, glutes, balance" },
  { category: "Calisthenics", name: "Reverse Lunge", defaultSets: 3, defaultReps: 12, description: "Quads, glutes" },
  { category: "Calisthenics", name: "Box Jump", defaultSets: 3, defaultReps: 10, description: "Explosive power" },
  { category: "Calisthenics", name: "Diamond Push-Up", defaultSets: 3, defaultReps: 12, description: "Triceps, chest" },
  { category: "Calisthenics", name: "Pike Push-Up", defaultSets: 3, defaultReps: 10, description: "Shoulders" },
  { category: "Calisthenics", name: "Bodyweight Squat", defaultSets: 3, defaultReps: 20, description: "Legs, glutes" },
  { category: "Calisthenics", name: "Pistol Squat", defaultSets: 3, defaultReps: 6, description: "Single leg strength" },
  { category: "Calisthenics", name: "Glute Bridge", defaultSets: 3, defaultReps: 15, description: "Glutes, hamstrings" },
  { category: "Calisthenics", name: "Superman Hold", defaultSets: 3, defaultDuration: 30, description: "Lower back" },
  { category: "Calisthenics", name: "Jumping Jack", defaultSets: 3, defaultReps: 30, description: "Full body warm-up" },

  // ── Core ──
  { category: "Core", name: "Crunch", defaultSets: 3, defaultReps: 20, description: "Upper abs" },
  { category: "Core", name: "Leg Raise", defaultSets: 3, defaultReps: 15, description: "Lower abs" },
  { category: "Core", name: "Hanging Leg Raise", defaultSets: 3, defaultReps: 12, description: "Lower abs, grip" },
  { category: "Core", name: "Russian Twist", defaultSets: 3, defaultReps: 20, description: "Obliques" },
  { category: "Core", name: "Bicycle Crunch", defaultSets: 3, defaultReps: 20, description: "Obliques, rectus abdominis" },
  { category: "Core", name: "Dead Bug", defaultSets: 3, defaultReps: 12, description: "Core stability" },
  { category: "Core", name: "Ab Wheel Rollout", defaultSets: 3, defaultReps: 10, description: "Full core" },
  { category: "Core", name: "Cable Woodchop", defaultSets: 3, defaultReps: 12, description: "Rotational core" },
  { category: "Core", name: "Pallof Press", defaultSets: 3, defaultReps: 10, description: "Anti-rotation core" },
  { category: "Core", name: "Toes to Bar", defaultSets: 3, defaultReps: 10, description: "Full core, grip" },
  { category: "Core", name: "V-Up", defaultSets: 3, defaultReps: 15, description: "Full ab engagement" },
  { category: "Core", name: "Flutter Kick", defaultSets: 3, defaultReps: 30, description: "Lower abs" },

  // ── Stretching ──
  { category: "Stretching", name: "Hamstring Stretch", defaultDuration: 60, description: "Improve hamstring flexibility" },
  { category: "Stretching", name: "Quad Stretch", defaultDuration: 60, description: "Quad flexibility" },
  { category: "Stretching", name: "Hip Flexor Stretch", defaultDuration: 60, description: "Hip mobility" },
  { category: "Stretching", name: "Chest Stretch", defaultDuration: 60, description: "Chest and shoulder opening" },
  { category: "Stretching", name: "Triceps Stretch", defaultDuration: 45, description: "Triceps flexibility" },
  { category: "Stretching", name: "Child's Pose", defaultDuration: 60, description: "Back and hip release" },
  { category: "Stretching", name: "Cat-Cow Stretch", defaultDuration: 60, description: "Spine mobility" },
  { category: "Stretching", name: "Pigeon Pose", defaultDuration: 60, description: "Hip external rotation" },
  { category: "Stretching", name: "Downward Dog", defaultDuration: 60, description: "Full body stretch" },
  { category: "Stretching", name: "Foam Rolling", defaultDuration: 10, description: "Muscle recovery and release" },
  { category: "Stretching", name: "Shoulder Stretch", defaultDuration: 45, description: "Shoulder mobility" },
  { category: "Stretching", name: "Neck Stretch", defaultDuration: 30, description: "Neck tension relief" },

  // ── Yoga ──
  { category: "Yoga", name: "Sun Salutation A", defaultDuration: 5, description: "Flow sequence" },
  { category: "Yoga", name: "Sun Salutation B", defaultDuration: 5, description: "Advanced flow" },
  { category: "Yoga", name: "Warrior I", defaultDuration: 60, description: "Leg strength, hip opening" },
  { category: "Yoga", name: "Warrior II", defaultDuration: 60, description: "Leg strength, hip opening" },
  { category: "Yoga", name: "Triangle Pose", defaultDuration: 60, description: "Hip and spine stretch" },
  { category: "Yoga", name: "Tree Pose", defaultDuration: 60, description: "Balance and stability" },
  { category: "Yoga", name: "Bridge Pose", defaultDuration: 60, description: "Glutes, back, chest opening" },
  { category: "Yoga", name: "Cobra Pose", defaultDuration: 45, description: "Back extension" },
  { category: "Yoga", name: "Happy Baby", defaultDuration: 60, description: "Hip opening, lower back" },
];

export const categories = [...new Set(exercises.map((e) => e.category))];

export const getExercisesByCategory = (category) =>
  exercises.filter((e) => e.category === category);

export const searchExercises = (query) => {
  const q = query.toLowerCase();
  return exercises.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  );
};

export default exercises;
