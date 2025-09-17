import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'technician'
  created_at: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assigned_to?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  message: string
  response: string
  created_at: string
}

// User operations
export const getUsers = () => supabase.from('users').select('*')
export const createUser = (user: Omit<User, 'id' | 'created_at'>) => 
  supabase.from('users').insert(user)

// Ticket operations
export const getTickets = () => supabase.from('tickets').select('*')
export const createTicket = (ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) =>
  supabase.from('tickets').insert(ticket)
export const updateTicket = (id: string, updates: Partial<Ticket>) =>
  supabase.from('tickets').update(updates).eq('id', id)

// Chat operations
export const saveChatMessage = (message: Omit<ChatMessage, 'id' | 'created_at'>) =>
  supabase.from('chat_messages').insert(message)
export const getChatHistory = (userId: string) =>
  supabase.from('chat_messages').select('*').eq('user_id', userId).order('created_at', { ascending: true })