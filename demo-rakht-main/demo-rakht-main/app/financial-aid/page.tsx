'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DollarSign, Heart, Phone, Mail, MapPin, ExternalLink, Users, Building, Banknote } from 'lucide-react'

const financialAidPrograms = [
  {
    id: '1',
    name: 'Thalassemia and Sickle Cell Society (TSCS)',
    type: 'NGO',
    description: 'Provides financial assistance for blood transfusions, iron chelation therapy, and medical equipment.',
    eligibility: 'Thalassemia patients from economically weaker sections',
    assistance: 'Up to ₹50,000 per year for medical expenses',
    contact: {
      phone: '+91-11-2634-7851',
      email: 'info@tscs.org',
      address: 'New Delhi, India',
      website: 'www.tscs.org'
    },
    documents: ['Income certificate', 'Medical reports', 'Aadhar card', 'Bank details']
  },
  {
    id: '2',
    name: 'Cure Thalassemia Foundation',
    type: 'Foundation',
    description: 'Supports thalassemia patients with treatment costs and awareness programs.',
    eligibility: 'Children and adults with thalassemia major',
    assistance: 'Treatment support, blood transfusion costs, chelation therapy',
    contact: {
      phone: '+91-22-2659-7878',
      email: 'help@curethalassemia.org',
      address: 'Mumbai, Maharashtra',
      website: 'www.curethalassemia.org'
    },
    documents: ['Medical certificate', 'Income proof', 'Patient ID', 'Treatment records']
  },
  {
    id: '3',
    name: 'Sankalp India Foundation',
    type: 'NGO',
    description: 'Provides comprehensive support including medical aid, education, and rehabilitation.',
    eligibility: 'Thalassemia patients below poverty line',
    assistance: 'Medical expenses, educational support, family counseling',
    contact: {
      phone: '+91-80-2345-6789',
      email: 'support@sankalpindia.org',
      address: 'Bangalore, Karnataka',
      website: 'www.sankalpindia.org'
    },
    documents: ['BPL certificate', 'Medical reports', 'School certificates (for children)']
  },
  {
    id: '4',
    name: 'Indian Red Cross Society',
    type: 'Government',
    description: 'Provides blood and blood components at subsidized rates for thalassemia patients.',
    eligibility: 'All thalassemia patients',
    assistance: 'Subsidized blood transfusions, emergency blood supply',
    contact: {
      phone: '+91-11-2371-6441',
      email: 'info@indianredcross.org',
      address: 'New Delhi, India',
      website: 'www.indianredcross.org'
    },
    documents: ['Patient registration', 'Doctor\'s prescription', 'Blood group certificate']
  },
  {
    id: '5',
    name: 'Rashtriya Arogya Nidhi (RAN)',
    type: 'Government',
    description: 'Government scheme providing financial assistance for treatment of major diseases.',
    eligibility: 'BPL families, annual income below ₹5 lakhs',
    assistance: 'Up to ₹2 lakhs for treatment expenses',
    contact: {
      phone: '+91-11-2306-1863',
      email: 'ran-mohfw@nic.in',
      address: 'Ministry of Health, New Delhi',
      website: 'www.mohfw.gov.in'
    },
    documents: ['Income certificate', 'BPL card', 'Medical estimate', 'Hospital recommendation']
  },
  {
    id: '6',
    name: 'PM-JAY (Ayushman Bharat)',
    type: 'Government',
    description: 'National health insurance scheme covering thalassemia treatment.',
    eligibility: 'Eligible families as per SECC database',
    assistance: 'Up to ₹5 lakhs per family per year',
    contact: {
      phone: '14555',
      email: 'support@pmjay.gov.in',
      address: 'National Health Authority, New Delhi',
      website: 'www.pmjay.gov.in'
    },
    documents: ['Ayushman card', 'Family ID', 'Medical documents']
  }
]

const crowdfundingInfo = {
  platforms: [
    {
      name: 'Ketto',
      description: 'India\'s leading crowdfunding platform for medical emergencies',
      features: ['Zero platform fee for medical campaigns', '24/7 support', 'Social media integration'],
      website: 'www.ketto.org'
    },
    {
      name: 'Milaap',
      description: 'Crowdfunding platform with focus on healthcare and education',
      features: ['Easy campaign setup', 'Multiple payment options', 'Tax benefits for donors'],
      website: 'www.milaap.org'
    },
    {
      name: 'ImpactGuru',
      description: 'Social impact crowdfunding platform',
      features: ['Medical verification', 'Campaign promotion', 'Donor engagement tools'],
      website: 'www.impactguru.com'
    },
    {
      name: 'FundRazr',
      description: 'Global crowdfunding platform with Indian operations',
      features: ['International donations', 'Social sharing tools', 'Campaign analytics'],
      website: 'www.fundrazr.com'
    }
  ],
  tips: [
    'Create a compelling story with clear medical need',
    'Include authentic medical documents and reports',
    'Add photos and videos to make campaign personal',
    'Set realistic funding goals based on treatment costs',
    'Share campaign across social media platforms',
    'Provide regular updates to donors',
    'Express gratitude and maintain transparency',
    'Consider offering small tokens of appreciation'
  ]
}

export default function FinancialAidPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Financial Aid & Crowdfunding</h1>
        <p className="text-muted-foreground">Find financial support for thalassemia treatment and care</p>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="programs">Aid Programs</TabsTrigger>
          <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Aid Programs
              </CardTitle>
              <CardDescription>
                Government schemes, NGOs, and foundations providing financial assistance for thalassemia treatment
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {financialAidPrograms.map(program => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant={program.type === 'Government' ? 'default' : program.type === 'NGO' ? 'secondary' : 'outline'}>
                        {program.type}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(`https://${program.contact.website}`, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Website
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{program.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-muted-foreground">{program.eligibility}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Assistance Provided
                      </h4>
                      <p className="text-sm text-muted-foreground">{program.assistance}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{program.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{program.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{program.contact.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span>{program.contact.website}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Required Documents</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={() => alert(`Calling ${program.contact.phone}`)}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => alert(`Sending email to ${program.contact.email}`)}>
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crowdfunding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Crowdfunding for Medical Expenses
              </CardTitle>
              <CardDescription>
                Raise funds from the community to support thalassemia treatment costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">What is Medical Crowdfunding?</h3>
                <p className="text-sm text-blue-800">
                  Medical crowdfunding allows patients and families to raise money from friends, family, and strangers 
                  online to help cover medical expenses. It's a way to get financial support when traditional funding 
                  sources are not sufficient.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Crowdfunding Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {crowdfundingInfo.platforms.map((platform, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => window.open(`https://${platform.website}`, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Successful Crowdfunding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crowdfundingInfo.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Campaign Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Campaign Title</h4>
                  <p className="text-sm text-muted-foreground">
                    "Help [Patient Name] Fight Thalassemia - Support Life-Saving Treatment"
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Story Introduction</h4>
                  <p className="text-sm text-muted-foreground">
                    Brief introduction of the patient, age, and current situation
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">Medical Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Explain the condition, treatment needed, and associated costs
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium">Financial Breakdown</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of treatment costs and funding goal
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium">Call to Action</h4>
                  <p className="text-sm text-muted-foreground">
                    Request for support and how donations will make a difference
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  <div>
                    <h4 className="font-medium text-yellow-800">Platform Fees</h4>
                    <p className="text-sm text-yellow-700">Most platforms charge 2-5% processing fees on donations received.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">i</div>
                  <div>
                    <h4 className="font-medium text-blue-800">Tax Implications</h4>
                    <p className="text-sm text-blue-700">Consult with a tax advisor about potential tax implications of received donations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                  <div>
                    <h4 className="font-medium text-green-800">Documentation</h4>
                    <p className="text-sm text-green-700">Keep all medical records and receipts for transparency and tax purposes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
