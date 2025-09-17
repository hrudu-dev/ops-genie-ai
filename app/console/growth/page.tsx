"use client"

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Users, Ticket, Star } from 'lucide-react'
import { mockGrowthData } from '@/lib/mock-data'

export default function GrowthPage() {
  const totalTickets = mockGrowthData.reduce((sum, item) => sum + item.tickets, 0)
  const totalResolved = mockGrowthData.reduce((sum, item) => sum + item.resolved, 0)
  const avgSatisfaction = mockGrowthData.reduce((sum, item) => sum + item.satisfaction, 0) / mockGrowthData.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Growth Dashboard</h1>
        <p className="text-muted-foreground mt-2">Visualize key metrics and performance trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
              <p className="text-3xl font-bold">{totalTickets}</p>
              <p className="text-sm text-green-600">+12% from last period</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-3xl font-bold">{totalResolved}</p>
              <p className="text-sm text-green-600">+8% from last period</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolution Rate</p>
              <p className="text-3xl font-bold">{Math.round((totalResolved / totalTickets) * 100)}%</p>
              <p className="text-sm text-green-600">+3% from last period</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
              <p className="text-3xl font-bold">{avgSatisfaction.toFixed(1)}</p>
              <p className="text-sm text-green-600">+0.2 from last period</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Ticket Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#3b82f6" />
              <Bar dataKey="resolved" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Peak Performance</h4>
            <p className="text-sm text-blue-700 mt-1">
              June showed the highest customer satisfaction at 4.6/5 with 53 resolved tickets.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900">Resolution Efficiency</h4>
            <p className="text-sm text-green-700 mt-1">
              Overall resolution rate of {Math.round((totalResolved / totalTickets) * 100)}% exceeds industry average.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900">Growth Opportunity</h4>
            <p className="text-sm text-yellow-700 mt-1">
              April had the highest ticket volume (61) - consider resource allocation during peak periods.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900">Consistency</h4>
            <p className="text-sm text-purple-700 mt-1">
              Satisfaction scores remain consistently above 4.0, indicating stable service quality.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}