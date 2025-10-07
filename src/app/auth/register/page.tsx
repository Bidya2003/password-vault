'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const hashedPassword = await bcrypt.hash(form.password, 10);
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, password: hashedPassword }),
    });

    if (res.ok) {
      alert('✅ Registration successful!');
      router.push('/auth/login');
    } else {
      alert('❌ Error registering user');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="p-6 bg-gray-800 rounded-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center text-sm mt-3">
          Already have an account? <a href="/auth/login" className="text-blue-400">Login</a>
        </p>
      </form>
    </div>
  );
}