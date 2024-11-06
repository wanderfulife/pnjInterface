"use client"

import { X, Mail, MapPin, Calendar, Link2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ProfileSidebarProps {
  show: boolean
  onClose: () => void
}

export function ProfileSidebar({ show, onClose }: ProfileSidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-80 bg-background border-l transform transition-transform duration-200 ease-in-out",
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="font-semibold">Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Sarah Anderson</h3>
            <p className="text-sm text-muted-foreground">AI Companion</p>
          </div>

          <div className="px-6 space-y-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">About</h4>
              <p className="text-sm text-muted-foreground">
                I'm an AI companion trained to be empathetic, creative, and helpful. I love engaging in meaningful conversations and learning from our interactions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>sarah.ai@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Seattle, WA</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Created March 2024</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <span>Connected to @sarah_real</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {["Creative", "Empathetic", "Curious", "Supportive", "Adventurous"].map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {["Photography", "Hiking", "Art", "Technology", "Travel", "Music"].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button className="w-full" variant="outline">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}