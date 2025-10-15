import Link from "next/link"
import { Bot, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Management", href: "/management" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "AI Consulting", href: "/services" },
    { name: "Custom Development", href: "/services" },
    { name: "Training", href: "/courses" },
  ],
  resources: [
    { name: "Projects", href: "/projects" },
    { name: "Developers", href: "/developers" },
    { name: "Courses", href: "/courses" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 w-full">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Bot className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md" />
              </div>
              <span className="font-mono text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PAIB
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Pakistan Artificial Intelligence Builders - Leading Pakistan into the AI revolution with cutting-edge
              solutions and innovation.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/paib" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/company/paib" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/paib_ai" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:info@paib.ai">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold mb-2">Stay updated</h3>
              <p className="text-muted-foreground text-sm">Get the latest AI insights and updates from PAIB.</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Input type="email" placeholder="Enter your email" className="md:w-64" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Pakistan Artificial Intelligence Builders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
