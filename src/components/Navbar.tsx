import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="DakshinPost home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <span className="text-sm font-black text-primary-foreground">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-foreground leading-none">
              Dakshin<span className="text-primary">Post</span>
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">South India</span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
          </button>
          <div className="ml-1 flex h-8 items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            🌐 EN
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
