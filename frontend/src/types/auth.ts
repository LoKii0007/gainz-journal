export interface User {
  id: string;
  email: string;
  profiles: Profile[];
}

export interface Profile {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  imageUrl?: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  email: string | null;
}
