import { Suspense } from "react";
import { getDeveloperProfiles } from "@/lib/actions/developers";
import { MainLayout } from "@/components/layout/main-layout";
import { DeveloperFilters } from "@/components/developers/developer-filters";
import { DevelopersList } from "@/components/developers/developers-list";

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params = await searchParams;
  
  // Initial load - only get first page
  const initialDevelopers = await getDeveloperProfiles({
    search: params.search,
    limit: 12,
    offset: 0,
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
          <DeveloperFilters currentFilters={params} />
        </Suspense>

        {/* Developers List with Infinite Scroll */}
        <DevelopersList
          initialDevelopers={initialDevelopers}
          search={params.search}
        />
      </div>
    </MainLayout>
  );
}
