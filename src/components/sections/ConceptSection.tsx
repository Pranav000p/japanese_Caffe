'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'

export default function ConceptSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="concept"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Image */}
          <motion.div variants={slideInLeft} className="relative">
            <div
              className="relative rounded-lg overflow-hidden animate-float"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/concept-1.png"
                  alt="カフェの外観"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Brushstroke border effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: '3px solid rgba(212, 134, 58, 0.3)',
                  borderRadius: '8px',
                }}
              />
            </div>
            {/* Decorative kanji */}
            <div
              className="absolute -bottom-6 -right-4 font-mincho text-8xl font-bold opacity-10 select-none"
              style={{ color: 'var(--amber)' }}
              aria-hidden="true"
            >
              哲
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div variants={slideInRight}>
            <motion.span
              variants={fadeUp}
              className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: 'var(--amber)', fontWeight: 500 }}
            >
              コンセプト
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-mincho text-3xl md:text-4xl font-bold mb-8 leading-tight"
              style={{ color: 'var(--white)' }}
            >
              昭和の記憶、
              <br />
              現代の味
            </motion.h2>

            <motion.div className="space-y-4 font-gothic text-base leading-relaxed" style={{ color: 'var(--mist)', fontWeight: 300 }}>
              <motion.p variants={fadeUp}>
                昭和三十二年、東京の下町に小さな喫茶店が生まれました。雨の日も風の日も、温かいコーヒーの香りが通りに漂い、人々の心を癒してきました。
              </motion.p>
              <motion.p variants={fadeUp}>
                時代は変わっても、一杯のコーヒーに込める想いは変わりません。豆の選定から焙煎、抽出まで、すべてに匠の技と誠の心を注いでいます。
              </motion.p>
              <motion.p variants={fadeUp}>
                私たちは、昭和の温もりと現代の洗練を融合させた空間で、あなたの特別なひとときをお約束します。
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
