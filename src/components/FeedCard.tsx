import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/mockArticles";
import { categoryColors } from "@/data/mockArticles";
import { Clock, Flame, ChevronRight } from "lucide-react";

interface FeedCardProps {
  article: Article;
  index?: number;
  variant?: "hero" | "grid" | "list" | "compact" | "minimal";
}

const FeedCard = ({ article, index = 0, variant = "grid" }: FeedCardProps) => {
  const delay = Math.min(index * 60, 300);

  return (
    <Link
      to={`/article/${article.slug}`}
      className="block group animate-fade-in relative z-10 w-full h-full"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
      aria-label={`Read: ${article.title}`}
    >
      <article
        className={cn(
          "relative overflow-hidden transition-all duration-700 h-full flex flex-col",
          "liquid-glass rounded-[40px] border border-white/20",
          "hover:scale-[1.02] hover:shadow-3xl ios-shadow",
          "active:scale-[0.98]",
          variant === "list" ? "sm:flex-row p-2" : "p-3",
          variant === "minimal" && "justify-center p-8",
          variant === "compact" && "p-6"
        )}
      >
        <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-primary/10 transition-colors" />

        {/* Thumbnail Section */}
        {article.thumbnail && variant !== "minimal" && (
          <div className={cn(
            "relative overflow-hidden flex-shrink-0 transition-all duration-700",
            variant === "hero" ? "w-full aspect-[21/9] rounded-[32px]" :
              variant === "list" ? "w-full sm:w-48 aspect-video sm:aspect-[4/5] rounded-[24px]" :
                variant === "compact" ? "w-full aspect-video rounded-[24px] mb-4" :
                  "w-full aspect-video rounded-[24px] mb-4"
          )}>
            <img
              src={article.thumbnail}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-md bg-opacity-80 ring-1 ring-white/20",
                categoryColors[article.category]
              )}>
                {article.category}
              </span>
            </div>
          </div>
        )}

        <div className={cn(
          "relative flex-1 flex flex-col justify-center",
          variant === "hero" ? "p-8 sm:p-12" :
            variant === "list" ? "p-5 sm:px-8 sm:py-6" :
              variant === "compact" ? "px-2 py-2" :
                variant === "minimal" ? "" :
                  "px-2 pb-4"
        )}>
          {/* Top row: badges for minimal/compact */}
          {(variant === "minimal" || (variant === "grid" && !article.thumbnail)) && (
            <div className="flex items-center gap-2 mb-4">
              <span className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg",
                categoryColors[article.category]
              )}>
                {article.category}
              </span>
            </div>
          )}

          {/* Headline */}
          <h2
            className={cn(
              "font-black text-foreground transition-colors duration-300 mb-3 text-balance tracking-tighter",
              variant === "hero" ? "text-3xl sm:text-5xl leading-[0.95] italic uppercase" :
                variant === "grid" || variant === "list" ? "text-xl sm:text-2xl leading-[1.1]" :
                  variant === "compact" ? "text-lg leading-tight" :
                    "text-2xl sm:text-4xl leading-[1] italic"
            )}
          >
            {article.title}
          </h2>

          {/* Summary */}
          {variant !== "compact" && (
            <p className={cn(
              "text-muted-foreground leading-relaxed transition-colors font-medium mb-6",
              variant === "hero" ? "text-base sm:text-xl line-clamp-3" :
                variant === "minimal" ? "text-lg sm:text-2xl line-clamp-4" :
                  "text-sm sm:text-base line-clamp-2"
            )}>
              {article.summary}
            </p>
          )}

          {/* Bottom row */}
          <div className={cn(
            "mt-auto flex items-center justify-between border-t border-white/10",
            variant === "compact" ? "pt-2" : "pt-5"
          )}>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted-foreground font-black uppercase tracking-widest">
              <span>{article.readTime} read</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-primary transition-all duration-300 group-hover:gap-3">
              Read Brief
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
