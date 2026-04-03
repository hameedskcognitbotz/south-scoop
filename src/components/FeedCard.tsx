import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/mockArticles";
import { categoryColors } from "@/data/mockArticles";
import { Flame } from "lucide-react";

interface FeedCardProps {
  article: Article;
  index?: number;
  variant?: "hero" | "standard" | "compact";
}

const FeedCard = ({ article, index = 0, variant = "standard" }: FeedCardProps) => {
  const delay = Math.min(index * 50, 250);

  if (variant === "hero") {
    return (
      <Link
        to={`/article/${article.slug}`}
        className="group block animate-fade-in"
        style={{ animationDelay: `${delay}ms` }}
        aria-label={`Read: ${article.title}`}
      >
        <article className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors">
          {article.thumbnail && (
            <div className="aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-muted">
              <img
                src={article.thumbnail}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[article.category])}>
                {article.category}
              </span>
              {article.trending && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight mb-3 text-balance">
              {article.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-2 mb-4 max-w-2xl">
              {article.summary}
            </p>
            <span className="text-xs font-medium text-muted-foreground">{article.readTime} read</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/article/${article.slug}`}
        className="group block animate-fade-in"
        style={{ animationDelay: `${delay}ms` }}
        aria-label={`Read: ${article.title}`}
      >
        <article className="flex gap-4 py-4 border-b border-border last:border-b-0 group-hover:bg-muted/50 -mx-3 px-3 rounded-lg transition-colors">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={cn("inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", categoryColors[article.category])}>
                {article.category}
              </span>
              {article.trending && (
                <Flame className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-1">
              {article.title}
            </h3>
            <span className="text-[11px] text-muted-foreground">{article.readTime}</span>
          </div>
          {article.thumbnail && (
            <div className="h-16 w-16 rounded-md overflow-hidden shrink-0 bg-muted">
              <img src={article.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          )}
        </article>
      </Link>
    );
  }

  // Standard card
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`Read: ${article.title}`}
    >
      <article className="h-full rounded-xl bg-card border border-border overflow-hidden hover:border-foreground/20 transition-colors">
        {article.thumbnail && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={article.thumbnail}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[article.category])}>
              {article.category}
            </span>
            {article.trending && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                <Flame className="h-3 w-3" />
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-foreground leading-snug mb-2 line-clamp-3 text-balance">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {article.summary}
          </p>
          <span className="text-xs font-medium text-muted-foreground">{article.readTime} read</span>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
