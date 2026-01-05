import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Doctor } from '../types';
import mockData, { mockDataUser1 } from '../lib/mockData';
import { setCurrentUserId } from '../lib/mockState';

// Always use mock mode - no Supabase
const USE_MOCK = true;

interface AuthContextType {
  user: User | null;
  doctor: Doctor | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock mode: do not auto-sign-in. let user log in via UI.
    setLoading(false);
  }, []);

  const loadDoctorProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setDoctor(data);
    } catch (error) {
      console.error('Error loading doctor profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock authentication - no Supabase
    if (email === mockData.doctor.email && password === 'Password123!') {
      const demoUser = { id: mockData.doctor.id, email: mockData.doctor.email } as unknown as User;
      setCurrentUserId(mockData.doctor.id);
      setUser(demoUser);
      setDoctor(mockData.doctor);
      return { error: null };
    }

    if (email === mockDataUser1.doctor.email && password === 'user1234') {
      const demoUser = { id: mockDataUser1.doctor.id, email: mockDataUser1.doctor.email } as unknown as User;
      setCurrentUserId(mockDataUser1.doctor.id);
      setUser(demoUser);
      setDoctor(mockDataUser1.doctor);
      return { error: null };
    }

    return { error: new Error('Invalid credentials (demo mode)') };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Mock sign-up: create an in-memory doctor object
    const newDoctor: Doctor = {
      id: '00000000-0000-0000-0000-000000000003',
      email,
      full_name: fullName,
      specialization: '',
      phone: '',
      avatar_url: '',
      clinic_name: '',
      clinic_address: '',
      created_at: new Date().toISOString(),
    };
    const demoUser = { id: newDoctor.id, email: newDoctor.email } as unknown as User;
    setCurrentUserId(newDoctor.id);
    setUser(demoUser);
    setDoctor(newDoctor);
    return { error: null };
  };

  const signOut = async () => {
    // Mock sign out - no Supabase
    setCurrentUserId(null);
    setUser(null);
    setDoctor(null);
  };

  return (
    <AuthContext.Provider value={{ user, doctor, loading, signIn, signUp, signOut }}>
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
