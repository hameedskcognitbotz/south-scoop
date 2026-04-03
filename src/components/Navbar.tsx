import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Bookmark, X } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { articles } from "@/data/mockArticles";
import { useReadingList } from "@/hooks/use-reading-list";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [open, setOpen] = useState(false);
  const { saved } = useReadingList();
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-14 max-w-6xl px-4 sm:px-6 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Open Vaartha home">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-sm font-extrabold">V</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-foreground hidden sm:inline">
              Open Vaartha
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg px-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Search articles (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Reading List */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted">
                  <Bookmark className="h-4 w-4" />
                  {saved.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-background border-l border-border p-0">
                <SheetHeader className="p-6 border-b border-border">
                  <SheetTitle className="text-lg font-bold">Saved Articles</SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    {saved.length} article{saved.length !== 1 ? "s" : ""} saved
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                  {saved.length === 0 ? (
                    <div className="py-16 text-center">
                      <Bookmark className="h-10 w-10 mx-auto text-muted-foreground/20 mb-4" />
                      <p className="text-sm text-muted-foreground">No articles saved yet</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {saved.map((a) => (
                        <Link
                          key={a.id}
                          to={`/article/${a.slug}`}
                          className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          {a.thumbnail && (
                            <div className="h-14 w-14 rounded-md overflow-hidden shrink-0 bg-muted">
                              <img src={a.thumbnail} className="h-full w-full object-cover" alt="" loading="lazy" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="section-label text-[10px]">{a.category}</span>
                            <h4 className="text-sm font-semibold leading-tight line-clamp-2 mt-0.5">{a.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{a.readTime}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ⌘K Search */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search articles..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {["Politics", "Tech", "Business", "Cinema", "Sports", "Local News"].map((c) => (
              <CommandItem key={c} onSelect={() => { setOpen(false); navigate(`/?category=${c}`); }}>
                {c}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Stories">
            {articles.slice(0, 6).map((a) => (
              <CommandItem key={a.id} onSelect={() => { setOpen(false); navigate(`/article/${a.slug}`); }}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">{a.title}</span>
                  <span className="text-xs text-muted-foreground">{a.category} · {a.readTime}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Navbar;
