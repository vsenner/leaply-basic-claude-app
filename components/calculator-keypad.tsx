"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Operator } from "@/lib/calculator-engine"

type Props = {
  pendingOperator: Operator | null
  onDigit: (d: string) => void
  onDecimal: () => void
  onOperator: (op: Operator) => void
  onEquals: () => void
  onClear: () => void
  onToggleSign: () => void
  onPercent: () => void
}

type Kind = "digit" | "function" | "operator" | "equals"

const baseBtn =
  "h-16 rounded-2xl text-2xl font-medium transition-colors active:scale-[0.97]"
const digitBtn = "bg-secondary text-secondary-foreground hover:bg-secondary/80"
const fnBtn = "bg-muted text-muted-foreground hover:bg-muted/70"
const opBtn = "bg-primary text-primary-foreground hover:bg-primary/90"
const opActiveBtn =
  "bg-primary-foreground text-primary hover:bg-primary-foreground/90"

function kindClass(kind: Kind, active = false): string {
  switch (kind) {
    case "digit":
      return digitBtn
    case "function":
      return fnBtn
    case "operator":
    case "equals":
      return active ? opActiveBtn : opBtn
  }
}

export function CalculatorKeypad({
  pendingOperator,
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onToggleSign,
  onPercent,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("function"))}
        onClick={onClear}
      >
        AC
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("function"))}
        onClick={onToggleSign}
      >
        ±
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("function"))}
        onClick={onPercent}
      >
        %
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("operator", pendingOperator === "/"))}
        onClick={() => onOperator("/")}
      >
        ÷
      </Button>

      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("7")}
      >
        7
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("8")}
      >
        8
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("9")}
      >
        9
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("operator", pendingOperator === "*"))}
        onClick={() => onOperator("*")}
      >
        ×
      </Button>

      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("4")}
      >
        4
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("5")}
      >
        5
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("6")}
      >
        6
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("operator", pendingOperator === "-"))}
        onClick={() => onOperator("-")}
      >
        −
      </Button>

      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("1")}
      >
        1
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("2")}
      >
        2
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={() => onDigit("3")}
      >
        3
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("operator", pendingOperator === "+"))}
        onClick={() => onOperator("+")}
      >
        +
      </Button>

      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"), "col-span-2")}
        onClick={() => onDigit("0")}
      >
        0
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("digit"))}
        onClick={onDecimal}
      >
        .
      </Button>
      <Button
        variant="ghost"
        className={cn(baseBtn, kindClass("equals"))}
        onClick={onEquals}
      >
        =
      </Button>
    </div>
  )
}
