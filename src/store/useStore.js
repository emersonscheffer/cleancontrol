import { create } from "zustand";

export const useStore = create((set) => ({
  houses: [],
  cleaners: [],
  jobs: [],
  events: [],

  setHouses: (houses) => set({ houses }),
  setCleaners: (cleaners) => set({ cleaners }),
  setJobs: (jobs) => set({ jobs }),
  setEvents: (events) => set({ events }),
}));
