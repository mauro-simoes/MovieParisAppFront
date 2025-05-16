export interface AuthState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

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