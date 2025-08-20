import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Apple icon design
      <div
        style={{
          fontSize: 100,
          background: '#1c2a18',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'serif',
          fontWeight: 'bold',
          borderRadius: '22%',
        }}
      >
        G
      </div>
    ),
    { ...size }
  )
}
