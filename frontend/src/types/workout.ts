export type WorkoutType =
  | "Single Day"
  | "Push"
  | "Pull"
  | "Legs"
  | "Upper"
  | "Lower"
  | "Full Body"
  | "Rest";

export type Days = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

export const Days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export interface Workout {
  id: string;
  title: string;
  day: Days;
  profileId: string;
  createdAt: string;
  exercises: Exercise[];
}

export interface WorkoutState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  selectedWorkout: Workout | null;
}

export interface Set {
  id: string;
  reps: number;
  weight: number;
  exerciseId: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  workoutId: string;
  sets: Set[];
  createdAt: string;
}

export interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  selectedExercise: Exercise | null;
  exerciseHistory: Exercise[];
}
