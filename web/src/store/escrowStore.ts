import { create } from "zustand";

interface EscrowState {
  selectedUserId: string | null;
  assignId: (id: string) => void;
}

export const EscrowStore = create<EscrowState>()((set) => ({
  selectedUserId: null,
  assignId: (id: string) => set({ selectedUserId: id }),
}));
