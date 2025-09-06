'use client'

import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string
        style?: React.CSSProperties
        loading?: string
        'events-target'?: string
      }
    }
  }
}

interface SplineSceneProps {
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically load the Spline viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.56/build/spline-viewer.js'
    
    // Only add the script if it hasn't been added already
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <spline-viewer 
        url="https://prod.spline.design/hYfTPbDZcK6MMlah/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '2rem',
        }}
        loading="lazy"
        events-target="global"
      />
    </div>
  )
}
