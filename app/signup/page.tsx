"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Shield, Zap, Check, X } from 'lucide-react'

interface PasswordStrength {
  score: number
  feedback: string[]
  suggestions: string[]
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null)
  const router = useRouter()

  const analyzePasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []
    const suggestions: string[] = []

    if (password.length >= 8) {
      score += 1
      feedback.push("Good length")
    } else {
      suggestions.push("Use at least 8 characters")
    }

    if (/[A-Z]/.test(password)) {
      score += 1
      feedback.push("Contains uppercase")
    } else {
      suggestions.push("Add uppercase letters")
    }

    if (/[a-z]/.test(password)) {
      score += 1
      feedback.push("Contains lowercase")
    } else {
      suggestions.push("Add lowercase letters")
    }

    if (/\d/.test(password)) {
      score += 1
      feedback.push("Contains numbers")
    } else {
      suggestions.push("Add numbers")
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
      feedback.push("Contains special characters")
    } else {
      suggestions.push("Add special characters")
    }

    return { score, feedback, suggestions }
  }

  const handlePasswordChange = (password: string) => {
    setFormData(prev => ({ ...prev, password }))
    if (password) {
      setPasswordStrength(analyzePasswordStrength(password))
    } else {
      setPasswordStrength(null)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push('/console')
    }, 2000)
  }

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'text-red-500'
    if (score <= 3) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getStrengthText = (score: number) => {
    if (score <= 2) return 'Weak'
    if (score <= 3) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-lg p-3">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join OpsGenie AI</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create your account and start managing IT operations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>
              Get started with your AI-powered MSP console
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {passwordStrength && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Password Strength:</span>
                      <span className={`text-sm font-medium ${getStrengthColor(passwordStrength.score)}`}>
                        {getStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.score <= 2 ? 'bg-red-500' : 
                          passwordStrength.score <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center text-xs text-green-600 dark:text-green-400">
                          <Check className="h-3 w-3 mr-1" />
                          {item}
                        </div>
                      ))}
                      {passwordStrength.suggestions.map((item, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <X className="h-3 w-3 mr-1" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || formData.password !== formData.confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Create account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}