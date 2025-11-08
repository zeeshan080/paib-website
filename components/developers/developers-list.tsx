"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Github,
  Linkedin,
  Globe,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { getDeveloperProfiles } from "@/lib/actions/developers"

type Developer = {
  skills: string[]
  id: string
  name: string | null
  title: string | null
  bio: string | null
  avatar: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  website: string | null
  slug: string | null
}

interface DevelopersListProps {
  initialDevelopers: Developer[]
  search?: string
}

export function DevelopersList({
  initialDevelopers,
  search,
}: DevelopersListProps) {
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialDevelopers.length === 12)
  const [offset, setOffset] = useState(12)
  const observerTarget = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  // Reset when filters change
  useEffect(() => {
    setDevelopers(initialDevelopers)
    setOffset(12)
    setHasMore(initialDevelopers.length === 12)
    loadingRef.current = false
  }, [initialDevelopers, search])

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return

    loadingRef.current = true
    setLoading(true)

    try {
      const newDevelopers = await getDeveloperProfiles({
        search,
        limit: 12,
        offset,
      })

      if (newDevelopers.length === 0) {
        setHasMore(false)
      } else {
        setDevelopers((prev) => [...prev, ...newDevelopers])
        setOffset((prev) => prev + 12)
        setHasMore(newDevelopers.length === 12)
      }
    } catch (error) {
      console.error("Error loading more developers:", error)
      setHasMore(false)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [offset, search, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMore, hasMore])

  return (
    <>
      {/* Developers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developers.map((developer) => (
          <Card
            key={developer.id}
            className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
          >
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all">
                <AvatarImage
                  src={developer.avatar ?? undefined}
                  alt={developer.name ?? undefined}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-teal-500 text-white text-lg">
                  {(developer.name ?? "")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-white">
                {developer.name}
              </CardTitle>
              <p className="text-purple-400 font-medium">
                {developer.title}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm line-clamp-3">
                {developer.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {developer.skills.slice(0, 4).map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {skill}
                  </Badge>
                ))}
                {developer.skills.length > 4 && (
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-400"
                  >
                    +{developer.skills.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {developer.github && (
                  <Link
                    href={developer.github}
                    className="text-slate-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {developer.linkedin && (
                  <Link
                    href={developer.linkedin}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {developer.twitter && (
                  <Link
                    href={developer.twitter}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                )}
                {developer.website && (
                  <Link
                    href={developer.website}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
              >
                <Link href={`/developers/${developer.slug}`}>
                  View Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {developers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No developers found matching your criteria.
          </p>
        </div>
      )}

      {/* Loading indicator and infinite scroll trigger */}
      {hasMore && (
        <div ref={observerTarget} className="py-8 text-center">
          {loading && (
            <p className="text-slate-400">Loading more developers...</p>
          )}
        </div>
      )}

      {!hasMore && developers.length > 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">
            You've seen all developers matching your criteria.
          </p>
        </div>
      )}
    </>
  )
}

