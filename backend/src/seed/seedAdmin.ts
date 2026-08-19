import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db';
import Admin from '../models/Admin';
import mongoose from 'mongoose';

dotenv.config();

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env before seeding.');
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, returnDocument: 'after' }
  );

  console.log(`Admin account ready: ${admin.username}`);
  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin:', err);
  process.exit(1);
});
