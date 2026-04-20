import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "katmitra_admin_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  const isLoginPath = pathname.startsWith("/login");
  const isApiPath = pathname.startsWith("/api/auth");

  if (isApiPath) return NextResponse.next();

  if (!token && !isLoginPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
