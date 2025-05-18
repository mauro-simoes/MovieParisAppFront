'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginRequest } from '../types/auth';
import { UserService } from '../../app/services/UserService';
import { User } from '@/app/models/User';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    username: null,
    token: null,
    isAuthenticated: false,
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await UserService.getCurrentUser();
          setState({
            username: response.username,
            token,
            isAuthenticated: true,
          });
          setUser(response);
        } catch (error) {
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await UserService.authenticate(credentials.username, credentials.password);
      if (response) {
        localStorage.setItem('auth_token', response.token);
        const userResponse = await UserService.getCurrentUser();
        setState({
          username: response.username,
          token: response.token,
          isAuthenticated: true,
        });
        setUser(userResponse);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setState({
      username: null,
      token: null,
      isAuthenticated: false,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, loading, user }}>
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