// src/data/DailyWorkouts.js

// Kids Daily Workouts (4-12 years) - 7 exercises per day
export const kidsDaily = [
  {
    id: 'kids-mon',
    name: 'Animal Adventure Monday',
    icon: '🐘',
    duration: '12 min',
    level: 'Fun',
    focus: 'Full Body',
    bodyParts: ['Full Body', 'Coordination'],
    warmup: [
      'March in place (30 sec)',
      'Arm circles (10 forward, 10 back)',
      'Gentle neck rolls (5 each side)',
      'Deep breaths (3 times)'
    ],
    exercises: [
      { name: 'Bear Crawl', reps: 'Across the room', icon: '🐻', muscles: 'Full Body' },
      { name: 'Frog Jumps', reps: '8 jumps', icon: '🐸', muscles: 'Legs' },
      { name: 'Crab Walk', reps: '10 steps', icon: '🦀', muscles: 'Arms & Core' },
      { name: 'Penguin Waddle', reps: '10 steps', icon: '🐧', muscles: 'Legs' },
      { name: 'Monkey Swings', reps: '10 arm circles', icon: '🐒', muscles: 'Arms' },
      { name: 'Kangaroo Hops', reps: '8 hops', icon: '🦘', muscles: 'Legs' },
      { name: 'Elephant Stomp', reps: '10 stomps', icon: '🐘', muscles: 'Legs' }
    ],
    cooldown: [
      'Cat stretch (10 sec)',
      'Butterfly stretch (15 sec)',
      'Happy baby pose (10 sec)',
      'Deep breathing (3 breaths)'
    ],
    benefits: ['Gross motor skills', 'Coordination', 'Strength', 'Fun']
  },
  {
    id: 'kids-tue',
    name: 'Superhero Training Tuesday',
    icon: '🦸',
    duration: '15 min',
    level: 'Fun',
    focus: 'Strength',
    bodyParts: ['Upper Body', 'Core'],
    warmup: [
      'Jumping jacks (10 reps)',
      'Arm swings (10 each side)',
      'Torso twists (5 each side)',
      'Deep breaths (3 times)'
    ],
    exercises: [
      { name: 'Superman Pose', reps: 'Hold 10 sec', icon: '🦸', muscles: 'Back' },
      { name: 'Superhero Squats', reps: '8 reps', icon: '💪', muscles: 'Legs' },
      { name: 'Flying Arms', reps: '20 circles', icon: '✈️', muscles: 'Shoulders' },
      { name: 'Wall Push-ups', reps: '8 reps', icon: '🧱', muscles: 'Chest & Arms' },
      { name: 'Invisible Rope Climb', reps: '5 pulls', icon: '🪢', muscles: 'Arms' },
      { name: 'Super Jumps', reps: '6 jumps', icon: '⬆️', muscles: 'Legs' },
      { name: 'Power Punch', reps: '10 punches', icon: '👊', muscles: 'Arms' }
    ],
    cooldown: [
      'Child pose (10 sec)',
      'Seated forward fold (10 sec)',
      'Deep breathing (3 breaths)'
    ],
    benefits: ['Strength', 'Imagination', 'Body awareness']
  },
  {
    id: 'kids-wed',
    name: 'Dance Party Wednesday',
    icon: '💃',
    duration: '15 min',
    level: 'Fun',
    focus: 'Cardio',
    bodyParts: ['Full Body', 'Cardio'],
    warmup: [
      'March in place (30 sec)',
      'Arm circles (10 each)',
      'Side stretches (5 each side)'
    ],
    exercises: [
      { name: 'Freeze Dance', reps: 'Dance & freeze', icon: '🧊', muscles: 'Full Body' },
      { name: 'Jumping Jacks', reps: '12 reps', icon: '🤸', muscles: 'Full Body' },
      { name: 'Robot Dance', reps: '30 sec', icon: '🤖', muscles: 'Coordination' },
      { name: 'Twist & Shout', reps: '10 twists', icon: '🔄', muscles: 'Core' },
      { name: 'Funky Chicken', reps: '30 sec', icon: '🐔', muscles: 'Fun' },
      { name: 'Disco Finger', reps: '30 sec', icon: '🕺', muscles: 'Coordination' },
      { name: 'Hip Hop Shuffle', reps: '30 sec', icon: '🎧', muscles: 'Legs' }
    ],
    cooldown: [
      'Slow marching (30 sec)',
      'Deep breathing (5 breaths)',
      'Gentle stretches'
    ],
    benefits: ['Cardio', 'Rhythm', 'Coordination']
  },
  {
    id: 'kids-thu',
    name: 'Jungle Safari Thursday',
    icon: '🦁',
    duration: '12 min',
    level: 'Fun',
    focus: 'Movement',
    bodyParts: ['Full Body', 'Balance'],
    warmup: [
      'Walk in place (30 sec)',
      'Arm circles (10 each)',
      'Neck rolls (5 each side)'
    ],
    exercises: [
      { name: 'Stomp Like Elephant', reps: '10 stomps', icon: '🐘', muscles: 'Legs' },
      { name: 'Pounce Like Lion', reps: '5 pounces', icon: '🦁', muscles: 'Legs' },
      { name: 'Slither Like Snake', reps: 'Across floor', icon: '🐍', muscles: 'Core' },
      { name: 'Hop Like Kangaroo', reps: '8 hops', icon: '🦘', muscles: 'Legs' },
      { name: 'Swing Like Monkey', reps: '10 swings', icon: '🐒', muscles: 'Arms' },
      { name: 'Crawl Like Bear', reps: 'Across room', icon: '🐻', muscles: 'Full Body' },
      { name: 'Stretch Like Giraffe', reps: '5 reaches', icon: '🦒', muscles: 'Back' }
    ],
    cooldown: [
      'Cat stretch (10 sec)',
      'Child pose (10 sec)',
      'Deep breathing'
    ],
    benefits: ['Creativity', 'Movement', 'Balance']
  },
  {
    id: 'kids-fri',
    name: 'Space Explorer Friday',
    icon: '🚀',
    duration: '12 min',
    level: 'Fun',
    focus: 'Agility',
    bodyParts: ['Full Body', 'Agility'],
    warmup: [
      'March in place (30 sec)',
      'Arm circles (10 each)',
      'Side bends (5 each side)'
    ],
    exercises: [
      { name: 'Rocket Jumps', reps: '5 countdown jumps', icon: '🚀', muscles: 'Legs' },
      { name: 'Moon Walking', reps: '10 steps sideways', icon: '🌕', muscles: 'Legs' },
      { name: 'Alien Arm Stretches', reps: '5 each arm', icon: '👽', muscles: 'Arms' },
      { name: 'Meteor Dodges', reps: '10 side steps', icon: '☄️', muscles: 'Agility' },
      { name: 'Zero Gravity Spins', reps: '5 spins', icon: '🌌', muscles: 'Balance' },
      { name: 'Asteroid Hops', reps: '8 hops', icon: '🪐', muscles: 'Legs' },
      { name: 'Galaxy Reaches', reps: '5 reaches', icon: '🌠', muscles: 'Full Body' }
    ],
    cooldown: [
      'Gentle twists (5 each side)',
      'Deep breathing (5 breaths)',
      'Stretching'
    ],
    benefits: ['Agility', 'Balance', 'Fun']
  },
  {
    id: 'kids-sat',
    name: 'Underwater Saturday',
    icon: '🐠',
    duration: '10 min',
    level: 'Fun',
    focus: 'Flexibility',
    bodyParts: ['Full Body', 'Flexibility'],
    warmup: [
      'Arm circles (10 each)',
      'March in place (20 sec)',
      'Side stretches (5 each)'
    ],
    exercises: [
      { name: 'Swimming Strokes', reps: '10 each arm', icon: '🏊', muscles: 'Arms' },
      { name: 'Dolphin Dives', reps: '5 forward folds', icon: '🐬', muscles: 'Back' },
      { name: 'Starfish Jumps', reps: '6 jumps', icon: '⭐', muscles: 'Full Body' },
      { name: 'Jellyfish Wiggles', reps: '10 sec', icon: '🪼', muscles: 'Full Body' },
      { name: 'Crab Walk', reps: '10 steps', icon: '🦀', muscles: 'Arms' },
      { name: 'Octopus Arms', reps: '10 waves', icon: '🐙', muscles: 'Arms' },
      { name: 'Seal Claps', reps: '10 claps', icon: '🦭', muscles: 'Arms' }
    ],
    cooldown: [
      'Seated forward fold (10 sec)',
      'Butterfly stretch (10 sec)',
      'Deep breathing'
    ],
    benefits: ['Flexibility', 'Coordination', 'Imagination']
  },
  {
    id: 'kids-sun',
    name: 'Stretchy Sunday',
    icon: '🧘',
    duration: '8 min',
    level: 'Gentle',
    focus: 'Recovery',
    bodyParts: ['Full Body', 'Flexibility'],
    warmup: [
      'Gentle neck rolls (5 each)',
      'Shoulder shrugs (5)',
      'Deep breaths (3)'
    ],
    exercises: [
      { name: 'Cat Stretch', reps: 'Hold 10 sec', icon: '🐱', muscles: 'Back' },
      { name: 'Downward Dog', reps: 'Hold 10 sec', icon: '🐕', muscles: 'Full Body' },
      { name: 'Cobra Stretch', reps: 'Hold 8 sec', icon: '🐍', muscles: 'Back' },
      { name: 'Butterfly Stretch', reps: 'Hold 15 sec', icon: '🦋', muscles: 'Hips' },
      { name: 'Happy Baby', reps: 'Hold 10 sec', icon: '👶', muscles: 'Hips' },
      { name: 'Child Pose', reps: 'Hold 15 sec', icon: '🧘', muscles: 'Back' },
      { name: 'Seated Twist', reps: '5 each side', icon: '🔄', muscles: 'Core' }
    ],
    cooldown: [
      'Deep breathing (5 breaths)',
      'Total body relaxation',
      'Quiet time'
    ],
    benefits: ['Flexibility', 'Calm', 'Body awareness']
  }
];

// Teenage Daily Workouts (13-19 years) - 7 exercises per day
export const teenageDaily = [
  {
    id: 'teen-mon',
    name: 'Full Body Strength Monday',
    icon: '💪',
    duration: '25 min',
    level: 'Intermediate',
    focus: 'Strength',
    bodyParts: ['Full Body', 'Strength'],
    warmup: [
      'Jumping jacks (30 sec)',
      'Arm circles (10 forward, 10 back)',
      'Torso twists (10 each side)',
      'Leg swings (10 each leg)',
      'Cat-cow stretch (5 rounds)'
    ],
    exercises: [
      { name: 'Standard Push-ups', reps: '3x10', icon: '💪', muscles: 'Chest, Arms' },
      { name: 'Bodyweight Squats', reps: '3x15', icon: '🦵', muscles: 'Quads, Glutes' },
      { name: 'Walking Lunges', reps: '3x12 each leg', icon: '🏃', muscles: 'Legs' },
      { name: 'Plank Hold', reps: '3x45 sec', icon: '📏', muscles: 'Core' },
      { name: 'Diamond Push-ups', reps: '3x8', icon: '💎', muscles: 'Triceps' },
      { name: 'Glute Bridges', reps: '3x15', icon: '🍑', muscles: 'Glutes' },
      { name: 'Mountain Climbers', reps: '3x20', icon: '⛰️', muscles: 'Cardio' }
    ],
    cooldown: [
      'Quad stretch (20 sec each leg)',
      'Hamstring stretch (20 sec each leg)',
      'Chest stretch (20 sec)',
      'Deep breathing (5 breaths)'
    ],
    benefits: ['Strength', 'Muscle tone', 'Endurance']
  },
  {
    id: 'teen-tue',
    name: 'Upper Body Pump Tuesday',
    icon: '💪',
    duration: '22 min',
    level: 'Intermediate',
    focus: 'Upper Body',
    bodyParts: ['Chest', 'Back', 'Arms', 'Shoulders'],
    warmup: [
      'Arm circles (20 forward, 20 back)',
      'Shoulder rolls (10 forward, 10 back)',
      'Cat-cow stretch (5 rounds)',
      'Wrist circles (10 each direction)'
    ],
    exercises: [
      { name: 'Wide Push-ups', reps: '3x10', icon: '📐', muscles: 'Chest' },
      { name: 'Diamond Push-ups', reps: '3x8', icon: '💎', muscles: 'Triceps' },
      { name: 'Pike Push-ups', reps: '3x8', icon: '🔺', muscles: 'Shoulders' },
      { name: 'Tricep Dips', reps: '3x12', icon: '🪑', muscles: 'Triceps' },
      { name: 'Superman Holds', reps: '3x30 sec', icon: '🦸', muscles: 'Back' },
      { name: 'Plank Ups', reps: '3x10', icon: '⬆️', muscles: 'Arms, Core' },
      { name: 'Arm Circles with Weights', reps: '3x15 each', icon: '🔄', muscles: 'Shoulders' }
    ],
    cooldown: [
      'Chest stretch (20 sec)',
      'Tricep stretch (20 sec each)',
      'Child pose (30 sec)'
    ],
    benefits: ['Upper body strength', 'Definition', 'Posture']
  },
  {
    id: 'teen-wed',
    name: 'Lower Body Power Wednesday',
    icon: '🦵',
    duration: '23 min',
    level: 'Intermediate',
    focus: 'Lower Body',
    bodyParts: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    warmup: [
      'Leg swings (10 forward, 10 sideways each leg)',
      'Walking lunges (10 each leg)',
      'High knees (30 sec)',
      'Butt kicks (30 sec)'
    ],
    exercises: [
      { name: 'Goblet Squats', reps: '3x15', icon: '🏋️', muscles: 'Quads, Glutes' },
      { name: 'Reverse Lunges', reps: '3x12 each leg', icon: '⬅️', muscles: 'Legs' },
      { name: 'Jump Squats', reps: '3x10', icon: '⬆️', muscles: 'Explosive Power' },
      { name: 'Calf Raises', reps: '3x20', icon: '🦶', muscles: 'Calves' },
      { name: 'Bulgarian Split Squats', reps: '3x8 each leg', icon: '🇧🇬', muscles: 'Legs' },
      { name: 'Glute Bridges', reps: '3x15', icon: '🍑', muscles: 'Glutes' },
      { name: 'Wall Sit', reps: '3x45 sec', icon: '🧱', muscles: 'Quads' }
    ],
    cooldown: [
      'Quad stretch (20 sec each leg)',
      'Hamstring stretch (20 sec each leg)',
      'Calf stretch (20 sec each leg)',
      'Pigeon pose (20 sec each side)'
    ],
    benefits: ['Leg strength', 'Power', 'Stability']
  },
  {
    id: 'teen-thu',
    name: 'Core & Abs Thursday',
    icon: '🎯',
    duration: '18 min',
    level: 'Intermediate',
    focus: 'Core',
    bodyParts: ['Abs', 'Obliques', 'Lower Back'],
    warmup: [
      'Torso twists (15 each side)',
      'Cat-cow stretch (8 rounds)',
      'Side bends (10 each side)',
      'Deep breathing (5 breaths)'
    ],
    exercises: [
      { name: 'Crunches', reps: '3x20', icon: '🔄', muscles: 'Upper Abs' },
      { name: 'Leg Raises', reps: '3x15', icon: '⬆️', muscles: 'Lower Abs' },
      { name: 'Russian Twists', reps: '3x20 each side', icon: '🔄', muscles: 'Obliques' },
      { name: 'Plank', reps: '3x60 sec', icon: '📏', muscles: 'Full Core' },
      { name: 'Bicycle Crunches', reps: '3x20 each side', icon: '🚲', muscles: 'Obliques' },
      { name: 'Mountain Climbers', reps: '3x30', icon: '⛰️', muscles: 'Core, Cardio' },
      { name: 'Dead Bug', reps: '3x10 each side', icon: '🐛', muscles: 'Deep Core' }
    ],
    cooldown: [
      'Child pose (30 sec)',
      'Seated twist (20 sec each side)',
      'Cobra stretch (20 sec)'
    ],
    benefits: ['Six-pack abs', 'Core stability', 'Balance']
  },
  {
    id: 'teen-fri',
    name: 'HIIT Cardio Friday',
    icon: '⚡',
    duration: '15 min',
    level: 'Advanced',
    focus: 'Cardio',
    bodyParts: ['Full Body', 'Cardio'],
    warmup: [
      'Jumping jacks (1 min)',
      'High knees (30 sec)',
      'Butt kicks (30 sec)',
      'Arm circles (30 sec)',
      'Dynamic stretches'
    ],
    exercises: [
      { name: 'Burpees', reps: '30 sec work/15 sec rest x4', icon: '🤸', muscles: 'Full Body' },
      { name: 'Mountain Climbers', reps: '30 sec work/15 sec rest x4', icon: '⛰️', muscles: 'Core, Cardio' },
      { name: 'Jump Squats', reps: '30 sec work/15 sec rest x4', icon: '⬆️', muscles: 'Legs' },
      { name: 'High Knees', reps: '30 sec work/15 sec rest x4', icon: '🦵', muscles: 'Cardio' },
      { name: 'Plank Jacks', reps: '30 sec work/15 sec rest x4', icon: '📏', muscles: 'Core' },
      { name: 'Skater Hops', reps: '30 sec work/15 sec rest x4', icon: '⛸️', muscles: 'Legs' },
      { name: 'Box Jumps', reps: '30 sec work/15 sec rest x4', icon: '📦', muscles: 'Power' }
    ],
    cooldown: [
      'Light jog in place (1 min)',
      'Full body stretch',
      'Deep breathing (1 min)'
    ],
    benefits: ['Cardio fitness', 'Calorie burn', 'Explosive power']
  },
  {
    id: 'teen-sat',
    name: 'Sports Performance Saturday',
    icon: '⚽',
    duration: '20 min',
    level: 'Advanced',
    focus: 'Athletic',
    bodyParts: ['Agility', 'Power', 'Speed'],
    warmup: [
      'High knees (30 sec)',
      'Butt kicks (30 sec)',
      'Side shuffles (30 sec each direction)',
      'Leg swings (10 each leg)',
      'Dynamic lunges (10 each leg)'
    ],
    exercises: [
      { name: 'Lateral Bounds', reps: '3x10 each side', icon: '↔️', muscles: 'Agility' },
      { name: 'Box Jumps', reps: '3x8', icon: '📦', muscles: 'Power' },
      { name: 'Agility Ladder Drills', reps: '3 rounds', icon: '🪜', muscles: 'Footwork' },
      { name: 'Sprints', reps: '6x30 sec', icon: '🏃', muscles: 'Speed' },
      { name: 'Broad Jumps', reps: '3x5', icon: '⬆️', muscles: 'Power' },
      { name: 'Cone Drills', reps: '3 rounds', icon: '⛔', muscles: 'Agility' },
      { name: 'Plyometric Push-ups', reps: '3x6', icon: '💪', muscles: 'Explosive Power' }
    ],
    cooldown: [
      'Light jog (2 min)',
      'Full body stretching',
      'Deep breathing'
    ],
    benefits: ['Athletic performance', 'Agility', 'Explosiveness']
  },
  {
    id: 'teen-sun',
    name: 'Active Recovery Sunday',
    icon: '🧘',
    duration: '15 min',
    level: 'Gentle',
    focus: 'Recovery',
    bodyParts: ['Full Body', 'Flexibility'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Gentle neck rolls',
      'Shoulder shrugs',
      'Cat-cow stretch (5 rounds)'
    ],
    exercises: [
      { name: 'Downward Dog', reps: 'Hold 30 sec', icon: '🐕', muscles: 'Full Body' },
      { name: 'Forward Fold', reps: 'Hold 30 sec', icon: '⬇️', muscles: 'Hamstrings' },
      { name: 'Pigeon Pose', reps: '30 sec each side', icon: '🕊️', muscles: 'Hips' },
      { name: 'Seated Twist', reps: '30 sec each side', icon: '🔄', muscles: 'Spine' },
      { name: 'Happy Baby', reps: 'Hold 30 sec', icon: '👶', muscles: 'Hips' },
      { name: 'Child Pose', reps: 'Hold 1 min', icon: '🧘', muscles: 'Back' },
      { name: 'Legs Up Wall', reps: '2 min', icon: '🧱', muscles: 'Recovery' }
    ],
    cooldown: [
      'Deep breathing (10 breaths)',
      'Body scan relaxation',
      'Meditation (2 min)'
    ],
    benefits: ['Recovery', 'Flexibility', 'Mindfulness']
  }
];

// Adult Daily Workouts (20-55 years) - 7 exercises per day
export const adultDaily = [
  {
    id: 'adult-mon',
    name: 'Chest & Triceps Monday',
    icon: '💪',
    duration: '30 min',
    level: 'Intermediate',
    focus: 'Push Day',
    bodyParts: ['Chest', 'Triceps', 'Shoulders'],
    warmup: [
      'Arm circles (20 forward, 20 back)',
      'Shoulder rolls (10 each direction)',
      'Cat-cow stretch (8 rounds)',
      'Push-up position holds (30 sec)',
      'Light jumping jacks (1 min)'
    ],
    exercises: [
      { name: 'Standard Push-ups', reps: '4x12', icon: '📏', muscles: 'Chest, Triceps' },
      { name: 'Diamond Push-ups', reps: '4x10', icon: '💎', muscles: 'Triceps' },
      { name: 'Wide Push-ups', reps: '4x10', icon: '📐', muscles: 'Outer Chest' },
      { name: 'Decline Push-ups', reps: '3x8', icon: '📉', muscles: 'Upper Chest' },
      { name: 'Tricep Dips', reps: '4x15', icon: '🪑', muscles: 'Triceps' },
      { name: 'Pike Push-ups', reps: '3x8', icon: '🔺', muscles: 'Shoulders' },
      { name: 'Plank Shoulder Taps', reps: '3x20', icon: '👆', muscles: 'Core, Shoulders' }
    ],
    cooldown: [
      'Chest stretch (30 sec)',
      'Tricep stretch (30 sec each arm)',
      'Child pose (1 min)',
      'Deep breathing (5 breaths)'
    ],
    benefits: ['Upper body strength', 'Chest development', 'Arm definition']
  },
  {
    id: 'adult-tue',
    name: 'Back & Biceps Tuesday',
    icon: '💪',
    duration: '30 min',
    level: 'Intermediate',
    focus: 'Pull Day',
    bodyParts: ['Back', 'Biceps', 'Rear Delts'],
    warmup: [
      'Arm circles (20 each direction)',
      'Torso twists (15 each side)',
      'Cat-cow stretch (8 rounds)',
      'Thread the needle (30 sec each side)',
      'Light jog in place (1 min)'
    ],
    exercises: [
      { name: 'Superman Holds', reps: '4x30 sec', icon: '🦸', muscles: 'Lower Back' },
      { name: 'Reverse Snow Angels', reps: '4x12', icon: '😇', muscles: 'Upper Back' },
      { name: 'Inverted Rows (Table)', reps: '4x10', icon: '⬆️', muscles: 'Lats' },
      { name: 'Door Frame Rows', reps: '4x12 each arm', icon: '🚪', muscles: 'Back' },
      { name: 'Bicep Curls (Water Bottles)', reps: '4x15', icon: '💪', muscles: 'Biceps' },
      { name: 'Hammer Curls', reps: '4x12', icon: '🔨', muscles: 'Biceps' },
      { name: 'Band Pull-Aparts', reps: '3x15', icon: '🔄', muscles: 'Rear Delts' }
    ],
    cooldown: [
      'Child pose (1 min)',
      'Cat-cow stretch (5 rounds)',
      'Bicep stretch (30 sec each arm)',
      'Seated twist (30 sec each side)'
    ],
    benefits: ['Back width', 'Bicep peak', 'Posture improvement']
  },
  {
    id: 'adult-wed',
    name: 'Leg Day Wednesday',
    icon: '🦵',
    duration: '35 min',
    level: 'Intermediate',
    focus: 'Lower Body',
    bodyParts: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    warmup: [
      'Leg swings (10 forward, 10 sideways each leg)',
      'Walking lunges (10 each leg)',
      'High knees (30 sec)',
      'Butt kicks (30 sec)',
      'Bodyweight squats (15 reps)'
    ],
    exercises: [
      { name: 'Bodyweight Squats', reps: '4x20', icon: '🏋️', muscles: 'Quads, Glutes' },
      { name: 'Walking Lunges', reps: '4x12 each leg', icon: '🚶', muscles: 'Legs' },
      { name: 'Bulgarian Split Squats', reps: '3x10 each leg', icon: '🇧🇬', muscles: 'Legs' },
      { name: 'Jump Squats', reps: '3x12', icon: '⬆️', muscles: 'Power' },
      { name: 'Calf Raises', reps: '4x20', icon: '🦶', muscles: 'Calves' },
      { name: 'Glute Bridges', reps: '4x15', icon: '🍑', muscles: 'Glutes' },
      { name: 'Wall Sit', reps: '3x60 sec', icon: '🧱', muscles: 'Quads' }
    ],
    cooldown: [
      'Quad stretch (30 sec each leg)',
      'Hamstring stretch (30 sec each leg)',
      'Calf stretch (30 sec each leg)',
      'Pigeon pose (30 sec each side)',
      'Butterfly stretch (30 sec)'
    ],
    benefits: ['Leg strength', 'Glute activation', 'Stability']
  },
  {
    id: 'adult-thu',
    name: 'Shoulder & Abs Thursday',
    icon: '🎯',
    duration: '25 min',
    level: 'Intermediate',
    focus: 'Shoulders & Core',
    bodyParts: ['Shoulders', 'Abs', 'Obliques'],
    warmup: [
      'Arm circles (20 forward, 20 back)',
      'Shoulder rolls (10 each direction)',
      'Torso twists (15 each side)',
      'Cat-cow stretch (5 rounds)',
      'Plank holds (30 sec)'
    ],
    exercises: [
      { name: 'Pike Push-ups', reps: '4x10', icon: '🔺', muscles: 'Shoulders' },
      { name: 'Lateral Raises (Water Bottles)', reps: '4x15', icon: '⬆️', muscles: 'Side Delts' },
      { name: 'Front Raises', reps: '4x12', icon: '⬆️', muscles: 'Front Delts' },
      { name: 'Bent-over Flies', reps: '4x12', icon: '🦋', muscles: 'Rear Delts' },
      { name: 'Crunches', reps: '3x20', icon: '🔄', muscles: 'Upper Abs' },
      { name: 'Russian Twists', reps: '3x20 each side', icon: '🔄', muscles: 'Obliques' },
      { name: 'Plank', reps: '3x60 sec', icon: '📏', muscles: 'Full Core' }
    ],
    cooldown: [
      'Shoulder stretch (30 sec each arm)',
      'Child pose (1 min)',
      'Seated twist (30 sec each side)',
      'Deep breathing (5 breaths)'
    ],
    benefits: ['Shoulder width', 'Core stability', 'Definition']
  },
  {
    id: 'adult-fri',
    name: 'Full Body HIIT Friday',
    icon: '⚡',
    duration: '20 min',
    level: 'Advanced',
    focus: 'Cardio & Strength',
    bodyParts: ['Full Body'],
    warmup: [
      'Jumping jacks (1 min)',
      'High knees (30 sec)',
      'Butt kicks (30 sec)',
      'Arm circles (30 sec)',
      'Bodyweight squats (15 reps)',
      'Push-ups (10 reps)'
    ],
    exercises: [
      { name: 'Burpees', reps: '40 sec work/20 sec rest x4', icon: '🤸', muscles: 'Full Body' },
      { name: 'Mountain Climbers', reps: '40 sec work/20 sec rest x4', icon: '⛰️', muscles: 'Core, Cardio' },
      { name: 'Jump Squats', reps: '40 sec work/20 sec rest x4', icon: '⬆️', muscles: 'Legs' },
      { name: 'Push-up to Plank Jack', reps: '40 sec work/20 sec rest x4', icon: '📏', muscles: 'Chest, Core' },
      { name: 'Lunge Jumps', reps: '40 sec work/20 sec rest x4', icon: '🦵', muscles: 'Legs' },
      { name: 'Plank Shoulder Taps', reps: '40 sec work/20 sec rest x4', icon: '👆', muscles: 'Core' },
      { name: 'High Knees', reps: '40 sec work/20 sec rest x4', icon: '🏃', muscles: 'Cardio' }
    ],
    cooldown: [
      'Light jog in place (1 min)',
      'Full body stretching',
      'Deep breathing (1 min)',
      'Child pose (1 min)'
    ],
    benefits: ['Fat loss', 'Endurance', 'Metabolism boost']
  },
  {
    id: 'adult-sat',
    name: 'Endurance Cardio Saturday',
    icon: '🏃',
    duration: '25 min',
    level: 'Intermediate',
    focus: 'Cardio',
    bodyParts: ['Cardio', 'Full Body'],
    warmup: [
      'March in place (1 min)',
      'Side steps (30 sec)',
      'Arm circles (30 sec)',
      'Leg swings (10 each leg)',
      'Dynamic stretches'
    ],
    exercises: [
      { name: 'Jump Rope (imaginary)', reps: '3 min', icon: '🪢', muscles: 'Cardio' },
      { name: 'High Knees', reps: '2 min', icon: '🦵', muscles: 'Legs' },
      { name: 'Butt Kicks', reps: '2 min', icon: '🦶', muscles: 'Hamstrings' },
      { name: 'Mountain Climbers', reps: '2 min', icon: '⛰️', muscles: 'Core' },
      { name: 'Jumping Jacks', reps: '2 min', icon: '🤸', muscles: 'Full Body' },
      { name: 'Skater Hops', reps: '2 min', icon: '⛸️', muscles: 'Legs' },
      { name: 'Shadow Boxing', reps: '3 min', icon: '🥊', muscles: 'Full Body' }
    ],
    cooldown: [
      'Light walking (2 min)',
      'Full body stretching',
      'Deep breathing'
    ],
    benefits: ['Cardiovascular health', 'Endurance', 'Calorie burn']
  },
  {
    id: 'adult-sun',
    name: 'Active Recovery & Yoga Sunday',
    icon: '🧘',
    duration: '20 min',
    level: 'Gentle',
    focus: 'Recovery',
    bodyParts: ['Full Body', 'Flexibility'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Neck rolls (5 each side)',
      'Shoulder shrugs (10)',
      'Cat-cow stretch (5 rounds)',
      'Gentle side bends (5 each side)'
    ],
    exercises: [
      { name: 'Downward Dog', reps: 'Hold 1 min', icon: '🐕', muscles: 'Full Body' },
      { name: 'Warrior I', reps: '30 sec each side', icon: '⚔️', muscles: 'Legs' },
      { name: 'Warrior II', reps: '30 sec each side', icon: '⚔️', muscles: 'Legs' },
      { name: 'Triangle Pose', reps: '30 sec each side', icon: '📐', muscles: 'Legs, Core' },
      { name: 'Pigeon Pose', reps: '1 min each side', icon: '🕊️', muscles: 'Hips' },
      { name: 'Seated Forward Fold', reps: '1 min', icon: '⬇️', muscles: 'Hamstrings' },
      { name: 'Happy Baby', reps: '1 min', icon: '👶', muscles: 'Hips' }
    ],
    cooldown: [
      'Child pose (2 min)',
      'Legs up wall (3 min)',
      'Deep breathing (2 min)',
      'Meditation (2 min)'
    ],
    benefits: ['Flexibility', 'Stress relief', 'Recovery', 'Mindfulness']
  }
];

// Elderly Daily Workouts (55+ years) - 7 exercises per day
export const elderlyDaily = [
  {
    id: 'elderly-mon',
    name: 'Morning Mobility Monday',
    icon: '☀️',
    duration: '12 min',
    level: 'Gentle',
    focus: 'Mobility',
    bodyParts: ['Full Body', 'Joints'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Gentle neck rolls (5 each side)',
      'Shoulder shrugs (8 reps)',
      'March in place (30 sec)',
      'Ankle circles (5 each foot)'
    ],
    exercises: [
      { name: 'Neck Rolls', reps: '5 each direction', icon: '🔄', muscles: 'Neck' },
      { name: 'Shoulder Circles', reps: '10 forward, 10 back', icon: '🔄', muscles: 'Shoulders' },
      { name: 'Arm Swings', reps: '10 each arm', icon: '🔄', muscles: 'Shoulders' },
      { name: 'Torso Twists', reps: '10 each side', icon: '🔄', muscles: 'Core' },
      { name: 'Hip Circles', reps: '5 each direction', icon: '🔄', muscles: 'Hips' },
      { name: 'Ankle Rotations', reps: '5 each foot', icon: '🔄', muscles: 'Ankles' },
      { name: 'Wrist Circles', reps: '5 each direction', icon: '🔄', muscles: 'Wrists' }
    ],
    cooldown: [
      'Gentle forward fold (15 sec)',
      'Deep breathing (5 breaths)',
      'Quiet sitting (1 min)'
    ],
    benefits: ['Joint mobility', 'Blood circulation', 'Range of motion']
  },
  {
    id: 'elderly-tue',
    name: 'Balance & Stability Tuesday',
    icon: '⚖️',
    duration: '10 min',
    level: 'Gentle',
    focus: 'Balance',
    bodyParts: ['Legs', 'Core'],
    warmup: [
      'March in place (30 sec)',
      'Side steps (10 each side)',
      'Heel raises (10 reps holding chair)',
      'Deep breathing (3 breaths)'
    ],
    exercises: [
      { name: 'Heel-to-Toe Walk', reps: '10 steps forward', icon: '👣', muscles: 'Balance' },
      { name: 'Single Leg Stand', reps: '10 sec each leg (with support)', icon: '🦵', muscles: 'Balance' },
      { name: 'Weight Shifts', reps: '10 each side', icon: '↔️', muscles: 'Legs' },
      { name: 'March in Place', reps: '20 steps', icon: '🚶', muscles: 'Legs' },
      { name: 'Side Leg Raises', reps: '8 each leg (holding chair)', icon: '⬆️', muscles: 'Hips' },
      { name: 'Back Leg Raises', reps: '8 each leg (holding chair)', icon: '⬅️', muscles: 'Glutes' },
      { name: 'Calf Raises', reps: '10 (holding support)', icon: '🦶', muscles: 'Calves' }
    ],
    cooldown: [
      'Gentle quad stretch (15 sec each leg)',
      'Deep breathing (5 breaths)',
      'Seated relaxation (1 min)'
    ],
    benefits: ['Fall prevention', 'Stability', 'Confidence']
  },
  {
    id: 'elderly-wed',
    name: 'Chair Yoga Wednesday',
    icon: '🪑',
    duration: '15 min',
    level: 'Gentle',
    focus: 'Flexibility',
    bodyParts: ['Full Body'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Neck rolls (5 each side)',
      'Shoulder shrugs (8)',
      'Ankle pumps (10 each foot)'
    ],
    exercises: [
      { name: 'Seated Cat-Cow', reps: '8 rounds', icon: '🐱', muscles: 'Spine' },
      { name: 'Seated Forward Fold', reps: 'Hold 20 sec', icon: '⬇️', muscles: 'Hamstrings' },
      { name: 'Seated Twist', reps: '20 sec each side', icon: '🔄', muscles: 'Spine' },
      { name: 'Seated Leg Lifts', reps: '10 each leg', icon: '⬆️', muscles: 'Quads' },
      { name: 'Seated Marching', reps: '20 steps', icon: '🚶', muscles: 'Hip Flexors' },
      { name: 'Seated Side Bends', reps: '8 each side', icon: '↔️', muscles: 'Obliques' },
      { name: 'Seated Arm Circles', reps: '10 forward, 10 back', icon: '🔄', muscles: 'Shoulders' }
    ],
    cooldown: [
      'Seated relaxation (1 min)',
      'Deep breathing (5 breaths)',
      'Gentle neck stretch'
    ],
    benefits: ['Flexibility', 'Posture', 'Relaxation']
  },
  {
    id: 'elderly-thu',
    name: 'Gentle Strength Thursday',
    icon: '💪',
    duration: '12 min',
    level: 'Gentle',
    focus: 'Strength',
    bodyParts: ['Upper Body', 'Legs'],
    warmup: [
      'March in place (30 sec)',
      'Arm circles (10 forward, 10 back)',
      'Shoulder shrugs (8)',
      'Deep breathing (3 breaths)'
    ],
    exercises: [
      { name: 'Wall Push-ups', reps: '10 reps', icon: '🧱', muscles: 'Chest, Arms' },
      { name: 'Chair Squats', reps: '10 reps', icon: '🪑', muscles: 'Legs' },
      { name: 'Seated Leg Extensions', reps: '10 each leg', icon: '⬆️', muscles: 'Quads' },
      { name: 'Bicep Curls (Water Bottles)', reps: '10 reps', icon: '💪', muscles: 'Biceps' },
      { name: 'Seated Rows (with band)', reps: '10 reps', icon: '🚣', muscles: 'Back' },
      { name: 'Calf Raises', reps: '10 reps (holding chair)', icon: '🦶', muscles: 'Calves' },
      { name: 'Overhead Press (Water Bottles)', reps: '10 reps', icon: '⬆️', muscles: 'Shoulders' }
    ],
    cooldown: [
      'Chest stretch (15 sec)',
      'Quad stretch (15 sec each leg)',
      'Deep breathing (5 breaths)'
    ],
    benefits: ['Muscle strength', 'Bone health', 'Independence']
  },
  {
    id: 'elderly-fri',
    name: 'Walking Cardio Friday',
    icon: '🚶',
    duration: '15 min',
    level: 'Gentle',
    focus: 'Cardio',
    bodyParts: ['Cardio', 'Legs'],
    warmup: [
      'March in place (1 min)',
      'Arm circles (30 sec)',
      'Ankle circles (30 sec)',
      'Deep breathing'
    ],
    exercises: [
      { name: 'Brisk Walking in Place', reps: '3 min', icon: '🚶', muscles: 'Cardio' },
      { name: 'Walking Sideways', reps: '20 steps each side', icon: '↔️', muscles: 'Legs' },
      { name: 'Heel Walking', reps: '20 steps', icon: '👣', muscles: 'Shins' },
      { name: 'Toe Walking', reps: '20 steps', icon: '🦶', muscles: 'Calves' },
      { name: 'Marching with High Knees', reps: '20 steps', icon: '🦵', muscles: 'Hip Flexors' },
      { name: 'Step Touches', reps: '20 each side', icon: '👟', muscles: 'Legs' },
      { name: 'Grapevine Steps', reps: '10 each direction', icon: '🍇', muscles: 'Coordination' }
    ],
    cooldown: [
      'Slow walking (1 min)',
      'Calf stretch (20 sec each leg)',
      'Deep breathing'
    ],
    benefits: ['Heart health', 'Endurance', 'Mobility']
  },
  {
    id: 'elderly-sat',
    name: 'Tai Chi Flow Saturday',
    icon: '🌿',
    duration: '12 min',
    level: 'Gentle',
    focus: 'Mind-Body',
    bodyParts: ['Full Body'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Centering (30 sec)',
      'Gentle weight shifts'
    ],
    exercises: [
      { name: 'Commencing Form', reps: '3 rounds', icon: '☯️', muscles: 'Full Body' },
      { name: 'Parting Wild Horse Mane', reps: '3 each side', icon: '🐎', muscles: 'Balance' },
      { name: 'White Crane Spreads Wings', reps: '3 each side', icon: '🕊️', muscles: 'Balance' },
      { name: 'Brush Knee and Push', reps: '3 each side', icon: '🖐️', muscles: 'Coordination' },
      { name: 'Cloud Hands', reps: '5 each side', icon: '☁️', muscles: 'Full Body' },
      { name: 'Golden Rooster', reps: '3 each side', icon: '🐓', muscles: 'Balance' },
      { name: 'Closing Form', reps: 'Hold 30 sec', icon: '☯️', muscles: 'Full Body' }
    ],
    cooldown: [
      'Deep breathing (1 min)',
      'Standing meditation (1 min)',
      'Gentle stretches'
    ],
    benefits: ['Balance', 'Mindfulness', 'Gentle movement']
  },
  {
    id: 'elderly-sun',
    name: 'Rest & Stretch Sunday',
    icon: '🌿',
    duration: '10 min',
    level: 'Gentle',
    focus: 'Recovery',
    bodyParts: ['Full Body'],
    warmup: [
      'Deep breathing (5 breaths)',
      'Gentle neck rolls',
      'Shoulder shrugs'
    ],
    exercises: [
      { name: 'Full Body Stretch', reps: 'Hold 30 sec', icon: '⬆️', muscles: 'Full Body' },
      { name: 'Hamstring Stretch', reps: '20 sec each leg', icon: '🦵', muscles: 'Hamstrings' },
      { name: 'Quad Stretch', reps: '20 sec each leg (holding chair)', icon: '🦵', muscles: 'Quads' },
      { name: 'Chest Opener', reps: '20 sec', icon: '🤲', muscles: 'Chest' },
      { name: 'Seated Twist', reps: '20 sec each side', icon: '🔄', muscles: 'Spine' },
      { name: 'Butterfly Stretch', reps: '30 sec', icon: '🦋', muscles: 'Hips' },
      { name: 'Child Pose', reps: '1 min', icon: '🧘', muscles: 'Back' }
    ],
    cooldown: [
      'Deep breathing (1 min)',
      'Body scan relaxation',
      'Quiet meditation (2 min)'
    ],
    benefits: ['Recovery', 'Relaxation', 'Flexibility']
  }
];

// Function to get daily workout based on category and day
export const getDailyWorkout = (category, dayIndex) => {
  const workouts = {
    kids: kidsDaily,
    teenage: teenageDaily,
    adult: adultDaily,
    elderly: elderlyDaily
  };
  
  const categoryWorkouts = workouts[category] || adultDaily;
  return categoryWorkouts[dayIndex % categoryWorkouts.length];
};

// Function to get all daily workouts for a category
export const getAllDailyWorkouts = (category) => {
  const workouts = {
    kids: kidsDaily,
    teenage: teenageDaily,
    adult: adultDaily,
    elderly: elderlyDaily,
    fitness: adultDaily, // Fallback for fitness
    weightloss: adultDaily // Fallback for weightloss
  };
  
  return workouts[category] || adultDaily;
};

// Function to get today's workout
export const getTodaysWorkout = (category) => {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0-6 with Monday as 0
  return getDailyWorkout(category, dayIndex);
};