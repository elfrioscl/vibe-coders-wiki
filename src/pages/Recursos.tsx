import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { ResourceCard } from "@/components/ResourceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { resources, resourceCategories, Resource } from "@/data/resources";
import { Search } from "lucide-react";

export default function RecursosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource: Resource) => {
      const matchesCategory =
        selectedCategory === "all" || resource.category === selectedCategory;
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Layout>
      <SEO 
        title="Recursos y Herramientas para Vibe Coding"
        description="Biblioteca curada de herramientas para pagos, emails, bases de datos y más."
        canonical="/recursos"
      />
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold text-foreground">
            Recursos y Herramientas
          </h1>
          <p className="text-muted-foreground">
            Las mejores herramientas recomendadas por la comunidad.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <CategoryFilter
            categories={resourceCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Resources Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No se encontraron recursos con esos criterios.
          </div>
        )}
      </div>
    </Layout>
  );
}
