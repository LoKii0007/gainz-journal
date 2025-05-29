import { Workout, WeightUnit, WeightType } from "./workout";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export interface Profile {
  id: string;
  name: string;
  active: boolean;
  userId: string;
  gender?: Gender;
  weightUnit: WeightUnit;
  weightType: WeightType;
  workouts: Workout[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  gender?: Gender;
  profiles: Profile[];
}
