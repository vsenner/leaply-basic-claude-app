"use client"

import { useCalculator } from "@/hooks/use-calculator"
import { CalculatorDisplay } from "@/components/calculator-display"
import { CalculatorKeypad } from "@/components/calculator-keypad"

export function Calculator() {
  const {
    state,
    pressDigit,
    pressDecimal,
    pressOperator,
    pressEquals,
    pressClear,
    pressToggleSign,
    pressPercent,
  } = useCalculator()

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <CalculatorDisplay value={state.display} />
      <CalculatorKeypad
        pendingOperator={state.pendingOperator}
        onDigit={pressDigit}
        onDecimal={pressDecimal}
        onOperator={pressOperator}
        onEquals={pressEquals}
        onClear={pressClear}
        onToggleSign={pressToggleSign}
        onPercent={pressPercent}
      />
    </div>
  )
}
