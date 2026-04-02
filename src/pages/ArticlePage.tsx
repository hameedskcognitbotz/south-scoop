import { useParams, Link } from "react-router-dom";
import { articles, categoryColors } from "@/data/mockArticles";
import Navbar from "@/components/Navbar";
import FeedCard from "@/components/FeedCard";
import { ArrowLeft, Share2, Clock, Flame, Bookmark, MessageCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-fade-in">
          <p className="text-muted-foreground mb-4">Article not found.</p>
          <Link to="/" className="text-primary hover:underline text-sm font-medium">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const recommendations = articles.filter((a) => a.id !== article.id && a.category !== article.category).slice(0, 3);
  if (recommendations.length < 3) {
    const more = articles.filter((a) => a.id !== article.id && !recommendations.includes(a)).slice(0, 3 - recommendations.length);
    recommendations.push(...more);
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.summary, url: window.location.href });
    }
  };

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 pt-4 pb-28 sm:pb-8" role="main">
        {/* Back nav */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all animate-fade-in"
          aria-label="Back to feed"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to feed
        </Link>

        <article aria-label={article.title} className="animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white",
                categoryColors[article.category]
              )}
            >
              {article.category}
            </span>
            {article.trending && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                <Flame className="h-3 w-3" />
                Trending
              </span>
            )}
          </div>

          {/* Headline */}
          <h1
            className="text-2xl sm:text-[32px] font-extrabold text-foreground mb-4 text-balance"
            style={{ lineHeight: "1.25" }}
          >
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} read
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{publishedDate}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-6">
            <button className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors">
              🌐 Read in Telugu
            </button>
            <button
              onClick={handleShare}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <button className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors">
              <Bookmark className="h-3.5 w-3.5" />
              Save
            </button>
          </div>

          {/* TL;DR */}
          <div className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-5 glow-sm" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15">
                <span className="text-xs">⚡</span>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Quick Summary</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground font-medium" style={{ lineHeight: "1.75" }}>
              {article.content.tldr}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Key Points</h2>
            <ul className="space-y-3">
              {article.content.points.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[15px] leading-relaxed text-foreground animate-fade-in"
                  style={{ lineHeight: "1.7", animationDelay: `${250 + i * 80}ms`, animationFillMode: "both" }}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Full Content */}
          <div className="mb-10">
            {article.content.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mb-5 text-base text-foreground/85 leading-[1.85]"
              >
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* Divider */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Read Next */}
        <section aria-label="Recommended articles" className="animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">Read Next</h2>
            <Link to="/" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {recommendations.map((a, i) => (
              <FeedCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </section>
      </main>

      {/* Sticky mobile share bar — premium glass */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-border/50 p-3 sm:hidden z-50">
        <div className="mx-auto max-w-2xl flex items-center gap-2">
          <Button onClick={handleShare} className="flex-1 gap-2 rounded-xl h-11" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* JSON-LD structured data for article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.summary,
            datePublished: article.publishedAt,
            publisher: {
              "@type": "Organization",
              name: "DakshinPost",
            },
          }),
        }}
      />
    </div>
  );
};

export default ArticlePage;
