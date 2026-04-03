import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { articles, categoryColors } from "@/data/mockArticles";
import Navbar from "@/components/Navbar";
import FeedCard from "@/components/FeedCard";
import { Share2, Bookmark, Check, Flame, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadingList } from "@/hooks/use-reading-list";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toggleSave, isSaved } = useReadingList();

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">Article not found.</p>
          <Link to="/" className="text-sm font-medium text-primary hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const recommendations = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleToggleSave = () => {
    const saved = toggleSave(article);
    toast.success(saved ? "Saved to reading list" : "Removed from reading list", {
      description: article.title,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.summary, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Link copied to clipboard");
    }
  };

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-24 sm:pb-16" role="main">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <article aria-label={article.title}>
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={cn("inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[article.category])}>
              {article.category}
            </span>
            {article.trending && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                <Flame className="h-3 w-3" /> Trending
              </span>
            )}
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{publishedDate}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{article.readTime} read</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-foreground leading-[1.1] tracking-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            {article.summary}
          </p>

          {/* Action bar */}
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border">
            <button
              onClick={handleToggleSave}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isSaved(article.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
              aria-label={isSaved(article.id) ? "Remove from saved" : "Save for later"}
            >
              {isSaved(article.id) ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {isSaved(article.id) ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Cover image */}
          {article.thumbnail && (
            <div className="mb-8 rounded-xl overflow-hidden bg-muted">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* TL;DR */}
          <div className="mb-8 p-5 rounded-xl bg-muted/50 border-l-4 border-primary">
            <h2 className="section-label mb-2">Summary</h2>
            <p className="text-base font-medium text-foreground leading-relaxed">
              {article.content.tldr}
            </p>
          </div>

          {/* Key points */}
          <div className="mb-8">
            <h2 className="section-label mb-3">Key Points</h2>
            <ul className="space-y-2">
              {article.content.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-foreground leading-relaxed">
                  <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Body */}
          <div className="mb-12 border-t border-border pt-8">
            {article.content.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-[17px] text-foreground leading-[1.75] mb-6 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section aria-label="Related articles" className="border-t border-border pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">More in {article.category}</h2>
              <Link to={`/?category=${article.category}`} className="text-sm font-medium text-primary hover:underline">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendations.map((a, i) => (
                <FeedCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile sticky actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            onClick={handleToggleSave}
            className={cn(
              "flex items-center justify-center rounded-lg py-2.5 px-4 text-sm font-semibold transition-colors active:scale-[0.98]",
              isSaved(article.id)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            )}
          >
            <Bookmark className={cn("h-4 w-4", isSaved(article.id) && "fill-current")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
