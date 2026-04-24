import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = (await req.json()) as { password: string };
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin';

  if (!body?.password || body.password !== adminPassword) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  cookies().set('admin_auth', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
