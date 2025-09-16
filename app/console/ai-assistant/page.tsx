"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Bot, User, Lightbulb, Wrench, Shield, Zap } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  {
    title: 'Diagnose Network Issues',
    description: 'Get help troubleshooting connectivity problems',
    icon: Wrench,
    prompt: 'Help me diagnose network connectivity issues in our office'
  },
  {
    title: 'Security Best Practices',
    description: 'Learn about security recommendations',
    icon: Shield,
    prompt: 'What are the current security best practices for our IT infrastructure?'
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize system performance',
    icon: Zap,
    prompt: 'How can I optimize the performance of our servers?'
  },
  {
    title: 'Troubleshooting Guide',
    description: 'Step-by-step problem resolution',
    icon: Lightbulb,
    prompt: 'Walk me through troubleshooting a slow computer issue'
  }
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant, ready to help you with IT troubleshooting, system optimization, and technical guidance. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('network') || lowerMessage.includes('connectivity')) {
      return `I'll help you diagnose network connectivity issues. Here's a systematic approach:

1. **Check Physical Connections**: Ensure all cables are properly connected
2. **Test Basic Connectivity**: Run \`ping google.com\` to test internet access
3. **Check Network Configuration**: Verify IP settings with \`ipconfig /all\`
4. **DNS Resolution**: Test with \`nslookup google.com\`
5. **Firewall Settings**: Check if firewall is blocking connections

Would you like me to guide you through any specific step?`
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('best practices')) {
      return `Here are current security best practices for IT infrastructure:

**Essential Security Measures:**
• Enable multi-factor authentication (MFA) for all accounts
• Keep systems updated with latest security patches
• Use strong, unique passwords with a password manager
• Implement network segmentation and firewalls
• Regular security audits and vulnerability assessments
• Employee security awareness training
• Backup data regularly and test recovery procedures

**Advanced Recommendations:**
• Zero-trust network architecture
• Endpoint detection and response (EDR) solutions
• Security information and event management (SIEM)

Which area would you like me to elaborate on?`
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('optimization')) {
      return `Here's how to optimize server performance:

**Immediate Actions:**
1. **Monitor Resource Usage**: Check CPU, RAM, and disk usage
2. **Clean Up Disk Space**: Remove temporary files and logs
3. **Update Software**: Ensure OS and applications are current
4. **Optimize Startup Programs**: Disable unnecessary services

**Advanced Optimization:**
• Database query optimization
• Load balancing implementation
• Caching strategies (Redis, Memcached)
• SSD upgrades for faster I/O
• Network optimization and bandwidth management

**Monitoring Tools:**
• Performance Monitor (Windows)
• htop/top (Linux)
• Application-specific monitoring

What specific performance issues are you experiencing?`
    }
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('computer')) {
      return `Let's troubleshoot the slow computer issue step by step:

**Step 1: Check System Resources**
• Open Task Manager (Ctrl+Shift+Esc)
• Look for high CPU or memory usage
• Identify resource-heavy processes

**Step 2: Basic Maintenance**
• Restart the computer
• Run disk cleanup utility
• Check for Windows updates
• Scan for malware

**Step 3: Hardware Check**
• Check available disk space (should have >15% free)
• Test RAM with Windows Memory Diagnostic
• Check hard drive health with chkdsk

**Step 4: Software Optimization**
• Disable startup programs
• Uninstall unused software
• Clear browser cache and temporary files

Which step would you like to start with, or are you seeing any specific error messages?`
    }
    
    return `I understand you're asking about "${userMessage}". I'm here to help with IT troubleshooting, system optimization, security guidance, and technical support.

Some areas I can assist with:
• Network and connectivity issues
• Performance optimization
• Security best practices
• Software troubleshooting
• Hardware diagnostics
• System maintenance

Could you provide more specific details about what you're trying to accomplish or what issues you're experiencing?`
  }

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Troubleshooting Assistant</h1>
        <p className="text-muted-foreground">
          Get instant help with IT issues, system optimization, and technical guidance
        </p>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuickAction(action.prompt)}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <action.icon className="h-5 w-5 mr-2 text-primary" />
                  {action.title}
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Chat Messages */}
      <Card className="h-96 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about IT troubleshooting..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}