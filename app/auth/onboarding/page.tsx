"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

type OnboardingStep = "welcome" | "goals" | "preferences" | "complete"

const HABIT_OPTIONS = [
  { id: "exercise", label: "Exercise/Workout", icon: "💪" },
  { id: "reading", label: "Reading", icon: "📚" },
  { id: "meditation", label: "Meditation/Mindfulness", icon: "🧘" },
  { id: "journaling", label: "Journaling", icon: "✍️" },
  { id: "water", label: "Drink Water", icon: "💧" },
  { id: "sleep", label: "Better Sleep", icon: "😴" },
  { id: "nutrition", label: "Healthy Eating", icon: "🥗" },
  { id: "learning", label: "Learning/Studying", icon: "🎓" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [personalGoal, setPersonalGoal] = useState("")
  const [morningTime, setMorningTime] = useState("07:00")
  const [bio, setBio] = useState("")
  const router = useRouter()
  const { data: session } = useSession()

  const progress = {
    welcome: 25,
    goals: 50,
    preferences: 75,
    complete: 100,
  }

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleComplete = () => {
    console.log("Onboarding completed with data:", {
      goals: selectedGoals,
      personalGoal,
      morningTime,
      bio,
    })
    router.push("/")
  }

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🌅</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Morning Accountability!
              </h2>
              <p className="text-muted-foreground mb-6">
                Let's set up your account and get you started on your journey to better habits.
                {session?.user?.name && ` Hi ${session.user.name.split(' ')[0]}!`}
              </p>
            </div>
            <Button onClick={() => setCurrentStep("goals")} className="w-full">
              Let's Get Started
            </Button>
          </div>
        )

      case "goals":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What are your morning goals?</h2>
              <p className="text-muted-foreground">
                Select the habits you'd like to build. You can always change these later.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {HABIT_OPTIONS.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedGoals.includes(habit.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent"
                  }`}
                  onClick={() => handleGoalToggle(habit.id)}
                >
                  <Checkbox
                    checked={selectedGoals.includes(habit.id)}
                    onChange={() => handleGoalToggle(habit.id)}
                  />
                  <span className="text-lg">{habit.icon}</span>
                  <span className="text-sm font-medium">{habit.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalGoal">Custom Goal (Optional)</Label>
              <Textarea
                id="personalGoal"
                placeholder="Describe a personal morning habit you'd like to build..."
                value={personalGoal}
                onChange={(e) => setPersonalGoal(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("welcome")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep("preferences")}
                className="flex-1"
                disabled={selectedGoals.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case "preferences":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Set your preferences</h2>
              <p className="text-muted-foreground">
                Help us customize your experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="morningTime">What time do you usually start your morning routine?</Label>
                <Input
                  id="morningTime"
                  type="time"
                  value={morningTime}
                  onChange={(e) => setMorningTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell the community a bit about yourself and your goals..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  This will be visible on your profile to help you connect with others.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("goals")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep("complete")}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        )

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
              <p className="text-muted-foreground mb-6">
                Welcome to the Morning Accountability community. Start sharing your progress
                and connecting with others on their habit-building journey.
              </p>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-2">Your Goals Summary:</h3>
              <ul className="space-y-1 text-sm">
                {selectedGoals.map(goalId => {
                  const habit = HABIT_OPTIONS.find(h => h.id === goalId)
                  return (
                    <li key={goalId} className="flex items-center space-x-2">
                      <span>{habit?.icon}</span>
                      <span>{habit?.label}</span>
                    </li>
                  )
                })}
                {personalGoal && (
                  <li className="flex items-center space-x-2">
                    <span>✨</span>
                    <span>{personalGoal}</span>
                  </li>
                )}
              </ul>
            </div>
            
            <Button onClick={handleComplete} className="w-full">
              Start Your Journey
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Progress value={progress[currentStep]} className="mb-4" />
          <CardTitle className="text-center">Account Setup</CardTitle>
          <CardDescription className="text-center">
            Step {Object.keys(progress).indexOf(currentStep) + 1} of 4
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  )
}