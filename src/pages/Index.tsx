import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import FeedCard from "@/components/FeedCard";
import FeedSkeleton from "@/components/FeedSkeleton";
import { articles, type Category } from "@/data/mockArticles";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | "All" | null;
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>(categoryParam || "All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [selectedCategory]);

  const handleCategoryChange = (cat: "All" | Category) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(
    () => selectedCategory === "All" ? articles : articles.filter((a) => a.category === selectedCategory),
    [selectedCategory]
  );

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CategoryChips selected={selectedCategory} onSelect={handleCategoryChange} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-16" role="main">
        <h1 className="sr-only">Open Vaartha — South India News</h1>

        {/* Date header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-medium text-muted-foreground">{today}</p>
          <p className="text-xs font-medium text-muted-foreground">
            {filtered.length} {selectedCategory === "All" ? "stories" : `in ${selectedCategory}`}
          </p>
        </div>

        {loading ? (
          <FeedSkeleton />
        ) : (
          <div className="space-y-10">
            {/* Hero — lead story */}
            {filtered.length > 0 && selectedCategory === "All" && (
              <section aria-label="Top story">
                <FeedCard article={filtered[0]} index={0} variant="hero" />
              </section>
            )}

            {/* Main grid */}
            <section aria-label="Latest stories">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(selectedCategory === "All" ? 1 : 0, selectedCategory === "All" ? 7 : 6).map((article, i) => (
                  <FeedCard key={article.id} article={article} index={i + 1} />
                ))}
              </div>
            </section>

            {/* More stories — compact list */}
            {filtered.length > 7 && selectedCategory === "All" && (
              <section aria-label="More stories">
                <div className="border-t border-border pt-6">
                  <h2 className="section-label mb-4">More Stories</h2>
                  <div className="max-w-2xl">
                    {filtered.slice(7).map((article, i) => (
                      <FeedCard key={article.id} article={article} index={i + 7} variant="compact" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Newsletter CTA — minimal */}
            <section className="border-t border-border pt-10">
              <div className="max-w-lg">
                <h3 className="text-lg font-bold text-foreground mb-2">Stay informed</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the daily briefing — the top stories from South India, delivered every morning.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">V</div>
                <span className="text-sm font-bold text-foreground">Open Vaartha</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs">
                Authoritative journalism from South India. Fast, clear, trustworthy.
              </p>
            </div>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground/60">
            © 2026 Open Vaartha. All rights reserved.
          </p>
        </footer>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Open Vaartha",
            description: "Fast, authoritative news from South India.",
            url: window.location.origin,
          }),
        }}
      />
    </div>
  );
};

export default Index;
