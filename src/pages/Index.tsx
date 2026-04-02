import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import FeedCard from "@/components/FeedCard";
import FeedSkeleton from "@/components/FeedSkeleton";
import { articles, type Category } from "@/data/mockArticles";
import { TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? articles
        : articles.filter((a) => a.category === selectedCategory),
    [selectedCategory]
  );

  const trendingCount = filtered.filter((a) => a.trending).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

      <main className="mx-auto max-w-2xl px-4 py-6" role="main">
        <h1 className="sr-only">DakshinPost — South India News</h1>

        {/* Section header */}
        {!loading && (
          <div className="mb-5 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">
                {selectedCategory === "All" ? "Top Stories" : selectedCategory}
              </h2>
              {trendingCount > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                  <TrendingUp className="h-3 w-3" />
                  {trendingCount} trending
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </span>
          </div>
        )}

        {loading ? (
          <FeedSkeleton />
        ) : (
          <div className="space-y-4">
            {filtered.map((article, i) => (
              <FeedCard
                key={article.id}
                article={article}
                index={i}
                featured={i === 0 && selectedCategory === "All"}
              />
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center animate-fade-in">
                <p className="text-muted-foreground text-sm">No articles in this category yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom spacer for mobile */}
        <div className="h-8" />
      </main>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "DakshinPost",
            description: "Fast, clean news from South India. Politics, Tech, Cinema, Sports and more.",
            url: window.location.origin,
          }),
        }}
      />
    </div>
  );
};

export default Index;
