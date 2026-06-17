import { auth } from '@/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname === '/admin/login') {
    if (isLoggedIn) {
      return Response.redirect(new URL('/admin', req.url));
    }
    return;
  }

  if (!isLoggedIn) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};
