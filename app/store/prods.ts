import zustand, { create } from "zustand";

export const useProdStore = create((set) => ({
  prods: [],
  setProds: (val) => set((state: any) => {
    return {
      ...state,
      ...val
    }
  }),

}))