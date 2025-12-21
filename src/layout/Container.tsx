import type { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 font-sora">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 py-6">
        {children}
      </div>
    </div>
  )
}