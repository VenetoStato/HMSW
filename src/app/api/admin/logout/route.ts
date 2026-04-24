import { cookies } from 'next/headers';

export async function POST() {
  cookies().set('admin_auth', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
