import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { TipCard } from "@/components/TipCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { tips, tags, levels, Tip } from "@/data/tips";
import { Search } from "lucide-react";

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = useMemo(() => {
    return tips.filter((tip: Tip) => {
      const matchesCategory =
        selectedCategory === "all" || tip.tags.includes(selectedCategory as any);
      const matchesSearch =
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group tips by level
  const tipsByLevel = useMemo(() => {
    const grouped = {
      basico: filteredTips.filter((t) => t.level === "basico"),
      intermedio: filteredTips.filter((t) => t.level === "intermedio"),
      avanzado: filteredTips.filter((t) => t.level === "avanzado"),
    };
    return grouped;
  }, [filteredTips]);

  return (
    <Layout>
      <SEO 
        title="Tips de Vibe Coding"
        description="Consejos prácticos de la comunidad para ser más productivo construyendo aplicaciones con IA."
        canonical="/tips"
      />
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold text-foreground">
            Tips de Vibe Coding
          </h1>
          <p className="text-muted-foreground">
            Consejos ordenados de básico a avanzado para construir mejor con IA.
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
            categories={tags}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Tips by level - vertical list */}
        <div className="space-y-10">
          {(["basico", "intermedio", "avanzado"] as const).map((levelKey) => {
            const levelTips = tipsByLevel[levelKey];
            if (levelTips.length === 0) return null;

            const levelInfo = levels[levelKey];

            return (
              <section key={levelKey}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-foreground">
                    {levelInfo.label}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {levelInfo.description}
                  </span>
                </div>
                <div className="space-y-4">
                  {levelTips.map((tip, index) => (
                    <TipCard key={tip.id} tip={tip} index={index} />
                  ))}
                </div>
              </section>
            );
          })}
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
