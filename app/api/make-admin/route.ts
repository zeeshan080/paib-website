import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    // This is a debugging/helper endpoint only
    // Add safety checks or environment checks in production
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({
        error: "Email parameter is required"
      }, { status: 400 })
    }
    
    // Find the user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    
    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, { status: 404 })
    }
    
    // Update the user's role to ADMIN
    const [updatedUser] = await db
      .update(users)
      .set({ role: "ADMIN" })
      .where(eq(users.id, user.id))
      .returning()
    
    return NextResponse.json({
      message: "User role updated to ADMIN",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update user role",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}