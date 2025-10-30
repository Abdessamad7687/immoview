"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { PropertyFeed } from "@/components/property-feed"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <main className="flex-1">
          <PropertyFeed selectedCategory={selectedCategory} />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
