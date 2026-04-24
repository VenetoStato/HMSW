'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) {
      setErr('Password errata');
      return;
    }

    router.push('/admin');
  }

  return (
    <main className="mx-auto w-full max-w-md py-10">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? 'Verifica...' : 'Accedi'}
        </button>
        <p className="text-xs text-gray-500">In dev, default: <code className="font-mono">admin</code></p>
      </form>
    </main>
  );
}
