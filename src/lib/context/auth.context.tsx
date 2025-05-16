import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginRequest, UserInfoResponse } from '../types/auth';
import { AuthService } from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = AuthService.getToken();
      if (token) {
        try {
          const user = await AuthService.getCurrentUser();
          setState({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          AuthService.removeToken();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await AuthService.login(credentials);
      AuthService.setToken(response.token);
      const user = await AuthService.getCurrentUser();
      
      setState({
        user,
        token: response.token,
        isAuthenticated: true,
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    AuthService.removeToken();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 