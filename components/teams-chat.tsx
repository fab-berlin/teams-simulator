"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, MessageCircle } from "lucide-react"

interface Message {
  id: string
  author: string
  timestamp: string
  timeLabel: string
  text: string
  skeleton: boolean
  _batchIndex: number
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function TeamsChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/json") {
      alert("Please select a JSON file")
      return
    }

    setIsLoading(true)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const jsonData = JSON.parse(content)

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          const firstItem = jsonData[0]
          if (firstItem.id && firstItem.author && firstItem.timestamp && firstItem.text) {
            const nonSkeletonMessages = jsonData.filter((message: Message) => !message.skeleton)
            setMessages(nonSkeletonMessages as Message[])
          } else {
            alert("Invalid JSON structure. Expected message format with id, author, timestamp, and text fields.")
          }
        } else {
          alert("Invalid JSON format. Expected an array of messages.")
        }
      } catch (error) {
        alert("Error parsing JSON file. Please check the file format.")
      } finally {
        setIsLoading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    }

    reader.readAsText(file)
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedMessages = filteredMessages.reduce(
    (groups, message) => {
      const date = formatDate(message.timestamp)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, Message[]>,
  )

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Team Chat</h1>
            <p className="text-sm text-muted-foreground">Development Team Discussion</p>
          </div>
          <div>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} className="hidden" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              {isLoading ? "Loading..." : "Load JSON File"}
            </Button>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Load a JSON file to start viewing your team chat messages. Click the "Load JSON File" button above to
                get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => {
              const dayMessages = groupedMessages[date]
              const orderedMessages = dayMessages

              return (
                <div key={date} className="space-y-4">
                  {/* Date Separator */}
                  <div className="flex items-center justify-center">
                    <div className="bg-muted px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-muted-foreground">{date}</span>
                    </div>
                  </div>

                  {/* Messages for this date */}
                  {orderedMessages.map((message, index) => {
                    const prevMessage = index > 0 ? orderedMessages[index - 1] : null
                    const showAvatar = !prevMessage || prevMessage.author !== message.author
                    const isConsecutive = prevMessage && prevMessage.author === message.author

                    return (
                      <div key={message.id} className={`flex gap-3 ${isConsecutive ? "mt-1" : "mt-4"}`}>
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-8">
                          {showAvatar ? (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {getInitials(message.author)}
                              </AvatarFallback>
                            </Avatar>
                          ) : null}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          {showAvatar && (
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-semibold text-sm text-foreground">{message.author}</span>
                              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                            </div>
                          )}

                          <Card className="inline-block max-w-full bg-muted/50 border-0 shadow-none">
                            <div className="p-3">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                {message.text}
                              </p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
