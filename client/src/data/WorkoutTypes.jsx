// src/data/WorkoutTypes.js

export const workoutCategories = {
  pushups: {
    id: 'pushups',
    name: 'Push-ups',
    icon: '💪',
    description: 'Build upper body strength with these push-up variations',
    color: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
    exercises: [
      {
        id: 'pushup-basic',
        name: 'Basic Push-up',
        difficulty: 'Beginner',
        duration: '3 sets × 10 reps',
        image: '💪',
        description: 'The foundation of all push-up variations',
        instructions: [
          'Start in plank position with hands shoulder-width apart',
          'Lower your body until chest nearly touches the ground',
          'Keep your back straight and core engaged',
          'Push back up to starting position',
          'Exhale while pushing up, inhale while lowering'
        ],
        benefits: [
          'Builds chest, shoulder, and tricep strength',
          'Improves core stability',
          'Enhances upper body endurance'
        ],
        tips: [
          'Keep elbows at 45 degrees from body',
          'Don\'t let hips sag',
          'Breathe steadily throughout'
        ]
      },
      {
        id: 'pushup-wide',
        name: 'Wide Push-up',
        difficulty: 'Intermediate',
        duration: '3 sets × 8 reps',
        image: '💪',
        description: 'Places more emphasis on chest muscles',
        instructions: [
          'Place hands wider than shoulder-width apart',
          'Lower your body with elbows pointing outward',
          'Keep core tight and back straight',
          'Push through palms to return to start'
        ],
        benefits: [
          'Targets outer chest muscles',
          'Increases chest width',
          'Builds shoulder stability'
        ],
        tips: [
          'Don\'t go too wide to avoid shoulder strain',
          'Control the movement, avoid bouncing'
        ]
      },
      {
        id: 'pushup-diamond',
        name: 'Diamond Push-up',
        difficulty: 'Advanced',
        duration: '3 sets × 6 reps',
        image: '💎',
        description: 'Intense tricep and inner chest focus',
        instructions: [
          'Place hands together forming a diamond shape',
          'Keep elbows close to body',
          'Lower your chest toward your hands',
          'Push through triceps to return'
        ],
        benefits: [
          'Targets triceps intensely',
          'Builds inner chest',
          'Improves arm definition'
        ],
        tips: [
          'Start with knees on floor if too difficult',
          'Keep wrists strong and aligned'
        ]
      },
      {
        id: 'pushup-decline',
        name: 'Decline Push-up',
        difficulty: 'Intermediate',
        duration: '3 sets × 8 reps',
        image: '📈',
        description: 'Emphasizes upper chest and shoulders',
        instructions: [
          'Place feet on elevated surface',
          'Hands on floor shoulder-width apart',
          'Lower chest toward ground',
          'Push back up explosively'
        ],
        benefits: [
          'Targets upper chest',
          'Increases shoulder engagement',
          'Builds explosive power'
        ],
        tips: [
          'Start with low elevation',
          'Progress to higher elevation'
        ]
      },
      {
        id: 'pushup-incline',
        name: 'Incline Push-up',
        difficulty: 'Beginner',
        duration: '3 sets × 12 reps',
        image: '📉',
        description: 'Easier variation for beginners',
        instructions: [
          'Place hands on elevated surface',
          'Keep body straight from head to heels',
          'Lower chest to the surface',
          'Push back up'
        ],
        benefits: [
          'Builds foundation strength',
          'Easier on wrists',
          'Great warm-up exercise'
        ],
        tips: [
          'Lower the surface height as you progress',
          'Maintain straight body line'
        ]
      },
      {
        id: 'pushup-clapping',
        name: 'Clapping Push-up',
        difficulty: 'Advanced',
        duration: '3 sets × 5 reps',
        image: '👏',
        description: 'Explosive plyometric push-up variation',
        instructions: [
          'Start in push-up position',
          'Lower explosively',
          'Push up with enough force to clap hands',
          'Land softly and repeat'
        ],
        benefits: [
          'Builds explosive power',
          'Enhances muscle fiber recruitment',
          'Improves athletic performance'
        ],
        tips: [
          'Warm up thoroughly first',
          'Land with soft elbows'
        ]
      }
    ]
  },
  
  situps: {
    id: 'situps',
    name: 'Sit-ups',
    icon: '🔄',
    description: 'Core strengthening exercises for a strong midsection',
    color: 'linear-gradient(135deg, #11998e, #38ef7d)',
    exercises: [
      {
        id: 'situp-basic',
        name: 'Basic Sit-up',
        difficulty: 'Beginner',
        duration: '3 sets × 15 reps',
        image: '🔄',
        description: 'Traditional sit-up for core strength',
        instructions: [
          'Lie on back with knees bent',
          'Feet flat on floor',
          'Place hands behind head or cross on chest',
          'Curl upper body toward knees',
          'Lower back down with control'
        ],
        benefits: [
          'Builds abdominal strength',
          'Improves hip flexibility',
          'Enhances core stability'
        ],
        tips: [
          'Don\'t pull on neck',
          'Use core muscles, not momentum',
          'Exhale when curling up'
        ]
      },
      {
        id: 'situp-weighted',
        name: 'Weighted Sit-up',
        difficulty: 'Intermediate',
        duration: '3 sets × 10 reps',
        image: '🏋️',
        description: 'Added resistance for advanced core development',
        instructions: [
          'Hold weight plate against chest',
          'Perform basic sit-up motion',
          'Control both up and down movements',
          'Keep core engaged throughout'
        ],
        benefits: [
          'Increases core strength',
          'Builds muscle definition',
          'Progressive overload'
        ],
        tips: [
          'Start with light weight',
          'Focus on form over weight'
        ]
      },
      {
        id: 'situp-twist',
        name: 'Twisting Sit-up',
        difficulty: 'Intermediate',
        duration: '3 sets × 12 reps each side',
        image: '🔄',
        description: 'Engages obliques for a complete core workout',
        instructions: [
          'Perform basic sit-up motion',
          'At the top, twist torso to one side',
          'Lower back down',
          'Alternate sides'
        ],
        benefits: [
          'Targets obliques',
          'Improves rotational strength',
          'Comprehensive core development'
        ],
        tips: [
          'Twist from waist, not shoulders',
          'Keep hips stable'
        ]
      },
      {
        id: 'situp-vup',
        name: 'V-up',
        difficulty: 'Advanced',
        duration: '3 sets × 8 reps',
        image: 'V',
        description: 'Advanced movement combining lift and flexibility',
        instructions: [
          'Lie flat with arms extended overhead',
          'Simultaneously lift legs and upper body',
          'Reach hands toward feet',
          'Lower with control'
        ],
        benefits: [
          'Full core engagement',
          'Improves flexibility',
          'Builds balance and coordination'
        ],
        tips: [
          'Keep legs straight',
          'Control the descent',
          'Start with partial range of motion'
        ]
      }
    ]
  },
  
  squats: {
    id: 'squats',
    name: 'Squats',
    icon: '🦵',
    description: 'Leg and glute strengthening exercises',
    color: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    exercises: [
      {
        id: 'squat-basic',
        name: 'Basic Squat',
        difficulty: 'Beginner',
        duration: '3 sets × 15 reps',
        image: '🦵',
        description: 'Foundation of lower body strength',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Keep chest up and back straight',
          'Lower hips back and down',
          'Go down until thighs are parallel to ground',
          'Push through heels to stand'
        ],
        benefits: [
          'Builds leg strength',
          'Engages glutes and core',
          'Improves mobility'
        ],
        tips: [
          'Keep weight in heels',
          'Knees should track over toes',
          'Maintain neutral spine'
        ]
      },
      {
        id: 'squat-goblet',
        name: 'Goblet Squat',
        difficulty: 'Intermediate',
        duration: '3 sets × 12 reps',
        image: '🏆',
        description: 'Weighted squat with dumbbell or kettlebell',
        instructions: [
          'Hold weight at chest level',
          'Perform squat motion',
          'Keep elbows pointed down',
          'Push through heels to stand'
        ],
        benefits: [
          'Adds resistance safely',
          'Improves squat depth',
          'Builds upper back strength'
        ],
        tips: [
          'Keep weight close to chest',
          'Don\'t round shoulders'
        ]
      },
      {
        id: 'squat-jump',
        name: 'Jump Squat',
        difficulty: 'Advanced',
        duration: '3 sets × 8 reps',
        image: '⬆️',
        description: 'Explosive plyometric squat variation',
        instructions: [
          'Lower into squat position',
          'Explode upward into jump',
          'Land softly with control',
          'Immediately lower into next rep'
        ],
        benefits: [
          'Builds explosive power',
          'Increases heart rate',
          'Improves athletic performance'
        ],
        tips: [
          'Land softly on balls of feet',
          'Keep core tight throughout',
          'Start with low height jumps'
        ]
      }
    ]
  },
  
  planks: {
    id: 'planks',
    name: 'Planks',
    icon: '📏',
    description: 'Core stability and endurance exercises',
    color: 'linear-gradient(135deg, #FF512F, #DD2476)',
    exercises: [
      {
        id: 'plank-basic',
        name: 'Basic Plank',
        difficulty: 'Beginner',
        duration: '3 sets × 30 seconds',
        image: '📏',
        description: 'Foundational core stability exercise',
        instructions: [
          'Start in push-up position',
          'Lower onto forearms',
          'Keep body straight from head to heels',
          'Engage core and glutes',
          'Hold position'
        ],
        benefits: [
          'Builds core endurance',
          'Improves posture',
          'Strengthens shoulders'
        ],
        tips: [
          'Don\'t let hips sag',
          'Breathe steadily',
          'Look at floor to keep neck neutral'
        ]
      },
      {
        id: 'plank-side',
        name: 'Side Plank',
        difficulty: 'Intermediate',
        duration: '3 sets × 20 seconds each side',
        image: '📐',
        description: 'Targets obliques and lateral core',
        instructions: [
          'Lie on side with forearm on ground',
          'Stack feet and lift hips',
          'Keep body in straight line',
          'Hold position'
        ],
        benefits: [
          'Strengthens obliques',
          'Improves balance',
          'Builds shoulder stability'
        ],
        tips: [
          'Keep hips lifted',
          'Don\'t let shoulders roll forward'
        ]
      },
      {
        id: 'plank-leg-lift',
        name: 'Plank with Leg Lift',
        difficulty: 'Advanced',
        duration: '3 sets × 10 each leg',
        image: '🦵',
        description: 'Dynamic plank variation for added challenge',
        instructions: [
          'Start in basic plank position',
          'Lift one leg while keeping hips stable',
          'Hold for 2 seconds',
          'Lower and alternate legs'
        ],
        benefits: [
          'Challenges balance',
          'Engages glutes',
          'Increases core activation'
        ],
        tips: [
          'Keep hips level',
          'Don\'t arch back',
          'Control the movement'
        ]
      }
    ]
  },
  
  lunges: {
    id: 'lunges',
    name: 'Lunges',
    icon: '🏃',
    description: 'Single-leg exercises for balance and strength',
    color: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
    exercises: [
      {
        id: 'lunge-forward',
        name: 'Forward Lunge',
        difficulty: 'Beginner',
        duration: '3 sets × 10 each leg',
        image: '➡️',
        description: 'Basic forward lunging movement',
        instructions: [
          'Step forward with one leg',
          'Lower hips until both knees are bent 90 degrees',
          'Front knee above ankle, back knee hovering',
          'Push off front foot to return'
        ],
        benefits: [
          'Builds leg strength unilaterally',
          'Improves balance',
          'Stretches hip flexors'
        ],
        tips: [
          'Keep torso upright',
          'Don\'t let front knee go past toes',
          'Maintain weight in front heel'
        ]
      },
      {
        id: 'lunge-reverse',
        name: 'Reverse Lunge',
        difficulty: 'Beginner',
        duration: '3 sets × 10 each leg',
        image: '⬅️',
        description: 'Easier on knees, great for beginners',
        instructions: [
          'Step backward with one leg',
          'Lower into lunge position',
          'Front knee bent 90 degrees',
          'Push through front heel to return'
        ],
        benefits: [
          'Less knee stress',
          'Builds stability',
          'Great for beginners'
        ],
        tips: [
          'Keep front shin vertical',
          'Control the descent'
        ]
      },
      {
        id: 'lunge-side',
        name: 'Side Lunge',
        difficulty: 'Intermediate',
        duration: '3 sets × 8 each leg',
        image: '↔️',
        description: 'Lateral movement for inner thigh strength',
        instructions: [
          'Step wide to the side',
          'Bend the stepping leg',
          'Keep other leg straight',
          'Push off to return to start'
        ],
        benefits: [
          'Targets inner thighs',
          'Improves lateral movement',
          'Builds hip strength'
        ],
        tips: [
          'Keep chest up',
          'Don\'t let knee collapse inward',
          'Feel stretch in straight leg'
        ]
      }
    ]
  },
  
  stretches: {
    id: 'stretches',
    name: 'Stretches',
    icon: '🧘',
    description: 'Flexibility and mobility exercises',
    color: 'linear-gradient(135deg, #5433FF, #20BDFF, #A5FECB)',
    exercises: [
      {
        id: 'stretch-hamstring',
        name: 'Hamstring Stretch',
        difficulty: 'Beginner',
        duration: '30 seconds each leg',
        image: '🦵',
        description: 'Stretches back of thighs',
        instructions: [
          'Sit with one leg extended',
          'Reach toward toes',
          'Keep back straight',
          'Hold stretch'
        ],
        benefits: [
          'Improves hamstring flexibility',
          'Reduces lower back tension',
          'Enhances leg mobility'
        ],
        tips: [
          'Don\'t round back',
          'Breathe deeply',
          'Only go to mild tension'
        ]
      },
      {
        id: 'stretch-quad',
        name: 'Quad Stretch',
        difficulty: 'Beginner',
        duration: '30 seconds each leg',
        image: '🦵',
        description: 'Stretches front of thighs',
        instructions: [
          'Stand holding wall for balance',
          'Pull heel toward glutes',
          'Keep knees together',
          'Hold stretch'
        ],
        benefits: [
          'Improves quad flexibility',
          'Reduces knee tension',
          'Great after leg day'
        ],
        tips: [
          'Keep standing leg slightly bent',
          'Don\'t arch back',
          'Pull gently'
        ]
      }
    ]
  }
};

// Featured workouts for homepage
export const featuredWorkouts = [
  {
    id: 'featured-1',
    name: 'Morning Energizer',
    category: 'pushups',
    difficulty: 'Beginner',
    duration: '10 min',
    image: '🌅',
    color: 'linear-gradient(135deg, #FF416C, #FF4B2B)'
  },
  {
    id: 'featured-2',
    name: 'Core Burn',
    category: 'situps',
    difficulty: 'Intermediate',
    duration: '15 min',
    image: '🔥',
    color: 'linear-gradient(135deg, #11998e, #38ef7d)'
  },
  {
    id: 'featured-3',
    name: 'Leg Day',
    category: 'squats',
    difficulty: 'Advanced',
    duration: '20 min',
    image: '🦵',
    color: 'linear-gradient(135deg, #8E2DE2, #4A00E0)'
  }
];