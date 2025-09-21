const dotenv = require('dotenv');

try {
  dotenv.config();
  console.log('Environment variables loaded from .env file');
  
  const { prisma } = require('./src/lib/prisma');
  
  async function initDb() {
    try {
      console.log('Connecting to database...');
      await prisma.$connect();
      console.log('Connected to database successfully!');
      
      console.log('Attempting to create a test user to trigger table creation...');
      
      try {
        await prisma.user.delete({ where: { email: 'test@example.com' } });
        console.log('Test user deleted');
      } catch (error) {
        console.log('No existing test user found');
      }
      
      const testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'testpassword123',
          name: 'Test User'
        }
      });
      
      console.log('Test user created successfully! Tables exist or were created.');
      
      await prisma.user.delete({ where: { id: testUser.id } });
      console.log('Test user cleaned up');
      
    } catch (error) {
      console.error('Error during database initialization:', error);
    } finally {
      await prisma.$disconnect();
      console.log('Disconnected from database');
    }
  }
  
  initDb()
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    })
    .finally(() => {
      process.exit(0);
    });
  
} catch (error) {
  console.error('Error loading dependencies:', error);
  process.exit(1);
}