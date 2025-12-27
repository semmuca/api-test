"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Search, Users, User, Plus } from "lucide-react"

type TabType = "feed" | "explore" | "circles" | "profile"

interface NavigationTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: "feed" as TabType, label: "Feed", icon: Home },
  { id: "explore" as TabType, label: "Explore", icon: Search },
  { id: "circles" as TabType, label: "Circles", icon: Users },
  { id: "profile" as TabType, label: "Profile", icon: User },
]

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around p-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={cn("flex flex-col items-center gap-1 h-auto py-2 px-3", isActive && "text-primary")}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          )
        })}

        <Button size="sm" className="flex flex-col items-center gap-1 h-auto py-2 px-3 bg-primary hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          <span className="text-xs">Post</span>
        </Button>
      </div>
    </div>
  )
}
