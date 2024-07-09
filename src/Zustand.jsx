import { create } from "zustand";

const useTodoStore = create((set) => ({
  text: { val1: "", val2: "" },
  setText: (val, key) =>
    set((state) => ({
      text: { ...state.text, [key]: val },
    })),
}));

export default useTodoStore;
