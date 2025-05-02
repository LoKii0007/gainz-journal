import { Workout } from "./workout";

export interface Profile {
  id: string;
  name: string;
  active: boolean;
  userId: string;
  workouts: Workout[];
}

export interface User {
  id: string;
  email: string;
  profiles: Profile[];
}
