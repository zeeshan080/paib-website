import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { getDeveloperProfiles } from "@/lib/actions/developers";
import { MainLayout } from "@/components/layout/main-layout";

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    specialization?: string;
    experience?: string;
  };
}) {
  const params = await searchParams;
  type Developer = {
    skills: any;
    id: string;
    name: string | null;
    title: string | null;
    bio: string | null;
    avatar: string | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    website: string | null;
    slug: string | null;
    location?: string | null;
    experience?: number | null;
  };

  const developers: Developer[] = await getDeveloperProfiles({
    search: params.search,
    specialization: params.specialization,
    experience: params.experience,
  });

  return (
    <MainLayout>
      
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Our Developers
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Meet the brilliant minds behind Pakistan's AI revolution. Our team
              of expert developers is pushing the boundaries of artificial
              intelligence and machine learning.
            </p>
          </div>

          {/* Filters */}
          <Suspense fallback={<div>Loading filters...</div>}>
            <DeveloperFilters />
          </Suspense>

          {/* Developers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((developer) => (
              <Card
                key={developer.id}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all">
                    <AvatarImage
                      src={developer.avatar ?? undefined}
                      alt={developer.name ?? undefined}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-teal-500 text-white text-lg">
                      {(developer.name ?? "")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl text-white">
                    {developer.name}
                  </CardTitle>
                  <p className="text-purple-400 font-medium">
                    {developer.title}
                  </p>
                  {developer.location && (
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {developer.location}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm line-clamp-3">
                    {developer.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.slice(0, 4).map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {developer.skills.length > 4 && (
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-400"
                      >
                        +{developer.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {developer.experience} years experience
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-2">
                    {developer.github && (
                      <Link
                        href={developer.github}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                    {developer.linkedin && (
                      <Link
                        href={developer.linkedin}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    )}
                    {developer.twitter && (
                      <Link
                        href={developer.twitter}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Facebook</span>
                      </Link>
                    )}
                    {developer.website && (
                      <Link
                        href={developer.website}
                        className="text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                      </Link>
                    )}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
                  >
                    <Link href={`/developers/${developer.slug}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {developers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No developers found matching your criteria.
              </p>
            </div>
          )}
        </div>
      
    </MainLayout>
  );
}

function DeveloperFilters() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search developers..."
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
          <Select>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="machine-learning">Machine Learning</SelectItem>
              <SelectItem value="deep-learning">Deep Learning</SelectItem>
              <SelectItem value="computer-vision">Computer Vision</SelectItem>
              <SelectItem value="nlp">Natural Language Processing</SelectItem>
              <SelectItem value="robotics">Robotics</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (1-3 years)</SelectItem>
              <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior (5-8 years)</SelectItem>
              <SelectItem value="lead">Lead (8+ years)</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
