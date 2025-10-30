"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.fr
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")
  const isRTL = language === "ar"

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, isRTL])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
