import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { getServicesForAdmin, deleteService } from "@/lib/actions/admin"
import { MainLayout } from "@/components/layout/main-layout"
import { SearchForm } from "@/components/admin/search-form"

export default async function AdminServicesPage({
  searchParams = { search: undefined },
}: {
  searchParams?: { search?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  const services = await getServicesForAdmin(searchParams?.search)

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
                Manage Services
              </h1>
              <p className="text-slate-300">Update service offerings and pricing</p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Link href="/admin/services/new">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Link>
            </Button>
          </div>

        {/* Search */}
        <SearchForm placeholder="Search services..." />

          {/* Services Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Services ({services.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Title</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Price Range</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Featured</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Created</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-white font-medium">{service.title}</p>
                            <p className="text-slate-400 text-sm line-clamp-1">{service.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{service.priceRange || "-"}</td>
                        <td className="py-3 px-4">
                          {service.isFeatured && (
                            <Badge className="bg-purple-500/20 text-purple-300">Featured</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{new Date(service.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Link href={`/services/${service.slug}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button asChild size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Link href={`/admin/services/${service.id}/edit`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            <form action={async () => {
                              "use server"
                              await deleteService(service.id)
                            }}>
                              <Button type="submit" size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {services.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No services found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

