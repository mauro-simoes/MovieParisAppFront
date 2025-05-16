export interface LoginRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  username: string;
}

export interface UserInfoResponse {
  id: number;
  username: string;
  role: string | null;
}

export interface AuthState {
  user: UserInfoResponse | null;
  token: string | null;
  isAuthenticated: boolean;
} 