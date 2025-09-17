"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Save, X, User as UserIcon } from 'lucide-react'
import { mockUsers, type User } from '@/lib/mock-data'

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<User>>({})
  const [showNewForm, setShowNewForm] = useState(false)
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: User['role'] }>({ name: '', email: '', role: 'user' })

  const startEdit = (user: User) => {
    setEditingId(user.id)
    setEditForm(user)
  }

  const saveEdit = () => {
    setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...editForm } : u))
    setEditingId(null)
    setEditForm({})
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const addUser = () => {
    const user: User = {
      id: String(users.length + 1),
      ...newUser,
      created_at: new Date().toISOString()
    }
    setUsers(prev => [user, ...prev])
    setNewUser({ name: '', email: '', role: 'user' })
    setShowNewForm(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'technician': return 'bg-blue-100 text-blue-800'
      case 'user': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage users, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowNewForm(true)}>
          <Plus className="h-4 w-4 mr-2" />Add User
        </Button>
      </div>

      {showNewForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add New User</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={newUser.name} onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={newUser.email} onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value: User['role']) => setNewUser(prev => ({ ...prev, role: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={addUser}>Add User</Button>
            <Button variant="outline" onClick={() => setShowNewForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            {editingId === user.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={editForm.name || ''} onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={editForm.email || ''} onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={editForm.role} onValueChange={(value) => setEditForm(prev => ({ ...prev, role: value as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveEdit}><Save className="h-4 w-4 mr-2" />Save</Button>
                  <Button variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-2" />Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => startEdit(user)}>
                  <Edit className="h-4 w-4 mr-2" />Edit
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}