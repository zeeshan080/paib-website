"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FormEvent, useState, useEffect, useRef } from "react"

export function SearchForm({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) {
      params.set("search", search)
    }
    router.push(`?${params.toString()}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      if (e.target.value) {
        params.set("search", e.target.value)
      } else {
        params.delete("search")
      }
      router.push(`?${params.toString()}`)
    }, 300)
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-6">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={handleChange}
              className="pl-10 bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

