import { hashPassword, verifyPassword, generateToken, verifyToken } from '@/lib/auth'
import { describe, it, expect } from 'vitest'

describe('Auth utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123'
      const hashed = await hashPassword(password)
      
      expect(hashed).toBeDefined()
      expect(hashed).not.toBe(password)
      expect(hashed.length).toBeGreaterThan(0)
    })

    it('should produce different hashes for the same password', async () => {
      const password = 'testpassword123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)
      
      expect(hash1).not.toBe(hash2)
    })
  })

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'testpassword123'
      const hashed = await hashPassword(password)
      
      const isValid = await verifyPassword(password, hashed)
      expect(isValid).toBe(true)
    })

    it('should reject incorrect password', async () => {
      const password = 'testpassword123'
      const wrongPassword = 'wrongpassword'
      const hashed = await hashPassword(password)
      
      const isValid = await verifyPassword(wrongPassword, hashed)
      expect(isValid).toBe(false)
    })
  })

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const payload = { userId: '123', email: 'test@example.com' }
      const token = generateToken(payload)
      
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
    })
  })

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload = { userId: '123', email: 'test@example.com' }
      const token = generateToken(payload)
      
      const verified = verifyToken(token)
      expect(verified).toMatchObject(payload)
    })

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid.token.here'
      
      const verified = verifyToken(invalidToken)
      expect(verified).toBeNull()
    })

    it('should return null for malformed token', () => {
      const malformedToken = 'not-a-jwt-token'
      
      const verified = verifyToken(malformedToken)
      expect(verified).toBeNull()
    })
  })
})


