// Pure calculator engine. No React, no state — just math.
// Easy to unit-test and reason about.

export type Operator = "+" | "-" | "*" | "/"

export type CalculatorState = {
  /** What the display currently shows. */
  display: string
  /** The accumulated value from the previous operation, or null if none. */
  accumulator: number | null
  /** The pending operator waiting for the next operand. */
  pendingOperator: Operator | null
  /** True right after `=` or after a fresh operator press, so the next digit replaces the display. */
  shouldResetDisplay: boolean
}

export const INITIAL_STATE: CalculatorState = {
  display: "0",
  accumulator: null,
  pendingOperator: null,
  shouldResetDisplay: false,
}

const MAX_DIGITS = 12

function format(n: number): string {
  if (!Number.isFinite(n)) return "Error"
  // Trim long decimals but keep integers intact.
  const abs = Math.abs(n)
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
    return n.toExponential(6)
  }
  const str = String(n)
  if (str.length <= MAX_DIGITS) return str
  // Reduce precision until it fits.
  for (let p = 10; p >= 0; p--) {
    const candidate = parseFloat(n.toFixed(p)).toString()
    if (candidate.length <= MAX_DIGITS) return candidate
  }
  return n.toExponential(4)
}

function applyOperator(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "*":
      return a * b
    case "/":
      return b === 0 ? NaN : a / b
  }
}

export function inputDigit(
  state: CalculatorState,
  digit: string
): CalculatorState {
  if (state.shouldResetDisplay) {
    return { ...state, display: digit, shouldResetDisplay: false }
  }
  if (state.display === "0") return { ...state, display: digit }
  if (state.display.replace(/[^\d]/g, "").length >= MAX_DIGITS) return state
  return { ...state, display: state.display + digit }
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.shouldResetDisplay) {
    return { ...state, display: "0.", shouldResetDisplay: false }
  }
  if (state.display.includes(".")) return state
  return { ...state, display: state.display + "." }
}

export function clear(): CalculatorState {
  return { ...INITIAL_STATE }
}

export function toggleSign(state: CalculatorState): CalculatorState {
  if (state.display === "0") return state
  const next = state.display.startsWith("-")
    ? state.display.slice(1)
    : "-" + state.display
  return { ...state, display: next }
}

export function percent(state: CalculatorState): CalculatorState {
  const current = parseFloat(state.display)
  if (!Number.isFinite(current)) return state
  return { ...state, display: format(current / 100), shouldResetDisplay: true }
}

/** Returns the new state plus, when an `=` evaluation just happened, a history entry string. */
export function applyPendingOperator(
  state: CalculatorState,
  nextOperator: Operator | null,
  recordHistory: (entry: string) => void
): CalculatorState {
  const current = parseFloat(state.display)
  if (!Number.isFinite(current)) {
    return { ...INITIAL_STATE, display: "Error" }
  }

  // If user pressed an operator right after another operator, just swap.
  if (state.shouldResetDisplay && nextOperator) {
    return { ...state, pendingOperator: nextOperator }
  }

  if (state.accumulator === null || state.pendingOperator === null) {
    return {
      ...state,
      accumulator: current,
      pendingOperator: nextOperator,
      shouldResetDisplay: true,
    }
  }

  const result = applyOperator(
    state.accumulator,
    current,
    state.pendingOperator
  )
  const expression = `${formatForHistory(state.accumulator)} ${displayOperator(state.pendingOperator)} ${formatForHistory(current)}`
  recordHistory(`${expression} = ${format(result)}`)

  return {
    display: format(result),
    accumulator: nextOperator === null ? null : result,
    pendingOperator: nextOperator,
    shouldResetDisplay: true,
  }
}

export function displayOperator(op: Operator): string {
  switch (op) {
    case "+":
      return "+"
    case "-":
      return "−"
    case "*":
      return "×"
    case "/":
      return "÷"
  }
}

function formatForHistory(n: number): string {
  return format(n)
}

export { format as formatNumber }
