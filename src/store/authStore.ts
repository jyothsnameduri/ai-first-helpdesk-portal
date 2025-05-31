
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'employee' | 'agent' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Mock authentication function
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock user data based on email
  let role: UserRole = 'employee';
  let department = 'General';
  
  if (email.includes('agent')) {
    role = 'agent';
    department = 'IT Support';
  } else if (email.includes('admin')) {
    role = 'admin';
    department = 'Administration';
  }
  
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    role,
    department,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
  };
  
  const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
  
  return { user, token };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(email, password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          // Mock Google login
          await new Promise(resolve => setTimeout(resolve, 800));
          const { user, token } = await mockLogin('user@company.com', 'password');
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
