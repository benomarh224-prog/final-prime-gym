import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PageName = 'home' | 'workouts' | 'exercise-detail' | 'ai-coach' | 'dashboard' | 'nutrition' | 'contact';

interface AppState {
  currentPage: PageName;
  selectedExerciseId: string | null;
  sidebarOpen: boolean;
  favorites: string[];
  // User profile
  userName: string;
  userAvatar: string;
  userWeight: number;
  userHeight: number;
  userGoal: string;
  userLevel: string;
  weeklyGoal: number;
  // Actions
  navigate: (page: PageName) => void;
  setExerciseId: (id: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleFavorite: (exerciseId: string) => void;
  setUserProfile: (data: {
    name?: string;
    avatar?: string;
    weight?: number;
    height?: number;
    goal?: string;
    level?: string;
    weeklyGoal?: number;
  }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'home',
      selectedExerciseId: null,
      sidebarOpen: false,
      favorites: [],
      userName: '',
      userAvatar: '',
      userWeight: 75,
      userHeight: 175,
      userGoal: 'lose_weight',
      userLevel: 'intermediate',
      weeklyGoal: 5,
      navigate: (page) => set({ currentPage: page }),
      setExerciseId: (id) => set({ selectedExerciseId: id, currentPage: 'exercise-detail' }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleFavorite: (exerciseId) => set((s) => ({
        favorites: s.favorites.includes(exerciseId)
          ? s.favorites.filter((id) => id !== exerciseId)
          : [...s.favorites, exerciseId]
      })),
      setUserProfile: (data) => set(data),
    }),
    {
      name: 'primeforge-profile',
      // Only persist profile-related fields (not navigation state)
      partialize: (state) => ({
        userName: state.userName,
        userAvatar: state.userAvatar,
        userWeight: state.userWeight,
        userHeight: state.userHeight,
        userGoal: state.userGoal,
        userLevel: state.userLevel,
        weeklyGoal: state.weeklyGoal,
        favorites: state.favorites,
      }),
    }
  )
);
