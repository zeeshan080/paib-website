"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { users, developerProfiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { z } from "zod"

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .regex(/^[a-zA-Z0-9-_]+$/, "Handle can only contain letters, numbers, hyphens, and underscores"),
  role: z.enum(["DEVELOPER", "VIEWER"]),
})

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function signUpAction(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      handle: formData.get("handle") as string,
      role: formData.get("role") as "DEVELOPER" | "VIEWER",
    }

    const validatedData = signUpSchema.parse(data)

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

    if (existingUser.length > 0) {
      return { error: "User with this email already exists" }
    }

    // Check if handle is taken
    const existingHandle = await db.select().from(users).where(eq(users.handle, validatedData.handle)).limit(1)

    if (existingHandle.length > 0) {
      return { error: "Handle is already taken" }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        passwordHash,
        role: validatedData.role,
        handle: validatedData.handle,
      })
      .returning()

    // Create developer profile if role is DEVELOPER
    if (validatedData.role === "DEVELOPER") {
      await db.insert(developerProfiles).values({
        userId: newUser.id,
        headline: "",
        bio: "",
        skills: [],
      })
    }

    // Redirect to sign in page with success message
    redirect("/auth/signin?message=Account created successfully")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: (error as z.ZodError).errors[0].message }
    }
    return { error: "Something went wrong" }
  }
}

export async function signInAction(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const validatedData = signInSchema.parse(data)

    // For NextAuth v4, redirect to the API route with credentials
    const params = new URLSearchParams({
      email: validatedData.email,
      password: validatedData.password,
      callbackUrl: "/admin"
    })

    redirect(`/api/auth/signin/credentials?${params}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: (error as z.ZodError).errors[0].message }
    }
    return { error: "Something went wrong" }
  }
}

export async function signOutAction() {
  redirect("/api/auth/signout")
}
