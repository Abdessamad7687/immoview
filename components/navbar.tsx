"use client"

import { Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"
import { SearchModal } from "@/components/search-modal"
import { LoginButton } from "@/components/auth/login-button"

export function Navbar() {
  const { language, setLanguage, t, isRTL } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 pointer-events-auto">
        <div className="flex h-14 items-center justify-between gap-2 px-3 lg:px-6">
          {/* Logo - Compact on mobile */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <span className="text-lg font-bold text-primary-foreground">IV</span>
            </div>
            <span className="hidden text-lg font-bold text-foreground sm:inline-block">{t.appName}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="flex-1 max-w-md justify-start gap-2 text-muted-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">{t.search}</span>
          </Button>

          {/* Actions - Compact on mobile */}
          <div className="flex items-center gap-1">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
              className="text-xs font-medium h-9 px-2"
            >
              {language === "fr" ? "AR" : "FR"}
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Login */}
            <LoginButton
              labelLogin={t.login}
              labelLogout={t.logout}
              labelGoogle={t.continueWithGoogle}
              labelFacebook={t.continueWithFacebook}
              labelAdmin={t.adminLogin}
            />
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
