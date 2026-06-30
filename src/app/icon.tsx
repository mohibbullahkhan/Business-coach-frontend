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
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '50%',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '2px',
            backgroundColor: '#171310',
            borderRadius: '2px',
            marginLeft: '4px',
            alignSelf: 'flex-start',
          }}
        />
        <div
          style={{
            width: '20px',
            height: '2px',
            backgroundColor: '#171310',
            borderRadius: '2px',
          }}
        />
        <div
          style={{
            width: '16px',
            height: '2px',
            backgroundColor: '#171310',
            borderRadius: '2px',
            marginLeft: '4px',
            alignSelf: 'flex-start',
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
