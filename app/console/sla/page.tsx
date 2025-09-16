"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function SLAPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">SLA Monitoring</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Track and ensure compliance with Service Level Agreements
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              SLA Compliance
            </CardTitle>
            <CardDescription>Overall compliance rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Above target of 95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Avg Response Time
            </CardTitle>
            <CardDescription>Current average response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Target: 4h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
              At Risk
            </CardTitle>
            <CardDescription>Tickets at risk of SLA breach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SLA Monitoring Dashboard</CardTitle>
          <CardDescription>
            This feature is coming soon. Monitor SLA compliance and get alerts for potential breaches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              Comprehensive SLA monitoring and alerting will be available in the next release.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}