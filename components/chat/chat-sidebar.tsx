"use client"

import { useState } from "react"
import { Search, Plus, Settings, Users, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  onProfileClick: () => void
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  isNPC?: boolean
}

const DEMO_CHATS: Chat[] = [
  {
    id: "1",
    name: "Sarah's AI",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastMessage: "Looking forward to our coffee chat!",
    timestamp: "2:30 PM",
    unread: 2,
    online: true,
    isNPC: true
  },
  {
    id: "2",
    name: "Mike's AI",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    lastMessage: "That's an interesting perspective...",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    isNPC: true
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    lastMessage: "Let's meet up this weekend!",
    timestamp: "9:45 AM",
    unread: 1,
    online: true
  },
  {
    id: "4",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lastMessage: "Thanks for the recommendation",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  }
]

export function ChatSidebar({ onProfileClick }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string>("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredChats = DEMO_CHATS.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeTab === "all") return matchesSearch
    if (activeTab === "npc") return matchesSearch && chat.isNPC
    if (activeTab === "friends") return matchesSearch && !chat.isNPC
    return false
  })

  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <Avatar className="cursor-pointer" onClick={onProfileClick}>
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search chats" 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 p-2">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="npc" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            NPCs
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Friends
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
                  selectedChat === chat.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background bg-green-500 rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center gap-1">
                      {chat.name}
                      {chat.isNPC && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          AI
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground truncate max-w-[140px]">
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}