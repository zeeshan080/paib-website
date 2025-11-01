import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle, Archive } from "lucide-react"
import { getContactMessagesForAdmin, updateContactMessageStatus } from "@/lib/actions/admin"
import { MainLayout } from "@/components/layout/main-layout"
import { SearchForm } from "@/components/admin/search-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default async function AdminMessagesPage({
  searchParams = { search: undefined },
}: {
  searchParams?: { search?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  const messages = await getContactMessagesForAdmin(searchParams?.search)

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
                Contact Messages
              </h1>
              <p className="text-slate-300">View and respond to contact form submissions</p>
            </div>
          </div>

        {/* Search */}
        <SearchForm placeholder="Search messages..." />

          {/* Messages Table */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Messages ({messages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Subject</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Date</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-medium">{message.name}</td>
                        <td className="py-3 px-4 text-slate-300">{message.email}</td>
                        <td className="py-3 px-4">
                          <p className="text-white">{message.subject}</p>
                          <p className="text-slate-400 text-sm line-clamp-1">{message.body}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              message.status === "NEW"
                                ? "bg-green-500/20 text-green-300"
                                : message.status === "READ"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-slate-500/20 text-slate-300"
                            }
                          >
                            {message.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{new Date(message.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-white">{message.subject}</DialogTitle>
                                  <DialogDescription className="text-slate-400">
                                    From: {message.name} ({message.email})
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4">
                                  <p className="text-white whitespace-pre-wrap">{message.body}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                            {message.status === "NEW" && (
                              <form action={async () => {
                                "use server"
                                await updateContactMessageStatus(message.id, "READ")
                              }}>
                                <Button type="submit" size="sm" variant="ghost" className="text-green-400 hover:text-green-300">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </form>
                            )}
                            {message.status === "READ" && (
                              <form action={async () => {
                                "use server"
                                await updateContactMessageStatus(message.id, "ARCHIVED")
                              }}>
                                <Button type="submit" size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                  <Archive className="w-4 h-4" />
                                </Button>
                              </form>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No messages found</p>
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

