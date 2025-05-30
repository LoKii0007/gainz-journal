// import { User } from "./user";

export type Gender = "MALE" | "FEMALE";

export interface AuthState {
  // user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  currentProfileId: string | null;
  gender: Gender | null;
}
