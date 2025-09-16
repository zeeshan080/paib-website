import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { db } from "@/lib/db"
import { developerProfiles, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { EditProfileForm } from "@/components/profile/edit-profile-form"

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  // Get current profile data
  const profile = await db
    .select({
      userId: developerProfiles.userId,
      headline: developerProfiles.headline,
      bio: developerProfiles.bio,
      skills: developerProfiles.skills,
      websiteUrl: developerProfiles.websiteUrl,
      githubUrl: developerProfiles.githubUrl,
      linkedinUrl: developerProfiles.linkedinUrl,
      xUrl: developerProfiles.xUrl,
      avatarUrl: developerProfiles.avatarUrl,
      name: users.name,
      email: users.email,
    })
    .from(developerProfiles)
    .innerJoin(users, eq(developerProfiles.userId, users.id))
    .where(eq(developerProfiles.userId, session.user.id))
    .limit(1)

  const currentProfile = profile[0] || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Edit Profile
            </h1>
            <p className="text-slate-300">Update your developer profile information and showcase your skills</p>
          </div>

          <EditProfileForm initialData={currentProfile} />
        </div>
      </div>
    </div>
  )
}
