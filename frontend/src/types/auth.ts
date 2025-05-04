import { User } from "./user";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  email: string | null;
  currentProfileId: string | null;
}
