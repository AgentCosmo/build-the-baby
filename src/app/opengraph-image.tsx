import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Build The Baby — Your Complete Baby Registry Planner'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fff1f2 50%, #fafaf9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🍼</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: '#1c1917', textAlign: 'center', lineHeight: 1.1, marginBottom: 16 }}>
          Build The Baby
        </div>
        <div style={{ fontSize: 28, color: '#78716c', textAlign: 'center', maxWidth: 700, lineHeight: 1.4 }}>
          Your complete baby registry planner — curated picks for every category.
        </div>
        <div style={{ marginTop: 40, fontSize: 20, color: '#f59e0b', fontWeight: 700, letterSpacing: 2 }}>
          buildthebaby.com
        </div>
      </div>
    ),
    { ...size }
  )
}
