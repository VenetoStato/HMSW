import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin';
import AdminOrdersClient from '@/components/admin/AdminOrdersClient';

export default function AdminOrdersPage() {
  if (!isAdminAuthed()) redirect('/admin/login');
  return <AdminOrdersClient />;
}
