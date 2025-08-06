'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Heart, Pill, AlertCircle, User, Phone } from 'lucide-react'

interface PatientProfile {
  id: string
  name: string
  age: number
  bloodGroup: string
  thalassemiaType: string
  lastTransfusion: string
  nextTransfusion: string
  hemoglobinLevel: number
  ironLevel: number
  doctor: string
  hospital: string
  emergencyContact: string
}

interface Reminder {
  id: string
  type: 'medication' | 'transfusion' | 'appointment' | 'test'
  title: string
  description: string
  date: string
  time: string
  frequency: 'once' | 'daily' | 'weekly' | 'monthly'
  status: 'active' | 'completed' | 'missed'
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const thalassemiaTypes = ['Beta Thalassemia Major', 'Beta Thalassemia Minor', 'Alpha Thalassemia', 'Thalassemia Intermedia']

export default function MedicalManagementPage() {
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null)
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('patientProfile')
    const savedReminders = localStorage.getItem('reminders')

    if (savedProfile) setPatientProfile(JSON.parse(savedProfile))
    if (savedReminders) setReminders(JSON.parse(savedReminders))
  }, [])

  const savePatientProfile = (profile: PatientProfile) => {
    setPatientProfile(profile)
    localStorage.setItem('patientProfile', JSON.stringify(profile))
  }

  const addReminder = (reminder: Omit<Reminder, 'id' | 'status'>) => {
    const newReminder = { ...reminder, id: Date.now().toString(), status: 'active' as const }
    const updatedReminders = [...reminders, newReminder]
    setReminders(updatedReminders)
    localStorage.setItem('reminders', JSON.stringify(updatedReminders))
  }

  const updateReminderStatus = (id: string, status: 'completed' | 'missed') => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, status } : reminder
    )
    setReminders(updatedReminders)
    localStorage.setItem('reminders', JSON.stringify(updatedReminders))
  }

  const getUpcomingReminders = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return reminders.filter(reminder => {
      const reminderDate = new Date(reminder.date)
      return reminderDate >= today && reminderDate <= nextWeek && reminder.status === 'active'
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const getTodayReminders = () => {
    const today = new Date().toISOString().split('T')[0]
    return reminders.filter(reminder => 
      reminder.date === today && reminder.status === 'active'
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Medical Management & Alerts</h1>
        <p className="text-muted-foreground">Manage your health information and set important reminders</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Health Dashboard</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="profile">Patient Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {!patientProfile ? (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Health Dashboard</CardTitle>
                <CardDescription>Please set up your patient profile first to view your health information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => {
                  const tabsList = document.querySelector('[role="tablist"]')
                  const profileTab = tabsList?.querySelector('[value="profile"]') as HTMLElement
                  profileTab?.click()
                }}>
                  Set Up Profile
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {/* Patient Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Patient Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Patient Name</p>
                      <p className="font-semibold">{patientProfile.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-semibold">{patientProfile.age} years</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <Badge variant="outline" className="font-semibold">{patientProfile.bloodGroup}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Thalassemia Type</p>
                      <p className="font-semibold">{patientProfile.thalassemiaType}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Attending Doctor</p>
                      <p className="font-semibold">{patientProfile.doctor}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p className="font-semibold">{patientProfile.hospital}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Transfusion</CardTitle>
                    <Heart className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientProfile.lastTransfusion}</div>
                    <p className="text-xs text-muted-foreground">Date of last blood transfusion</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Transfusion</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientProfile.nextTransfusion}</div>
                    <p className="text-xs text-muted-foreground">Scheduled next transfusion</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hemoglobin Level</CardTitle>
                    <AlertCircle className={`h-4 w-4 ${patientProfile.hemoglobinLevel < 7 ? 'text-red-500' : patientProfile.hemoglobinLevel < 10 ? 'text-yellow-500' : 'text-green-500'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientProfile.hemoglobinLevel} g/dL</div>
                    <p className="text-xs text-muted-foreground">Current hemoglobin level</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Iron Level</CardTitle>
                    <Pill className={`h-4 w-4 ${patientProfile.ironLevel > 1000 ? 'text-red-500' : patientProfile.ironLevel > 500 ? 'text-yellow-500' : 'text-green-500'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientProfile.ironLevel} ng/mL</div>
                    <p className="text-xs text-muted-foreground">Serum ferritin level</p>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getTodayReminders().length === 0 ? (
                    <p className="text-muted-foreground">No reminders for today</p>
                  ) : (
                    <div className="space-y-2">
                      {getTodayReminders().map(reminder => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              reminder.type === 'medication' ? 'bg-blue-500' :
                              reminder.type === 'transfusion' ? 'bg-red-500' :
                              reminder.type === 'appointment' ? 'bg-green-500' : 'bg-purple-500'
                            }`} />
                            <div>
                              <p className="font-medium">{reminder.title}</p>
                              <p className="text-sm text-muted-foreground">{reminder.time}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateReminderStatus(reminder.id, 'completed')}>
                              Done
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateReminderStatus(reminder.id, 'missed')}>
                              Skip
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Reminders (Next 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  {getUpcomingReminders().length === 0 ? (
                    <p className="text-muted-foreground">No upcoming reminders</p>
                  ) : (
                    <div className="space-y-2">
                      {getUpcomingReminders().map(reminder => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              reminder.type === 'medication' ? 'bg-blue-500' :
                              reminder.type === 'transfusion' ? 'bg-red-500' :
                              reminder.type === 'appointment' ? 'bg-green-500' : 'bg-purple-500'
                            }`} />
                            <div>
                              <p className="font-medium">{reminder.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {reminder.date} at {reminder.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">{reminder.type}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Set New Reminder</CardTitle>
              <CardDescription>Create reminders for medications, transfusions, and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                addReminder({
                  type: formData.get('type') as 'medication' | 'transfusion' | 'appointment' | 'test',
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  date: formData.get('date') as string,
                  time: formData.get('time') as string,
                  frequency: formData.get('frequency') as 'once' | 'daily' | 'weekly' | 'monthly',
                })
                e.currentTarget.reset()
                alert('Reminder set successfully!')
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Reminder Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="transfusion">Blood Transfusion</SelectItem>
                        <SelectItem value="appointment">Doctor Appointment</SelectItem>
                        <SelectItem value="test">Medical Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Take Deferasirox" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" type="time" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select name="frequency" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One Time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" name="description" placeholder="Additional notes..." />
                  </div>
                </div>
                <Button type="submit" className="w-full">Set Reminder</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              {reminders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No reminders set</p>
              ) : (
                <div className="space-y-2">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${
                          reminder.type === 'medication' ? 'bg-blue-500' :
                          reminder.type === 'transfusion' ? 'bg-red-500' :
                          reminder.type === 'appointment' ? 'bg-green-500' : 'bg-purple-500'
                        }`} />
                        <div>
                          <h3 className="font-semibold">{reminder.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reminder.date} at {reminder.time} • {reminder.frequency}
                          </p>
                          {reminder.description && (
                            <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          reminder.status === 'completed' ? 'default' :
                          reminder.status === 'missed' ? 'destructive' : 'secondary'
                        }>
                          {reminder.status}
                        </Badge>
                        <Badge variant="outline">{reminder.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Profile</CardTitle>
              <CardDescription>Manage your basic health information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const profile: PatientProfile = {
                  id: patientProfile?.id || Date.now().toString(),
                  name: formData.get('name') as string,
                  age: parseInt(formData.get('age') as string),
                  bloodGroup: formData.get('bloodGroup') as string,
                  thalassemiaType: formData.get('thalassemiaType') as string,
                  lastTransfusion: formData.get('lastTransfusion') as string,
                  nextTransfusion: formData.get('nextTransfusion') as string,
                  hemoglobinLevel: parseFloat(formData.get('hemoglobinLevel') as string),
                  ironLevel: parseFloat(formData.get('ironLevel') as string),
                  doctor: formData.get('doctor') as string,
                  hospital: formData.get('hospital') as string,
                  emergencyContact: formData.get('emergencyContact') as string,
                }
                savePatientProfile(profile)
                alert('Profile updated successfully!')
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" defaultValue={patientProfile?.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" min="1" max="120" defaultValue={patientProfile?.age} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select name="bloodGroup" defaultValue={patientProfile?.bloodGroup} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thalassemiaType">Thalassemia Type</Label>
                    <Select name="thalassemiaType" defaultValue={patientProfile?.thalassemiaType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {thalassemiaTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastTransfusion">Last Transfusion Date</Label>
                    <Input id="lastTransfusion" name="lastTransfusion" type="date" defaultValue={patientProfile?.lastTransfusion} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextTransfusion">Next Transfusion Date</Label>
                    <Input id="nextTransfusion" name="nextTransfusion" type="date" defaultValue={patientProfile?.nextTransfusion} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hemoglobinLevel">Current Hemoglobin Level (g/dL)</Label>
                    <Input id="hemoglobinLevel" name="hemoglobinLevel" type="number" step="0.1" min="0" max="20" defaultValue={patientProfile?.hemoglobinLevel} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ironLevel">Iron Level (ng/mL)</Label>
                    <Input id="ironLevel" name="ironLevel" type="number" step="0.1" min="0" defaultValue={patientProfile?.ironLevel} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Attending Doctor</Label>
                    <Input id="doctor" name="doctor" defaultValue={patientProfile?.doctor} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Medical Center</Label>
                    <Input id="hospital" name="hospital" defaultValue={patientProfile?.hospital} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input id="emergencyContact" name="emergencyContact" type="tel" defaultValue={patientProfile?.emergencyContact} required />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {patientProfile ? 'Update Profile' : 'Create Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {patientProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Emergency Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-700">Emergency Contact</p>
                      <p className="text-sm text-red-600">{patientProfile.emergencyContact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-700">Doctor</p>
                      <p className="text-sm text-blue-600">{patientProfile.doctor}</p>
                      <p className="text-xs text-blue-500">{patientProfile.hospital}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
