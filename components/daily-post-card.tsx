"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Camera, CheckCircle, Play, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type PostStatus = "planned" | "happening" | "completed"

interface DailyPostCardProps {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
  }
  content: string
  status: PostStatus
  timestamp: string
  reactions: number
  comments: number
  proof?: {
    type: "image" | "text" | "video"
    content: string
  }
  onStatusChange?: (newStatus: PostStatus) => void
  onAddProof?: () => void
}

const statusConfig = {
  planned: {
    color: "bg-[color:var(--color-post-planned)] text-white",
    icon: Clock,
    label: "Planned",
    action: "Start",
  },
  happening: {
    color: "bg-[color:var(--color-post-happening)] text-white",
    icon: Play,
    label: "Happening",
    action: "Complete",
  },
  completed: {
    color: "bg-[color:var(--color-post-completed)] text-white",
    icon: CheckCircle,
    label: "Completed",
    action: "Done",
  },
}

export function DailyPostCard({
  user,
  content,
  status,
  timestamp,
  reactions,
  comments,
  proof,
  onStatusChange,
  onAddProof,
}: DailyPostCardProps) {
  const [currentStatus, setCurrentStatus] = useState<PostStatus>(status)
  const config = statusConfig[currentStatus]
  const StatusIcon = config.icon

  const handleStatusChange = () => {
    const nextStatus: PostStatus =
      currentStatus === "planned" ? "happening" : currentStatus === "happening" ? "completed" : "completed"

    setCurrentStatus(nextStatus)
    onStatusChange?.(nextStatus)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <Badge className={cn("flex items-center gap-1", config.color)}>
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm leading-relaxed">{content}</p>
          <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
        </div>

        {proof && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Proof submitted</span>
            </div>
            {proof.type === "text" ? (
              <p className="text-sm">{proof.content}</p>
            ) : (
              <div className="text-xs text-muted-foreground">{proof.type === "image" ? "Image" : "Video"} uploaded</div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{reactions}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </button>
          </div>

          <div className="flex gap-2">
            {currentStatus === "completed" && !proof && (
              <Button size="sm" variant="outline" onClick={onAddProof}>
                <Camera className="h-3 w-3 mr-1" />
                Add Proof
              </Button>
            )}
            {currentStatus !== "completed" && (
              <Button size="sm" onClick={handleStatusChange}>
                {config.action}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
