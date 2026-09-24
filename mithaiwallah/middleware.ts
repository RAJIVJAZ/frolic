import { NextResponse, type NextRequest } from 'next/server';

/**
 * HTTP Basic Auth in front of /admin.
 *
 * If ADMIN_USER / ADMIN_PASSWORD are not set, /admin does not exist (404) —
 * a dashboard must never be reachable just because someone forgot to
 * configure its password.
 */
export const config = { matcher: ['/admin/:path*'] };

function safeEqual(a: string, b: string) {
  // Constant-time over the longer length, so timing does not leak the match.
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse('Not found', { status: 404 });

  const header = req.headers.get('authorization') ?? '';
  if (header.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(':');
      if (safeEqual(u, user) && safeEqual(rest.join(':'), pass)) return NextResponse.next();
    } catch {
      // fall through to the challenge
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Mithaiwallah leads", charset="UTF-8"' },
  });
}
