"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface HeaderSpline3DProps {
  className?: string
}

/**
 * Header Spline 3D Component
 * 
 * Creates animated purple/pink floating spheres using CSS.
 * Features:
 * - 15 randomly positioned and sized spheres
 * - Theme-aware color gradients
 * - Floating animation with varied timing
 * - Box shadows for depth effect
 * - Responsive to theme changes
 */
export function HeaderSpline3D({ className = "" }: HeaderSpline3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear any existing content
    container.innerHTML = ''

    // Create main spheres container
    const spheresContainer = document.createElement('div')
    spheresContainer.className = 'absolute inset-0 pointer-events-none'
    
    // Generate 15 floating spheres with purple/pink gradients
    for (let i = 0; i < 15; i++) {
      const sphere = document.createElement('div')
      sphere.className = 'absolute rounded-full'
      
      // Random positioning and sizing for natural distribution
      const size = Math.random() * 120 + 60 // 60-180px for hero section
      const x = Math.random() * 80 + 10 // Keep within bounds (10-90%)
      const y = Math.random() * 80 + 10 // Keep within bounds (10-90%)
      const delay = Math.random() * 4 // Animation delay 0-4s
      
      // Theme-aware color gradients
      const lightGradients = [
        'bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500',
        'bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600',
        'bg-gradient-to-br from-pink-400 via-purple-400 to-purple-500',
        'bg-gradient-to-br from-purple-600 via-purple-400 to-pink-400',
        'bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600'
      ]
      
      const darkGradients = [
        'bg-gradient-to-br from-purple-300 via-purple-400 to-pink-400',
        'bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500',
        'bg-gradient-to-br from-pink-300 via-purple-300 to-purple-400',
        'bg-gradient-to-br from-purple-500 via-purple-300 to-pink-300',
        'bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500'
      ]
      
      // Select appropriate gradients based on current theme
      const gradients = theme === 'dark' ? darkGradients : lightGradients
      const gradient = gradients[Math.floor(Math.random() * gradients.length)]
      
      // Apply styles for positioning, animation, and visual effects
      sphere.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        opacity: ${0.7 + Math.random() * 0.3};
        filter: blur(0.5px);
        animation: float ${2 + Math.random() * 3}s ease-in-out ${delay}s infinite alternate;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
      `
      
      // Apply the selected gradient class
      sphere.className += ` ${gradient}`
      spheresContainer.appendChild(sphere)
    }
    
    container.appendChild(spheresContainer)
    
    // Add CSS animation keyframes if not already present
    if (!document.getElementById('sphere-animations')) {
      const style = document.createElement('style')
      style.id = 'sphere-animations'
      style.textContent = `
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px) scale(1); }
          100% { transform: translate(-50%, -50%) translateY(-20px) scale(1.05); }
        }
      `
      document.head.appendChild(style)
    }
    
  }, [theme]) // Re-generate spheres when theme changes

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    />
  )
}
