"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon, ChevronLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="w-full px-6 py-4">
      <nav className="flex items-center justify-between w-full" style={{maxWidth: 'none', marginLeft: '0', marginRight: '0'}}>
        <div className="flex items-center gap-4">
          {(pathname === "/about" || pathname === "/guide") && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
              asChild
            >
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
            <span className="text-xl font-semibold text-foreground">MerdiAI</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
            Guide
          </Link>
          <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/contact" passHref>
            <Button variant="outline" className="rounded-full bg-transparent">
              Contact
            </Button>
          </Link>

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
