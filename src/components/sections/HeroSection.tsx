'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import RainCanvas from '@/components/ui/RainCanvas'

export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const rainOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <Image
          src="/images/hero-bg.png"
          alt="雨の夜のカフェ"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay layers */}
      {/* 1. Base darkening */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundColor: `rgba(13, 14, 15, 0.4)`,
          opacity: overlayOpacity,
        }}
      />

      {/* 2. Radial amber glow at bottom center (neon store glow) */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(212, 134, 58, 0.25) 0%, transparent 60%)',
        }}
      />

      {/* 3. Rain canvas */}
      <motion.div className="absolute inset-0 z-[4]" style={{ opacity: rainOpacity }}>
        <RainCanvas />
      </motion.div>

      {/* Content overlay - the "light gasp" bloom animation */}
      <motion.div
        className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, filter: 'brightness(4) blur(40px)' }}
        animate={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="text-center"
          style={{ y: textY }}
        >
          {/* Establishment era */}
          <motion.p
            className="font-gothic text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--amber)', fontWeight: 500 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            創業 昭和三十二年
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-mincho text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            style={{ color: 'var(--white)' }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            ふじ電カフェ
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-gothic text-lg md:text-xl mb-12"
            style={{ color: 'var(--mist)', fontWeight: 300 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            雨の夜に、温かい一杯を。
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="animate-pulse-down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <span
              className="font-mincho text-2xl"
              style={{ color: 'var(--amber)' }}
            >
              下
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade to coal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[6]"
        style={{
          background: 'linear-gradient(to top, var(--coal), transparent)',
        }}
      />
    </section>
  )
}
