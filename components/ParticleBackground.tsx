"use client"
import { useCallback } from "react"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions, Engine } from "@tsparticles/engine"

const OPTIONS: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: ["#6c3de8", "#e83d87", "#aaaaaa"] },
    links: {
      enable: true,
      color: "#6c3de8",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      outModes: { default: "bounce" },
    },
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
}

function ParticlesInner() {
  return (
    <Particles
      id="tsparticles"
      options={OPTIONS}
      className="absolute inset-0 z-0"
    />
  )
}

export default function ParticleBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <ParticlesProvider init={init}>
      <ParticlesInner />
    </ParticlesProvider>
  )
}
