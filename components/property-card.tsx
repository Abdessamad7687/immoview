"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MapPin, Share2, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-provider"
import type { Property } from "@/lib/mock-data"
import { PropertyModal } from "./property-modal"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { language, t, isRTL } = useLanguage()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(property.likes)
  const [showModal, setShowModal] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const card = cardRef.current
    if (!video || !card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            video.play().catch(() => {})
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: [0.7],
      },
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const title = language === "ar" ? property.titleAr : property.title
  const location = language === "ar" ? property.locationAr : property.location
  const agentName = language === "ar" ? property.agent.nameAr : property.agent.name

  return (
    <>
      <div
        ref={cardRef}
        className="relative h-screen w-full snap-start snap-always lg:h-[600px] lg:rounded-2xl lg:overflow-hidden"
      >
        <video
          ref={videoRef}
          src={property.videoUrl}
          poster={property.thumbnail}
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 safe-area-inset">
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 py-2 transition-all hover:bg-black/50 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 border-2 border-white/50">
                <AvatarImage src={property.agent.avatar || "/placeholder.svg"} alt={agentName} />
                <AvatarFallback className="text-xs">{agentName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-white">{agentName}</span>
            </button>

            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
            </Button>
          </div>

          <div className={`flex items-end gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex-1 space-y-2 pb-2">
              <h3 className="text-xl font-bold text-white line-clamp-2 text-balance leading-tight">{title}</h3>
              <div className={`flex items-center gap-1.5 text-white/90 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{location}</span>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="text-2xl font-bold text-accent">{property.price}</span>
                <span className="text-sm text-white/80">{property.area}</span>
              </div>
              <Button
                size="sm"
                className="mt-2 bg-white text-primary hover:bg-white/90 font-semibold"
                onClick={() => setShowModal(true)}
              >
                {t.moreDetails}
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4 pb-2">
              <button
                onClick={handleLike}
                className="flex flex-col items-center gap-1 transition-transform active:scale-90"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-md">
                  <Heart
                    className={`h-7 w-7 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
                  />
                </div>
                <span className="text-xs font-semibold text-white">{likes}</span>
              </button>

              <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-md">
                  <Share2 className="h-6 w-6 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <PropertyModal property={property} open={showModal} onOpenChange={setShowModal} />
    </>
  )
}
