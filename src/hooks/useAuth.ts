"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
    } catch {
      console.error('Failed to sign out');
    }
  };

  return { user, isAuthenticated, loading, signOut };
}
