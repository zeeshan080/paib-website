"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

interface EditProfileButtonProps {
  developerId: string
}

export function EditProfileButton({ developerId }: EditProfileButtonProps) {
  const { data: session } = useSession()
  const isOwnProfile = session?.user?.id === developerId

  if (!isOwnProfile) {
    return null
  }

  return (
    <Button
      asChild
      variant="outline"
      className="w-full mt-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
    >
      <Link href="/profile/edit">
        <Edit className="w-4 h-4 mr-2" />
        Edit Profile
      </Link>
    </Button>
  )
}

