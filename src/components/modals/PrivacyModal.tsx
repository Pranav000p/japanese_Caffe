'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface PrivacyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[60]"
                style={{ backgroundColor: 'rgba(13, 14, 15, 0.8)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 z-[61] w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-8"
                style={{
                  backgroundColor: 'var(--ink)',
                  border: '1px solid rgba(212, 134, 58, 0.2)',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 text-2xl leading-none transition-opacity hover:opacity-70"
                    style={{ color: 'var(--amber)' }}
                    aria-label="閉じる"
                  >
                    ×
                  </button>
                </Dialog.Close>
                <Dialog.Title className="font-mincho text-2xl font-bold mb-6" style={{ color: 'var(--amber)' }}>
                  プライバシーポリシー
                </Dialog.Title>
                <div className="font-gothic text-sm leading-relaxed space-y-6" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>個人情報の収集</h3>
                    <p>当店は、お問い合わせフォームやご予約の際に、お名前、メールアドレス、電話番号等の個人情報を収集することがあります。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>利用目的</h3>
                    <p>収集した個人情報は、お問い合わせへの回答、ご予約の確認、サービスの改善等の目的で利用いたします。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>第三者提供</h3>
                    <p>当店は、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>お問い合わせ</h3>
                    <p>個人情報の取扱いに関するお問い合わせは、お問い合わせフォームまたは店舗までご連絡ください。</p>
                  </section>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
