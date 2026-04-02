import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/mockArticles";
import { categoryEmojis } from "@/data/mockArticles";

const categories: ("All" | Category)[] = ["All", "Politics", "Tech", "Business", "Cinema", "Local News", "Sports"];

interface CategoryChipsProps {
  selected: "All" | Category;
  onSelect: (cat: "All" | Category) => void;
}

const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-14 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
        role="tablist"
        aria-label="News categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selected === cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
              selected === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat !== "All" && <span>{categoryEmojis[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
