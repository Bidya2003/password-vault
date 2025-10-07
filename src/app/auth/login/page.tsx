'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert('❌ Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="p-6 bg-gray-800 rounded-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-sm mt-3">
          New user? <a href="/auth/register" className="text-blue-400">Register</a>
        </p>
      </form>
    </div>
  );
}