"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, MoreVertical, Image, Smile, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatWindowProps {
  onProfileClick: () => void
}

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  status?: "sending" | "sent" | "delivered" | "read"
}

const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hi! I'd love to learn more about your interests. What kind of activities do you enjoy?",
    sender: "ai",
    timestamp: "2:30 PM",
    status: "read"
  },
  {
    id: "2",
    content: "I'm really into hiking and photography. I love capturing beautiful landscapes!",
    sender: "user",
    timestamp: "2:31 PM",
    status: "read"
  },
  {
    id: "3",
    content: "That's fascinating! I can see why you'd enjoy combining those hobbies. Do you have a favorite hiking spot for photography?",
    sender: "ai",
    timestamp: "2:31 PM",
    status: "read"
  },
  {
    id: "4",
    content: "Yes! There's this amazing trail near Mount Rainier that has stunning views. The sunrise there is absolutely breathtaking.",
    sender: "user",
    timestamp: "2:32 PM",
    status: "delivered"
  },
  {
    id: "5",
    content: "Mount Rainier is incredible! The way the light hits the mountain during sunrise must create some spectacular photo opportunities. Do you prefer shooting during golden hour?",
    sender: "ai",
    timestamp: "2:33 PM",
    status: "sent"
  }
]

export function ChatWindow({ onProfileClick }: ChatWindowProps) {
  const [messages, setMessages] = useState(DEMO_MESSAGES)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your message and will respond thoughtfully...",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent"
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer" onClick={onProfileClick}>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background bg-green-500 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Sarah's AI</h2>
              <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onProfileClick}>
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    msg.sender === "user"
                      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  }
                />
                <AvatarFallback>
                  {msg.sender === "user" ? "ME" : "AI"}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "rounded-lg p-3 message-bubble",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground sent"
                    : "bg-secondary received"
                )}
              >
                <p>{msg.content}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {msg.timestamp}
                  </span>
                  {msg.sender === "user" && msg.status && (
                    <span className="text-xs opacity-70">
                      • {msg.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!message.trim()}
            className="px-6"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}