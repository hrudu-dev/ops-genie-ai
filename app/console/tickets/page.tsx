"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Save, X } from 'lucide-react'
import { mockTickets } from '@/lib/mock-data'

type Ticket = typeof mockTickets[0]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'bg-red-500'
    case 'open': return 'bg-blue-500'
    case 'in_progress': return 'bg-yellow-500'
    case 'resolved': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState(mockTickets)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Ticket>>({})
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium', status: 'open' })

  const startEdit = (ticket: Ticket) => {
    setEditingId(ticket.id)
    setEditForm(ticket)
  }

  const saveEdit = () => {
    setTickets(prev => prev.map(t => t.id === editingId ? { ...t, ...editForm } : t))
    setEditingId(null)
    setEditForm({})
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const addTicket = () => {
    const ticket = {
      id: String(tickets.length + 1),
      ...newTicket,
      assigned_to: 'Unassigned',
      created_by: 'Demo User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setTickets(prev => [ticket, ...prev])
    setNewTicket({ title: '', description: '', priority: 'medium', status: 'open' })
    setShowNewForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Triage</h1>
          <p className="text-muted-foreground mt-2">Manage and prioritize support tickets</p>
        </div>
        <Button onClick={() => setShowNewForm(true)}>
          <Plus className="h-4 w-4 mr-2" />New Ticket
        </Button>
      </div>

      {showNewForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Ticket</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={newTicket.title} onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={newTicket.priority} onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={newTicket.description} onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={addTicket}>Create</Button>
            <Button variant="outline" onClick={() => setShowNewForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-6">
            {editingId === ticket.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={editForm.title || ''} onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={editForm.status} onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select value={editForm.priority} onValueChange={(value) => setEditForm(prev => ({ ...prev, priority: value as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Assigned To</Label>
                    <Input value={editForm.assigned_to || ''} onChange={(e) => setEditForm(prev => ({ ...prev, assigned_to: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={editForm.description || ''} onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveEdit}><Save className="h-4 w-4 mr-2" />Save</Button>
                  <Button variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-2" />Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">#{ticket.id}</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(ticket.status)}`} />
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Assigned: {ticket.assigned_to}</span>
                    <span>•</span>
                    <span>By: {ticket.created_by}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => startEdit(ticket)}>
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