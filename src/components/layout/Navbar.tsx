'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { label: 'ホーム', href: '/' },
  { label: 'メニュー', href: '/#menu' },
  { label: '私たちについて', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        id="main-nav"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2 md:px-6 py-3 rounded-full flex items-center gap-6 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(26, 20, 16, 0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          border: scrolled ? '1px solid rgba(212, 134, 58, 0.2)' : '1px solid transparent',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link href="/" className="font-mincho text-lg md:text-xl font-bold whitespace-nowrap" style={{ color: 'var(--amber)' }}>
          藤電カフェ
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-gothic text-sm ink-stroke whitespace-nowrap"
              style={{ color: 'var(--white)', fontWeight: 300 }}
            >
              {link.label}
            </Link>
          ))}
          {/* CTA */}
          <Link
            href="/contact"
            className="font-gothic text-sm px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--amber)',
              color: 'var(--coal)',
              fontWeight: 500,
            }}
          >
            予約する
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニューを開く"
        >
          <motion.span
            className="block w-5 h-[1.5px] rounded-full"
            style={{ backgroundColor: 'var(--white)' }}
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] rounded-full"
            style={{ backgroundColor: 'var(--white)' }}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-5 h-[1.5px] rounded-full"
            style={{ backgroundColor: 'var(--white)' }}
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ backgroundColor: 'var(--coal)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="font-mincho text-3xl"
                  style={{ color: 'var(--white)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/contact"
                className="font-gothic text-lg px-8 py-3 rounded-full"
                style={{
                  backgroundColor: 'var(--amber)',
                  color: 'var(--coal)',
                  fontWeight: 500,
                }}
                onClick={() => setMobileOpen(false)}
              >
                予約する
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
