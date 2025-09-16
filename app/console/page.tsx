"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Server,
  Shield,
  MessageSquare
} from 'lucide-react'

const stats = [
  {
    title: 'Active Tickets',
    value: '24',
    change: '+12%',
    icon: Activity,
    color: 'text-blue-600'
  },
  {
    title: 'Resolved Today',
    value: '18',
    change: '+8%',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Critical Alerts',
    value: '3',
    change: '-25%',
    icon: AlertTriangle,
    color: 'text-red-600'
  },
  {
    title: 'Avg Response Time',
    value: '2.4h',
    change: '-15%',
    icon: Clock,
    color: 'text-yellow-600'
  }
]

const recentTickets = [
  {
    id: 'TK-001',
    title: 'Server downtime - Production',
    priority: 'Critical',
    status: 'In Progress',
    assignee: 'John Doe',
    created: '2 hours ago'
  },
  {
    id: 'TK-002',
    title: 'Email service intermittent issues',
    priority: 'High',
    status: 'Open',
    assignee: 'Jane Smith',
    created: '4 hours ago'
  },
  {
    id: 'TK-003',
    title: 'VPN connection problems',
    priority: 'Medium',
    status: 'Resolved',
    assignee: 'Mike Johnson',
    created: '6 hours ago'
  }
]

const systemHealth = [
  { name: 'Web Servers', status: 'healthy', uptime: '99.9%' },
  { name: 'Database', status: 'healthy', uptime: '99.8%' },
  { name: 'API Gateway', status: 'warning', uptime: '98.5%' },
  { name: 'Email Service', status: 'critical', uptime: '95.2%' }
]

export default function ConsoleDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to OpsGenie AI</h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Your AI-powered command center for IT operations and support
            </p>
          </div>
          <div className="hidden sm:block ml-4">
            <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {' '}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="tickets" className="text-xs sm:text-sm">Tickets</TabsTrigger>
          <TabsTrigger value="health" className="text-xs sm:text-sm">Health</TabsTrigger>
          <TabsTrigger value="ai-insights" className="text-xs sm:text-sm">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Key performance indicators for the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ticket Resolution Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime</span>
                    <span className="font-medium">99.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.7%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Team Activity
                </CardTitle>
                <CardDescription>
                  Current team workload and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <span className="font-medium">8 agents</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm">Busy</span>
                    </div>
                    <span className="font-medium">4 agents</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Offline</span>
                    </div>
                    <span className="font-medium">2 agents</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Average workload</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">68% capacity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>
                Latest support tickets and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{ticket.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          ticket.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="font-medium">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Assigned to {ticket.assignee} • {ticket.created}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                System Health Monitor
              </CardTitle>
              <CardDescription>
                Real-time status of critical system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'healthy' ? 'bg-green-500' :
                        system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{system.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{system.uptime}</div>
                      <div className="text-sm text-muted-foreground capitalize">{system.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Intelligent recommendations and predictions from your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Security Alert Pattern Detected</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        AI has identified an unusual pattern in failed login attempts. Consider implementing additional security measures.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100">Performance Optimization Opportunity</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Database queries can be optimized to reduce response time by an estimated 23%. Auto-optimization available.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Predictive Maintenance Alert</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Server CPU usage trending upward. Recommend scaling resources within the next 48 hours.
                      </p>
                    </div>
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