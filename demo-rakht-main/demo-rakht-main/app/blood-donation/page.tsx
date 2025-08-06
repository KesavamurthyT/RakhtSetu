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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Phone, MapPin, Clock, User } from 'lucide-react'
import { format } from 'date-fns'

interface Donor {
  id: string
  name: string
  bloodGroup: string
  phone: string
  email: string
  city: string
  state: string
  availability: string
  lastDonation?: string
}

interface BloodRequest {
  id: string
  patientName: string
  bloodGroup: string
  quantity: number
  urgency: 'low' | 'medium' | 'high' | 'critical'
  hospital: string
  city: string
  state: string
  contactPhone: string
  requiredBy: string
  status: 'active' | 'fulfilled' | 'expired'
  description: string
}

interface DonationHistory {
  id: string
  donorId: string
  date: string
  hospital: string
  quantity: number
  recipient?: string
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh']

export default function BloodDonationPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([])
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()

  useEffect(() => {
    // Load data from localStorage
    const savedDonors = localStorage.getItem('donors')
    const savedRequests = localStorage.getItem('bloodRequests')
    const savedHistory = localStorage.getItem('donationHistory')

    if (savedDonors) setDonors(JSON.parse(savedDonors))
    if (savedRequests) setBloodRequests(JSON.parse(savedRequests))
    if (savedHistory) setDonationHistory(JSON.parse(savedHistory))
  }, [])

  const saveDonor = (donor: Omit<Donor, 'id'>) => {
    const newDonor = { ...donor, id: Date.now().toString() }
    const updatedDonors = [...donors, newDonor]
    setDonors(updatedDonors)
    localStorage.setItem('donors', JSON.stringify(updatedDonors))
  }

  const saveBloodRequest = (request: Omit<BloodRequest, 'id' | 'status'>) => {
    const newRequest = { ...request, id: Date.now().toString(), status: 'active' as const }
    const updatedRequests = [...bloodRequests, newRequest]
    setBloodRequests(updatedRequests)
    localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests))
  }

  const addDonationHistory = (donation: Omit<DonationHistory, 'id'>) => {
    const newDonation = { ...donation, id: Date.now().toString() }
    const updatedHistory = [...donationHistory, newDonation]
    setDonationHistory(updatedHistory)
    localStorage.setItem('donationHistory', JSON.stringify(updatedHistory))
  }

  const findMatches = (bloodGroup: string, city: string) => {
    return donors.filter(donor => 
      donor.bloodGroup === bloodGroup && 
      donor.city.toLowerCase() === city.toLowerCase() &&
      donor.availability === 'available'
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blood Donation & Tracking</h1>
        <p className="text-muted-foreground">Connect donors with patients in need</p>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="register">Register Donor</TabsTrigger>
          <TabsTrigger value="request">Blood Request</TabsTrigger>
          <TabsTrigger value="matches">Find Matches</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
          <TabsTrigger value="donors">All Donors</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donor Registration</CardTitle>
              <CardDescription>Register as a blood donor to help Thalassemia patients</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                saveDonor({
                  name: formData.get('name') as string,
                  bloodGroup: formData.get('bloodGroup') as string,
                  phone: formData.get('phone') as string,
                  email: formData.get('email') as string,
                  city: formData.get('city') as string,
                  state: formData.get('state') as string,
                  availability: formData.get('availability') as string,
                })
                e.currentTarget.reset()
                alert('Donor registered successfully!')
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select name="bloodGroup" required>
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select name="state" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select name="availability" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not-available">Not Available</SelectItem>
                        <SelectItem value="on-call">Available on Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">Register as Donor</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Request</CardTitle>
              <CardDescription>Submit a request for blood donation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                saveBloodRequest({
                  patientName: formData.get('patientName') as string,
                  bloodGroup: formData.get('bloodGroup') as string,
                  quantity: parseInt(formData.get('quantity') as string),
                  urgency: formData.get('urgency') as 'low' | 'medium' | 'high' | 'critical',
                  hospital: formData.get('hospital') as string,
                  city: formData.get('city') as string,
                  state: formData.get('state') as string,
                  contactPhone: formData.get('contactPhone') as string,
                  requiredBy: formData.get('requiredBy') as string,
                  description: formData.get('description') as string,
                })
                e.currentTarget.reset()
                alert('Blood request submitted successfully!')
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input id="patientName" name="patientName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group Needed</Label>
                    <Select name="bloodGroup" required>
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
                    <Label htmlFor="quantity">Quantity (Units)</Label>
                    <Input id="quantity" name="quantity" type="number" min="1" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select name="urgency" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Medical Center</Label>
                    <Input id="hospital" name="hospital" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select name="state" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" name="contactPhone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requiredBy">Required By Date</Label>
                    <Input id="requiredBy" name="requiredBy" type="date" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea id="description" name="description" placeholder="Any additional information..." />
                  </div>
                </div>
                <Button type="submit" className="w-full">Submit Blood Request</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Donor Matches</CardTitle>
              <CardDescription>Find potential donors for blood requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bloodRequests.filter(req => req.status === 'active').map(request => {
                  const matches = findMatches(request.bloodGroup, request.city)
                  return (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{request.patientName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.hospital}, {request.city}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{request.bloodGroup}</Badge>
                            <Badge variant={
                              request.urgency === 'critical' ? 'destructive' :
                              request.urgency === 'high' ? 'destructive' :
                              request.urgency === 'medium' ? 'default' : 'secondary'
                            }>
                              {request.urgency}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Required by</p>
                          <p className="font-medium">{request.requiredBy}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Potential Matches ({matches.length})</h4>
                        {matches.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No matching donors found in this city</p>
                        ) : (
                          <div className="grid gap-2">
                            {matches.map(donor => (
                              <div key={donor.id} className="flex items-center justify-between p-3 bg-muted rounded">
                                <div className="flex items-center gap-3">
                                  <User className="h-4 w-4" />
                                  <div>
                                    <p className="font-medium">{donor.name}</p>
                                    <p className="text-sm text-muted-foreground">{donor.city}, {donor.state}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge>{donor.bloodGroup}</Badge>
                                  <Button size="sm" onClick={() => {
                                    alert(`Contact ${donor.name} at ${donor.phone}`)
                                  }}>
                                    <Phone className="h-4 w-4 mr-1" />
                                    Contact
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
                {bloodRequests.filter(req => req.status === 'active').length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No active blood requests</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>Track your donation history and add new donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  addDonationHistory({
                    donorId: formData.get('donorId') as string,
                    date: formData.get('date') as string,
                    hospital: formData.get('hospital') as string,
                    quantity: parseInt(formData.get('quantity') as string),
                    recipient: formData.get('recipient') as string,
                  })
                  e.currentTarget.reset()
                  alert('Donation record added successfully!')
                }} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Add New Donation Record</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="donorId">Donor</Label>
                      <Select name="donorId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select donor" />
                        </SelectTrigger>
                        <SelectContent>
                          {donors.map(donor => (
                            <SelectItem key={donor.id} value={donor.id}>
                              {donor.name} ({donor.bloodGroup})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Donation Date</Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital</Label>
                      <Input id="hospital" name="hospital" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (Units)</Label>
                      <Input id="quantity" name="quantity" type="number" min="1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient (Optional)</Label>
                      <Input id="recipient" name="recipient" />
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full">Add Record</Button>
                    </div>
                  </div>
                </form>

                <div className="space-y-2">
                  <h3 className="font-medium">Donation Records</h3>
                  {donationHistory.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No donation records found</p>
                  ) : (
                    <div className="space-y-2">
                      {donationHistory.map(donation => {
                        const donor = donors.find(d => d.id === donation.donorId)
                        return (
                          <div key={donation.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4" />
                              <div>
                                <p className="font-medium">{donor?.name || 'Unknown Donor'}</p>
                                <p className="text-sm text-muted-foreground">
                                  {donation.date} • {donation.hospital}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{donation.quantity} units</p>
                              {donation.recipient && (
                                <p className="text-sm text-muted-foreground">To: {donation.recipient}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Donors</CardTitle>
              <CardDescription>View all registered blood donors</CardDescription>
            </CardHeader>
            <CardContent>
              {donors.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No donors registered yet</p>
              ) : (
                <div className="grid gap-4">
                  {donors.map(donor => (
                    <div key={donor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-red-600">{donor.bloodGroup}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{donor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {donor.city}, {donor.state}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {donor.phone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          donor.availability === 'available' ? 'default' :
                          donor.availability === 'on-call' ? 'secondary' : 'outline'
                        }>
                          {donor.availability}
                        </Badge>
                        {donor.lastDonation && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Last donation: {donor.lastDonation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
