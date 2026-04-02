import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import FeedCard from "@/components/FeedCard";
import FeedSkeleton from "@/components/FeedSkeleton";
import { articles, type Category } from "@/data/mockArticles";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? articles
        : articles.filter((a) => a.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

      <main className="mx-auto max-w-3xl px-4 py-6" role="main">
        <h1 className="sr-only">DakshinPost — South India News</h1>

        {loading ? (
          <FeedSkeleton />
        ) : (
          <div className="space-y-4">
            {filtered.map((article) => (
              <FeedCard key={article.id} article={article} />
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                No articles in this category yet.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
