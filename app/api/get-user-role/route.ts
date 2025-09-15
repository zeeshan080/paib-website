import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ role: null }, { status: 401 })
    }
    
    return NextResponse.json({ 
      role: session.user.role,
      userId: session.user.id
    })
  } catch (error) {
    console.error("Error fetching user role:", error)
    return NextResponse.json({ error: "Failed to fetch user role" }, { status: 500 })
  }
}