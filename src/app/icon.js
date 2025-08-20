import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Favicon design - simple "G" with your brand color
      <div
        style={{
          fontSize: 24,
          background: '#1c2a18',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'serif',
          fontWeight: 'bold',
        }}
      >
        G
      </div>
    ),
    { ...size }
  )
}
