'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer, cardHover } from '@/lib/animations'

const menuCategories = [
  {
    icon: '☕',
    title: 'コーヒー',
    subtitle: 'Coffee',
    items: [
      { name: 'ブレンドコーヒー', price: '¥480' },
      { name: 'カフェラテ', price: '¥550' },
      { name: 'カプチーノ', price: '¥550' },
      { name: 'エスプレッソ', price: '¥400' },
    ],
  },
  {
    icon: '🍵',
    title: '日本茶',
    subtitle: 'Japanese Tea',
    items: [
      { name: '抹茶ラテ', price: '¥600' },
      { name: '煎茶', price: '¥450' },
      { name: 'ほうじ茶', price: '¥420' },
      { name: '玄米茶', price: '¥420' },
    ],
  },
  {
    icon: '🍜',
    title: '軽食',
    subtitle: 'Light Food',
    items: [
      { name: 'あんバタートースト', price: '¥520' },
      { name: 'ナポリタン', price: '¥780' },
      { name: 'プリン', price: '¥450' },
      { name: 'カレーライス', price: '¥850' },
    ],
  },
]

export default function MenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="menu"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden washi-texture"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4"
            style={{ color: 'var(--amber)', fontWeight: 500 }}
          >
            メニュー
          </span>
          <h2
            className="font-mincho text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--ink)' }}
          >
            お品書き
          </h2>
        </motion.div>

        {/* Menu cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {menuCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              whileHover={cardHover.hover}
              className="relative rounded-2xl p-8 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(245, 239, 230, 0.8)',
                border: '1px solid rgba(212, 134, 58, 0.15)',
                boxShadow: '0 4px 20px rgba(26, 20, 16, 0.08)',
              }}
            >
              {/* Category icon */}
              <div className="text-4xl mb-4">{category.icon}</div>

              {/* Category title */}
              <h3
                className="font-mincho text-xl font-bold mb-1"
                style={{ color: 'var(--ink)' }}
              >
                {category.title}
              </h3>
              <p
                className="font-gothic text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--mist)', fontWeight: 500 }}
              >
                {category.subtitle}
              </p>

              {/* Menu items */}
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-baseline"
                  >
                    <span
                      className="font-gothic text-sm"
                      style={{ color: 'var(--ink)', fontWeight: 400 }}
                    >
                      {item.name}
                    </span>
                    <span className="flex-1 mx-3 border-b border-dotted" style={{ borderColor: 'rgba(212, 134, 58, 0.3)' }} />
                    <span
                      className="font-mincho text-sm"
                      style={{ color: 'var(--amber)', fontWeight: 400 }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative ramen cat image */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-32 md:w-48 md:h-48 animate-float opacity-60 pointer-events-none hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Image
            src="/images/ramen-art.png"
            alt="猫ラーメン浮世絵"
            fill
            className="object-contain"
            sizes="200px"
          />
        </motion.div>
      </div>
    </section>
  )
}
