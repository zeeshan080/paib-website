import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MainLayout } from "@/components/layout/main-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function createService(formData: FormData) {
  "use server"
  // TODO: Implement service creation
  redirect("/admin/services")
}

export default async function NewServicePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/admin/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Link>
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Create New Service
            </h1>
            <p className="text-slate-300">Add a new service offering to your platform</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-white">Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createService} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., AI Consulting"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-white">
                      Slug *
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., ai-consulting"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-white">
                    Short Description
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="A brief description of the service"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="icon" className="text-white">
                      Icon (emoji)
                    </Label>
                    <Input
                      id="icon"
                      name="icon"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="🤖"
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange" className="text-white">
                      Price Range
                    </Label>
                    <Input
                      id="priceRange"
                      name="priceRange"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="e.g., $500 - $2,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order" className="text-white">
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue="0"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="isFeatured" name="isFeatured" />
                  <Label htmlFor="isFeatured" className="text-white">
                    Mark as Featured
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Create Service
                  </Button>
                  <Button asChild type="button" variant="outline" className="border-slate-600">
                    <Link href="/admin/services">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

