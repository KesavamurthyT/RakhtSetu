'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Database, Search, MapPin, Phone, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh']

// Mock data for demonstration
const mockBloodBanks = [
  {
    id: '1',
    name: 'All India Institute of Medical Sciences Blood Bank',
    address: 'AIIMS, Ansari Nagar, New Delhi - 110029',
    phone: '+91-11-2659-3333',
    availability: {
      'A+': 15,
      'A-': 3,
      'B+': 12,
      'B-': 2,
      'AB+': 8,
      'AB-': 1,
      'O+': 20,
      'O-': 4
    },
    lastUpdated: '2024-01-15T14:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'King Edward Memorial Hospital Blood Bank',
    address: 'Acharya Donde Marg, Parel, Mumbai - 400012',
    phone: '+91-22-2410-7000',
    availability: {
      'A+': 8,
      'A-': 1,
      'B+': 6,
      'B-': 0,
      'AB+': 4,
      'AB-': 0,
      'O+': 12,
      'O-': 2
    },
    lastUpdated: '2024-01-15T13:45:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Bangalore Medical College Blood Bank',
    address: 'Fort, Bengaluru, Karnataka - 560002',
    phone: '+91-80-2670-1150',
    availability: {
      'A+': 10,
      'A-': 2,
      'B+': 14,
      'B-': 1,
      'AB+': 6,
      'AB-': 1,
      'O+': 18,
      'O-': 3
    },
    lastUpdated: '2024-01-15T12:20:00Z',
    status: 'active'
  }
]

export default function ERaktKoshPage() {
  const [searchResults, setSearchResults] = useState<typeof mockBloodBanks>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')

  const simulateAPICall = async (bloodGroup: string, state: string, city: string) => {
    setIsLoading(true)
    setConnectionStatus('connecting')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate successful connection
    setConnectionStatus('connected')
    
    // Filter mock data based on search criteria
    const filteredResults = mockBloodBanks.filter(bank => {
      const hasBlood = bank.availability[bloodGroup as keyof typeof bank.availability] > 0
      const matchesLocation = bank.address.toLowerCase().includes(state.toLowerCase()) || 
                             bank.address.toLowerCase().includes(city.toLowerCase())
      return hasBlood && matchesLocation
    })
    
    setSearchResults(filteredResults)
    setIsLoading(false)
    setHasSearched(true)
  }

  const testConnection = async () => {
    setConnectionStatus('connecting')
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate successful connection
    setConnectionStatus('connected')
    
    setTimeout(() => {
      alert('Successfully connected to e-RaktKosh API! You can now search for blood availability.')
    }, 500)
  }

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getAvailabilityStatus = (count: number) => {
    if (count === 0) return { status: 'unavailable', color: 'text-red-600', bg: 'bg-red-50' }
    if (count < 5) return { status: 'low', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'available', color: 'text-green-600', bg: 'bg-green-50' }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">e-RaktKosh Integration</h1>
        <p className="text-muted-foreground">Connect with India's national blood bank network</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            e-RaktKosh Connection Status
          </CardTitle>
          <CardDescription>
            e-RaktKosh is the national blood bank management system of India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <div>
                  <p className="font-medium">
                    {connectionStatus === 'connected' ? 'Connected to e-RaktKosh' :
                     connectionStatus === 'connecting' ? 'Connecting...' :
                     connectionStatus === 'error' ? 'Connection Failed' : 'Not Connected'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {connectionStatus === 'connected' ? 'Real-time blood availability data accessible' :
                     connectionStatus === 'connecting' ? 'Establishing connection to national blood bank network' :
                     connectionStatus === 'error' ? 'Unable to connect to e-RaktKosh servers' : 'Click to test connection'}
                  </p>
                </div>
              </div>
              <Button 
                onClick={testConnection} 
                disabled={connectionStatus === 'connecting'}
                variant={connectionStatus === 'connected' ? 'outline' : 'default'}
              >
                {connectionStatus === 'connecting' ? 'Connecting...' : 
                 connectionStatus === 'connected' ? 'Reconnect' : 'Test Connection'}
              </Button>
            </div>

            {connectionStatus === 'connected' && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Successfully connected to e-RaktKosh! You can now search for real-time blood availability 
                  across India's network of blood banks.
                </AlertDescription>
              </Alert>
            )}

            {connectionStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Unable to connect to e-RaktKosh servers. Please check your internet connection and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Blood Availability
          </CardTitle>
          <CardDescription>Find blood banks with available blood units</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const bloodGroup = formData.get('bloodGroup') as string
            const state = formData.get('state') as string
            const city = formData.get('city') as string
            
            if (connectionStatus !== 'connected') {
              alert('Please establish connection to e-RaktKosh first')
              return
            }
            
            simulateAPICall(bloodGroup, state, city)
          }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group Required</Label>
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
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Enter city name" required />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || connectionStatus !== 'connected'}
            >
              {isLoading ? 'Searching...' : 'Search Blood Banks'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {searchResults.length} blood bank(s) found with matching blood availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No blood banks found</p>
                <p className="text-muted-foreground">
                  No blood banks in the selected area have the requested blood group available.
                  Try searching in nearby cities or contact blood banks directly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map(bank => (
                  <div key={bank.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{bank.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{bank.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{bank.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Last updated: {formatLastUpdated(bank.lastUpdated)}</span>
                        </div>
                      </div>
                      <Badge variant={bank.status === 'active' ? 'default' : 'secondary'}>
                        {bank.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Blood Availability</h4>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {Object.entries(bank.availability).map(([bloodGroup, count]) => {
                          const availability = getAvailabilityStatus(count)
                          return (
                            <div key={bloodGroup} className={`p-3 rounded-lg text-center ${availability.bg}`}>
                              <div className="font-semibold text-lg">{bloodGroup}</div>
                              <div className={`text-sm font-medium ${availability.color}`}>
                                {count} units
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" onClick={() => alert(`Calling ${bank.phone}`)}>
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert('Directions feature would open maps')}>
                        <MapPin className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert('Opening e-RaktKosh portal')}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View on e-RaktKosh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About e-RaktKosh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              e-RaktKosh is a comprehensive blood bank management system developed by the Centre for Development 
              of Advanced Computing (C-DAC) under the Ministry of Health and Family Welfare, Government of India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Key Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time blood availability tracking</li>
                  <li>• Donor registration and management</li>
                  <li>• Blood bank inventory management</li>
                  <li>• Online blood request system</li>
                  <li>• Mobile app for easy access</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reduces blood shortage</li>
                  <li>• Eliminates wastage of blood</li>
                  <li>• Ensures blood safety and quality</li>
                  <li>• Provides transparency in blood banking</li>
                  <li>• Facilitates emergency blood requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
