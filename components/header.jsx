"use client"

import { Moon, Sun, Quote } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Quote className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QuoteGen
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Inspire your day</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#quotes" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Quotes
          </a>
          <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          {mounted ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-9 h-9 rounded-full"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          ) : (
            <div className="w-9 h-9" /> // Placeholder to prevent layout shift
          )}
        </div>
      </div>
    </header>
  )
}
