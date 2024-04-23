import { auth } from "@/auth"
import { NextResponse } from "next/server"
export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.clone()
    url.pathname = '/api/auth/signin'
    return NextResponse.redirect(url);
  }
})

export const config = {
  matcher: ["/api/books/:path*"],
}