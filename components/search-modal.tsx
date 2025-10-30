"use client"

import { useState } from "react"
import { Search, X, MapPin, Home, TrendingUp, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { mockProperties } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { t, isRTL, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProperties = searchQuery
    ? mockProperties.filter((property) => {
        const searchLower = searchQuery.toLowerCase()
        const title = language === "ar" ? property.titleAr : property.title
        const location = language === "ar" ? property.locationAr : property.location
        return (
          title.toLowerCase().includes(searchLower) ||
          location.toLowerCase().includes(searchLower) ||
          property.price.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower)
        )
      })
    : []

  const recentSearches = ["Casablanca", "Villa", "Appartement"]
  const popularSearches = ["Marrakech", "Rabat", "Tanger"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-3 border-b">
          <DialogTitle className="sr-only">{t.search}</DialogTitle>
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${
                isRTL ? "right-3" : "left-3"
              }`}
            />
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-12 text-base ${isRTL ? "pr-12 pl-12" : "pl-12 pr-12"}`}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className={`absolute top-1/2 -translate-y-1/2 h-8 w-8 ${isRTL ? "left-2" : "right-2"}`}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-4">
          {!searchQuery ? (
            <div className="space-y-6">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{t.recent}</h3>
                </div>
                <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {recentSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{t.popular}</h3>
                </div>
                <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {popularSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="space-y-2">
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => onOpenChange(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted overflow-hidden">
                    <img src={property.thumbnail || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {language === "ar" ? property.titleAr : property.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{language === "ar" ? property.locationAr : property.location}</span>
                    </div>
                    <p className="text-sm font-semibold text-primary mt-1">{property.price}</p>
                  </div>
                  <Home className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{t.noResults}</h3>
              <p className="text-sm text-muted-foreground">{t.tryDifferent}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
