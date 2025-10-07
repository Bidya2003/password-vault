import { NextResponse } from 'next/server';

// Dummy in-memory vault
let vault = [
  { _id: '1', title: 'Email', username: 'user@example.com', password: 'abc123', url: 'https://mail.com', notes: '' },
  { _id: '2', title: 'Bank', username: 'userbank', password: 'xyz789', url: 'https://bank.com', notes: '' },
];

export async function GET() {
  return NextResponse.json(vault);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newItem = { ...data, _id: Date.now().toString() };
  vault.push(newItem);
  return NextResponse.json({ success: true, item: newItem });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  vault = vault.filter((item) => item._id !== id);
  return NextResponse.json({ success: true });
}
