'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookOpen, MessageCircle, Search, Heart, Pill, Activity, Users } from 'lucide-react'

const educationalArticles = [
  {
    id: '1',
    title: 'Understanding Thalassemia: A Comprehensive Guide',
    category: 'Basics',
    readTime: '8 min read',
    content: `Thalassemia is an inherited blood disorder that affects the body's ability to produce hemoglobin and red blood cells. People with thalassemia have fewer healthy red blood cells and less hemoglobin than normal.

Types of Thalassemia:
- Alpha Thalassemia: Caused by problems with the alpha globin genes
- Beta Thalassemia: Caused by problems with the beta globin genes

Symptoms:
- Fatigue and weakness
- Pale skin
- Slow growth
- Abdominal swelling
- Dark urine

Treatment Options:
- Regular blood transfusions
- Iron chelation therapy
- Bone marrow transplant (in severe cases)
- Supportive care and monitoring

Understanding your condition is the first step toward effective management. Thalassemia affects people differently, and working closely with your healthcare team is essential for developing the right treatment plan for your specific needs.`
  },
  {
    id: '2',
    title: 'Iron Chelation Therapy: What You Need to Know',
    category: 'Treatment',
    readTime: '6 min read',
    content: `Iron chelation therapy is a crucial treatment for people with thalassemia who receive regular blood transfusions. This therapy helps remove excess iron from the body.

Why is it Important?
Regular blood transfusions can lead to iron overload, which can damage organs like the heart, liver, and endocrine glands.

Types of Iron Chelators:
- Deferasirox (Exjade/Jadenu): Oral medication taken once daily
- Deferoxamine (Desferal): Given by injection under the skin
- Deferiprone (Ferriprox): Oral medication taken three times daily

Monitoring:
- Regular blood tests to check iron levels
- Heart function tests
- Liver function monitoring
- Eye and hearing tests

Side Effects Management:
Common side effects may include nausea, diarrhea, or skin rash. It's important to report any side effects to your doctor so they can adjust your treatment if needed. Never stop taking your chelation therapy without consulting your healthcare provider.`
  },
  {
    id: '3',
    title: 'Nutrition Guidelines for Thalassemia Patients',
    category: 'Lifestyle',
    readTime: '5 min read',
    content: `Proper nutrition plays a vital role in managing thalassemia and maintaining overall health.

Foods to Include:
- Fresh fruits and vegetables
- Whole grains
- Lean proteins (chicken, fish, legumes)
- Dairy products (if tolerated)
- Foods rich in vitamin C (helps with iron absorption when needed)

Foods to Limit:
- Iron-rich foods (red meat, liver, iron-fortified cereals)
- Alcohol
- Raw or undercooked foods
- High-sodium processed foods

Special Considerations:
- Folic acid supplementation may be recommended
- Calcium and vitamin D for bone health
- Stay hydrated, especially during chelation therapy

Meal Planning Tips:
Plan your meals around your treatment schedule. Some medications work better on an empty stomach, while others should be taken with food. Keep a food diary to track how different foods affect your energy levels and overall well-being.`
  },
  {
    id: '4',
    title: 'Living with Thalassemia: Daily Life Management',
    category: 'Lifestyle',
    readTime: '7 min read',
    content: `Managing thalassemia involves more than just medical treatment. Here are tips for daily life management.

Energy Management:
- Plan activities during your best energy times
- Take regular breaks
- Prioritize important tasks
- Get adequate sleep (7-9 hours per night)

Exercise and Activity:
- Light to moderate exercise is beneficial
- Avoid overexertion
- Swimming, walking, and yoga are good options
- Consult your doctor before starting new exercise routines

Emotional Well-being:
- Connect with support groups
- Practice stress management techniques
- Maintain social connections
- Consider counseling if needed

Work and School:
Communicate with your employer or school about your condition. Many accommodations can be made to help you succeed while managing your health needs. Don't be afraid to ask for help when you need it.

Travel Considerations:
When traveling, always carry your medical information, medications, and contact details for your healthcare team. Plan ahead for medical care at your destination if needed.`
  }
]

const faqs = [
  {
    question: 'What is the difference between thalassemia major and minor?',
    answer: 'Thalassemia major (also called Cooley\'s anemia) is the most severe form, requiring regular blood transfusions from early childhood. Thalassemia minor (trait) is a milder form where people are carriers but usually don\'t have symptoms and don\'t require treatment.'
  },
  {
    question: 'How often do thalassemia patients need blood transfusions?',
    answer: 'The frequency varies depending on the severity of the condition. Patients with thalassemia major typically need transfusions every 2-4 weeks, while those with thalassemia intermedia may need them less frequently or only during times of stress or illness.'
  },
  {
    question: 'Can people with thalassemia have children?',
    answer: 'Yes, people with thalassemia can have children. However, genetic counseling is recommended to understand the risks of passing the condition to offspring. If both parents carry thalassemia genes, there\'s a 25% chance their child will have thalassemia major.'
  },
  {
    question: 'What are the long-term complications of thalassemia?',
    answer: 'Long-term complications can include iron overload (affecting heart, liver, and endocrine organs), bone problems, growth delays, and increased risk of infections. Regular monitoring and proper treatment can help prevent or manage these complications.'
  },
  {
    question: 'Is bone marrow transplant a cure for thalassemia?',
    answer: 'Bone marrow (stem cell) transplant can be curative for thalassemia, but it\'s typically considered for severe cases and when a suitable donor is available. The procedure carries risks and requires careful evaluation by a medical team.'
  },
  {
    question: 'How can I manage fatigue from thalassemia?',
    answer: 'Managing fatigue involves maintaining regular transfusion schedules, proper iron chelation, adequate nutrition, gentle exercise, good sleep hygiene, and pacing activities. Work with your healthcare team to optimize your treatment plan.'
  }
]

const knowledgeBase = {
  'what is thalassemia': 'Thalassemia is an inherited blood disorder that affects the production of hemoglobin, leading to anemia and requiring regular medical management.',
  'blood transfusion': 'Blood transfusions are a primary treatment for thalassemia major, typically needed every 2-4 weeks to maintain adequate hemoglobin levels.',
  'iron chelation': 'Iron chelation therapy removes excess iron from the body that accumulates from regular blood transfusions, preventing organ damage.',
  'symptoms': 'Common symptoms include fatigue, weakness, pale skin, slow growth, and abdominal swelling. Severity varies by type of thalassemia.',
  'diet': 'A balanced diet with limited iron-rich foods is recommended. Include fruits, vegetables, and whole grains while avoiding excessive iron intake.',
  'exercise': 'Light to moderate exercise is beneficial for thalassemia patients. Swimming, walking, and yoga are good options. Avoid overexertion.',
  'pregnancy': 'Women with thalassemia can have successful pregnancies with proper medical care and monitoring. Genetic counseling is recommended.',
  'complications': 'Long-term complications may include iron overload, heart problems, liver issues, bone problems, and growth delays if not properly managed.',
  'treatment': 'Treatment includes regular blood transfusions, iron chelation therapy, folic acid supplements, and supportive care. Bone marrow transplant may be curative in some cases.',
  'support': 'Support groups, counseling, and connecting with other patients can help manage the emotional aspects of living with thalassemia.'
}

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set())
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', message: string}>>([
    { type: 'bot', message: 'Hello! I\'m here to help answer your questions about thalassemia. You can ask me about symptoms, treatment, diet, or any other concerns you might have.' }
  ])

  const filteredArticles = educationalArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleArticleExpansion = (articleId: string) => {
    const newExpanded = new Set(expandedArticles)
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId)
    } else {
      newExpanded.add(articleId)
    }
    setExpandedArticles(newExpanded)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }])

    // Simple keyword matching for responses
    const lowerInput = userMessage.toLowerCase()
    let response = "I'm sorry, I don't have specific information about that. Please consult with your healthcare provider for personalized medical advice."

    for (const [keyword, answer] of Object.entries(knowledgeBase)) {
      if (lowerInput.includes(keyword)) {
        response = answer
        break
      }
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', message: response }])
    }, 500)

    setChatInput('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Education & Awareness</h1>
        <p className="text-muted-foreground">Learn about thalassemia management and get answers to your questions</p>
      </div>

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Educational Articles</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="chat">Ask Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Educational Articles
              </CardTitle>
              <CardDescription>Comprehensive information about thalassemia management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="grid gap-6">
                {filteredArticles.map(article => {
                  const isExpanded = expandedArticles.has(article.id)
                  const previewContent = article.content.substring(0, 200) + '...'
                  
                  return (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{article.category}</Badge>
                              <span className="text-sm text-muted-foreground">{article.readTime}</span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleArticleExpansion(article.id)}
                          >
                            {isExpanded ? 'Show Less' : 'Read More'}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
                            {isExpanded ? article.content : previewContent}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No articles found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about thalassemia and their answers</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reference Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Normal Hemoglobin Levels</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Men: 14-18 g/dL</li>
                    <li>• Women: 12-16 g/dL</li>
                    <li>• Children: 11-13 g/dL</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Iron Chelation Schedule</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Deferasirox: Once daily</li>
                    <li>• Deferiprone: 3 times daily</li>
                    <li>• Deferoxamine: 5-7 nights/week</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Monitoring Tests</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• CBC: Monthly</li>
                    <li>• Iron studies: Every 3 months</li>
                    <li>• Heart function: Annually</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Emergency Contacts</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Your hematologist</li>
                    <li>• Local blood bank</li>
                    <li>• Emergency services: 108</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Ask Questions
              </CardTitle>
              <CardDescription>Get quick answers to your thalassemia-related questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question about thalassemia..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>

                <div className="text-xs text-muted-foreground">
                  <p>💡 Try asking about: symptoms, treatment, diet, exercise, complications, or support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'What is thalassemia?',
                  'How often do I need blood transfusions?',
                  'What foods should I avoid?',
                  'What are the symptoms of iron overload?',
                  'Can I exercise with thalassemia?',
                  'What are the treatment options?'
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto p-3"
                    onClick={() => {
                      setChatInput(question)
                      setChatMessages(prev => [...prev, { type: 'user', message: question }])
                      
                      const lowerInput = question.toLowerCase()
                      let response = "I'm sorry, I don't have specific information about that. Please consult with your healthcare provider for personalized medical advice."

                      for (const [keyword, answer] of Object.entries(knowledgeBase)) {
                        if (lowerInput.includes(keyword)) {
                          response = answer
                          break
                        }
                      }

                      setTimeout(() => {
                        setChatMessages(prev => [...prev, { type: 'bot', message: response }])
                      }, 500)
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
