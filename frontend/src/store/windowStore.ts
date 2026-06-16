import { create } from "zustand";

interface WindowStore {
  missionLogOpen: boolean;
  setMissionLogOpen: (open: boolean) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  missionLogOpen: true,
  setMissionLogOpen: (open) =>
    set({ missionLogOpen: open }),
}));