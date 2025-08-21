"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, AlertTriangle, BookOpen, X } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getCurrentIssuedBooks, getDaysUntilDue } from "@/lib/issued-books"

interface Notification {
  id: string
  type: "due_soon" | "overdue" | "available" | "reminder"
  title: string
  message: string
  priority: "high" | "medium" | "low"
  timestamp: string
  actionLabel?: string
  actionUrl?: string
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentUser] = useState(getCurrentUser())

  useEffect(() => {
    if (currentUser?.studentId) {
      generateNotifications()
    }
  }, [currentUser])

  const generateNotifications = () => {
    const issuedBooks = getCurrentIssuedBooks(currentUser?.studentId || "")
    const notifications: Notification[] = []

    // Due soon notifications
    issuedBooks.forEach((book) => {
      const daysUntil = getDaysUntilDue(book.dueDate)
      if (daysUntil <= 3 && daysUntil > 0) {
        notifications.push({
          id: `due-${book.id}`,
          type: "due_soon",
          title: "Book Due Soon",
          message: `"${book.bookTitle}" is due in ${daysUntil} day${daysUntil > 1 ? "s" : ""}`,
          priority: daysUntil === 1 ? "high" : "medium",
          timestamp: new Date().toISOString(),
          actionLabel: "Renew",
          actionUrl: `/dashboard`,
        })
      }
    })

    // Overdue notifications
    issuedBooks.forEach((book) => {
      const daysUntil = getDaysUntilDue(book.dueDate)
      if (daysUntil < 0) {
        notifications.push({
          id: `overdue-${book.id}`,
          type: "overdue",
          title: "Overdue Book",
          message: `"${book.bookTitle}" is ${Math.abs(daysUntil)} day${Math.abs(daysUntil) > 1 ? "s" : ""} overdue`,
          priority: "high",
          timestamp: new Date().toISOString(),
          actionLabel: "Return Now",
          actionUrl: `/dashboard`,
        })
      }
    })

    // Mock additional notifications
    notifications.push(
      {
        id: "available-1",
        type: "available",
        title: "Reserved Book Available",
        message: "Your reserved book 'Data Structures and Algorithms' is now available for pickup",
        priority: "medium",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        actionLabel: "View Details",
        actionUrl: "/books",
      },
      {
        id: "reminder-1",
        type: "reminder",
        title: "Reading Goal Update",
        message: "You're 2 books away from your monthly reading goal of 5 books!",
        priority: "low",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        actionLabel: "Browse Books",
        actionUrl: "/books",
      },
    )

    setNotifications(notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "due_soon":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "available":
        return <BookOpen className="h-4 w-4 text-green-600" />
      case "reminder":
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Smart Notifications
          {notifications.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {notifications.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No new notifications at the moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${getPriorityColor(notification.priority)}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="flex-shrink-0 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                      {notification.actionLabel && (
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
