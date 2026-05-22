'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="ja">
      <body
        style={{
          backgroundColor: '#0d0e0f',
          color: '#faf8f5',
          fontFamily: 'serif',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', padding: '20px' }}>
          <h1 style={{ color: '#d4863a', fontSize: '2.5rem', marginBottom: '20px' }}>
            エラーが発生しました
          </h1>
          <p style={{ color: '#8ba3a8', fontSize: '1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            申し訳ございません。ページの読み込み中に予期せぬエラーが発生しました。<br />
            一時的な問題の可能性がありますので、もう一度お試しください。
          </p>
          <button
            onClick={() => unstable_retry()}
            style={{
              backgroundColor: '#d4863a',
              color: '#0d0e0f',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
          >
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  )
}
