export type WorkoutType =
  | "Single Day"
  | "Push"
  | "Pull"
  | "Legs"
  | "Upper"
  | "Lower"
  | "Full Body"
  | "Rest";

export type Days =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export const Days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export enum WeightUnit {
  KG = "KG",
  LBS = "LBS"
}

export enum WeightType {
  TOTAL = "TOTAL",
  PER_SIDE = "PER_SIDE"
}

export interface Set {
  id: string;
  reps: number;
  weight: number;
  unit: WeightUnit;
  weightType: WeightType;
  exerciseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  workoutId: string;
  createdAt: string;
}

export interface Workout {
  id: string;
  title: string;
  day: Days;
  profileId: string;
  createdAt: string;
  exerciseIds: string[];
}

export interface ExerciseState {
  exercises: Exercise[];
  selectedExercise: Exercise | null;
  exerciseHistory: Exercise[];
}