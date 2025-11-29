import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const [user] = await db
      .select({ isActive: users.isActive })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      return NextResponse.json({ exists: false })
    }

    return NextResponse.json({ exists: true, isActive: user.isActive })
  } catch (error) {
    console.error("Error checking user active status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

