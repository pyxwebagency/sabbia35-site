export function SiteFooter() {
  return (
    <footer className="px-6 py-12 bg-foreground text-background">
      <div className="flex flex-col gap-8">
        <span className="font-display text-4xl leading-none italic">Sabbia 35</span>
        <div className="grid grid-cols-2 gap-8 font-mono text-[10px] uppercase tracking-widest opacity-60">
          <div className="space-y-2">
            <p>Via Bordonaro, 35</p>
            <p>90015 Cefalù (PA)</p>
          </div>
          <div className="space-y-2">
            <p>+39 333 123 4567</p>
            <p>ciao@sabbia35.it</p>
          </div>
        </div>
        <div className="pt-8 border-t border-background/10">
          <p className="font-mono text-[8px] opacity-40">
            © {new Date().getFullYear()} SABBIA 35 B&B — CEFALÙ. TUTTI I DIRITTI RISERVATI.
          </p>
        </div>
      </div>
    </footer>
  );
}
