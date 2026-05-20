"use client"

import { useCallback, useEffect, useState } from "react"

import {
  applyPendingOperator,
  clear,
  inputDecimal,
  inputDigit,
  INITIAL_STATE,
  percent,
  toggleSign,
  type CalculatorState,
  type Operator,
} from "@/lib/calculator-engine"
import { useCalculatorHistoryStore } from "@/lib/stores/calculator-history-store"

export type CalculatorActions = {
  state: CalculatorState
  pressDigit: (d: string) => void
  pressDecimal: () => void
  pressOperator: (op: Operator) => void
  pressEquals: () => void
  pressClear: () => void
  pressToggleSign: () => void
  pressPercent: () => void
}

export function useCalculator(): CalculatorActions {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)
  const addToHistory = useCalculatorHistoryStore((s) => s.add)

  const pressDigit = useCallback((d: string) => {
    setState((s) => inputDigit(s, d))
  }, [])

  const pressDecimal = useCallback(() => {
    setState((s) => inputDecimal(s))
  }, [])

  const pressOperator = useCallback(
    (op: Operator) => {
      setState((s) => applyPendingOperator(s, op, addToHistory))
    },
    [addToHistory]
  )

  const pressEquals = useCallback(() => {
    setState((s) => applyPendingOperator(s, null, addToHistory))
  }, [addToHistory])

  const pressClear = useCallback(() => {
    setState(() => clear())
  }, [])

  const pressToggleSign = useCallback(() => {
    setState((s) => toggleSign(s))
  }, [])

  const pressPercent = useCallback(() => {
    setState((s) => percent(s))
  }, [])

  // Keyboard support.
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return
      const k = e.key
      if (/^[0-9]$/.test(k)) {
        e.preventDefault()
        pressDigit(k)
      } else if (k === ".") {
        e.preventDefault()
        pressDecimal()
      } else if (k === "+" || k === "-") {
        e.preventDefault()
        pressOperator(k)
      } else if (k === "*" || k === "x" || k === "X") {
        e.preventDefault()
        pressOperator("*")
      } else if (k === "/") {
        e.preventDefault()
        pressOperator("/")
      } else if (k === "Enter" || k === "=") {
        e.preventDefault()
        pressEquals()
      } else if (k === "%") {
        e.preventDefault()
        pressPercent()
      } else if (k === "Escape" || k === "c" || k === "C") {
        e.preventDefault()
        pressClear()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [
    pressDigit,
    pressDecimal,
    pressOperator,
    pressEquals,
    pressClear,
    pressPercent,
  ])

  return {
    state,
    pressDigit,
    pressDecimal,
    pressOperator,
    pressEquals,
    pressClear,
    pressToggleSign,
    pressPercent,
  }
}
