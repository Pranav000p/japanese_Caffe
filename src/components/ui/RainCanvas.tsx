'use client'

import { useEffect, useRef } from 'react'

interface RainDrop {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
}

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create rain drops
    const drops: RainDrop[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 4 + Math.random() * 8,
      length: 15 + Math.random() * 25,
      opacity: 0.05 + Math.random() * 0.12,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drops.forEach((drop) => {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length)
        ctx.strokeStyle = `rgba(180, 210, 255, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        drop.y += drop.speed
        if (drop.y > canvas.height) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
