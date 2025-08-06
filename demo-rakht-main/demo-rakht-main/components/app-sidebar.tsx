'use client'

import * as React from 'react'
import { Heart, Users, Activity, BookOpen, DollarSign, MessageCircle, Database, Home } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Blood Donation',
    url: '/blood-donation',
    icon: Heart,
  },
  {
    title: 'Medical Management',
    url: '/medical-management',
    icon: Activity,
  },
  {
    title: 'Education & Awareness',
    url: '/education',
    icon: BookOpen,
  },
  {
    title: 'Financial Aid',
    url: '/financial-aid',
    icon: DollarSign,
  },
  {
    title: 'Community',
    url: '/community',
    icon: MessageCircle,
  },
  {
    title: 'e-RaktKosh',
    url: '/e-raktkosh',
    icon: Database,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mx-2 mt-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">RakhtSetu</h1>
            <p className="text-xs text-red-100">Thalassemia Support</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-3 text-xs text-muted-foreground bg-muted/30 rounded-lg mx-2 mb-2">
          <p className="font-medium">© 2025 RakhtSetu</p>
          <p>Supporting Thalassemia patients across India</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
