"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface HeroSlide {
  id: string
  title: string
  subtitle: string | null
  ctaLabel: string | null
  ctaHref: string | null
  imageUrl: string | null
  order: number
}

interface HeroSliderProps {
  slides: HeroSlide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PAIB
          </h1>
          <p className="text-xl text-muted-foreground">Pakistan Artificial Intelligence Builders</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Background Image */}
          {slides[currentSlide].imageUrl && (
            <Image
              src={slides[currentSlide].imageUrl! || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover opacity-30"
              priority
            />
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-4 sm:mb-6 text-balance px-2 sm:px-0"
                >
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </span>
                </motion.h1>

                {slides[currentSlide].subtitle && (
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-2xl px-2 sm:px-0"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                )}

                {slides[currentSlide].ctaLabel && slides[currentSlide].ctaHref && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-0"
                  >
                    <Button size="lg" asChild className="glow-border">
                      <Link href={slides[currentSlide].ctaHref!}>
                        <Play className="mr-2 h-4 w-4" />
                        {slides[currentSlide].ctaLabel}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Robot/AI Visual */}
          {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 opacity-20">
            <Image src="/placeholder-vm9hh.png" alt="AI Robot" fill className="object-contain" />
          </div> */}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrow Controls */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-border/40 hover:bg-background/40 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-border/40 hover:bg-background/40 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-background/40 hover:bg-background/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
