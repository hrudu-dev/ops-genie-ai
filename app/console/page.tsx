"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { AlertTriangle, CheckCircle, Clock, Users, TrendingUp, MessageSquare } from 'lucide-react'
import { mockTickets, mockUsers, mockGrowthData } from '@/lib/mock-data'

export default function DashboardPage() {
  const openTickets = mockTickets.filter(t => t.status === 'open').length
  const criticalTickets = mockTickets.filter(t => t.status === 'critical').length
  const inProgressTickets = mockTickets.filter(t => t.status === 'in_progress').length
  const resolvedTickets = mockTickets.filter(t => t.status === 'resolved').length

  const recentTickets = mockTickets.slice(0, 3)
  const chartData = mockGrowthData.slice(-4)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of system metrics and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
              <p className="text-3xl font-bold">{openTickets}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
              <p className="text-3xl font-bold">{criticalTickets}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-3xl font-bold">{inProgressTickets}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{mockUsers.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Tickets</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  ticket.status === 'critical' ? 'bg-red-500' :
                  ticket.status === 'open' ? 'bg-blue-500' :
                  ticket.status === 'in_progress' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium">{ticket.title}</h4>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Assigned to {ticket.assigned_to}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ticket Resolution Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="resolved" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-20 flex-col space-y-2">
            <AlertTriangle className="h-6 w-6" />
            <span>Create Ticket</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <MessageSquare className="h-6 w-6" />
            <span>AI Assistant</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Users className="h-6 w-6" />
            <span>Manage Users</span>
          </Button>
        </div>
      </Card>

      {/* System Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Database</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">API Services</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">AI Assistant</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium">Email Service</p>
              <p className="text-sm text-yellow-600">Degraded</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}