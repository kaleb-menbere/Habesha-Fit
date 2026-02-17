// src/data/WorkoutTypes.jsx

// Kids Exercises (4-12 years)
export const kidsWorkouts = {
  playful: {
    id: 'playful',
    name: 'Play & Move',
    icon: '🧸',
    description: 'Fun exercises that feel like playtime',
    color: 'linear-gradient(135deg, #FF9800, #FF5722)',
    exercises: [
      {
        id: 'kids-animal-walks',
        name: 'Animal Walks',
        difficulty: 'Fun',
        duration: '5 minutes',
        image: '🐻',
        description: 'Walk like different animals',
        instructions: [
          'Bear walk: Walk on hands and feet',
          'Crab walk: Walk on hands and feet facing up',
          'Frog jumps: Squat and jump like a frog',
          'Penguin waddle: Walk with feet together'
        ],
        benefits: [
          'Builds coordination',
          'Strengthens muscles',
          'Develops motor skills',
          'Makes exercise fun'
        ],
        tips: [
          'Make animal sounds for fun',
          'Race with friends',
          'Create obstacle courses'
        ]
      },
      {
        id: 'kids-freeze-dance',
        name: 'Freeze Dance',
        difficulty: 'Fun',
        duration: '10 minutes',
        image: '💃',
        description: 'Dance and freeze when music stops',
        instructions: [
          'Play fun music',
          'Dance around freely',
          'Freeze when music stops',
          'Hold pose until music starts again'
        ],
        benefits: [
          'Improves listening skills',
          'Develops balance',
          'Great cardio workout',
          'Builds body control'
        ],
        tips: [
          'Make silly poses when freezing',
          'Play different music styles',
          'Encourage creativity'
        ]
      },
      {
        id: 'kids-balloon-volleyball',
        name: 'Balloon Volleyball',
        difficulty: 'Fun',
        duration: '10 minutes',
        image: '🎈',
        description: 'Keep the balloon off the ground',
        instructions: [
          'Blow up a balloon',
          'Hit it back and forth',
          'Don\'t let it touch the ground',
          'Count how many hits you can do'
        ],
        benefits: [
          'Improves hand-eye coordination',
          'Develops gross motor skills',
          'Encourages teamwork',
          'Fun cardio exercise'
        ],
        tips: [
          'Use multiple balloons',
          'Create teams',
          'Set up a "net" with string'
        ]
      },
      {
        id: 'kids-obstacle-course',
        name: 'Indoor Obstacle Course',
        difficulty: 'Fun',
        duration: '15 minutes',
        image: '🏃',
        description: 'Create fun obstacle challenges',
        instructions: [
          'Crawl under chairs',
          'Jump over pillows',
          'Walk on a straight line (balance beam)',
          'Do 5 jumping jacks at each station'
        ],
        benefits: [
          'Full body workout',
          'Develops problem-solving',
          'Builds coordination',
          'Encourages creativity'
        ],
        tips: [
          'Use pillows and cushions',
          'Time each round',
          'Let kids design the course'
        ]
      },
      {
        id: 'kids-simon-says',
        name: 'Simon Says Workout',
        difficulty: 'Fun',
        duration: '10 minutes',
        image: '🎮',
        description: 'Follow instructions in this classic game',
        instructions: [
          'Simon says: touch your toes',
          'Simon says: do 5 jumps',
          'Simon says: spin around',
          'If Simon doesn\'t say, don\'t move!'
        ],
        benefits: [
          'Improves listening skills',
          'Makes exercise playful',
          'Develops body awareness',
          'Builds focus'
        ],
        tips: [
          'Use funny movements',
          'Speed up the commands',
          'Let kids be Simon'
        ]
      }
    ]
  },
  
  strength: {
    id: 'strength',
    name: 'Super Strength',
    icon: '💪',
    description: 'Build strong muscles like a superhero',
    color: 'linear-gradient(135deg, #FF5722, #F44336)',
    exercises: [
      {
        id: 'kids-superhero-squats',
        name: 'Superhero Squats',
        difficulty: 'Easy',
        duration: '3 sets × 8 reps',
        image: '🦸',
        description: 'Squats with superhero style',
        instructions: [
          'Stand like a superhero (hands on hips)',
          'Bend knees like sitting in a chair',
          'Keep back straight',
          'Stand back up like flying'
        ],
        benefits: [
          'Builds leg strength',
          'Improves balance',
          'Develops body control',
          'Fun way to exercise'
        ],
        tips: [
          'Pretend you\'re flying up',
          'Add a superhero sound',
          'Do it in front of a mirror'
        ]
      },
      {
        id: 'kids-wall-pushups',
        name: 'Wall Push-ups',
        difficulty: 'Easy',
        duration: '3 sets × 10 reps',
        image: '🧱',
        description: 'Easy push-ups against the wall',
        instructions: [
          'Stand facing a wall, arms length away',
          'Place hands on wall at shoulder height',
          'Bend elbows to lean toward wall',
          'Push back to starting position'
        ],
        benefits: [
          'Builds arm strength',
          'Safe for young joints',
          'Prepares for floor push-ups',
          'Improves posture'
        ],
        tips: [
          'Stand closer for easier version',
          'Farther for more challenge',
          'Make it a game: "push the wall away"'
        ]
      }
    ]
  },
  
  flexibility: {
    id: 'flexibility',
    name: 'Stretchy Fun',
    icon: '🧘',
    description: 'Fun stretches and poses',
    color: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
    exercises: [
      {
        id: 'kids-animal-stretches',
        name: 'Animal Stretches',
        difficulty: 'Easy',
        duration: '5 minutes',
        image: '🐱',
        description: 'Stretch like your favorite animals',
        instructions: [
          'Cat stretch: Arch back like a cat',
          'Downward dog: Make an upside-down V',
          'Cobra: Stretch up like a snake',
          'Butterfly: Flap legs like wings'
        ],
        benefits: [
          'Improves flexibility',
          'Fun and engaging',
          'Calms the mind',
          'Develops body awareness'
        ],
        tips: [
          'Make animal sounds',
          'Tell a story with poses',
          'Do it together as a family'
        ]
      }
    ]
  }
};

// Teenage Exercises (13-19 years)
export const teenageWorkouts = {
  strength: {
    id: 'strength',
    name: 'Strength Builder',
    icon: '💪',
    description: 'Build functional strength for sports and growth',
    color: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
    exercises: [
      {
        id: 'teen-bodyweight-circuit',
        name: 'Bodyweight Circuit',
        difficulty: 'Intermediate',
        duration: '20 minutes',
        image: '🔄',
        description: 'Full-body circuit with no equipment',
        instructions: [
          '10 Push-ups',
          '15 Squats',
          '10 Lunges each leg',
          '20 Mountain climbers',
          '30-second Plank',
          'Rest 60 seconds, repeat 3 times'
        ],
        benefits: [
          'Builds functional strength',
          'Improves muscular endurance',
          'No equipment needed',
          'Great for sports performance'
        ],
        tips: [
          'Focus on form over speed',
          'Rest only when needed',
          'Progress to harder variations'
        ]
      },
      {
        id: 'teen-pullups',
        name: 'Pull-up Progressions',
        difficulty: 'Advanced',
        duration: '3 sets × max reps',
        image: '⬆️',
        description: 'Build upper body pulling strength',
        instructions: [
          'Start with dead hangs (30 seconds)',
          'Progress to negative pull-ups',
          'Try band-assisted pull-ups',
          'Work toward full pull-ups',
          'Add weight when strong enough'
        ],
        benefits: [
          'Builds back and bicep strength',
          'Improves grip strength',
          'Essential for athletic development',
          'Creates V-taper physique'
        ],
        tips: [
          'Use resistance bands for assistance',
          'Focus on controlled movement',
          'Train pull-ups 2-3 times weekly'
        ]
      }
    ]
  },
  
  sports: {
    id: 'sports',
    name: 'Sports Performance',
    icon: '⚽',
    description: 'Enhance athletic performance',
    color: 'linear-gradient(135deg, #2196F3, #1976D2)',
    exercises: [
      {
        id: 'teen-agility-drills',
        name: 'Agility Ladder Drills',
        difficulty: 'Intermediate',
        duration: '15 minutes',
        image: '🪜',
        description: 'Improve foot speed and coordination',
        instructions: [
          'One foot in each square',
          'Two feet in each square',
          'Icky shuffle: in-in-out pattern',
          'Lateral high knees',
          'Hopscotch pattern'
        ],
        benefits: [
          'Improves foot speed',
          'Enhances coordination',
          'Better body control',
          'Essential for all sports'
        ],
        tips: [
          'Start slow, focus on accuracy',
          'Increase speed gradually',
          'Keep head up, not looking down'
        ]
      },
      {
        id: 'teen-plyometrics',
        name: 'Plyometric Power',
        difficulty: 'Advanced',
        duration: '3 sets × 8 reps',
        image: '⚡',
        description: 'Explosive exercises for athletic power',
        instructions: [
          'Box jumps (start low height)',
          'Jump squats',
          'Clapping push-ups',
          'Broad jumps',
          'Lateral bounds'
        ],
        benefits: [
          'Builds explosive power',
          'Improves vertical jump',
          'Enhances sports performance',
          'Develops fast-twitch muscles'
        ],
        tips: [
          'Land softly with bent knees',
          'Warm up thoroughly first',
          'Quality over quantity'
        ]
      }
    ]
  }
};

// Adult Exercises (20-55 years)
export const adultWorkouts = {
  strength: {
    id: 'strength',
    name: 'Strength Training',
    icon: '🏋️',
    description: 'Build muscle and increase strength',
    color: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    exercises: [
      {
        id: 'adult-full-body',
        name: 'Full Body Strength',
        difficulty: 'Intermediate',
        duration: '45 minutes',
        image: '💪',
        description: 'Complete full-body workout',
        instructions: [
          'Barbell squats: 3×8-10',
          'Bench press: 3×8-10',
          'Bent-over rows: 3×8-10',
          'Overhead press: 3×8-10',
          'Deadlifts: 3×5',
          'Planks: 3×45 seconds'
        ],
        benefits: [
          'Builds total body strength',
          'Increases muscle mass',
          'Improves bone density',
          'Boosts metabolism'
        ],
        tips: [
          'Focus on proper form',
          'Progress weight gradually',
          'Rest 60-90 seconds between sets'
        ]
      },
      {
        id: 'adult-push-pull',
        name: 'Push/Pull Split',
        difficulty: 'Intermediate',
        duration: '40 minutes',
        image: '🔄',
        description: 'Alternate pushing and pulling exercises',
        instructions: [
          'Push Day:',
          '- Dumbbell press: 3×10',
          '- Incline press: 3×10',
          '- Lateral raises: 3×12',
          '- Tricep extensions: 3×12',
          'Pull Day:',
          '- Pull-ups: 3×8',
          '- Cable rows: 3×10',
          '- Face pulls: 3×15',
          '- Bicep curls: 3×12'
        ],
        benefits: [
          'Balanced muscle development',
          'Efficient training split',
          'Prevents overtraining',
          'Great for busy schedules'
        ],
        tips: [
          'Train push/pull on alternating days',
          'Include rest days',
          'Track your progress'
        ]
      }
    ]
  },
  
  cardio: {
    id: 'cardio',
    name: 'Cardio & Conditioning',
    icon: '🏃',
    description: 'Improve cardiovascular health',
    color: 'linear-gradient(135deg, #FF9800, #F57C00)',
    exercises: [
      {
        id: 'adult-hiit',
        name: 'HIIT Cardio',
        difficulty: 'Advanced',
        duration: '20 minutes',
        image: '⚡',
        description: 'High-intensity interval training',
        instructions: [
          'Warm-up: 3 minutes',
          '30 seconds sprint/burpees/jumping jacks',
          '30 seconds rest',
          'Repeat 15 times',
          'Cool-down: 2 minutes'
        ],
        benefits: [
          'Maximum calorie burn',
          'Improves cardiovascular fitness',
          'Increases metabolism',
          'Time-efficient'
        ],
        tips: [
          'Go all-out during work intervals',
          'Use proper form when tired',
          'Stay hydrated'
        ]
      },
      {
        id: 'adult-running',
        name: 'Running Program',
        difficulty: 'Beginner',
        duration: '30 minutes',
        image: '🏃',
        description: 'Build running endurance',
        instructions: [
          'Week 1-2: Run 1 min, walk 2 min × 10',
          'Week 3-4: Run 2 min, walk 1 min × 10',
          'Week 5-6: Run 3 min, walk 1 min × 8',
          'Week 7-8: Run 5 min, walk 1 min × 5',
          'Week 9-10: Run 20-30 minutes continuous'
        ],
        benefits: [
          'Builds cardiovascular endurance',
          'Burns calories',
          'Reduces stress',
          'Improves mental health'
        ],
        tips: [
          'Invest in good running shoes',
          'Listen to your body',
          'Stay consistent'
        ]
      }
    ]
  }
};

// Elderly Exercises (55+ years)
export const elderlyWorkouts = {
  mobility: {
    id: 'mobility',
    name: 'Joint Mobility',
    icon: '🔄',
    description: 'Gentle movements to maintain joint health',
    color: 'linear-gradient(135deg, #2196F3, #1976D2)',
    exercises: [
      {
        id: 'elderly-joint-circles',
        name: 'Joint Mobility Routine',
        difficulty: 'Gentle',
        duration: '15 minutes',
        image: '🔄',
        description: 'Gentle joint rotations and movements',
        instructions: [
          'Neck rolls: 5 each direction',
          'Shoulder circles: 10 forward, 10 back',
          'Arm circles: 10 small, 10 large',
          'Wrist circles: 10 each direction',
          'Hip circles: 10 each direction',
          'Ankle circles: 10 each foot'
        ],
        benefits: [
          'Maintains joint health',
          'Improves range of motion',
          'Reduces stiffness',
          'Prevents injury'
        ],
        tips: [
          'Move slowly and gently',
          'Stop if you feel pain',
          'Breathe deeply throughout',
          'Do daily for best results'
        ]
      },
      {
        id: 'elderly-seated-stretches',
        name: 'Seated Stretches',
        difficulty: 'Gentle',
        duration: '15 minutes',
        image: '🪑',
        description: 'All stretches performed while seated',
        instructions: [
          'Neck stretches: gently tilt head side to side',
          'Shoulder rolls: roll shoulders forward and back',
          'Seated twist: gently twist torso while seated',
          'Hamstring stretch: extend leg, reach toward toes',
          'Ankle pumps: point and flex feet'
        ],
        benefits: [
          'Safe and stable position',
          'Improves flexibility',
          'Can be done anywhere',
          'Gentle on joints'
        ],
        tips: [
          'Use a sturdy chair',
          'Keep back straight',
          'Don\'t bounce - hold stretches gently'
        ]
      }
    ]
  },
  
  balance: {
    id: 'balance',
    name: 'Balance & Stability',
    icon: '⚖️',
    description: 'Exercises to prevent falls and improve stability',
    color: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
    exercises: [
      {
        id: 'elderly-balance-drills',
        name: 'Balance Practice',
        difficulty: 'Gentle',
        duration: '10 minutes',
        image: '⚖️',
        description: 'Gentle balance exercises with support',
        instructions: [
          'Stand near counter or wall for support',
          'Single leg stand: 10 seconds each leg',
          'Heel-to-toe walk: 10 steps',
          'Weight shifts: shift weight side to side',
          'March in place: 20 steps'
        ],
        benefits: [
          'Prevents falls',
          'Builds leg strength',
          'Improves confidence',
          'Maintains independence'
        ],
        tips: [
          'Always have support nearby',
          'Progress gradually',
          'Practice daily'
        ]
      },
      {
        id: 'elderly-tai-chi',
        name: 'Gentle Tai Chi',
        difficulty: 'Gentle',
        duration: '20 minutes',
        image: '🧘',
        description: 'Slow, flowing movements for balance',
        instructions: [
          'Commencing form: raise and lower arms',
          'Part the wild horse\'s mane',
          'White crane spreads wings',
          'Brush knee and push',
          'Cloud hands'
        ],
        benefits: [
          'Improves balance dramatically',
          'Reduces stress',
          'Gentle on joints',
          'Builds leg strength'
        ],
        tips: [
          'Follow along with video',
          'Focus on slow, controlled movements',
          'Breathe with movements'
        ]
      }
    ]
  },
  
  strength: {
    id: 'strength',
    name: 'Gentle Strength',
    icon: '💪',
    description: 'Maintain muscle mass safely',
    color: 'linear-gradient(135deg, #4CAF50, #388E3C)',
    exercises: [
      {
        id: 'elderly-chair-squats',
        name: 'Chair Squats',
        difficulty: 'Gentle',
        duration: '3 sets × 10 reps',
        image: '🪑',
        description: 'Safe squats using a chair',
        instructions: [
          'Stand in front of sturdy chair',
          'Slowly lower as if sitting down',
          'Lightly touch chair then stand up',
          'Use arms for balance if needed'
        ],
        benefits: [
          'Builds leg strength',
          'Improves mobility',
          'Makes sitting/standing easier',
          'Maintains independence'
        ],
        tips: [
          'Go at your own pace',
          'Breathe out when standing',
          'Keep weight in heels'
        ]
      },
      {
        id: 'elderly-wall-pushups',
        name: 'Wall Push-ups',
        difficulty: 'Gentle',
        duration: '3 sets × 10 reps',
        image: '🧱',
        description: 'Safe upper body strengthening',
        instructions: [
          'Stand facing wall, arms length away',
          'Place hands on wall at shoulder height',
          'Slowly bend elbows to lean toward wall',
          'Push back to start'
        ],
        benefits: [
          'Strengthens chest and arms',
          'Safe for shoulders',
          'Improves posture',
          'No floor work needed'
        ],
        tips: [
          'Stand closer for easier',
          'Farther for more challenge',
          'Keep back straight'
        ]
      }
    ]
  },
  
  cardio: {
    id: 'cardio',
    name: 'Gentle Cardio',
    icon: '🚶',
    description: 'Low-impact cardiovascular exercise',
    color: 'linear-gradient(135deg, #FF9800, #F57C00)',
    exercises: [
      {
        id: 'elderly-walking',
        name: 'Walking Program',
        difficulty: 'Gentle',
        duration: '20-30 minutes',
        image: '🚶',
        description: 'Gentle walking for heart health',
        instructions: [
          'Start with 5-10 minute walks',
          'Gradually increase time',
          'Find flat, safe surfaces',
          'Wear comfortable shoes',
          'Walk at conversational pace'
        ],
        benefits: [
          'Improves heart health',
          'Low impact on joints',
          'Boosts mood',
          'Maintains mobility'
        ],
        tips: [
          'Walk with a friend',
          'Use walking poles for stability',
          'Listen to music or podcasts',
          'Stay hydrated'
        ]
      },
      {
        id: 'elderly-seated-cardio',
        name: 'Seated Cardio',
        difficulty: 'Gentle',
        duration: '15 minutes',
        image: '🪑',
        description: 'Cardio exercises while seated',
        instructions: [
          'Seated marching: 1 minute',
          'Arm circles: 30 seconds',
          'Seated jumping jacks: 1 minute',
          'Punching arms: 30 seconds',
          'Leg extensions: 1 minute',
          'Rest, repeat circuit 3 times'
        ],
        benefits: [
          'Safe for limited mobility',
          'Gets heart rate up',
          'Can be done anywhere',
          'Improves circulation'
        ],
        tips: [
          'Use a stable chair',
          'Add light hand weights if able',
          'Keep movements controlled'
        ]
      }
    ]
  }
};

// Fitness Category (General fitness enthusiasts)
export const fitnessWorkouts = {
  hiit: {
    id: 'hiit',
    name: 'HIIT Training',
    icon: '⚡',
    description: 'High-intensity interval training for maximum results',
    color: 'linear-gradient(135deg, #F44336, #D32F2F)',
    exercises: [
      {
        id: 'fitness-hiit-beginner',
        name: 'Beginner HIIT',
        difficulty: 'Beginner',
        duration: '15 minutes',
        image: '⚡',
        description: 'Gentle introduction to HIIT',
        instructions: [
          '20 seconds work, 40 seconds rest',
          'Jumping jacks',
          'High knees (slow pace)',
          'Bodyweight squats',
          'Mountain climbers (slow)',
          'Repeat circuit 5 times'
        ],
        benefits: [
          'Introduces HIIT safely',
          'Builds cardiovascular fitness',
          'Burns calories',
          'Time efficient'
        ],
        tips: [
          'Focus on form, not speed',
          'Listen to your body',
          'Progress when ready'
        ]
      },
      {
        id: 'fitness-hiit-advanced',
        name: 'Advanced HIIT',
        difficulty: 'Advanced',
        duration: '20 minutes',
        image: '⚡',
        description: 'Intense HIIT for experienced fitness enthusiasts',
        instructions: [
          '40 seconds work, 20 seconds rest',
          'Burpees',
          'Jump squats',
          'Mountain climbers (fast)',
          'Box jumps',
          'Battle ropes',
          'Repeat circuit 4 times'
        ],
        benefits: [
          'Maximum calorie burn',
          'Improves athletic performance',
          'Builds endurance',
          'Time efficient'
        ],
        tips: [
          'Give maximum effort',
          'Maintain proper form',
          'Stay hydrated'
        ]
      }
    ]
  },
  
  crossfit: {
    id: 'crossfit',
    name: 'Functional Fitness',
    icon: '🏋️',
    description: 'CrossFit-style functional workouts',
    color: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
    exercises: [
      {
        id: 'fitness-wod',
        name: 'Workout of the Day (WOD)',
        difficulty: 'Advanced',
        duration: '20 minutes',
        image: '📋',
        description: 'CrossFit-style functional workout',
        instructions: [
          'Complete as many rounds as possible in 20 minutes:',
          '5 pull-ups',
          '10 push-ups',
          '15 squats',
          '20 sit-ups'
        ],
        benefits: [
          'Full-body workout',
          'Builds functional strength',
          'Improves endurance',
          'Challenges fitness'
        ],
        tips: [
          'Pace yourself',
          'Scale movements as needed',
          'Track your rounds'
        ]
      }
    ]
  }
};

// Weight Loss Category
export const weightLossWorkouts = {
  hiit: {
    id: 'hiit',
    name: 'Fat Burning HIIT',
    icon: '🔥',
    description: 'High-intensity workouts for maximum calorie burn',
    color: 'linear-gradient(135deg, #F44336, #D32F2F)',
    exercises: [
      {
        id: 'weightloss-hiit-1',
        name: '20-Minute Fat Burner',
        difficulty: 'Intermediate',
        duration: '20 minutes',
        image: '🔥',
        description: 'Intense HIIT for maximum calorie burn',
        instructions: [
          'Warm-up: 3 minutes',
          '30 seconds work, 30 seconds rest',
          'Burpees',
          'Mountain climbers',
          'Jump squats',
          'High knees',
          'Repeat circuit 4 times',
          'Cool-down: 2 minutes'
        ],
        benefits: [
          'Burns up to 300 calories',
          'Increases metabolism',
          'Afterburn effect',
          'Time efficient'
        ],
        tips: [
          'Go all out on work intervals',
          'Maintain good form',
          'Track your progress'
        ]
      }
    ]
  },
  
  cardio: {
    id: 'cardio',
    name: 'Steady State Cardio',
    icon: '🏃',
    description: 'Endurance cardio for fat loss',
    color: 'linear-gradient(135deg, #FF9800, #F57C00)',
    exercises: [
      {
        id: 'weightloss-cardio',
        name: 'Fat Burning Cardio',
        difficulty: 'Beginner',
        duration: '30-45 minutes',
        image: '🏃',
        description: 'Steady-state cardio for fat loss',
        instructions: [
          'Choose your activity: running, cycling, swimming',
          'Maintain steady pace (conversational)',
          'Keep heart rate in fat-burning zone',
          'Aim for 30-45 minutes',
          'Cool down with light stretching'
        ],
        benefits: [
          'Burns fat efficiently',
          'Improves cardiovascular health',
          'Sustainable long sessions',
          'Low stress on body'
        ],
        tips: [
          'Stay in fat-burning zone (60-70% max heart rate)',
          'Stay hydrated',
          'Listen to music or podcasts'
        ]
      }
    ]
  }
};

// Featured Workouts for Homepage
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
  },
  {
    id: 'featured-4',
    name: 'HIIT Blast',
    category: 'weightloss',
    difficulty: 'Advanced',
    duration: '15 min',
    image: '⚡',
    color: 'linear-gradient(135deg, #F44336, #D32F2F)'
  },
  {
    id: 'featured-5',
    name: 'Full Body Fitness',
    category: 'fitness',
    difficulty: 'Intermediate',
    duration: '20 min',
    image: '💪',
    color: 'linear-gradient(135deg, #9C27B0, #7B1FA2)'
  }
];

// Function to get workouts based on user category
export const getWorkoutsByCategory = (userCategory, age) => {
  switch(userCategory) {
    case 'kids':
      return kidsWorkouts;
    case 'teenage':
      return teenageWorkouts;
    case 'adult':
      return adultWorkouts;
    case 'elderly':
      return elderlyWorkouts;
    case 'fitness':
      return fitnessWorkouts;
    case 'weightloss':
      return weightLossWorkouts;
    default:
      // Default to adult if category not found
      return adultWorkouts;
  }
};

// Function to get category display name
export const getCategoryDisplay = (category) => {
  const categories = {
    kids: { name: 'Kids', icon: '🧒', color: '#FF9800' },
    teenage: { name: 'Teenage', icon: '🧑', color: '#9C27B0' },
    adult: { name: 'Adult', icon: '👨', color: '#4CAF50' },
    elderly: { name: 'Elderly', icon: '👴', color: '#2196F3' },
    fitness: { name: 'Fitness', icon: '💪', color: '#9C27B0' },
    weightloss: { name: 'Weight Loss', icon: '⚖️', color: '#F44336' }
  };
  return categories[category] || categories.adult;
};

// Export all workout categories as a combined object
export const workoutCategories = {
  kids: kidsWorkouts,
  teenage: teenageWorkouts,
  adult: adultWorkouts,
  elderly: elderlyWorkouts,
  fitness: fitnessWorkouts,
  weightloss: weightLossWorkouts
};