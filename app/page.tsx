"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { DailyPostCard } from "@/components/daily-post-card"
import { DateRibbon } from "@/components/date-ribbon"
import { UserProfileHeader } from "@/components/user-profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"

type TabType = "feed" | "explore" | "circles" | "profile"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("feed")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data: session } = useSession()

  // Mock data - in a real app, this would come from your database
  const currentUser = {
    name: session?.user?.name || "User",
    username: session?.user?.email?.split('@')[0] || "user",
    bio: "Building better habits one day at a time 🌅",
    avatar: session?.user?.image || "/diverse-group.png",
    streakCount: 12,
    circlesCount: 3,
    upcomingTasks: 2,
  }

  const mockPosts = [
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/diverse-woman-portrait.png",
      },
      content: "Morning run around the park - aiming for 5K today! 🏃‍♀️",
      status: "happening" as const,
      timestamp: "8:30 AM",
      reactions: 12,
      comments: 3,
    },
    {
      id: "2",
      user: {
        name: "Mike Rodriguez",
        username: "miker",
        avatar: "/thoughtful-man.png",
      },
      content: "Read 30 pages of 'Atomic Habits' before breakfast",
      status: "completed" as const,
      timestamp: "7:15 AM",
      reactions: 8,
      comments: 1,
      proof: {
        type: "text" as const,
        content: "Finished chapter 3 - great insights on habit stacking!",
      },
    },
    {
      id: "3",
      user: currentUser,
      content: "Meditation session - 15 minutes of mindfulness",
      status: "planned" as const,
      timestamp: "9:00 AM",
      reactions: 0,
      comments: 0,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="space-y-6">
            <DateRibbon selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <DailyPostCard
                  key={post.id}
                  {...post}
                  onStatusChange={(newStatus) => {
                    console.log(`Post ${post.id} status changed to ${newStatus}`)
                  }}
                  onAddProof={() => {
                    console.log(`Add proof for post ${post.id}`)
                  }}
                />
              ))}
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <UserProfileHeader user={currentUser} isOwnProfile={true} />
            <div className="text-center text-muted-foreground py-8">
              <p>Your recent posts will appear here</p>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-muted-foreground py-12">
            <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Morning Accountability</h1>
          <p className="text-center text-muted-foreground text-sm mt-1">Build better habits together</p>
        </header>

        {renderContent()}
      </div>

      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
