import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin';
import Link from 'next/link';

export default function AdminHome() {
  if (!isAdminAuthed()) redirect('/admin/login');

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="mt-4 space-y-3">
        <Link className="block rounded-xl border bg-white p-4 hover:bg-gray-50" href="/admin/prodotti">
          Prodotti
        </Link>
        <Link className="block rounded-xl border bg-white p-4 hover:bg-gray-50" href="/admin/ordini">
          Ordini (richieste)
        </Link>
      </div>
    </main>
  );
}
