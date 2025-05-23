import { Workout, WeightUnit, WeightType } from "./workout";

export interface Profile {
  id: string;
  name: string;
  active: boolean;
  userId: string;
  weightUnit: WeightUnit;
  weightType: WeightType;
  workouts: Workout[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  profiles: Profile[];
}
