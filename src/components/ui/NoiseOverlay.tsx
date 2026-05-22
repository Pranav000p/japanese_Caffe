'use client'

export default function NoiseOverlay() {
  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="noise-overlay"
        style={{ filter: 'url(#noise)' }}
        aria-hidden="true"
      />
    </>
  )
}
