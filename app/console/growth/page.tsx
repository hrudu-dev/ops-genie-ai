"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart
} from 'lucide-react'

const metrics = [
  {
    title: 'Total Tickets Resolved',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Average Resolution Time',
    value: '2.4 hours',
    change: '-8.2%',
    trend: 'down',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5.0',
    change: '+3.1%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: 'First Contact Resolution',
    value: '78.5%',
    change: '+5.7%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

const monthlyData = [
  { month: 'Jan', tickets: 145, resolved: 142, satisfaction: 4.6 },
  { month: 'Feb', tickets: 167, resolved: 159, satisfaction: 4.7 },
  { month: 'Mar', tickets: 189, resolved: 185, satisfaction: 4.8 },
  { month: 'Apr', tickets: 203, resolved: 198, satisfaction: 4.9 },
  { month: 'May', tickets: 178, resolved: 176, satisfaction: 4.8 },
  { month: 'Jun', tickets: 156, resolved: 154, satisfaction: 4.7 }
]

const categoryData = [
  { category: 'Network Issues', count: 45, percentage: 28 },
  { category: 'Software Problems', count: 38, percentage: 24 },
  { category: 'Hardware Failures', count: 32, percentage: 20 },
  { category: 'Security Incidents', count: 25, percentage: 16 },
  { category: 'User Access', count: 19, percentage: 12 }
]

export default function GrowthDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Growth Dashboard</h1>
        <p className="text-muted-foreground">
          Track performance metrics and analyze growth trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                )}
                <span className="text-green-600">{metric.change}</span>
                {' '}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Monthly Ticket Volume
                </CardTitle>
                <CardDescription>
                  Tickets received and resolved over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <span className="text-muted-foreground">
                          {data.resolved}/{data.tickets} resolved
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(data.resolved / data.tickets) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Customer Satisfaction Trend
                </CardTitle>
                <CardDescription>
                  Average satisfaction scores over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(data.satisfaction / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {data.satisfaction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Ticket Categories Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of tickets by category for the current month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{category.count} tickets</span>
                        <span className="text-sm font-medium">{category.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-blue-600' :
                          index === 1 ? 'bg-green-600' :
                          index === 2 ? 'bg-yellow-600' :
                          index === 3 ? 'bg-red-600' : 'bg-purple-600'
                        }`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Individual agent performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', resolved: 45, rating: 4.9 },
                    { name: 'Jane Smith', resolved: 38, rating: 4.8 },
                    { name: 'Mike Johnson', resolved: 42, rating: 4.7 },
                    { name: 'Sarah Wilson', resolved: 35, rating: 4.8 }
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {agent.resolved} tickets resolved
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{agent.rating}/5.0</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time Analysis</CardTitle>
                <CardDescription>
                  Average resolution times by priority level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { priority: 'Critical', time: '1.2 hours', target: '2 hours', status: 'good' },
                    { priority: 'High', time: '4.5 hours', target: '8 hours', status: 'good' },
                    { priority: 'Medium', time: '2.1 days', target: '3 days', status: 'good' },
                    { priority: 'Low', time: '5.8 days', target: '7 days', status: 'good' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.priority}</div>
                        <div className="text-sm text-muted-foreground">
                          Target: {item.target}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.time}</div>
                        <div className={`text-sm ${
                          item.status === 'good' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.status === 'good' ? 'On target' : 'Behind'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>
                Intelligent analysis and recommendations based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    📈 Positive Trend Detected
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your team's first contact resolution rate has improved by 15% over the last quarter. 
                    This indicates better training effectiveness and knowledge base utilization.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                    ⚠️ Attention Required
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Network-related tickets have increased by 35% this month. Consider proactive 
                    infrastructure monitoring to prevent recurring issues.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    💡 Optimization Opportunity
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Based on ticket patterns, implementing automated password reset functionality 
                    could reduce ticket volume by an estimated 20%.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    🎯 Performance Insight
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Your customer satisfaction scores are consistently highest on Tuesdays and Wednesdays. 
                    Consider scheduling complex tasks during these peak performance days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}