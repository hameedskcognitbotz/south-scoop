import { useParams, Link } from "react-router-dom";
import { articles, categoryColors } from "@/data/mockArticles";
import Navbar from "@/components/Navbar";
import FeedCard from "@/components/FeedCard";
import { ArrowLeft, Share2, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Article not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const recommendations = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.summary, url: window.location.href });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-6 pb-24" role="main">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors" aria-label="Back to feed">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <article aria-label={article.title}>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white", categoryColors[article.category])}>
              {article.category}
            </span>
            {article.trending && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <Flame className="h-3 w-3" />
                Trending
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readTime} read
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground mb-4" style={{ lineHeight: '1.35' }}>
            {article.title}
          </h1>

          {/* Language toggle mock */}
          <button className="mb-6 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors">
            🌐 Read in Telugu
          </button>

          {/* TL;DR */}
          <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">TL;DR</h2>
            <p className="text-sm leading-relaxed text-foreground" style={{ lineHeight: '1.7' }}>{article.content.tldr}</p>
          </div>

          {/* Key Points */}
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Key Points</h2>
            <ul className="space-y-2">
              {article.content.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground" style={{ lineHeight: '1.7' }}>
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Content */}
          <div className="prose-sm mb-8">
            {article.content.body.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-foreground/90" style={{ lineHeight: '1.8' }}>
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* Read Next */}
        <section aria-label="Recommended articles">
          <h2 className="mb-4 text-lg font-bold text-foreground">Read Next</h2>
          <div className="space-y-4">
            {recommendations.map((a) => (
              <FeedCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </main>

      {/* Sticky mobile share bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/90 backdrop-blur-lg p-3 sm:hidden z-50">
        <Button onClick={handleShare} className="w-full gap-2" size="sm">
          <Share2 className="h-4 w-4" />
          Share this article
        </Button>
      </div>
    </div>
  );
};

export default ArticlePage;
