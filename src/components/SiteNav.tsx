import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <Link to="/" className="font-display text-xl tracking-tight">
        Sabbia <span className="italic text-primary">35</span>
      </Link>
      <div className="flex gap-6 items-center font-mono text-[10px] uppercase tracking-widest">
        <Link to="/" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
          Casa
        </Link>
        <Link to="/prenotazioni" activeProps={{ className: "text-primary" }}>
          Prenota
        </Link>
      </div>
    </nav>
  );
}
