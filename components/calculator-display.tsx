"use client"

type Props = {
  value: string
}

export function CalculatorDisplay({ value }: Props) {
  // Scale font down for very long numbers so the display never overflows.
  const len = value.length
  const sizeClass =
    len <= 8
      ? "text-6xl"
      : len <= 11
        ? "text-5xl"
        : len <= 14
          ? "text-4xl"
          : "text-3xl"

  return (
    <div
      aria-label="Calculator display"
      role="status"
      aria-live="polite"
      className="flex min-h-24 w-full items-end justify-end px-2 pb-2 font-mono text-foreground tabular-nums"
    >
      <span className={`${sizeClass} truncate font-light tracking-tight`}>
        {value}
      </span>
    </div>
  )
}
