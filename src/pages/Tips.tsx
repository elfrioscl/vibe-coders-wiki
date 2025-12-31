import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { TipCard } from "@/components/TipCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { tips, categories, Tip } from "@/data/tips";
import { Search } from "lucide-react";

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = useMemo(() => {
    return tips.filter((tip: Tip) => {
      const matchesCategory =
        selectedCategory === "all" || tip.category === selectedCategory;
      const matchesSearch =
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold text-foreground">
            Tips de Vibe Coding
          </h1>
          <p className="text-muted-foreground">
            Consejos prácticos de la comunidad para construir mejor con IA.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Tips Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTips.map((tip, index) => (
            <TipCard key={tip.id} tip={tip} index={index} />
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No se encontraron tips con esos criterios.
          </div>
        )}
      </div>
    </Layout>
  );
}
