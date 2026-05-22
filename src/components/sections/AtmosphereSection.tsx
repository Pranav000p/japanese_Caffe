'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { staggerContainer, fadeUp } from '@/lib/animations'

const galleryImages = [
  {
    src: '/images/concept-1.png',
    alt: 'カフェの外観',
    caption: '下町の温もり',
    width: 'md:col-span-2',
    aspect: 'aspect-[16/9]',
    rotation: 'rotate-[-0.5deg]',
  },
  {
    src: '/images/concept-2.png',
    alt: '日本のイラスト',
    caption: '和の美学',
    width: 'md:col-span-1',
    aspect: 'aspect-[16/9] md:aspect-[3/4]',
    rotation: 'rotate-[1deg]',
  },
  {
    src: '/images/hero-bg.png',
    alt: '夜のカフェ',
    caption: '雨夜の灯り',
    width: 'md:col-span-1',
    aspect: 'aspect-[16/9] md:aspect-[3/4]',
    rotation: 'rotate-[-1deg]',
  },
  {
    src: '/images/ramen-art.png',
    alt: '猫ラーメン',
    caption: '遊び心',
    width: 'md:col-span-2',
    aspect: 'aspect-[16/9]',
    rotation: 'rotate-[0.5deg]',
  },
]

export default function AtmosphereSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  // Zoom-out effect on the first large image
  const zoomRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: zoomRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <section
      id="atmosphere"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--coal)' }}
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
            雰囲気
          </span>
          <h2
            className="font-mincho text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--white)' }}
          >
            空間の物語
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src + i}
              variants={fadeUp}
              className={`relative overflow-hidden rounded-xl group ${img.width}`}
              ref={i === 0 ? zoomRef : undefined}
            >
              <motion.div
                className={`relative ${img.aspect} overflow-hidden`}
                style={i === 0 ? { scale } : undefined}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${img.rotation}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(13, 14, 15, 0.7), transparent)',
                  }}
                />
                {/* Caption */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="font-mincho text-sm" style={{ color: 'var(--white)' }}>
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
