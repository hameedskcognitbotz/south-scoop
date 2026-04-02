import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="DakshinPost home">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Dakshin<span className="text-primary">Post</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">EN</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
