"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code, Users, GraduationCap, Building } from "lucide-react"

interface StatsProps {
  stats: {
    projects: number
    developers: number
    courses: number
    clients: number
  }
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

export function StatsSection({ stats }: StatsProps) {
  const statsData = [
    {
      icon: Code,
      label: "AI Projects",
      value: stats.projects,
      suffix: "+",
    },
    {
      icon: Users,
      label: "Expert Developers",
      value: stats.developers,
      suffix: "+",
    },
    {
      icon: GraduationCap,
      label: "Courses Available",
      value: stats.courses,
      suffix: "+",
    },
    {
      icon: Building,
      label: "Happy Clients",
      value: stats.clients,
      suffix: "+",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-card/30 border-y border-border/40">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center px-2"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 mb-3 sm:mb-4">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary mb-1 sm:mb-2">
                <AnimatedCounter end={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
