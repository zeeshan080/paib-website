"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Send } from "lucide-react"
import { submitContactForm } from "@/lib/actions/contact"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5)) // Max 5 files
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      // Add files to form data
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file)
      })

      const result = await submitContactForm(formData)

      if (result.success) {
        setMessage("Thank you for your message! We'll get back to you soon.")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
        setFiles([])
      } else {
        setMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      {message && (
        <Card
          className={`${message.includes("Thank you") ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}
        >
          <CardContent className="p-4">
            <p className={`${message.includes("Thank you") ? "text-green-400" : "text-red-400"}`}>{message}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-300">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="+92 300 1234567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-slate-300">
            Company/Organization
          </Label>
          <Input
            id="company"
            name="company"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-slate-300">
          Subject *
        </Label>
        <Select name="subject" required>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="services">AI Services</SelectItem>
            <SelectItem value="courses">Training & Courses</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="support">Technical Support</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-slate-300">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
          placeholder="Tell us about your project or inquiry..."
        />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-slate-300">Attachments (Optional)</Label>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-400">Click to upload files or drag and drop</p>
            <p className="text-slate-500 text-sm mt-1">PDF, DOC, TXT, JPG, PNG (Max 5 files, 10MB each)</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-700 p-3 rounded-lg">
                <span className="text-slate-300 text-sm">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 disabled:opacity-50"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
