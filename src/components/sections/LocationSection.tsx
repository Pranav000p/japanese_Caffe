'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'
import SteamEffect from '@/components/ui/SteamEffect'

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="access"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Info block */}
          <motion.div variants={slideInLeft}>
            <span
              className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: 'var(--amber)', fontWeight: 500 }}
            >
              アクセス
            </span>
            <h2
              className="font-mincho text-3xl md:text-4xl font-bold mb-10 leading-tight"
              style={{ color: 'var(--white)' }}
            >
              お越しください
            </h2>

            {/* Steam + Cup icon */}
            <div className="relative mb-8">
              <div className="relative inline-block">
                <SteamEffect />
                {/* Cup SVG */}
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  className="mt-2"
                >
                  <path
                    d="M4 8h24v16a8 8 0 01-8 8H12a8 8 0 01-8-8V8z"
                    stroke="var(--amber)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M28 12h4a4 4 0 010 8h-4"
                    stroke="var(--amber)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                  />
                  <line
                    x1="8"
                    y1="30"
                    x2="24"
                    y2="30"
                    stroke="var(--amber)"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>

            {/* Hours */}
            <motion.div variants={fadeUp} className="mb-8">
              <h3
                className="font-mincho text-lg font-bold mb-3"
                style={{ color: 'var(--amber)' }}
              >
                営業時間
              </h3>
              <div className="font-gothic text-sm space-y-2" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                <p>月〜金: 8:00 - 22:00</p>
                <p>土・日: 9:00 - 23:00</p>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={fadeUp} className="mb-8">
              <h3
                className="font-mincho text-lg font-bold mb-3"
                style={{ color: 'var(--amber)' }}
              >
                住所
              </h3>
              <p className="font-gothic text-sm" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                東京都台東区浅草X-X-X
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp}>
              <h3
                className="font-mincho text-lg font-bold mb-3"
                style={{ color: 'var(--amber)' }}
              >
                電話
              </h3>
              <p className="font-gothic text-sm" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                03-XXXX-XXXX
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Stylized map / illustration */}
          <motion.div
            variants={slideInRight}
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(13, 14, 15, 0.6)',
              border: '1px solid rgba(212, 134, 58, 0.15)',
            }}
          >
            {/* Illustrated map feel */}
            <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center p-8">
              {/* Grid lines background */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 134, 58, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 134, 58, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 text-center">
                {/* Location pin */}
                <motion.div
                  className="inline-block mb-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
                    <path
                      d="M24 0C10.745 0 0 10.745 0 24c0 18 24 40 24 40s24-22 24-40C48 10.745 37.255 0 24 0z"
                      fill="var(--amber)"
                      opacity="0.8"
                    />
                    <circle cx="24" cy="22" r="8" fill="var(--coal)" />
                  </svg>
                </motion.div>

                <h3 className="font-mincho text-xl font-bold mb-2" style={{ color: 'var(--white)' }}>
                  浅草駅から徒歩5分
                </h3>
                <p className="font-gothic text-sm mb-6" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                  雷門通りを北へ、二つ目の角を左折
                </p>

                {/* Decorative kanji compass */}
                <div className="grid grid-cols-3 gap-4 max-w-[180px] mx-auto opacity-30">
                  <div />
                  <span className="font-mincho text-lg text-center" style={{ color: 'var(--amber)' }}>北</span>
                  <div />
                  <span className="font-mincho text-lg text-center" style={{ color: 'var(--amber)' }}>西</span>
                  <span className="font-mincho text-xl text-center" style={{ color: 'var(--amber)' }}>◉</span>
                  <span className="font-mincho text-lg text-center" style={{ color: 'var(--amber)' }}>東</span>
                  <div />
                  <span className="font-mincho text-lg text-center" style={{ color: 'var(--amber)' }}>南</span>
                  <div />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
