import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/mockArticles";
import { categoryColors } from "@/data/mockArticles";
import { Clock, Flame } from "lucide-react";

interface FeedCardProps {
  article: Article;
}

const FeedCard = ({ article }: FeedCardProps) => {
  return (
    <Link to={`/article/${article.slug}`} className="block group" aria-label={`Read: ${article.title}`}>
      <article className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
              categoryColors[article.category]
            )}
          >
            {article.category}
          </span>
          {article.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <Flame className="h-3 w-3" />
              Trending
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors mb-2" style={{ lineHeight: '1.4' }}>
          {article.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3" style={{ lineHeight: '1.6' }}>
          {article.summary}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{article.readTime} read</span>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
