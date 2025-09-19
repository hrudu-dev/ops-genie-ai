"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User as UserIcon, Edit, Save, X, Camera } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT Operations',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST',
    bio: 'Senior IT Administrator with 8+ years of experience in managing enterprise systems and leading technical teams.'
  })

  const [editForm, setEditForm] = useState(profile)

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and preferences</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                <UserIcon className="h-16 w-16" />
              </div>
              {isEditing && (
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.role}</p>
            </div>
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))} 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} 
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    value={editForm.department} 
                    onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))} 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={editForm.phone} 
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))} 
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={editForm.location} 
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))} 
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={editForm.timezone} onValueChange={(value) => setEditForm(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST">Pacific Standard Time</SelectItem>
                      <SelectItem value="EST">Eastern Standard Time</SelectItem>
                      <SelectItem value="CST">Central Standard Time</SelectItem>
                      <SelectItem value="MST">Mountain Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  value={editForm.bio} 
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))} 
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{profile.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{profile.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="font-medium">{profile.location}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Timezone</Label>
                  <p className="font-medium">{profile.timezone}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Bio</Label>
                <p className="font-medium">{profile.bio}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}