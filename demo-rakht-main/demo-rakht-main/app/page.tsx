'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Users, Calendar, BookOpen, DollarSign, MessageCircle, Activity } from 'lucide-react'

export default function HomePage() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeRequests: 0,
    successfulMatches: 0,
    upcomingReminders: 0
  })

  useEffect(() => {
    // Load stats from localStorage
    const donors = JSON.parse(localStorage.getItem('donors') || '[]')
    const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]')
    
    const activeRequests = requests.filter((req: any) => req.status === 'active').length
    const upcomingReminders = reminders.filter((reminder: any) => {
      const reminderDate = new Date(reminder.date)
      const today = new Date()
      const diffTime = reminderDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays >= 0 && diffDays <= 7
    }).length

    setStats({
      totalDonors: donors.length,
      activeRequests,
      successfulMatches: Math.floor(donors.length * 0.3), // Simulated
      upcomingReminders
    })
  }, [])

  const quickActions = [
    { title: 'Register as Donor', icon: Heart, href: '/blood-donation', color: 'bg-red-500' },
    { title: 'Request Blood', icon: Users, href: '/blood-donation?tab=request', color: 'bg-blue-500' },
    { title: 'Set Reminder', icon: Calendar, href: '/medical-management', color: 'bg-green-500' },
    { title: 'Learn More', icon: BookOpen, href: '/education', color: 'bg-purple-500' },
    { title: 'Financial Aid', icon: DollarSign, href: '/financial-aid', color: 'bg-yellow-500' },
    { title: 'Community', icon: MessageCircle, href: '/community', color: 'bg-indigo-500' }
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-500 via-pink-600 to-red-700 text-white rounded-xl p-8 shadow-lg">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
            Welcome to RakhtSetu
          </h1>
          <p className="text-xl mb-6 text-red-50">
            Connecting Thalassemia patients with life-saving blood donors across India. 
            Together, we can make a difference in the fight against Thalassemia.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold shadow-md">
              Get Started
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-red-600 border-white hover:bg-red-50 hover:text-red-700 font-semibold shadow-md">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.totalDonors}</div>
            <p className="text-xs text-muted-foreground">Registered blood donors</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeRequests}</div>
            <p className="text-xs text-muted-foreground">Pending blood requests</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successfulMatches}</div>
            <p className="text-xs text-muted-foreground">Lives touched</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reminders</CardTitle>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.upcomingReminders}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">⚡</span>
            </div>
            Quick Actions
          </CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex-col gap-3 hover:shadow-md transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = action.href}
              >
                <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center shadow-sm`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-center font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blood Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">B+ Blood Needed</p>
                  <p className="text-sm text-muted-foreground">Apollo Hospital, Mumbai</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">O- Blood Needed</p>
                  <p className="text-sm text-muted-foreground">AIIMS, Delhi</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">A+ Blood Needed</p>
                  <p className="text-sm text-muted-foreground">Fortis Hospital, Bangalore</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium">Iron Chelation Therapy</p>
                <p className="text-sm text-muted-foreground">
                  Regular iron chelation is crucial for Thalassemia patients to prevent iron overload.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">Nutrition Guidelines</p>
                <p className="text-sm text-muted-foreground">
                  Maintain a balanced diet rich in vitamins and avoid iron-rich foods unless advised.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-medium">Regular Check-ups</p>
                <p className="text-sm text-muted-foreground">
                  Schedule regular blood tests and cardiac evaluations as recommended by your doctor.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
