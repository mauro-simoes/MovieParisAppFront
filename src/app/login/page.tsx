'use client';

import Navigation from '../components/Navigation';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <LoginForm />
    </main>
  );
} 