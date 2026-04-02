import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Bookmark, User, Compass, Newspaper, LogOut, Bell, History } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 liquid-blur border-b border-border/10" role="navigation" aria-label="Main navigation">
        <div className="mx-auto flex h-20 max-w-[1600px] px-6 sm:px-12 lg:px-24 2xl:px-32 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Open Vaartha home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-xl font-black italic">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-foreground leading-none">
                Open <span className="text-primary">Vaartha</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2 rounded-full border border-border px-4 text-muted-foreground transition-all hover:text-foreground hover:bg-secondary target-search"
              aria-label="Search articles (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline text-xs font-medium border border-border rounded px-1.5 py-0.5 bg-background shadow-sm">⌘K</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-[20px] w-[20px]" /> : <Moon className="h-[20px] w-[20px]" />}
            </button>

            <div className="hidden sm:flex items-center gap-4 border-l border-border pl-4 mr-2">
              {/* Reading List Drawer */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="relative flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-foreground hover:bg-secondary">
                    <Bookmark className="h-[20px] w-[20px]" />
                    {saved.length > 0 && (
                      <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background shadow-sm" />
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md liquid-glass border-l border-white/20 p-0">
                  <SheetHeader className="p-8 border-b border-white/10">
                    <SheetTitle className="text-2xl font-black tracking-tighter">Your Reading List</SheetTitle>
                    <SheetDescription className="text-muted-foreground font-medium">Articles you've saved for later.</SheetDescription>
                  </SheetHeader>
                  <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                    {saved.length === 0 ? (
                      <div className="py-24 text-center">
                        <Bookmark className="h-16 w-16 mx-auto text-muted-foreground/10 mb-6" />
                        <p className="text-base font-bold text-muted-foreground/60">No stories saved yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {saved.map((a) => (
                          <Link key={a.id} to={`/article/${a.slug}`} className="flex gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all border border-transparent hover:border-white/20 group">
                            <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                              <img src={a.thumbnail} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[12px] font-bold uppercase tracking-widest text-primary">{a.category}</span>
                              <h4 className="text-sm font-bold leading-tight line-clamp-2">{a.title}</h4>
                              <p className="text-[11px] font-medium text-muted-foreground">{a.readTime} read</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-11 w-11 rounded-full overflow-hidden border border-white/20 hover:border-primary/50 transition-all focus:outline-none shadow-lg">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" />
                    <AvatarFallback className="bg-secondary text-[11px] font-bold uppercase">VP</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-3 liquid-glass border border-white/20 p-2 shadow-2xl overflow-hidden" align="end">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <DropdownMenuLabel className="p-3 relative z-10">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-black tracking-tight">Vignesh Prabhu</p>
                    <p className="text-[11px] font-medium text-muted-foreground">vignesh@openvaartha.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10 my-1.5" />
                <DropdownMenuGroup className="relative z-10">
                  <DropdownMenuItem className="h-11 rounded-xl focus:bg-white/10 gap-3 cursor-pointer">
                    <User className="h-4 w-4" /> <span className="font-bold">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-11 rounded-xl focus:bg-white/10 gap-3 cursor-pointer">
                    <History className="h-4 w-4" /> <span className="font-bold">Reading History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-11 rounded-xl focus:bg-white/10 gap-3 cursor-pointer">
                    <Bell className="h-4 w-4" /> <span className="font-bold">Intelligence Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/10 my-1.5" />
                <DropdownMenuItem className="h-11 rounded-xl focus:bg-destructive/20 focus:text-destructive gap-3 cursor-pointer text-destructive relative z-10">
                  <LogOut className="h-4 w-4" /> <span className="font-black">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* ⌘K Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stories, categories, intelligence briefings..." />
        <CommandList className="scrollbar-hide">
          <CommandEmpty>No results found for your query.</CommandEmpty>
          <CommandGroup heading="Curated Categories">
            <CommandItem disabled className="opacity-50">
              <Compass className="mr-2 h-4 w-4" />
              <span>Explore Regional News</span>
            </CommandItem>
            {["Politics", "Tech", "Business", "Cinema"].map(c => (
              <CommandItem key={c} onSelect={() => { setOpen(false); navigate(`/?category=${c}`); }}>
                <Newspaper className="mr-2 h-4 w-4" />
                <span>{c}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Latest Stories">
            {articles.slice(0, 5).map(a => (
              <CommandItem key={a.id} onSelect={() => { setOpen(false); navigate(`/article/${a.slug}`); }}>
                <div className="flex flex-col">
                  <span className="font-bold">{a.title}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{a.category} • {a.readTime}</span>
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
