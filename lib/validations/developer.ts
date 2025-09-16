import { z } from "zod"

export const developerProfileSchema = z.object({
  headline: z.string().min(1, "Headline is required").max(100, "Headline must be less than 100 characters"),
  bio: z.string().min(1, "Bio is required").max(500, "Bio must be less than 500 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required").max(20, "Maximum 20 skills allowed"),
  websiteUrl: z.string().url("Invalid website URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  xUrl: z.string().url("Invalid X/Twitter URL").optional().or(z.literal("")),
  avatarUrl: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
})

export type DeveloperProfileFormData = z.infer<typeof developerProfileSchema>