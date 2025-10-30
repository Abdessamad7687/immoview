"use client"

import { Heart, MessageCircle, MapPin, Phone } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-provider"
import type { Property } from "@/lib/mock-data"

interface PropertyModalProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertyModal({ property, open, onOpenChange }: PropertyModalProps) {
  const { language, t, isRTL } = useLanguage()

  const title = language === "ar" ? property.titleAr : property.title
  const location = language === "ar" ? property.locationAr : property.location
  const description = language === "ar" ? property.descriptionAr : property.description
  const agentName = language === "ar" ? property.agent.nameAr : property.agent.name

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={isRTL ? "text-right" : "text-left"}>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <img src={property.thumbnail || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
              <MapPin className="h-5 w-5" />
              <span>{location}</span>
            </div>

            <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div>
                <p className={`text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>{t.price}</p>
                <p className="text-2xl font-bold text-accent">{property.price}</p>
              </div>
              <div>
                <p className={`text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>{t.area}</p>
                <p className="text-xl font-semibold">{property.area}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className={`mb-2 font-semibold ${isRTL ? "text-right" : ""}`}>{t.description}</h3>
              <p className={`text-muted-foreground leading-relaxed ${isRTL ? "text-right" : ""}`}>{description}</p>
            </div>

            {/* Agent Info */}
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <h3 className={`mb-3 font-semibold ${isRTL ? "text-right" : ""}`}>{t.agent}</h3>
              <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={property.agent.avatar || "/placeholder.svg"} alt={agentName} />
                  <AvatarFallback>{agentName[0]}</AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium">{agentName}</p>
                  <p className="text-sm text-muted-foreground">{t.agent}</p>
                </div>
                <Button className="gap-2">
                  <Phone className="h-4 w-4" />
                  {t.contact}
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Heart className="h-5 w-5" />
                {property.likes}
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <MessageCircle className="h-5 w-5" />
                {property.comments}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
