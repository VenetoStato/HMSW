import { cookies } from 'next/headers';

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? 'admin';
}

export function isAdminAuthed() {
  const v = cookies().get('admin_auth')?.value;
  return v === '1';
}
