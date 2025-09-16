"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Upload, X, Plus, Loader2, User, Link, Github, Linkedin, Twitter } from "lucide-react"
import { developerProfileSchema, type DeveloperProfileFormData } from "@/lib/validations/developer"
import { updateDeveloperProfile } from "@/lib/actions/developers"
import { uploadFile } from "@/lib/actions/upload"

interface EditProfileFormProps {
  initialData: {
    userId: string
    headline: string | null
    bio: string | null
    skills: any
    websiteUrl: string | null
    githubUrl: string | null
    linkedinUrl: string | null
    xUrl: string | null
    avatarUrl: string | null
    name: string | null
    email: string
  } | null
}

export function EditProfileForm({ initialData }: EditProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const form = useForm<DeveloperProfileFormData>({
    resolver: zodResolver(developerProfileSchema),
    defaultValues: {
      headline: initialData?.headline || "",
      bio: initialData?.bio || "",
      skills: (() => {
        try {
          if (Array.isArray(initialData?.skills)) {
            return initialData.skills
          }
          if (typeof initialData?.skills === 'string' && initialData.skills.trim()) {
            return JSON.parse(initialData.skills)
          }
          return []
        } catch (error) {
          console.warn("Failed to parse skills:", error)
          return []
        }
      })(),
      websiteUrl: initialData?.websiteUrl || "",
      githubUrl: initialData?.githubUrl || "",
      linkedinUrl: initialData?.linkedinUrl || "",
      xUrl: initialData?.xUrl || "",
      avatarUrl: initialData?.avatarUrl || "",
    },
  })

  const skills = form.watch("skills")
  const avatarUrl = form.watch("avatarUrl")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !initialData?.userId) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadFile(formData, initialData.userId)
      if (result.success && 'url' in result) {
        form.setValue("avatarUrl", result.url)
        console.log("Profile image updated successfully")
      } else if (!result.success && 'error' in result) {
        console.error("Upload failed:", result.error)
        alert(`Upload failed: ${result.error}`)
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && skills.length < 20) {
      form.setValue("skills", [...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove),
    )
  }

  const onSubmit = async (data: DeveloperProfileFormData) => {
    if (!initialData?.userId) return

    setIsLoading(true)
    try {
      const result = await updateDeveloperProfile(initialData.userId, data)

      if (result.success) {
        router.push("/profile")
        router.refresh()
      } else {
        console.error("Update failed:", result.error)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 ring-2 ring-purple-500/30">
                <AvatarImage src={avatarUrl || ""} alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-teal-500 text-white text-lg">
                  {initialData?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    disabled={isUploading}
                    asChild
                  >
                    <span>
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      {isUploading ? "Uploading..." : "Upload Photo"}
                    </span>
                  </Button>
                </Label>
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>

            {/* Headline */}
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Professional Headline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., AI/ML Engineer & Full-Stack Developer"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                      rows={4}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-slate-300">Skills & Technologies</Label>

              {/* Add Skill Input */}
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!newSkill.trim() || skills.includes(newSkill.trim()) || skills.length >= 20}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Skills Display */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {skills.length === 0 && (
                <p className="text-slate-400 text-sm">
                  No skills added yet. Add some skills to showcase your expertise.
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <Label className="text-slate-300 flex items-center gap-2">
                <Link className="w-4 h-4" />
                Social Links
              </Label>

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-400 text-sm">Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://yourwebsite.com"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-400 text-sm flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/yourusername"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-400 text-sm flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/in/yourusername"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="xUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-400 text-sm flex items-center gap-2">
                      <Twitter className="w-4 h-4" />X (Twitter)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://x.com/yourusername"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
