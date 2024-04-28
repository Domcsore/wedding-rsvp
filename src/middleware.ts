import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Admin auth
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const jwt = req.cookies.get("jwt");
    if (!jwt) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(jwt.value, secret);
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
}
