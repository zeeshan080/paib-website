"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface DeveloperFiltersProps {
  currentFilters: {
    search?: string
  }
}

export function DeveloperFilters({ currentFilters }: DeveloperFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentFilters.search || "")

  // Sync search state when currentFilters change (e.g., back/forward navigation)
  useEffect(() => {
    setSearch(currentFilters.search || "")
  }, [currentFilters.search])

  const updateSearch = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    // Reset offset when filters change
    params.delete("offset")

    router.push(`/developers?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearch("")
    router.push("/developers")
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearch(search || null)
  }

  const hasActiveFilters = Boolean(currentFilters.search)

  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-8">
      <CardContent className="p-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-4">
          {/* Search - Full Width */}
          <Input
            placeholder="Search developers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 flex-1"
          />

          {/* Clear/Search Button */}
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="outline"
              onClick={clearSearch}
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

