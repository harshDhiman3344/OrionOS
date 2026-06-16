import { create } from "zustand";

interface WindowState {
  missionLogOpen: boolean;
  setMissionLogOpen: (open: boolean) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  missionLogOpen: true,

  setMissionLogOpen: (open) =>
    set({ missionLogOpen: open }),
}));

