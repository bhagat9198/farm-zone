import zustand, { create } from "zustand";

export const useProdStore = create((set) => ({
  prods: [],
  checkout: [],
  setProds: (val) => set((state) => {
    return {
      ...state,
      prods: val
    }
  }),
  setCheckout: (val) => set((state) => {
    return {
      ...state,
      checkout: val
    }
  }),

}))