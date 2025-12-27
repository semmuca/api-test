"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateRibbonProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DateRibbon({ selectedDate, onDateChange }: DateRibbonProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const date = new Date(selectedDate)
    const day = date.getDay()
    const diff = date.getDate() - day
    return new Date(date.setDate(diff))
  })

  const generateWeekDates = (startDate: Date) => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = generateWeekDates(currentWeekStart)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const navigateWeek = (direction: "prev" | "next") => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeekStart(newStart)
  }

  const formatDate = (date: Date) => {
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isSelected: date.getTime() === selectedDate.getTime(),
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg">
      <Button variant="ghost" size="sm" onClick={() => navigateWeek("prev")} className="h-8 w-8 p-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {weekDates.map((date) => {
          const { day, date: dateNum, isToday, isSelected } = formatDate(date)
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateChange(date)}
              className={cn(
                "flex flex-col items-center p-2 rounded-md transition-colors min-w-[44px]",
                "hover:bg-muted",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                isToday && !isSelected && "bg-accent text-accent-foreground",
              )}
            >
              <span className="text-xs font-medium">{day}</span>
              <span className="text-sm font-semibold">{dateNum}</span>
            </button>
          )
        })}
      </div>

      <Button variant="ghost" size="sm" onClick={() => navigateWeek("next")} className="h-8 w-8 p-0">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
