"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"
import { db } from "@/lib/db"
import { developerProfiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const UPLOAD_DIR = join(process.cwd(), "public", "uploads")
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Check if we should use cloud storage (production) or local storage (development)
const USE_CLOUD_STORAGE = process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN

async function uploadToLocal(file: File) {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.")
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large. Maximum size is 5MB.")
  }

  // Ensure upload directory exists
  await mkdir(UPLOAD_DIR, { recursive: true })

  // Generate unique filename with original extension
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const uniqueFilename = `${randomUUID()}.${fileExtension}`
  const filePath = join(UPLOAD_DIR, uniqueFilename)

  // Convert File to Buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Write file to disk
  await writeFile(filePath, buffer)

  // Return public URL
  const publicUrl = `/uploads/${uniqueFilename}`

  return {
    success: true,
    url: publicUrl,
    filename: uniqueFilename,
    method: 'local'
  }
}

async function uploadToCloud(file: File) {
  // Dynamic import to avoid bundling Vercel Blob in development
  const { put } = await import("@vercel/blob")

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN not configured for cloud storage")
  }

  const blob = await put(file.name, file, {
    access: "public",
    token: token,
  })

  return {
    success: true,
    url: blob.url,
    filename: file.name,
    method: 'cloud'
  }
}

export async function uploadFile(formData: FormData, userId: string) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    let result
    if (USE_CLOUD_STORAGE) {
      console.log("Using cloud storage (Vercel Blob)")
      result = await uploadToCloud(file)
    } else {
      console.log("Using local storage (development)")
      result = await uploadToLocal(file)
    }

    if (result.success) {
      // Update developer's profile avatar in the database
      await db
        .update(developerProfiles)
        .set({
          avatarUrl: result.url,
          updatedAt: new Date()
        })
        .where(eq(developerProfiles.userId, userId))

      console.log(`Updated developer ${userId} avatar to: ${result.url}`)
    }

    return result
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
      method: USE_CLOUD_STORAGE ? 'cloud' : 'local'
    }
  }
}

// Utility function to get full file path (for cleanup if needed)
export async function getFilePath(filename: string) {
  return join(UPLOAD_DIR, filename)
}

// Utility function to check current storage method
export async function getStorageMethod() {
  return USE_CLOUD_STORAGE ? 'cloud' : 'local'
}
