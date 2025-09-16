"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Puzzle, Download, Settings } from 'lucide-react'

export default function ExtensionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Extensions</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Integrate third-party tools and services to extend console functionality
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Puzzle className="h-5 w-5 mr-2 text-blue-600" />
              Available Extensions
            </CardTitle>
            <CardDescription>Extensions in marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Ready to install</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="h-5 w-5 mr-2 text-green-600" />
              Installed
            </CardTitle>
            <CardDescription>Currently active extensions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">All up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-purple-600" />
              Custom Extensions
            </CardTitle>
            <CardDescription>Organization-specific extensions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Internal tools</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extension Marketplace</CardTitle>
          <CardDescription>
            This feature is coming soon. Browse and install extensions to enhance your console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Puzzle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              Extension marketplace and management will be available in the next release.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}