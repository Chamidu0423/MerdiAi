"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Header Component
 * 
 * Navigation header with:
 * - MerdiAI logo and branding
 * - Navigation links (About, Work, Services) - hidden on mobile
 * - Contact button with phone icon - responsive sizing
 * - Theme toggle (light/dark mode)
 * - Mobile-friendly responsive design
 */
export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="w-full px-4 sm:px-6 py-3 sm:py-4 relative">
      <nav className="flex items-center justify-between w-full relative z-10" style={{maxWidth: 'none', marginLeft: '0', marginRight: '0'}}>
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="MerdiAI Logo" className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
          <span className="text-lg sm:text-xl font-semibold text-foreground">MerdiAI</span>
        </div>

        {/* Navigation Links - Hidden on mobile and small tablets */}
        <div className="hidden xl:flex items-center gap-6 xl:gap-8">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Services
          </a>
        </div>

        {/* Action Buttons - Contact and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Contact Button with phone icon - responsive sizing */}
          <Button variant="outline" className="rounded-full bg-transparent text-xs sm:text-sm px-3 sm:px-4 py-2">
            <span className="mr-1 sm:mr-2">📞</span>
            <span className="hidden sm:inline">Contact</span>
          </Button>
          
          {/* Theme Toggle - Only render after client mount */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-background/50 border border-border/50 hover:bg-background/80 w-8 h-8 sm:w-10 sm:h-10"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
