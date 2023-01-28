import zustand, { create } from "zustand";

export const useAppStateStore = create((set) => ({
  userAuthenticated: false,

  setUserAuthenticated: (val: string) => set((state: any) => {
    return {
      ...state
    }
  })
}))