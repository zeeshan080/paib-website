import { z } from "zod"

export const developerProfileSchema = z.object({
  headline: z.string().min(1, "Headline is required").max(100, "Headline must be less than 100 characters"),
  bio: z.string().min(1, "Bio is required").max(500, "Bio must be less than 500 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required").max(20, "Maximum 20 skills allowed"),
  websiteUrl: z.string().url("Invalid website URL").or(z.literal("")).optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
  xUrl: z.string().url("Invalid Facebook URL").or(z.literal("")).optional(),
  avatarUrl: z.string().optional().or(z.literal("")),
})

export type DeveloperProfileFormData = z.infer<typeof developerProfileSchema>