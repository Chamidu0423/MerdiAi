"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="w-full px-6 py-4">
      <nav className="flex items-center justify-between w-full" style={{maxWidth: 'none', marginLeft: '0', marginRight: '0'}}>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
          <span className="text-xl font-semibold text-foreground">MerdiAI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
            Guide
          </a>
          <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Q & A
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full bg-transparent">
            Contact
          </Button>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
