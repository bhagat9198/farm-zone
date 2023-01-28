import zustand, { create } from "zustand";

export const useUserStore = create((set) => ({
  state: false,
  udata: {},
  setData: (val) => set((state: any) => {
    console.log('val :: ', val);
    
    return {
      ...state,
      ...val
    }
  }),

}))