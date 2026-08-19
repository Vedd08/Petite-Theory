import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import requireAuth, { AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

function signToken(adminId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ adminId }, secret, { expiresIn: '7d' });
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = signToken(String(admin._id));
    res.json({ token, username: admin.username });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/me - lets the admin app verify a stored token on load
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const admin = await Admin.findById(req.adminId).select('username');
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json({ username: admin.username });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/auth/credentials - update admin username and password
router.put('/credentials', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    admin.username = username.trim();
    admin.passwordHash = passwordHash;
    
    await admin.save();
    
    res.json({ message: 'Credentials updated successfully' });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
