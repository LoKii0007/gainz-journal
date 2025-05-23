export const WORKOUT_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface GymExercise {
  label: string;
  value: string;
  image: string;
  category: string;
}

export const weightMeasurements = [
  {
    label: "total",
    value: "TOTAL",
  },
  {
    label: "per side",
    value: "PER_SIDE",
  },
];

export const weightUnits = [
  {
    label: "kg",
    value: "KG",
  },
  {
    label: "lbs",
    value: "LBS",
  },
];

export const allGymExercises: GymExercise[] = [
  // Weighted - Upper Body
  {
    label: "Bench Press",
    value: "BENCH_PRESS",
    image: "/images/exercises/bench-press.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Incline Bench Press",
    value: "INCLINE_BENCH_PRESS",
    image: "/images/exercises/incline-bench-press.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Decline Bench Press",
    value: "DECLINE_BENCH_PRESS",
    image: "/images/exercises/decline-bench-press.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Chest Fly",
    value: "CHEST_FLY",
    image: "/images/exercises/chest-fly.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Cable Fly",
    value: "CABLE_FLY",
    image: "/images/exercises/cable-fly.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Dumbbell Pullover",
    value: "DUMBBELL_PULLOVER",
    image: "/images/exercises/dumbbell-pullover.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Overhead Press",
    value: "OVERHEAD_PRESS",
    image: "/images/exercises/overhead-press.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Arnold Press",
    value: "ARNOLD_PRESS",
    image: "/images/exercises/arnold-press.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Lateral Raises",
    value: "LATERAL_RAISES",
    image: "/images/exercises/lateral-raises.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Front Raises",
    value: "FRONT_RAISES",
    image: "/images/exercises/front-raises.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Bent-Over Rear Delt Fly",
    value: "BENT_OVER_REAR_DELT_FLY",
    image: "/images/exercises/bent-over-rear-delt-fly.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Face Pulls",
    value: "FACE_PULLS",
    image: "/images/exercises/face-pulls.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Upright Rows",
    value: "UPRIGHT_ROWS",
    image: "/images/exercises/upright-rows.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Barbell Curl",
    value: "BARBELL_CURL",
    image: "/images/exercises/barbell-curl.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Dumbbell Curl",
    value: "DUMBBELL_CURL",
    image: "/images/exercises/dumbbell-curl.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Hammer Curls",
    value: "HAMMER_CURLS",
    image: "/images/exercises/hammer-curls.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Preacher Curl",
    value: "PREACHER_CURL",
    image: "/images/exercises/preacher-curl.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Concentration Curl",
    value: "CONCENTRATION_CURL",
    image: "/images/exercises/concentration-curl.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Cable Triceps Pushdown",
    value: "CABLE_TRICEPS_PUSHDOWN",
    image: "/images/exercises/cable-triceps-pushdown.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Skull Crushers",
    value: "SKULL_CRUSHERS",
    image: "/images/exercises/skull-crushers.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Overhead Triceps Extension",
    value: "OVERHEAD_TRICEPS_EXTENSION",
    image: "/images/exercises/overhead-triceps-extension.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Dumbbell Triceps Kickback",
    value: "DUMBBELL_TRICEPS_KICKBACK",
    image: "/images/exercises/dumbbell-triceps-kickback.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Lat Pulldown",
    value: "LAT_PULLDOWN",
    image: "/images/exercises/lat-pulldown.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Close-Grip Lat Pulldown",
    value: "CLOSE_GRIP_LAT_PULLDOWN",
    image: "/images/exercises/close-grip-lat-pulldown.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Seated Row",
    value: "SEATED_ROW",
    image: "/images/exercises/seated-row.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Barbell Row",
    value: "BARBELL_ROW",
    image: "/images/exercises/barbell-row.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Dumbbell Row",
    value: "DUMBBELL_ROW",
    image: "/images/exercises/dumbbell-row.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Meadows Row",
    value: "MEADOWS_ROW",
    image: "/images/exercises/meadows-row.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "T-Bar Row",
    value: "T_BAR_ROW",
    image: "/images/exercises/t-bar-row.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Shrugs",
    value: "SHRUGS",
    image: "/images/exercises/shrugs.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Reverse Pec Deck",
    value: "REVERSE_PEC_DECK",
    image: "/images/exercises/reverse-pec-deck.jpg",
    category: "Weighted - Upper Body",
  },
  {
    label: "Chest-Supported Row",
    value: "CHEST_SUPPORTED_ROW",
    image: "/images/exercises/chest-supported-row.jpg",
    category: "Weighted - Upper Body",
  },

  // Weighted - Lower Body
  {
    label: "Barbell Back Squat",
    value: "BARBELL_BACK_SQUAT",
    image: "/images/exercises/barbell-back-squat.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Front Squat",
    value: "FRONT_SQUAT",
    image: "/images/exercises/front-squat.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Hack Squat",
    value: "HACK_SQUAT",
    image: "/images/exercises/hack-squat.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Leg Press",
    value: "LEG_PRESS",
    image: "/images/exercises/leg-press.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Romanian Deadlift",
    value: "ROMANIAN_DEADLIFT",
    image: "/images/exercises/romanian-deadlift.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Conventional Deadlift",
    value: "CONVENTIONAL_DEADLIFT",
    image: "/images/exercises/conventional-deadlift.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Sumo Deadlift",
    value: "SUMO_DEADLIFT",
    image: "/images/exercises/sumo-deadlift.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Bulgarian Split Squat",
    value: "BULGARIAN_SPLIT_SQUAT",
    image: "/images/exercises/bulgarian-split-squat.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Lunges",
    value: "LUNGES",
    image: "/images/exercises/lunges.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Reverse Lunges",
    value: "REVERSE_LUNGES",
    image: "/images/exercises/reverse-lunges.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Side Lunges",
    value: "SIDE_LUNGES",
    image: "/images/exercises/side-lunges.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Leg Curl Machine",
    value: "LEG_CURL_MACHINE",
    image: "/images/exercises/leg-curl-machine.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Leg Extension Machine",
    value: "LEG_EXTENSION_MACHINE",
    image: "/images/exercises/leg-extension-machine.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Hip Thrust",
    value: "HIP_THRUST",
    image: "/images/exercises/hip-thrust.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Good Mornings",
    value: "GOOD_MORNINGS",
    image: "/images/exercises/good-mornings.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Box Jumps",
    value: "BOX_JUMPS",
    image: "/images/exercises/box-jumps.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Calf Raises",
    value: "CALF_RAISES",
    image: "/images/exercises/calf-raises.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Donkey Calf Raises",
    value: "DONKEY_CALF_RAISES",
    image: "/images/exercises/donkey-calf-raises.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Sissy Squats",
    value: "SISSY_SQUATS",
    image: "/images/exercises/sissy-squats.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Nordic Hamstring Curls",
    value: "NORDIC_HAMSTRING_CURLS",
    image: "/images/exercises/nordic-hamstring-curls.jpg",
    category: "Weighted - Lower Body",
  },
  {
    label: "Goblet Squats",
    value: "GOBLET_SQUATS",
    image: "/images/exercises/goblet-squats.jpg",
    category: "Weighted - Lower Body",
  },

  // Weighted - Core
  {
    label: "Cable Crunch",
    value: "CABLE_CRUNCH",
    image: "/images/exercises/cable-crunch.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Weighted Sit-Ups",
    value: "WEIGHTED_SIT_UPS",
    image: "/images/exercises/weighted-sit-ups.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Weighted Russian Twists",
    value: "WEIGHTED_RUSSIAN_TWISTS",
    image: "/images/exercises/weighted-russian-twists.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Ab Rollout",
    value: "AB_ROLLOUT",
    image: "/images/exercises/ab-rollout.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Dumbbell Side Bend",
    value: "DUMBBELL_SIDE_BEND",
    image: "/images/exercises/dumbbell-side-bend.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Landmine Rotations",
    value: "LANDMINE_ROTATIONS",
    image: "/images/exercises/landmine-rotations.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Weighted Planks",
    value: "WEIGHTED_PLANKS",
    image: "/images/exercises/weighted-planks.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Pallof Press",
    value: "PALLOF_PRESS",
    image: "/images/exercises/pallof-press.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Medicine Ball Slams",
    value: "MEDICINE_BALL_SLAMS",
    image: "/images/exercises/medicine-ball-slams.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Turkish Get-Ups",
    value: "TURKISH_GET_UPS",
    image: "/images/exercises/turkish-get-ups.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Hanging Oblique Raises",
    value: "HANGING_OBLIQUE_RAISES",
    image: "/images/exercises/hanging-oblique-raises.jpg",
    category: "Weighted - Core",
  },
  {
    label: "Cable Woodchoppers",
    value: "CABLE_WOODCHOPPERS",
    image: "/images/exercises/cable-woodchoppers.jpg",
    category: "Weighted - Core",
  },

  // Calisthenics - Push
  {
    label: "Push-Ups",
    value: "PUSH_UPS",
    image: "/images/exercises/push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Diamond Push-Ups",
    value: "DIAMOND_PUSH_UPS",
    image: "/images/exercises/diamond-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Archer Push-Ups",
    value: "ARCHER_PUSH_UPS",
    image: "/images/exercises/archer-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Pseudo Planche Push-Ups",
    value: "PSEUDO_PLANCH_PUSH_UPS",
    image: "/images/exercises/pseudo-planche-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Pike Push-Ups",
    value: "PIKE_PUSH_UPS",
    image: "/images/exercises/pike-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Handstand Push-Ups",
    value: "HANDSTAND_PUSH_UPS",
    image: "/images/exercises/handstand-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Wall Handstand Push-Ups",
    value: "WALL_HANDSTAND_PUSH_UPS",
    image: "/images/exercises/wall-handstand-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Decline Push-Ups",
    value: "DECLINE_PUSH_UPS",
    image: "/images/exercises/decline-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Explosive Push-Ups",
    value: "EXPLOSIVE_PUSH_UPS",
    image: "/images/exercises/explosive-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "One-Arm Push-Ups",
    value: "ONE_ARM_PUSH_UPS",
    image: "/images/exercises/one-arm-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Ring Push-Ups",
    value: "RING_PUSH_UPS",
    image: "/images/exercises/ring-push-ups.jpg",
    category: "Calisthenics - Push",
  },
  {
    label: "Superman Push-Ups",
    value: "SUPERMAN_PUSH_UPS",
    image: "/images/exercises/superman-push-ups.jpg",
    category: "Calisthenics - Push",
  },

  // Calisthenics - Pull
  {
    label: "Pull-Ups",
    value: "PULL_UPS",
    image: "/images/exercises/pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Chin-Ups",
    value: "CHIN_UPS",
    image: "/images/exercises/chin-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Neutral Grip Pull-Ups",
    value: "NEUTRAL_GRIP_PULL_UPS",
    image: "/images/exercises/neutral-grip-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Wide Grip Pull-Ups",
    value: "WIDE_GRIP_PULL_UPS",
    image: "/images/exercises/wide-grip-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Close Grip Pull-Ups",
    value: "CLOSE_GRIP_PULL_UPS",
    image: "/images/exercises/close-grip-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Commando Pull-Ups",
    value: "COMMANDO_PULL_UPS",
    image: "/images/exercises/commando-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Archer Pull-Ups",
    value: "ARCHER_PULL_UPS",
    image: "/images/exercises/archer-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "L-Sit Pull-Ups",
    value: "L_SIT_PULL_UPS",
    image: "/images/exercises/l-sit-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Typewriter Pull-Ups",
    value: "TYPEWRITER_PULL_UPS",
    image: "/images/exercises/typewriter-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Australian Pull-Ups",
    value: "AUSTRALIAN_PULL_UPS",
    image: "/images/exercises/australian-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Ring Rows",
    value: "RING_ROWS",
    image: "/images/exercises/ring-rows.jpg",
    category: "Calisthenics - Pull",
  },
  {
    label: "Scapular Pull-Ups",
    value: "SCAPULAR_PULL_UPS",
    image: "/images/exercises/scapular-pull-ups.jpg",
    category: "Calisthenics - Pull",
  },

  // Calisthenics - Core
  {
    label: "Plank",
    value: "PLANK",
    image: "/images/exercises/plank.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Side Plank",
    value: "SIDE_PLANK",
    image: "/images/exercises/side-plank.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "RKC Plank",
    value: "RKC_PLANK",
    image: "/images/exercises/rkc-plank.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Hanging Leg Raises",
    value: "HANGING_LEG_RAISES",
    image: "/images/exercises/hanging-leg-raises.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Toes to Bar",
    value: "TOES_TO_BAR",
    image: "/images/exercises/toes-to-bar.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "L-Sit",
    value: "L_SIT",
    image: "/images/exercises/l-sit.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "V-Ups",
    value: "V_UPS",
    image: "/images/exercises/v-ups.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Hollow Body Hold",
    value: "HOLLOW_BODY_HOLD",
    image: "/images/exercises/hollow-body-hold.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Bicycle Crunches",
    value: "BICYCLE_CRUNCHES",
    image: "/images/exercises/bicycle-crunches.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Dragon Flag",
    value: "DRAGON_FLAG",
    image: "/images/exercises/dragon-flag.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Flutter Kicks",
    value: "FLUTTER_KICKS",
    image: "/images/exercises/flutter-kicks.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Dead Bug",
    value: "DEAD_BUG",
    image: "/images/exercises/dead-bug.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Bird Dog",
    value: "BIRD_DOG",
    image: "/images/exercises/bird-dog.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Superman Hold",
    value: "SUPERMAN_HOLD",
    image: "/images/exercises/superman-hold.jpg",
    category: "Calisthenics - Core",
  },
  {
    label: "Windshield Wipers",
    value: "WINDSHIELD_WIPERS",
    image: "/images/exercises/windshield-wipers.jpg",
    category: "Calisthenics - Core",
  },

  // Calisthenics - Lower Body
  {
    label: "Bodyweight Squats",
    value: "BODYWEIGHT_SQUATS",
    image: "/images/exercises/bodyweight-squats.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Jump Squats",
    value: "JUMP_SQUATS",
    image: "/images/exercises/jump-squats.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Wall Sit",
    value: "WALL_SIT",
    image: "/images/exercises/wall-sit.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Glute Bridge",
    value: "GLUTE_BRIDGE",
    image: "/images/exercises/glute-bridge.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Single-Leg Glute Bridge",
    value: "SINGLE_LEG_GLUTE_BRIDGE",
    image: "/images/exercises/single-leg-glute-bridge.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Step-Ups",
    value: "STEP_UPS",
    image: "/images/exercises/step-ups.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Pistol Squats",
    value: "PISTOL_SQUATS",
    image: "/images/exercises/pistol-squats.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Shrimp Squats",
    value: "SHRIMP_SQUATS",
    image: "/images/exercises/shrimp-squats.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Cossack Squats",
    value: "COSSACK_SQUATS",
    image: "/images/exercises/cossack-squats.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Jump Lunges",
    value: "JUMP_LUNGES",
    image: "/images/exercises/jump-lunges.jpg",
    category: "Calisthenics - Lower Body",
  },
  {
    label: "Broad Jumps",
    value: "BROAD_JUMPS",
    image: "/images/exercises/broad-jumps.jpg",
    category: "Calisthenics - Lower Body",
  },

  // Calisthenics - Full Body / Advanced
  {
    label: "Burpees",
    value: "BURPEES",
    image: "/images/exercises/burpees.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Mountain Climbers",
    value: "MOUNTAIN_CLIMBERS",
    image: "/images/exercises/mountain-climbers.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Muscle-Ups",
    value: "MUSCLE_UPS",
    image: "/images/exercises/muscle-ups.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Ring Muscle-Ups",
    value: "RING_MUSCLE_UPS",
    image: "/images/exercises/ring-muscle-ups.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Planche",
    value: "PLANCH",
    image: "/images/exercises/planche.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Front Lever",
    value: "FRONT_LEVER",
    image: "/images/exercises/front-lever.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Back Lever",
    value: "BACK_LEVER",
    image: "/images/exercises/back-lever.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Human Flag",
    value: "HUMAN_FLAG",
    image: "/images/exercises/human-flag.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Iron Cross",
    value: "IRON_CROSS",
    image: "/images/exercises/iron-cross.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Handstand",
    value: "HANDSTAND",
    image: "/images/exercises/handstand.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "One-Arm Handstand",
    value: "ONE_ARM_HANDSTAND",
    image: "/images/exercises/one-arm-handstand.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Victorian Cross",
    value: "VICTORIAN_CROSS",
    image: "/images/exercises/victorian-cross.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Maltese Cross",
    value: "MALTESE_CROSS",
    image: "/images/exercises/maltese-cross.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "360 Pull-Ups",
    value: "THREE_SIXTY_PULL_UPS",
    image: "/images/exercises/360-pull-ups.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
  {
    label: "Hefesto",
    value: "HEFESTO",
    image: "/images/exercises/hefesto.jpg",
    category: "Calisthenics - Full Body / Advanced",
  },
];
