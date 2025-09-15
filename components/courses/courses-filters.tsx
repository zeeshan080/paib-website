"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface CoursesFiltersProps {
  filterOptions: {
    levels: string[]
    tags: string[]
    priceOptions: string[]
  }
  currentFilters: {
    search?: string
    level?: string
    price?: string
    tag?: string
  }
  totalCourses: number
}

export function CoursesFilters({ filterOptions, currentFilters, totalCourses }: CoursesFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentFilters.search || "")

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/courses?${params.toString()}`)
  }

  const clearAllFilters = () => {
    setSearch("")
    router.push("/courses")
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", search || null)
  }

  const hasActiveFilters = Object.values(currentFilters).some(Boolean)

  return (
    <Card className="mb-8 border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Courses
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {totalCourses} course{totalCourses !== 1 ? "s" : ""} found
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Label htmlFor="search">Search Courses</Label>
            <form onSubmit={handleSearchSubmit} className="flex gap-2 mt-1">
              <Input
                id="search"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Level Filter */}
          <div>
            <Label>Level</Label>
            <Select value={currentFilters.level || "all"} onValueChange={(value) => updateFilters("level", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                {filterOptions.levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Filter */}
          <div>
            <Label>Price</Label>
            <Select value={currentFilters.price || "all"} onValueChange={(value) => updateFilters("price", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border/40">
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
