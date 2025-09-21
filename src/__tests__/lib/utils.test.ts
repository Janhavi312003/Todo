import { formatDate, formatDateTime, isOverdue } from '@/lib/utils'
import { describe, it } from 'node:test'
import { expect } from 'expect'

describe('Utility functions', () => {
  describe('formatDate', () => {
    it('should format a date string', () => {
      const date = '2024-01-15T10:30:00Z'
      const formatted = formatDate(date)
      
      expect(formatted).toBe('Jan 15, 2024')
    })

    it('should format a Date object', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const formatted = formatDate(date)
      
      expect(formatted).toBe('Jan 15, 2024')
    })
  })

  describe('formatDateTime', () => {
    it('should format a date with time', () => {
      const date = '2024-01-15T10:30:00Z'
      const formatted = formatDateTime(date)
      
      expect(formatted).toContain('Jan 15, 2024')
      expect(formatted).toMatch(/\d{1,2}:\d{2}/)
    })
  })

  describe('isOverdue', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)
      
      expect(isOverdue(pastDate)).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      
      expect(isOverdue(futureDate)).toBe(false)
    })

    it('should return false for today', () => {
      const today = new Date()
      
      expect(isOverdue(today)).toBe(false)
    })
  })
})
