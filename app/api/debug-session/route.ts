import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    let dbUser = null
    if (session?.user?.email) {
      const [userResult] = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1)
      
      dbUser = userResult
    }
    
    return NextResponse.json({
      session,
      dbUser,
      message: "This endpoint is for debugging only"
    })
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch session data",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}