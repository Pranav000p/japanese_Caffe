'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function ContactPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'お名前を入力してください'
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }
    if (!formData.message.trim()) newErrors.message = 'お問い合わせ内容を入力してください'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <>
      {/* Hero area with parallax storefront */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background storefront image */}
        <motion.div
          className="absolute inset-0 lg:right-1/2 w-full lg:w-1/2 h-full"
          style={{ y: imageY }}
        >
          <Image
            src="/images/concept-1.png"
            alt="カフェの外観"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Mobile dark overlay — highly opaque for readability */}
          <div
            className="absolute inset-0 block lg:hidden"
            style={{
              background: 'linear-gradient(to bottom, rgba(13, 14, 15, 0.85) 0%, rgba(13, 14, 15, 0.95) 100%)',
            }}
          />
          {/* Desktop fade overlay */}
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background: 'linear-gradient(to right, transparent 50%, var(--coal) 100%)',
            }}
          />
          <div
            className="hidden lg:block absolute inset-0"
            style={{ backgroundColor: 'rgba(13, 14, 15, 0.3)' }}
          />
        </motion.div>

        {/* Form section */}
        <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto py-32 px-6 md:px-16 lg:px-20">
          <motion.div
            ref={formRef}
            className="max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="font-gothic text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: 'var(--amber)', fontWeight: 500 }}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Contact
            </motion.span>
            <motion.h1
              className="font-mincho text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--white)' }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={heroInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            >
              お問い合わせ
            </motion.h1>
            <motion.p
              className="font-gothic text-sm mb-12"
              style={{ color: 'var(--mist)', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              ご質問やご予約など、お気軽にお問い合わせください。
            </motion.p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={staggerContainer}
                  initial="hidden"
                  animate={formInView ? 'visible' : 'hidden'}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Name */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-name"
                      className="font-gothic text-xs tracking-widest uppercase block mb-2"
                      style={{ color: 'var(--amber)', fontWeight: 500 }}
                    >
                      お名前
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="input-underline font-gothic"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {errors.name && (
                      <p className="font-gothic text-xs mt-2" style={{ color: 'var(--neon)' }}>
                        {errors.name}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-email"
                      className="font-gothic text-xs tracking-widest uppercase block mb-2"
                      style={{ color: 'var(--amber)', fontWeight: 500 }}
                    >
                      メールアドレス
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="input-underline font-gothic"
                      placeholder="taro@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {errors.email && (
                      <p className="font-gothic text-xs mt-2" style={{ color: 'var(--neon)' }}>
                        {errors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-phone"
                      className="font-gothic text-xs tracking-widest uppercase block mb-2"
                      style={{ color: 'var(--amber)', fontWeight: 500 }}
                    >
                      お電話番号 <span style={{ color: 'var(--mist)', opacity: 0.5 }}>(任意)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="input-underline font-gothic"
                      placeholder="03-XXXX-XXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-message"
                      className="font-gothic text-xs tracking-widest uppercase block mb-2"
                      style={{ color: 'var(--amber)', fontWeight: 500 }}
                    >
                      お問い合わせ内容
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      className="input-underline font-gothic resize-none"
                      placeholder="ご質問やご要望をお書きください..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                    />
                    {errors.message && (
                      <p className="font-gothic text-xs mt-2" style={{ color: 'var(--neon)' }}>
                        {errors.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <button
                      id="contact-submit"
                      type="submit"
                      className="w-full md:w-auto font-gothic text-sm px-12 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      style={{
                        backgroundColor: 'var(--amber)',
                        color: 'var(--coal)',
                        fontWeight: 500,
                      }}
                    >
                      送信する
                    </button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Animated checkmark */}
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
                    style={{ border: '2px solid var(--amber)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <motion.path
                        d="M6 16L13 23L26 10"
                        stroke="var(--amber)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <h2 className="font-mincho text-2xl font-bold mb-3" style={{ color: 'var(--white)' }}>
                    お問い合わせありがとうございます
                  </h2>
                  <p className="font-gothic text-sm" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                    内容を確認の上、折り返しご連絡いたします。
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
