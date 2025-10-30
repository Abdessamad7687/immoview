"use client"

import { Home, Building2, Building, Briefcase, MapPin, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

interface SidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const { t } = useLanguage()

  const categories = [
    { id: "all", label: t.home, icon: Home },
    { id: "apartment", label: t.apartments, icon: Building2 },
    { id: "villa", label: t.villas, icon: Building },
    { id: "office", label: t.offices, icon: Briefcase },
    { id: "land", label: t.land, icon: MapPin },
  ]

  return (
    <aside className="hidden lg:flex w-64 flex-col gap-4 border-r border-border bg-card p-4">
      <div className="space-y-2">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t.categories}</h2>
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all",
                selectedCategory === category.id && "shadow-md",
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{category.label}</span>
            </Button>
          )
        })}
      </div>

      <Button variant="outline" className="mt-4 gap-2 bg-transparent">
        <SlidersHorizontal className="h-4 w-4" />
        {t.filters}
      </Button>
    </aside>
  )
}
