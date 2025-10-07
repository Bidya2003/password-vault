import { connectDB } from '@/lib/db';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: 'User exists' }, { status: 400 });

  await User.create({ email, password });
  return NextResponse.json({ success: true });
}