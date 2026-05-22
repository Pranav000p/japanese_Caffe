'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* Kanji label */}
      <span
        className="text-xs tracking-widest font-mincho"
        style={{
          writingMode: 'vertical-rl',
          color: 'var(--amber)',
          opacity: 0.6,
        }}
      >
        読
      </span>
      {/* Progress track */}
      <div className="relative w-[2px] h-32 rounded-full" style={{ backgroundColor: 'rgba(212, 134, 58, 0.2)' }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            backgroundColor: 'var(--amber)',
            scaleY: scrollYProgress,
            transformOrigin: 'top',
            height: '100%',
          }}
        />
      </div>
    </div>
  )
}
