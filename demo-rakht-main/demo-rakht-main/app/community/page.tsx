'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageCircle, Users, Heart, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

interface ForumPost {
  id: string
  author: string
  title: string
  content: string
  timestamp: string
  category: 'general' | 'treatment' | 'support' | 'success-story'
  replies: number
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isCurrentUser: boolean
}

const mentorsAndVolunteers = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    role: 'Hematologist & Mentor',
    experience: '15 years in thalassemia care',
    specialization: 'Iron chelation therapy, transfusion management',
    location: 'Mumbai, Maharashtra',
    contact: {
      phone: '+91-98765-43210',
      email: 'dr.priya.sharma@hospital.com'
    },
    availability: 'Weekdays 2-4 PM',
    languages: ['Hindi', 'English', 'Marathi']
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'Patient Advocate & Volunteer',
    experience: 'Thalassemia patient for 20 years, helping others for 8 years',
    specialization: 'Patient support, insurance guidance, emotional counseling',
    location: 'Delhi, NCR',
    contact: {
      phone: '+91-98765-43211',
      email: 'rajesh.advocate@gmail.com'
    },
    availability: 'Evenings 6-8 PM',
    languages: ['Hindi', 'English', 'Punjabi']
  },
  {
    id: '3',
    name: 'Meera Patel',
    role: 'Nutritionist & Wellness Coach',
    experience: '10 years in clinical nutrition',
    specialization: 'Thalassemia diet planning, supplement guidance',
    location: 'Ahmedabad, Gujarat',
    contact: {
      phone: '+91-98765-43212',
      email: 'meera.nutrition@wellness.com'
    },
    availability: 'Mon, Wed, Fri 10 AM-12 PM',
    languages: ['Gujarati', 'Hindi', 'English']
  },
  {
    id: '4',
    name: 'Arjun Singh',
    role: 'Social Worker & Volunteer',
    experience: '12 years in healthcare social work',
    specialization: 'Financial aid guidance, government scheme navigation',
    location: 'Bangalore, Karnataka',
    contact: {
      phone: '+91-98765-43213',
      email: 'arjun.social@ngo.org'
    },
    availability: 'Weekdays 9 AM-5 PM',
    languages: ['Kannada', 'Hindi', 'English', 'Tamil']
  },
  {
    id: '5',
    name: 'Sunita Reddy',
    role: 'Parent Support Coordinator',
    experience: 'Mother of thalassemia patient, volunteer for 6 years',
    specialization: 'Parent counseling, child care tips, school coordination',
    location: 'Hyderabad, Telangana',
    contact: {
      phone: '+91-98765-43214',
      email: 'sunita.parent@support.org'
    },
    availability: 'Weekends 10 AM-2 PM',
    languages: ['Telugu', 'Hindi', 'English']
  },
  {
    id: '6',
    name: 'Dr. Amit Joshi',
    role: 'Pediatric Hematologist',
    experience: '18 years in pediatric blood disorders',
    specialization: 'Childhood thalassemia, bone marrow transplant',
    location: 'Pune, Maharashtra',
    contact: {
      phone: '+91-98765-43215',
      email: 'dr.amit@childrenhospital.com'
    },
    availability: 'Tuesdays & Thursdays 3-5 PM',
    languages: ['Marathi', 'Hindi', 'English']
  }
]

export default function CommunityPage() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Load data from localStorage
    const savedPosts = localStorage.getItem('forumPosts')
    const savedMessages = localStorage.getItem('communityMessages')

    if (savedPosts) {
      setForumPosts(JSON.parse(savedPosts))
    } else {
      // Initialize with sample posts
      const samplePosts: ForumPost[] = [
        {
          id: '1',
          author: 'Priya M.',
          title: 'Tips for managing iron chelation side effects',
          content: 'I\'ve been on deferasirox for 3 years now and wanted to share some tips that have helped me manage the side effects...',
          timestamp: '2024-01-15T10:30:00Z',
          category: 'treatment',
          replies: 8
        },
        {
          id: '2',
          author: 'Rahul K.',
          title: 'Successful bone marrow transplant - My journey',
          content: 'I wanted to share my experience with BMT. It\'s been 2 years since my transplant and I\'m doing well...',
          timestamp: '2024-01-14T15:45:00Z',
          category: 'success-story',
          replies: 15
        },
        {
          id: '3',
          author: 'Anita S.',
          title: 'Looking for thalassemia support group in Chennai',
          content: 'Hi everyone, I\'m new to Chennai and looking for local support groups. Any recommendations?',
          timestamp: '2024-01-13T09:20:00Z',
          category: 'support',
          replies: 5
        }
      ]
      setForumPosts(samplePosts)
      localStorage.setItem('forumPosts', JSON.stringify(samplePosts))
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initialize with sample messages
      const sampleMessages: Message[] = [
        {
          id: '1',
          sender: 'Community Moderator',
          content: 'Welcome to the RakhtSetu community chat! Feel free to ask questions and share your experiences.',
          timestamp: '2024-01-15T08:00:00Z',
          isCurrentUser: false
        },
        {
          id: '2',
          sender: 'Dr. Priya',
          content: 'Hello everyone! I\'m here to help with any medical questions you might have about thalassemia treatment.',
          timestamp: '2024-01-15T08:30:00Z',
          isCurrentUser: false
        }
      ]
      setMessages(sampleMessages)
      localStorage.setItem('communityMessages', JSON.stringify(sampleMessages))
    }
  }, [])

  const addForumPost = (post: Omit<ForumPost, 'id' | 'timestamp' | 'replies'>) => {
    const newPost: ForumPost = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      replies: 0
    }
    const updatedPosts = [newPost, ...forumPosts]
    setForumPosts(updatedPosts)
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts))
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    }

    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages))
    setNewMessage('')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'treatment': return 'bg-blue-100 text-blue-800'
      case 'support': return 'bg-green-100 text-green-800'
      case 'success-story': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community & Support</h1>
        <p className="text-muted-foreground">Connect with other patients, families, and healthcare professionals</p>
      </div>

      <Tabs defaultValue="forum" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Community Forum</TabsTrigger>
          <TabsTrigger value="chat">Group Chat</TabsTrigger>
          <TabsTrigger value="mentors">Mentors & Volunteers</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Community Forum
              </CardTitle>
              <CardDescription>Share experiences, ask questions, and support each other</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                addForumPost({
                  author: formData.get('author') as string || 'Anonymous',
                  title: formData.get('title') as string,
                  content: formData.get('content') as string,
                  category: formData.get('category') as 'general' | 'treatment' | 'support' | 'success-story'
                })
                e.currentTarget.reset()
                alert('Post created successfully!')
              }} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Your Name (Optional)</Label>
                    <Input id="author" name="author" placeholder="Anonymous" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select name="category" className="w-full p-2 border rounded-md" required>
                      <option value="general">General Discussion</option>
                      <option value="treatment">Treatment & Medical</option>
                      <option value="support">Support & Encouragement</option>
                      <option value="success-story">Success Stories</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input id="title" name="title" placeholder="What would you like to discuss?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" name="content" placeholder="Share your thoughts, experiences, or questions..." rows={4} required />
                </div>
                <Button type="submit" className="w-full">Create Post</Button>
              </form>

              <div className="space-y-4">
                <h3 className="font-semibold">Recent Posts</h3>
                {forumPosts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No posts yet. Be the first to start a discussion!</p>
                ) : (
                  <div className="space-y-4">
                    {forumPosts.map(post => (
                      <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getCategoryColor(post.category)}>
                                {post.category.replace('-', ' ')}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                by {post.author} • {formatTimestamp(post.timestamp)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-lg">{post.title}</h4>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-3">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {post.replies} replies
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Group Chat
              </CardTitle>
              <CardDescription>Real-time chat with community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/20">
                  {messages.map(message => (
                    <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
                        <div className={`p-3 rounded-lg ${
                          message.isCurrentUser 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-white border'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {message.sender}
                            </span>
                            <span className="text-xs opacity-70">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>💡 This is a supportive community space. Please be respectful and kind to all members.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Mentors & Volunteers
              </CardTitle>
              <CardDescription>Connect with healthcare professionals and experienced community members</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {mentorsAndVolunteers.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg font-semibold">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p className="text-primary font-medium">{mentor.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{mentor.experience}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Specialization</h4>
                      <p className="text-sm text-muted-foreground">{mentor.specialization}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </h4>
                      <p className="text-sm text-muted-foreground">{mentor.location}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Availability
                      </h4>
                      <p className="text-sm text-muted-foreground">{mentor.availability}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.contact.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={() => alert(`Calling ${mentor.contact.phone}`)}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => alert(`Sending email to ${mentor.contact.email}`)}>
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Become a Volunteer</CardTitle>
              <CardDescription>Help support the thalassemia community by becoming a volunteer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you're interested in becoming a mentor or volunteer to help other thalassemia patients and families, 
                  we'd love to have you join our community support network.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Ways to Help:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Share your experience and knowledge</li>
                      <li>• Provide emotional support to new patients</li>
                      <li>• Help with treatment navigation</li>
                      <li>• Assist with insurance and financial aid</li>
                      <li>• Organize community events</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Experience with thalassemia (patient/family/professional)</li>
                      <li>• Compassionate and patient nature</li>
                      <li>• Good communication skills</li>
                      <li>• Commitment to help others</li>
                      <li>• Basic training will be provided</li>
                    </ul>
                  </div>
                </div>
                <Button className="w-full md:w-auto">
                  Apply to Become a Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
