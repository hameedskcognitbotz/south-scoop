import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { articles, categoryColors } from "@/data/mockArticles";
import Navbar from "@/components/Navbar";
import FeedCard from "@/components/FeedCard";
import { ArrowLeft, Share2, Clock, Flame, Bookmark, MessageCircle, Languages, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReadingList } from "@/hooks/use-reading-list";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toggleSave, isSaved } = useReadingList();

  const article = articles.find((a) => a.slug === slug);
  const nextArticle = articles.find((a) => a.id !== article?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-fade-in">
          <p className="text-muted-foreground mb-4 font-medium">Article not found.</p>
          <Link to="/" className="text-foreground hover:underline text-sm font-bold">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const recommendations = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 2);

  const handleToggleSave = () => {
    const saved = toggleSave(article);
    toast.success(saved ? "Added to Intelligence Briefings" : "Removed from saved stories", {
      description: article.title,
      icon: saved ? <Bookmark className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />
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
    month: "short",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Liquid Background Blobs */}
      <div className="liquid-blob top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20" />
      <div className="liquid-blob bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-secondary/30 animation-delay-2000" />

      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-white/10 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_15px_hsl(var(--primary))]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 pt-8 pb-32 sm:pb-24" role="main">
        {/* Superior Navigation Hierarchy */}
        <div className="mb-10 animate-fade-in">
          <Breadcrumb>
            <BreadcrumbList className="text-[11px] font-bold uppercase tracking-widest">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/?category=${article.category}`} className="hover:text-primary transition-colors">{article.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground line-clamp-1 max-w-[200px] font-black">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <article aria-label={article.title} className="animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          {/* Headline Section */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md bg-opacity-80 ring-1 ring-white/20",
              categoryColors[article.category]
            )}>
              {article.category}
            </span>
            {article.trending && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-black/80 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-foreground shadow-xl backdrop-blur-md border border-white/20">
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                Trending Brief
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-foreground mb-10 tracking-tighter leading-[0.95] selection:bg-primary selection:text-primary-foreground italic">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 mb-16 py-10 border-y border-white/10 relative">
            <div className="flex items-center gap-8 text-xs sm:text-sm text-muted-foreground font-black uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{article.readTime} read</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <span>{publishedDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleSave}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all shadow-xl active:scale-95",
                  isSaved(article.id) ? "bg-primary border-primary text-primary-foreground" : "liquid-glass text-foreground hover:bg-white/20"
                )}
                aria-label="Save for later"
              >
                {isSaved(article.id) ? <Check className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              </button>
              <button
                onClick={handleShare}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 liquid-glass text-foreground hover:bg-white/20 transition-all shadow-xl active:scale-95" aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cover Image */}
          {article.thumbnail && (
            <div className="mb-20 overflow-hidden rounded-[40px] border border-white/20 shadow-3xl ios-shadow">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            {/* Summary / TLDR — Liquid Glass Style */}
            <div className="mb-20 p-10 sm:p-14 rounded-[40px] liquid-glass border border-white/30 relative overflow-hidden group ios-shadow">
              <div className="absolute top-0 left-0 w-3 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-8 text-primary">
                <Bookmark className="h-5 w-5 fill-current" />
                <h2 className="text-[12px] font-black uppercase tracking-[0.4em]">The Intelligence Brief</h2>
              </div>
              <p className="text-3xl sm:text-4xl leading-[1.1] text-foreground font-black tracking-tighter italic">
                {article.content.tldr}
              </p>
            </div>

            {/* Content Body */}
            <div className="mb-20 space-y-12">
              {article.content.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-lg sm:text-[22px] text-foreground/90 leading-[1.6] font-medium selection:bg-primary selection:text-primary-foreground tracking-tight first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mb-24 py-20 px-12 rounded-[48px] bg-primary/5 border border-white/10 ios-shadow">
              <h2 className="text-4xl font-black text-foreground mb-12 tracking-tighter uppercase italic">Essential Insights</h2>
              <div className="grid grid-cols-1 gap-12">
                {article.content.points.map((point, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-primary/10 font-black text-6xl leading-[0.8] group-hover:text-primary/30 transition-all duration-500">0{i + 1}</span>
                    <p className="text-foreground font-bold text-xl leading-tight tracking-tight pt-1">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Action Row */}
        <div className="flex flex-wrap gap-4 mb-32 max-w-3xl mx-auto items-center justify-center sm:justify-start">
          <Button variant="outline" className="rounded-full border-white/20 liquid-glass text-foreground hover:bg-primary hover:text-primary-foreground font-black px-10 h-14 uppercase tracking-widest text-xs active:scale-95 shadow-xl">
            <Languages className="mr-3 h-5 w-5" />
            Read Local
          </Button>
          <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 font-black h-14 px-8 uppercase tracking-widest text-xs">
            Listen Dispatch
          </Button>
        </div>

        {/* Recommended */}
        <section aria-label="Recommended articles" className="animate-fade-in pt-32 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter uppercase italic">Recommended</h2>
            <Link to="/" className="text-xs font-black text-primary px-6 py-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest shadow-lg">
              Explore More →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recommendations.map((a, i) => (
              <FeedCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Personalization Widget - Desktop */}
      {nextArticle && (
        <div className={cn(
          "fixed bottom-12 right-12 z-[50] hidden xl:block w-80 transition-all duration-700",
          scrollProgress > 20 ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        )}>
          <div className="liquid-glass border border-white/20 rounded-[32px] p-6 shadow-3xl ios-shadow">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Up Next Intelligence</span>
              <button className="text-muted-foreground hover:text-foreground"><Clock className="h-4 w-4" /></button>
            </div>
            <Link to={`/article/${nextArticle.slug}`} className="group block">
              <h4 className="text-base font-black leading-tight line-clamp-2 mb-5 group-hover:text-primary transition-colors tracking-tight">{nextArticle.title}</h4>
              <div className="h-12 w-full rounded-2xl bg-white/5 flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm border border-white/10">
                Read Brief <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Floating mobile action bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 sm:hidden w-[calc(100%-2.5rem)] max-w-sm">
        <div className="liquid-glass border border-white/30 rounded-full h-16 px-2.5 flex items-center gap-3 shadow-3xl ios-shadow">
          <Button onClick={handleShare} className="flex-1 rounded-full h-12 font-black bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-xl active:scale-95 uppercase tracking-widest text-[11px]">
            Share Link
          </Button>
          <button
            onClick={handleToggleSave}
            className={cn(
              "h-12 w-12 flex items-center justify-center rounded-full transition-all shadow-lg active:scale-90",
              isSaved(article.id) ? "bg-primary text-primary-foreground" : "bg-white/10 text-foreground"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isSaved(article.id) && "fill-current")} />
          </button>
          <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-foreground shadow-lg active:scale-90">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
