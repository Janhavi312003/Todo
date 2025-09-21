'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTasks, TaskFilter as FilterType } from '@/hooks/useTasks'
import Navbar from '@/components/Navbar'
import TaskForm from '@/components/TaskForm'
import TaskCard from '@/components/TaskCard'
import TaskFilter from '@/components/TaskFilter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function TasksPage() {
  const { user, loading: authLoading } = useAuth()
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [showTaskForm, setShowTaskForm] = useState(false)
  
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks(currentFilter)

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/auth/login'
    }
  }, [user, authLoading])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const allTasks = tasks 
  const taskCounts = {
    all: allTasks.length,
    pending: allTasks.filter(task => !task.completed).length,
    completed: allTasks.filter(task => task.completed).length,
  }

  const handleCreateTask = async (title: string, description?: string, dueDate?: string) => {
    const result = await createTask(title, description, dueDate)
    if (result.success) {
      setShowTaskForm(false)
    }
    return result
  }

  const getEmptyStateMessage = () => {
    switch (currentFilter) {
      case 'pending':
        return {
          icon: <Clock className="h-12 w-12 text-gray-400" />,
          title: 'No pending tasks',
          description: 'You have no pending tasks. Great job!'
        }
      case 'completed':
        return {
          icon: <CheckCircle className="h-12 w-12 text-gray-400" />,
          title: 'No completed tasks',
          description: 'Complete some tasks to see them here.'
        }
      default:
        return {
          icon: <AlertCircle className="h-12 w-12 text-gray-400" />,
          title: 'No tasks yet',
          description: 'Create your first task to get started!'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Manage your tasks and stay organized.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className="lg:col-span-1">
            {showTaskForm ? (
              <TaskForm onSubmit={handleCreateTask} />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => setShowTaskForm(true)}
                    className="w-full"
                    size="lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Task
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>


          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Tasks
                </h2>
                <TaskFilter
                  currentFilter={currentFilter}
                  onFilterChange={setCurrentFilter}
                  taskCounts={taskCounts}
                />
              </div>
            </div>

            {tasksLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading tasks...</p>
              </div>
            ) : tasksError ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Error loading tasks
                  </h3>
                  <p className="text-gray-600 mb-4">{tasksError}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : tasks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  {getEmptyStateMessage().icon}
                  <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                    {getEmptyStateMessage().title}
                  </h3>
                  <p className="text-gray-600">
                    {getEmptyStateMessage().description}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
