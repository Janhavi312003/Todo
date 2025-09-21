'use client'

import { useState } from 'react'
import { Task } from '@/hooks/useTasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit2, Trash2, Save, X, Calendar, Clock } from 'lucide-react'
import { formatDate, formatDateTime, isOverdue } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => Promise<{ success: boolean; error?: string }>
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  onToggle: (id: string) => Promise<{ success: boolean; error?: string }>
}

export default function TaskCard({ task, onUpdate, onDelete, onToggle }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!editData.title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await onUpdate(task.id, {
        title: editData.title,
        description: editData.description || undefined,
        dueDate: editData.dueDate || undefined,
      })

      if (result.success) {
        setIsEditing(false)
      } else {
        setError(result.error || 'Failed to update task')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
    })
    setIsEditing(false)
    setError('')
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    setLoading(true)
    try {
      await onDelete(task.id)
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async () => {
    setLoading(true)
    try {
      await onToggle(task.id)
    } catch (err) {
      console.error('Toggle error:', err)
    } finally {
      setLoading(false)
    }
  }

  const isTaskOverdue = task.dueDate && !task.completed && isOverdue(task.dueDate)

  return (
    <Card className={`transition-all duration-200 ${task.completed ? 'opacity-60' : ''} ${isTaskOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggle}
              disabled={loading}
              className="mt-1"
            />
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="font-medium"
                />
              ) : (
                <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </CardTitle>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSave}
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter task description (optional)"
              rows={3}
            />
            <Input
              type="datetime-local"
              value={editData.dueDate}
              onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {task.description && (
              <p className={`text-sm text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Created {formatDate(task.createdAt)}</span>
              </div>
              
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isTaskOverdue ? 'text-red-600 font-medium' : ''}`}>
                  <Calendar className="h-3 w-3" />
                  <span>
                    Due {formatDateTime(task.dueDate)}
                    {isTaskOverdue && ' (Overdue)'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 text-red-600 text-sm bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
