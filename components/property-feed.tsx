"use client"

import { useState, useEffect } from "react"
import { PropertyCard } from "./property-card"
import { mockProperties } from "@/lib/mock-data"
import type { Property } from "@/lib/mock-data"
import { useLanguage } from "./language-provider"
import { Skeleton } from "@/components/ui/skeleton"

interface PropertyFeedProps {
  selectedCategory: string
}

export function PropertyFeed({ selectedCategory }: PropertyFeedProps) {
  const { t } = useLanguage()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setLoading(true)
    setTimeout(() => {
      const filtered =
        selectedCategory === "all" ? mockProperties : mockProperties.filter((p) => p.type === selectedCategory)
      setProperties(filtered)
      setLoading(false)
    }, 500)
  }, [selectedCategory])

  if (loading) {
    return (
      <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-4rem-3.5rem)] p-2 pb-20 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:p-4 lg:h-auto lg:snap-none">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[calc(100vh-7.5rem)] w-full snap-start mb-3 lg:mb-0 lg:h-[600px] lg:rounded-2xl" />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">{t.loading}</p>
      </div>
    )
  }

  return (
    <div className="snap-y snap-mandatory overflow-y-auto h-[calc(100vh-4rem-3.5rem)] p-2 pb-20 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:p-4 lg:h-auto lg:snap-none pointer-events-auto">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
