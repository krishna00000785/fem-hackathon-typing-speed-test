declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    origin?: {
      x?: number
      y?: number
    }
  }

  function confetti(options?: ConfettiOptions): void

  export default confetti
}
