import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Calendar, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

interface UserProfileHeaderProps {
  user: {
    name: string
    username: string
    bio: string
    avatar?: string
    streakCount: number
    circlesCount: number
    upcomingTasks: number
  }
  isOwnProfile?: boolean
}

export function UserProfileHeader({ user, isOwnProfile = false }: UserProfileHeaderProps) {
  return (
    <div className="bg-card p-6 rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm mt-1 max-w-xs">{user.bio}</p>
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-[color:var(--color-post-completed)] text-white">
            🔥 {user.streakCount}
          </Badge>
          <span className="text-sm text-muted-foreground">day streak</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.circlesCount} circles</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.upcomingTasks} upcoming</span>
        </div>
      </div>
    </div>
  )
}
