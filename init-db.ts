import { prisma } from './src/lib/prisma'

async function initDb() {
  try {
    console.log('Connecting to database...')
    await prisma.$connect()
    console.log('Connected to database successfully!')
    
    try {
      console.log('Attempting to create a test user to trigger table creation...')
      
      try {
        await prisma.user.delete({ where: { email: 'test@example.com' } })
        console.log('Test user deleted')
      } catch (error) {
        
      }
      
      const testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'testpassword123',
          name: 'Test User'
        }
      })
      
      console.log('Test user created successfully! Tables exist or were created.')
      
      await prisma.user.delete({ where: { id: testUser.id } })
      console.log('Test user cleaned up')
    } catch (error) {
      console.error('Error during table initialization:', error)
    }
  } catch (error) {
    console.error('Error connecting to database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

initDb()
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })