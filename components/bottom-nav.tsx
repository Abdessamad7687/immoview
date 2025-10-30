"use client"

import { Home, Grid3x3, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SearchModal } from "@/components/search-modal"

export function BottomNav() {
  const { t, isRTL } = useLanguage()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { id: "home", label: t.home, icon: Home, href: "/" },
    { id: "categories", label: t.categories, icon: Grid3x3, href: "/categories" },
    { id: "search", label: t.search, icon: Search, onClick: () => setSearchOpen(true) },
  ]

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 lg:hidden safe-area-inset-bottom">
        <div className={`flex items-center justify-around px-2 py-1.5 ${isRTL ? "flex-row-reverse" : ""}`}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href ? pathname === item.href : false

            if (item.onClick) {
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-0.5 h-auto py-2 px-4 min-w-[60px]",
                    isActive && "text-primary",
                  )}
                  onClick={item.onClick}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Button>
              )
            }

            return (
              <Link key={item.id} href={item.href!}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-0.5 h-auto py-2 px-4 min-w-[60px]",
                    isActive && "text-primary",
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
