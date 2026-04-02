import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/mockArticles";
import { categoryColors } from "@/data/mockArticles";
import { Clock, Flame, ChevronRight } from "lucide-react";

interface FeedCardProps {
  article: Article;
  index?: number;
  featured?: boolean;
}

const FeedCard = ({ article, index = 0, featured = false }: FeedCardProps) => {
  const delay = Math.min(index * 60, 300);

  return (
    <Link
      to={`/article/${article.slug}`}
      className="block group animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
      aria-label={`Read: ${article.title}`}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300",
          "hover:border-primary/30 hover:shadow-lg hover:glow-sm hover:-translate-y-0.5",
          "active:scale-[0.99]",
          featured ? "p-6" : "p-5"
        )}
      >
        {/* Subtle gradient accent on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          {/* Top row: badges */}
          <div className="flex items-center gap-2 mb-3">
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
          <h2
            className={cn(
              "font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2",
              featured ? "text-xl sm:text-2xl" : "text-[17px]"
            )}
            style={{ lineHeight: "1.35" }}
          >
            {article.title}
          </h2>

          {/* Summary */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4" style={{ lineHeight: "1.65" }}>
            {article.summary}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">{article.readTime} read</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0">
              Read more
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
