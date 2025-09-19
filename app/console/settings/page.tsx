"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Shield, Palette, Globe, Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      ticketUpdates: true,
      systemAlerts: true,
      weeklyReports: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    appearance: {
      theme: 'system',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12'
    },
    integrations: {
      slack: false,
      teams: false,
      jira: false,
      github: false
    }
  })

  const updateSetting = (category: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your application preferences and configurations</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch 
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Text message alerts for critical issues</p>
                    </div>
                    <Switch 
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Ticket Updates</Label>
                    <Switch 
                      checked={settings.notifications.ticketUpdates}
                      onCheckedChange={(checked) => updateSetting('notifications', 'ticketUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Alerts</Label>
                    <Switch 
                      checked={settings.notifications.systemAlerts}
                      onCheckedChange={(checked) => updateSetting('notifications', 'systemAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Weekly Reports</Label>
                    <Switch 
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Security Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={settings.security.twoFactor}
                  onCheckedChange={(checked) => updateSetting('security', 'twoFactor', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select value={settings.security.sessionTimeout} onValueChange={(value) => updateSetting('security', 'sessionTimeout', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select value={settings.security.passwordExpiry} onValueChange={(value) => updateSetting('security', 'passwordExpiry', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Palette className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Appearance & Localization</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.appearance.theme} onValueChange={(value) => updateSetting('appearance', 'theme', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.appearance.language} onValueChange={(value) => updateSetting('appearance', 'language', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select value={settings.appearance.dateFormat} onValueChange={(value) => updateSetting('appearance', 'dateFormat', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select value={settings.appearance.timeFormat} onValueChange={(value) => updateSetting('appearance', 'timeFormat', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12-hour</SelectItem>
                    <SelectItem value="24">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Third-Party Integrations</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">Connect with Slack for notifications</p>
                </div>
                <Switch 
                  checked={settings.integrations.slack}
                  onCheckedChange={(checked) => updateSetting('integrations', 'slack', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Microsoft Teams</Label>
                  <p className="text-sm text-muted-foreground">Connect with Teams for collaboration</p>
                </div>
                <Switch 
                  checked={settings.integrations.teams}
                  onCheckedChange={(checked) => updateSetting('integrations', 'teams', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Jira Integration</Label>
                  <p className="text-sm text-muted-foreground">Sync tickets with Jira</p>
                </div>
                <Switch 
                  checked={settings.integrations.jira}
                  onCheckedChange={(checked) => updateSetting('integrations', 'jira', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>GitHub Integration</Label>
                  <p className="text-sm text-muted-foreground">Connect with GitHub repositories</p>
                </div>
                <Switch 
                  checked={settings.integrations.github}
                  onCheckedChange={(checked) => updateSetting('integrations', 'github', checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}