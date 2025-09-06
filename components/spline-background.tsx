"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface SplineBackgroundProps {
  scene: string
  className?: string
}

/**
 * Spline Background Component
 * 
 * Renders an interactive 3D Spline scene as a background element.
 * Features:
 * - Dynamic Spline scene loading
 * - Theme-aware visual filters
 * - Full section coverage positioning
 * - Automatic cleanup on unmount
 */
export function SplineBackground({ scene, className = "" }: SplineBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create and configure spline-viewer element
    const splineViewer = document.createElement('spline-viewer')
    splineViewer.setAttribute('url', scene)
    splineViewer.style.width = '100%'
    splineViewer.style.height = '100%'
    splineViewer.style.position = 'absolute'
    splineViewer.style.top = '0'
    splineViewer.style.left = '0'
    splineViewer.style.zIndex = '0'
    
    // Apply theme-aware visual filters
    if (theme === 'dark') {
      // Dark theme: Increase brightness and contrast
      splineViewer.style.filter = 'brightness(1.2) contrast(1.1) hue-rotate(10deg)'
    } else {
      // Light theme: Slightly dim and increase saturation
      splineViewer.style.filter = 'brightness(0.9) contrast(1.2) saturate(1.3)'
    }

    // Replace canvas placeholder with actual spline viewer
    const parent = canvas.parentNode
    if (parent) {
      parent.replaceChild(splineViewer, canvas)
    }

    // Cleanup function to remove spline viewer
    return () => {
      if (parent && parent.contains(splineViewer)) {
        parent.removeChild(splineViewer)
      }
    }
  }, [scene, theme]) // Re-run when scene URL or theme changes

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* Canvas placeholder that gets replaced by spline-viewer */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}
