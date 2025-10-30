"use client"
import { Building2, Home, Briefcase, MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { mockProperties } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CategoriesPage() {
  const { t, isRTL, language } = useLanguage()

  const categories = [
    {
      id: "apartment",
      name: t.apartments,
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      count: mockProperties.filter((p) => p.type === "apartment").length,
    },
    {
      id: "villa",
      name: t.villas,
      icon: Home,
      color: "from-emerald-500 to-teal-500",
      count: mockProperties.filter((p) => p.type === "villa").length,
    },
    {
      id: "office",
      name: t.offices,
      icon: Briefcase,
      color: "from-violet-500 to-purple-500",
      count: mockProperties.filter((p) => p.type === "office").length,
    },
    {
      id: "land",
      name: t.land,
      icon: MapPin,
      color: "from-amber-500 to-orange-500",
      count: mockProperties.filter((p) => p.type === "land").length,
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-14 pb-20 lg:pb-6">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.allCategories}</h1>
          <p className="text-muted-foreground">
            {mockProperties.length} {t.properties}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            const categoryProperties = mockProperties.filter((p) => p.type === category.id)

            return (
              <Link key={category.id} href={`/?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    {/* Category Header with Gradient */}
                    <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                          <Icon className="h-8 w-8" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                          {category.count}
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
                      <p className="text-white/80 text-sm">
                        {category.count} {t.properties}
                      </p>
                    </div>

                    {/* Property Preview */}
                    <div className="p-4 space-y-3">
                      {categoryProperties.slice(0, 2).map((property) => (
                        <div key={property.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                            <img
                              src={property.thumbnail || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {language === "ar" ? property.titleAr : property.title}
                            </p>
                            <p className="text-xs text-primary font-semibold">{property.price}</p>
                          </div>
                        </div>
                      ))}

                      {/* View All Button */}
                      <Button variant="ghost" className="w-full group-hover:bg-accent transition-colors">
                        <span>{t.viewProperties}</span>
                        <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
