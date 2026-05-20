"use client"

import { useCalculatorHistoryStore } from "@/lib/stores/calculator-history-store"
import { Button } from "@/components/ui/button"

export function CalculatorHistory() {
  const entries = useCalculatorHistoryStore((s) => s.entries)
  const clearHistory = useCalculatorHistoryStore((s) => s.clear)

  return (
    <aside className="flex h-full w-full flex-col gap-3 rounded-3xl border border-border bg-card p-5 text-card-foreground">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-wide uppercase">History</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          disabled={entries.length === 0}
          className="h-7 px-2 text-xs text-muted-foreground"
        >
          Clear
        </Button>
      </header>

      {entries.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No calculations yet.
        </p>
      ) : (
        <ol className="flex flex-col gap-2 overflow-y-auto pr-1">
          {entries.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-border/60 px-3 py-2 font-mono text-sm tabular-nums"
            >
              {e.expression}
            </li>
          ))}
        </ol>
      )}
    </aside>
  )
}
