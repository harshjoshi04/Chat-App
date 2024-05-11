import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl;
  //   const authtoken = request.cookies.get("next-auth.session-token");
  //   if (authtoken) {
  //     if (pathname.startsWith("/signin"))
  //       return NextResponse.redirect(new URL("/", request.url));
  // } else {
  //     if (pathname.startsWith("/signin")) return NextResponse.next();
  //     return NextResponse.redirect(new URL("/signin", request.url));
  // }
  return NextResponse.next();
}
