const dotenv = require('dotenv');
dotenv.config();

console.log('Environment variables loaded');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

try {
  console.log('Creating Prisma client...');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  console.log('Prisma client created successfully');
  
  async function testConnection() {
    try {
      console.log('Connecting to database...');
      await prisma.$connect();
      console.log('Connected to database successfully!');
      
      console.log('Attempting to create a test user...');
      
      try {
        const testUser = await prisma.user.create({
          data: {
            email: 'test@example.com',
            password: 'testpassword',
            name: 'Test User'
          }
        });
        
        console.log('Success! Test user created. This confirms the tables exist or were created.');
        
        await prisma.user.delete({ where: { id: testUser.id } });
        console.log('Test user cleaned up');
        
      } catch (error) {
        console.error('Error creating test user:', error);
        console.log('If the error is about missing tables, we need to create them manually');
        
        try {
          console.log('Attempting to create tables using raw SQL...');
        
          await prisma.$executeRaw`
            CREATE TABLE IF NOT EXISTS public.users (
              id VARCHAR(255) PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              name VARCHAR(255),
              "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
              "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
            )
          `;
          
          await prisma.$executeRaw`
            CREATE TABLE IF NOT EXISTS public.tasks (
              id VARCHAR(255) PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              completed BOOLEAN NOT NULL DEFAULT false,
              "dueDate" TIMESTAMP,
              "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
              "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
              "userId" VARCHAR(255) NOT NULL,
              FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE
            )
          `;
          
          console.log('Tables created successfully using raw SQL!');
          
          const testUser = await prisma.user.create({
            data: {
              email: 'test2@example.com',
              password: 'testpassword',
              name: 'Test User 2'
            }
          });
          
          console.log('Success! Test user created after table creation.');
          await prisma.user.delete({ where: { id: testUser.id } });
          
        } catch (sqlError) {
          console.error('Error creating tables with raw SQL:', sqlError);
          console.log('You may need to create the database tables manually.');
          console.log('Instructions:');
          console.log('1. Connect to your PostgreSQL database');
          console.log('2. Create the tables according to the schema in prisma/schema.prisma');
        }
      }
      
    } catch (connectionError) {
      console.error('Database connection error:', connectionError);
    } finally {
      await prisma.$disconnect();
      console.log('Disconnected from database');
    }
  }
  
  testConnection().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
  });
  
} catch (error) {
  console.error('Failed to create Prisma client:', error);
  process.exit(1);
}