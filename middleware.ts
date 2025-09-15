import { NextResponse } from "next/server"

// Temporarily disable auth middleware to get the app running
export default function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
