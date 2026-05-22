'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TermsModal({ open, onOpenChange }: TermsModalProps) {
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
                  利用規約
                </Dialog.Title>
                <div className="font-gothic text-sm leading-relaxed space-y-6" style={{ color: 'var(--mist)', fontWeight: 300 }}>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>第1条（サービスの利用）</h3>
                    <p>本規約は、ふじ電カフェ（以下「当店」）が提供するウェブサイトおよびサービスの利用条件を定めるものです。ご利用者様（以下「ユーザー」）は、本規約に同意した上でサービスをご利用ください。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>第2条（禁止事項）</h3>
                    <p>ユーザーは、以下の行為を行ってはならないものとします。法令に違反する行為、当店のサービス運営を妨害する行為、他のユーザーに不利益を与える行為、その他当店が不適切と判断する行為。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>第3条（免責事項）</h3>
                    <p>当店は、ウェブサイトの情報の正確性について万全を期しておりますが、その内容の正確性、完全性、有用性等について保証するものではありません。</p>
                  </section>
                  <section>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--white)' }}>第4条（規約の変更）</h3>
                    <p>当店は、必要に応じて本規約を変更することができるものとします。変更後の規約は、ウェブサイトに掲載した時点で効力を生じるものとします。</p>
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
