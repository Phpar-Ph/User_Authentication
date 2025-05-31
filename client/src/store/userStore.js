import { create } from "zustand";
import { isAuth, getUserData } from "../api/userApi";

export const userViewStore = create((set) => ({
  view: "login",
  setView: (view) => set({ view }),
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLogin: false,

  checkAuth: async () => {
    try {
      const authResult = await isAuth();
      if (authResult?.success) {
        const userData = await getUserData();
        set({
          isAuthenticated: true,
          user: userData,
          loading: false,
          isLogin: true,
        });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      set(error.message, { isAuthenticated: false, user: null });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
