export const mockTickets = [
  {
    id: '1',
    title: 'Server downtime in production',
    description: 'Main application server is not responding. Users cannot access the system.',
    status: 'critical' as const,
    priority: 'high' as const,
    assigned_to: 'John Doe',
    created_by: 'Sarah Wilson',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T11:45:00Z'
  },
  {
    id: '2',
    title: 'Email notifications not working',
    description: 'Users are not receiving email notifications for password resets.',
    status: 'open' as const,
    priority: 'medium' as const,
    assigned_to: 'Mike Johnson',
    created_by: 'Alex Chen',
    created_at: '2025-01-14T14:20:00Z',
    updated_at: '2025-01-14T16:30:00Z'
  },
  {
    id: '3',
    title: 'Database backup failed',
    description: 'Automated database backup process failed last night.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    assigned_to: 'Emma Davis',
    created_by: 'Tom Brown',
    created_at: '2025-01-13T09:15:00Z',
    updated_at: '2025-01-15T08:20:00Z'
  }
]

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin' as const,
    created_at: '2024-12-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'technician' as const,
    created_at: '2024-12-05T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'user' as const,
    created_at: '2024-12-10T00:00:00Z'
  }
]

export const mockGrowthData = [
  { month: 'Jan', tickets: 45, resolved: 42, satisfaction: 4.2 },
  { month: 'Feb', tickets: 52, resolved: 48, satisfaction: 4.1 },
  { month: 'Mar', tickets: 38, resolved: 36, satisfaction: 4.5 },
  { month: 'Apr', tickets: 61, resolved: 58, satisfaction: 4.3 },
  { month: 'May', tickets: 49, resolved: 47, satisfaction: 4.4 },
  { month: 'Jun', tickets: 55, resolved: 53, satisfaction: 4.6 }
]