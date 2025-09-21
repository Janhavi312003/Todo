'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Users, Shield, Zap } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/tasks'
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Todo App
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth/signup">Sign Up</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/auth/login">Login</a>
            </Button>
          </div>
        </div>
    
        <footer className="mt-12 border-t border-gray-200 bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
           <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2025 <span className="font-semibold text-blue-600">Todo App</span>. 
              Built with <span className="font-semibold">Next.js</span>, 
               <span className="font-semibold"> TypeScript</span>, and 
               <span className="font-semibold"> Tailwind CSS</span>.
           </p>
          </div>
       </footer>
      </div>
    </div>
  )
}
