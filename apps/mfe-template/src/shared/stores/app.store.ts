import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  theme: "light" | "dark";
  language: string;
  isOnline: boolean;
  lastActivity: Date;
};

type AppActions = {
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (language: string) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  updateLastActivity: () => void;
  toggleTheme: () => void;
};

type AppStore = AppState & AppActions;

const initialState: AppState = {
  theme: "light",
  language: "en",
  isOnline: true,
  lastActivity: new Date(),
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTheme: theme => set({ theme }),

      setLanguage: language => set({ language }),

      setOnlineStatus: isOnline => set({ isOnline }),

      updateLastActivity: () => set({ lastActivity: new Date() }),

      toggleTheme: () => {
        const { theme } = get();
        set({ theme: theme === "light" ? "dark" : "light" });
      },
    }),
    {
      name: "app-storage",
      partialize: state => ({
        theme: state.theme,
        language: state.language,
      }),
    },
  ),
);
