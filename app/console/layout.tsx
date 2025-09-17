"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { Chatbot } from '@/components/chatbot'
import {
  Shield,
  LayoutDashboard,
  MessageSquare,
  Ticket,
  AlertTriangle,
  Clock,
  TrendingUp,
  Users,
  Puzzle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/console', icon: LayoutDashboard },
  { name: 'AI Assistant', href: '/console/ai-assistant', icon: MessageSquare },
  { name: 'Ticket Triage', href: '/console/tickets', icon: Ticket },
  { name: 'Anomaly Detection', href: '/console/anomalies', icon: AlertTriangle },
  { name: 'SLA Monitoring', href: '/console/sla', icon: Clock },
  { name: 'Growth Dashboard', href: '/console/growth', icon: TrendingUp },
  { name: 'User Management', href: '/console/users', icon: Users },
  { name: 'Extensions', href: '/console/extensions', icon: Puzzle },
]

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentPage = navigation.find(item => item.href === pathname)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Mobile sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">OpsGenie AI</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r">
          {/* Desktop sidebar header */}
          <div className="flex items-center px-4 py-6 border-b">
            <Shield className="h-8 w-8 text-primary flex-shrink-0" />
            <span className="ml-2 text-xl font-bold truncate">OpsGenie AI</span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Fixed header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Left side - Menu button and page title */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open sidebar</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                {currentPage?.icon && (
                  <currentPage.icon className="h-5 w-5 text-muted-foreground lg:hidden" />
                )}
                <h1 className="text-lg font-semibold truncate">
                  {currentPage?.name || 'Dashboard'}
                </h1>
              </div>
            </div>
            
            {/* Right side - Theme toggle and user menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={mounted ? theme === 'dark' : false}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  disabled={!mounted}
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
              
              {/* Chatbot and User menu buttons */}
              <div className="flex items-center space-x-1">
                <Chatbot />
                
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User profile</span>
                </Button>
                
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
                
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}