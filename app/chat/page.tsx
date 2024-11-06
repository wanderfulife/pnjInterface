"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { ProfileSidebar } from "@/components/chat/profile-sidebar"

export default function ChatPage() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar onProfileClick={() => setShowProfile(true)} />
      <ChatWindow onProfileClick={() => setShowProfile(true)} />
      <ProfileSidebar show={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}