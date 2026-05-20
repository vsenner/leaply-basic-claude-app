// Calculator history store. Persists across reloads via localStorage.

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type HistoryEntry = {
  id: string
  expression: string
  /** Unix ms timestamp. */
  at: number
}

type HistoryState = {
  entries: HistoryEntry[]
  add: (expression: string) => void
  clear: () => void
}

const MAX_ENTRIES = 50

export const useCalculatorHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      add: (expression) =>
        set((state) => ({
          entries: [
            { id: crypto.randomUUID(), expression, at: Date.now() },
            ...state.entries,
          ].slice(0, MAX_ENTRIES),
        })),
      clear: () => set({ entries: [] }),
    }),
    { name: "leaply-calculator-history" }
  )
)
