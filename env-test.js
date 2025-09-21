console.log('Current directory:', process.cwd());

const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
console.log('Trying to load .env from:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('DATABASE_URL length:', process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0);
  
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...');
  }
}

const fs = require('fs');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('\n.env file content (first 100 chars):');
  console.log(envContent.substring(0, 100) + '...');
} catch (readError) {
  console.error('Error reading .env file:', readError);
}