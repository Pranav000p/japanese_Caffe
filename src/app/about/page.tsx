'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'

const timelineItems = [
  { year: '昭和32年 (1957)', text: '東京浅草の裏路地に、小さな喫茶店として開業。一杯のコーヒーが人々の憩いの場となる。' },
  { year: '昭和45年 (1970)', text: '常連客の要望に応え、軽食メニューを追加。ナポリタンとプリンが名物に。' },
  { year: '昭和60年 (1985)', text: '二代目店主が引き継ぎ、自家焙煎を開始。豆の産地にこだわった珈琲を提供。' },
  { year: '平成15年 (2003)', text: '店舗を改装。昭和の温もりを残しながら、現代的な快適さを追求。' },
  { year: '令和2年 (2020)', text: '三代目が日本茶メニューを導入。伝統と革新の融合で新たな章を開く。' },
]

const values = [
  { kanji: '誠', romaji: 'Sincerity', desc: '一杯一杯に真心を込めて。お客様への誠実さが私たちの原点です。' },
  { kanji: '和', romaji: 'Harmony', desc: '人と人、伝統と現代、味と空間。すべての調和を大切にしています。' },
  { kanji: '匠', romaji: 'Craftsmanship', desc: '豆の選定から抽出まで、妥協を許さない匠の技を追求し続けます。' },
]

const staffMembers = [
  { role: '店主・焙煎士', name: '藤田 誠一', intro: '三代目店主。自家焙煎にこだわり、世界中の産地を訪ねる珈琲職人。', color: '#d4863a' },
  { role: 'パティシエ', name: '山本 花', intro: '昭和レシピを現代にアレンジする菓子職人。名物プリンの生みの親。', color: '#8ba3a8' },
  { role: 'バリスタ', name: '佐藤 健太', intro: '日本茶とコーヒーの両方を極めた若きバリスタ。ラテアートの達人。', color: '#ff4d5a' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-10%' })

  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-10%' })

  const staffRef = useRef(null)
  const staffInView = useInView(staffRef, { once: true, margin: '-10%' })

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        <Image
          src="/images/concept-2.png"
          alt="私たちについて"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13, 14, 15, 0.5)' }} />
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4"
            style={{ color: 'var(--amber)', fontWeight: 500 }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            About Us
          </motion.span>
          <motion.h1
            className="font-mincho text-4xl md:text-6xl font-bold"
            style={{ color: 'var(--white)' }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={heroInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            私たちについて
          </motion.h1>
        </motion.div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 md:py-32" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: 'var(--amber)', fontWeight: 500 }}>
              歴史
            </span>
            <h2 className="font-mincho text-3xl md:text-4xl font-bold" style={{ color: 'var(--white)' }}>
              昭和から令和へ
            </h2>
          </motion.div>

          {/* Timeline line */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px]"
              style={{ backgroundColor: 'rgba(212, 134, 58, 0.3)' }}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={timelineInView ? 'visible' : 'hidden'}
              className="space-y-12"
            >
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={i % 2 === 0 ? slideInLeft : slideInRight}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 mt-1"
                    style={{ backgroundColor: 'var(--amber)' }}
                  />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="font-mincho text-sm font-bold block mb-2" style={{ color: 'var(--amber)' }}>
                      {item.year}
                    </span>
                    <p className="font-gothic text-sm leading-relaxed" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section ref={staffRef} className="py-24 md:py-32" style={{ backgroundColor: 'var(--coal)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={staffInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: 'var(--amber)', fontWeight: 500 }}>
              スタッフ
            </span>
            <h2 className="font-mincho text-3xl md:text-4xl font-bold" style={{ color: 'var(--white)' }}>
              私たちの仲間
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={staffInView ? 'visible' : 'hidden'}
          >
            {staffMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="relative rounded-2xl p-8 text-center washi-texture transition-transform duration-300 hover:scale-[1.02]"
                style={{ border: '1px solid rgba(212, 134, 58, 0.15)' }}
              >
                {/* Avatar placeholder */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: member.color, opacity: 0.7 }}
                >
                  <span className="font-mincho text-2xl font-bold" style={{ color: 'var(--coal)' }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <span className="font-gothic text-xs tracking-widest uppercase block mb-2" style={{ color: member.color, fontWeight: 500 }}>
                  {member.role}
                </span>
                <h3 className="font-mincho text-lg font-bold mb-3" style={{ color: 'var(--ink)' }}>
                  {member.name}
                </h3>
                <p className="font-gothic text-sm leading-relaxed" style={{ color: 'var(--ink)', fontWeight: 300, opacity: 0.7 }}>
                  {member.intro}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 md:py-32" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: 'var(--amber)', fontWeight: 500 }}>
              理念
            </span>
            <h2 className="font-mincho text-3xl md:text-4xl font-bold" style={{ color: 'var(--white)' }}>
              三つの柱
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
          >
            {values.map((v) => (
              <motion.div
                key={v.kanji}
                variants={fadeUp}
                className="text-center"
              >
                {/* Large kanji */}
                <motion.div
                  className="font-mincho text-8xl md:text-9xl font-bold mb-4 select-none"
                  style={{ color: 'var(--amber)', opacity: 0.8 }}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={valuesInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                  transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                >
                  {v.kanji}
                </motion.div>
                <h3
                  className="font-gothic text-sm tracking-widest uppercase mb-3"
                  style={{ color: 'var(--white)', fontWeight: 500 }}
                >
                  {v.romaji}
                </h3>
                <p className="font-gothic text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
