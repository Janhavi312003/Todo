const path = require('path');
const dotenv = require('dotenv');

const fixedEnvPath = path.resolve(__dirname, '.env.fixed');
console.log('Testing .env.fixed from:', fixedEnvPath);

const result = dotenv.config({ path: fixedEnvPath });

if (result.error) {
  console.error('Error loading .env.fixed file:', result.error);
} else {
  console.log('.env.fixed file loaded successfully');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('DATABASE_URL length:', process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0);
  
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...');
  }
}