'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function InkDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className="w-full flex justify-center py-12">
      <svg
        width="300"
        height="20"
        viewBox="0 0 300 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <motion.path
          d="M0 10 C50 2, 100 18, 150 10 S250 2, 300 10"
          stroke="var(--amber)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        />
        {/* Small circle at center */}
        <motion.circle
          cx="150"
          cy="10"
          r="3"
          fill="var(--amber)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
      </svg>
    </div>
  )
}
