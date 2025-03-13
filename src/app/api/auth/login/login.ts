/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabase";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET as string;

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Get user from database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ error: 'Invalid email or password' });

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '7d' });

  // Set token in HTTP-only cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }));

  res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
}
