'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h2 className="font-mincho text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--amber)' }}>
        問題が発生しました
      </h2>
      <p className="font-gothic text-base mb-12 max-w-md leading-relaxed" style={{ color: 'var(--mist)' }}>
        申し訳ございません。コンテンツの読み込み中にエラーが発生しました。
        お手数ですが、もう一度お試しいただくか、しばらく時間をおいてアクセスしてください。
      </p>
      <button
        onClick={() => unstable_retry()}
        className="font-gothic text-sm px-10 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        style={{
          backgroundColor: 'var(--amber)',
          color: 'var(--coal)',
          fontWeight: 500,
        }}
      >
        もう一度試す
      </button>
    </div>
  )
}
