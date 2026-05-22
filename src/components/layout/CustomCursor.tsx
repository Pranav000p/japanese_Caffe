'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const ringSpringConfig = { stiffness: 100, damping: 20, mass: 0.2 }

  const dotX = useSpring(cursorX, springConfig)
  const dotY = useSpring(cursorY, springConfig)
  const ringX = useSpring(cursorX, ringSpringConfig)
  const ringY = useSpring(cursorY, ringSpringConfig)

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return

    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Small amber dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          x: dotX,
          y: dotY,
          width: isHovering ? 0 : 8,
          height: isHovering ? 0 : 8,
          backgroundColor: 'var(--amber)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: '1.5px solid rgba(212, 134, 58, 0.3)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: isHovering ? 'difference' : 'normal',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </>
  )
}
