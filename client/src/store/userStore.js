import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  useGetUserData as getUser,
  useGetUserAuth as isAuth,
} from "../api/userApi";

export const useLoginStateStore = create(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (isLogin) => set({ isLogin }),
    }),
    {
      name: "login-state",
    }
  )
);
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  setUserData: null,

  checkAuth: async () => {
    try {
      const authResult = isAuth();
      if (authResult?.isSuccess) {
        const userData = getUser();
        set({
          isAuthenticated: true,
          user: userData,
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
