import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin';
import AdminProductsClient from '@/components/admin/AdminProductsClient';

export default function AdminProductsPage() {
  if (!isAdminAuthed()) redirect('/admin/login');
  return <AdminProductsClient />;
}
