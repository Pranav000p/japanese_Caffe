'use client'

import { useState } from 'react'
import Link from 'next/link'
import TermsModal from '@/components/modals/TermsModal'
import PrivacyModal from '@/components/modals/PrivacyModal'

const quickLinks = [
  { label: 'ホーム', href: '/' },
  { label: 'メニュー', href: '/#menu' },
  { label: '私たちについて', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <>
      <footer
        id="footer"
        className="relative"
        style={{ backgroundColor: 'var(--coal)', borderTop: '1px solid rgba(212, 134, 58, 0.3)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Logo + tagline */}
            <div>
              <h3
                className="font-mincho text-2xl font-bold mb-4"
                style={{ color: 'var(--amber)' }}
              >
                藤電カフェ
              </h3>
              <p className="font-gothic text-sm leading-relaxed" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                雨の夜に、温かい一杯を。
                <br />
                昭和の記憶と現代の味が出会う場所。
              </p>
            </div>

            {/* Column 2: Quick links */}
            <div>
              <h4
                className="font-gothic text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--amber)' }}
              >
                リンク
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-gothic text-sm ink-stroke inline-block w-fit transition-colors duration-300"
                    style={{ color: 'var(--mist)', fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Legal links */}
            <div>
              <h4
                className="font-gothic text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--amber)' }}
              >
                法的情報
              </h4>
              <div className="flex flex-col gap-3">
                <button
                  id="terms-link"
                  onClick={() => setTermsOpen(true)}
                  className="font-gothic text-sm text-left ink-stroke inline-block w-fit transition-colors duration-300"
                  style={{ color: 'var(--mist)', fontWeight: 300 }}
                >
                  利用規約
                </button>
                <button
                  id="privacy-link"
                  onClick={() => setPrivacyOpen(true)}
                  className="font-gothic text-sm text-left ink-stroke inline-block w-fit transition-colors duration-300"
                  style={{ color: 'var(--mist)', fontWeight: 300 }}
                >
                  プライバシーポリシー
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-6 text-center"
            style={{ borderTop: '1px solid rgba(212, 134, 58, 0.1)' }}
          >
            <p className="font-gothic text-xs" style={{ color: 'var(--mist)', opacity: 0.6 }}>
              © 2024 ふじ電カフェ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <TermsModal open={termsOpen} onOpenChange={setTermsOpen} />
      <PrivacyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  )
}
