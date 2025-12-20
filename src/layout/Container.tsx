import { ReactNode } from "react"

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 font-sora">
      <div className="mx-auto max-w-md px-4 py-6">
        {children}
      </div>
    </div>
  )
}