import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
  Calendar,
  Mail,
  Star,
  Award,
  Code,
  Briefcase,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { getDeveloperBySlug } from "@/lib/actions/developers";
import { getCurrentUser } from "@/lib/auth/utils";
import { MainLayout } from "@/components/layout/main-layout";

type Developer = {
  id: string;
  name: string | null;
  title: string | null;
  bio: string | null;
  avatar?: string | null;
  slug: string | null;
  skills: string[];
  specializations: string[];
  projects: {
    id: string;
    title: string;
    description: string | null;
    technologies: string[];
  }[];
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
  experience?: number;
  location?: string;
};

export default async function DeveloperProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer: Developer | null = await getDeveloperBySlug(slug);

  if (!developer) {
    notFound();
  }

  // Get current user to check if they can edit this profile
  const currentUser = await getCurrentUser();
  const isOwnProfile = currentUser?.id === developer.id;

  return (
    <MainLayout>
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardContent className="p-8">
                  <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-purple-500/30">
                    <AvatarImage
                      src={developer.avatar || ""}
                      alt={developer.name ?? ""}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-teal-500 text-white text-2xl">
                      {(developer.name ?? "")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {developer.name}
                  </h1>
                  <p className="text-purple-400 font-medium mb-4">
                    {developer.title}
                  </p>

                  {developer.location && (
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      {developer.location}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-slate-400 mb-6">
                    <Calendar className="w-4 h-4" />
                    {developer.experience} years experience
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 mb-6">
                    {developer.github && (
                      <Link
                        href={developer.github}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-6 h-6" />
                      </Link>
                    )}
                    {developer.linkedin && (
                      <Link
                        href={developer.linkedin}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="w-6 h-6" />
                      </Link>
                    )}
                    {developer.twitter && (
                      <Link
                        href={developer.twitter}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="w-6 h-6" />
                      </Link>
                    )}
                    {developer.website && (
                      <Link
                        href={developer.website}
                        className="text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        <Globe className="w-6 h-6" />
                      </Link>
                    )}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Developer
                  </Button>

                  {/* Edit Profile Button - Only show if user is viewing their own profile */}
                  {isOwnProfile && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-3 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      <Link href="/profile/edit">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-400" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">
                    {developer.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    Skills & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {developer.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specializations */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {developer.specializations.map((spec: string) => (
                      <Badge
                        key={spec}
                        variant="outline"
                        className="border-teal-500/50 text-teal-300 px-3 py-1"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    Featured Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {developer.projects?.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="border-l-2 border-purple-500/30 pl-4"
                      >
                        <h4 className="text-white font-semibold">
                          {project.title}
                        </h4>
                        <p className="text-slate-400 text-sm mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Link href="/projects">View All Projects</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      
    </MainLayout>
  );
}
