"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedbacks")

        if (!response.ok) {
          throw new Error("Failed to fetch feedback entries")
        }

        const data = await response.json()
        setFeedbacks(data)
      } catch (error) {
        console.error("Error fetching feedback:", error)
        setError("Failed to load feedback entries. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Submitted Feedback</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full bg-red-50 dark:bg-red-900/20">
        <CardContent className="pt-6">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Submitted Feedback</h2>

      {feedbacks.length === 0 ? (
        <Card className="w-full">
          <CardContent className="pt-6 text-center text-muted-foreground">No feedback submissions yet.</CardContent>
        </Card>
      ) : (
        feedbacks.map((feedback) => (
          <Card key={feedback.id} className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{feedback.name}</CardTitle>
              <CardDescription className="flex justify-between items-center">
                <span>{feedback.email}</span>
                <span className="text-xs">
                  {formatDistanceToNow(new Date(feedback.timestamp), { addSuffix: true })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{feedback.message}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

