import type { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 font-sora">
      <div className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 py-6 md:py-12">
        {children}
      </div>
    </div>
  )
}