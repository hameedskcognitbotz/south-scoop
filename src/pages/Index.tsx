import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CategoryChips from "@/components/CategoryChips";
import FeedCard from "@/components/FeedCard";
import FeedSkeleton from "@/components/FeedSkeleton";
import { articles, type Category } from "@/data/mockArticles";
import { TrendingUp, Sparkles, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReadingList } from "@/hooks/use-reading-list";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | "All" | null;
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>(categoryParam || "All");
  const [loading, setLoading] = useState(true);
  const { saved } = useReadingList();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
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
    () =>
      selectedCategory === "All"
        ? articles
        : articles.filter((a) => a.category === selectedCategory),
    [selectedCategory]
  );

  const trendingCount = filtered.filter((a) => a.trending).length;

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <CategoryChips selected={selectedCategory} onSelect={handleCategoryChange} />

        <main className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-24 2xl:px-32 py-12" role="main">
          <h1 className="sr-only">Open Vaartha — South India News</h1>

          {/* Bento Grid Header */}
          {!loading && (
            <div className="mb-20 animate-fade-in premium-blur-bg p-1 rounded-[60px]">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 p-10 sm:p-16 rounded-[56px] liquid-glass">
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="glass-pill">South India Intelligence</span>
                      {trendingCount > 0 && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg">
                          <TrendingUp className="h-3 w-3" />
                          {trendingCount} Trends
                        </span>
                      )}
                    </div>
                    <h2 className="text-mega text-foreground">
                      {selectedCategory === "All" ? "The News Hub" : selectedCategory}
                    </h2>
                  </div>
                  <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-3xl leading-[1.2] tracking-tight">
                    Fast-scrolling, high-impact regional dispatches. Open Vaartha delivers the pulse of South India with clarity and authority.
                  </p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground border-l lg:border-l-0 lg:border-r border-primary/20 pl-6 lg:pl-0 lg:pr-10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>{filtered.length} Live Briefings</span>
                  </div>
                  <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <FeedSkeleton />
          ) : (
            <div className="space-y-32">
              {/* Main Bento Area - Spaced for Maximum Breathability */}
              <section aria-label="Featured News Hub">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-12 auto-rows-[minmax(400px,auto)]">
                  {filtered.slice(0, 4).map((article, i) => {
                    // High-Impact Bento Map (Limited to top 4 for breathability)
                    let gridClass = "xl:col-span-6";
                    let variant: "hero" | "grid" | "list" | "compact" | "minimal" = "grid";

                    if (i === 0 && selectedCategory === "All") {
                      gridClass = "xl:col-span-8 xl:row-span-2";
                      variant = "hero";
                    } else if (i === 1 && selectedCategory === "All") {
                      gridClass = "xl:col-span-4 xl:row-span-1";
                      variant = "list";
                    } else if (i === 2 && selectedCategory === "All") {
                      gridClass = "xl:col-span-4 xl:row-span-1";
                      variant = "minimal";
                    } else if (i === 3 && selectedCategory === "All") {
                      gridClass = "xl:col-span-12 xl:row-span-1";
                      variant = "list";
                    }

                    return (
                      <div key={article.id} className={cn("flex flex-col h-full", gridClass)}>
                        <FeedCard
                          article={article}
                          index={i}
                          variant={variant}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Secondary Editorial Row - Minimalist & Linear */}
              <section aria-label="Latest Regional Updates">
                <div className="flex items-center gap-6 mb-16 px-4">
                  <h3 className="text-xl font-black uppercase tracking-[0.4em] text-foreground/40">The Briefings</h3>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {filtered.slice(4, 7).map((article, i) => (
                    <FeedCard
                      key={article.id}
                      article={article}
                      index={i + 4}
                      variant="grid"
                    />
                  ))}
                </div>
              </section>

              {/* Context Area (Moved from Sidebar to Full Width Segment) */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-10 rounded-[60px] bg-primary/5 border border-primary/10">
                <div className="max-w-xl">
                  <h3 className="text-4xl font-black text-foreground italic mb-6 leading-tight">Master the region's current affairs.</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Join 50,000+ South Indian professionals who receive our curated daily executive summary.
                    No clutter, just clarity.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Briefings at: your@email.com"
                    className="flex-1 bg-background border border-border rounded-full px-8 py-5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-inner"
                  />
                  <Button className="rounded-full px-10 h-14 font-black uppercase tracking-widest bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    Join Briefing
                  </Button>
                </div>
              </section>
            </div>
          )}

          {/* Footer - Minimalist Vercel Edge */}
          <footer className="mt-48 pt-24 border-t border-border animate-fade-in group">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16">
              <div className="max-w-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-black italic text-sm">V</div>
                  <span className="text-lg font-black text-foreground tracking-tighter">Open Vaartha</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The pulse of South India. Authoritative journalism meets modern delivery. Covering the stories that shape our region.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                <div className="flex flex-col gap-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Briefings</h5>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Latest News</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Trending</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Regional</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Publication</h5>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Follow</h5>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">X (Twitter)</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</Link>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Threads</Link>
                </div>
              </div>
            </div>
            <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              <span>© 2026 Open Vaartha. All rights reserved.</span>
              <div className="flex items-center gap-6">
                <span>Privacy</span>
                <span>Terms</span>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground hover:text-primary transition-colors">Back to Top ↑</button>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Open Vaartha",
            description: "Fast, authoritative news from South India. Politics, Tech, Cinema, and Business briefings.",
            url: window.location.origin,
          }),
        }}
      />
    </div>
  );
};

export default Index;
