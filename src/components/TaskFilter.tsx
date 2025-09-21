'use client'

import { TaskFilter as FilterType } from '@/hooks/useTasks'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TaskFilterProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  taskCounts: {
    all: number
    pending: number
    completed: number
  }
}

export default function TaskFilter({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ]

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            'flex items-center space-x-2',
            currentFilter === filter.key && 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          <span>{filter.label}</span>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  )
}
