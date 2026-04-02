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
    <div className="sticky top-20 z-40 liquid-blur border-b border-white/10">
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-6 sm:px-12 lg:px-24 2xl:px-32 py-4 scrollbar-hide"
        role="tablist"
        aria-label="News categories"
      >
        {categories.map((cat) => {
          const isSelected = selected === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(cat)}
              className={cn(
                "relative flex h-11 shrink-0 items-center justify-center rounded-full px-6 text-sm font-black transition-all duration-500",
                "border border-white/10 active:scale-95 shadow-sm",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-2xl premium-glow border-none"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground hover:border-white/20"
              )}
            >
              <div className="flex items-center gap-2 relative z-10">
                {cat !== "All" && (
                  <span className="text-xs transition-transform group-hover:scale-125">
                    {categoryEmojis[cat]}
                  </span>
                )}
                <span className="uppercase tracking-widest leading-none">{cat}</span>
              </div>
              {isSelected && (
                <div className="absolute inset-x-4 -bottom-1 h-3 w-1 bg-primary/40 blur-md rounded-full mx-auto" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChips;
