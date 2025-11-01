"use server"

import { db } from "@/lib/db"
import { developerProfiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

/**
 * Convert image file to base64 data URI for storage in database
 * This works on Vercel since we don't need to write to filesystem
 */
async function convertToBase64(file: File): Promise<string> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.")
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size is 1MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`)
  }

  // Convert File to base64
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  
  // Return as data URI
  const dataUri = `data:${file.type};base64,${base64}`
  
  return dataUri
}

export async function uploadFile(formData: FormData, userId: string) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    // Convert to base64
    const base64DataUri = await convertToBase64(file)

    // Update developer's profile avatar in the database with base64 data URI
    await db
      .update(developerProfiles)
      .set({
        avatarUrl: base64DataUri,
        updatedAt: new Date()
      })
      .where(eq(developerProfiles.userId, userId))

    console.log(`Updated developer ${userId} avatar to base64 data URI`)

    return {
      success: true,
      url: base64DataUri,
      method: 'base64'
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
      method: 'base64'
    }
  }
}
