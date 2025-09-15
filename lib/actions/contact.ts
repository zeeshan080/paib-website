"use server"

import { db } from "@/lib/db"
import { contactMessages } from "@/lib/db/schema"
import { put } from "@vercel/blob"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Handle file uploads
    const attachments: string[] = []
    const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("file-"))

    for (const [, file] of fileEntries) {
      if (file instanceof File && file.size > 0) {
        try {
          const blob = await put(`contact-attachments/${Date.now()}-${file.name}`, file, {
            access: "public",
          })
          attachments.push(blob.url)
        } catch (error) {
          console.error("Error uploading file:", error)
        }
      }
    }

    // Save to database
    await db.insert(contactMessages).values({
      name,
      email,
      subject,
      body: message,
      status: "NEW",
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
