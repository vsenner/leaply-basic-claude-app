import { Calculator } from "@/components/calculator"
import { CalculatorHistory } from "@/components/calculator-history"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-start">
        <div className="flex flex-1 justify-center">
          <Calculator />
        </div>
        <div className="md:w-72">
          <CalculatorHistory />
        </div>
      </div>
    </main>
  )
}
