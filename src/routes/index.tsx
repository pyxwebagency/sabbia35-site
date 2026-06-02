import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero-cefalu.jpg";
import bedroomImg from "@/assets/bedroom.jpg";
import detailsImg from "@/assets/details.jpg";
import livingImg from "@/assets/living.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sabbia 35 — B&B nel centro storico di Cefalù" },
      {
        name: "description",
        content:
          "Bilocale di 35mq nel cuore del centro storico di Cefalù. Un rifugio mediterraneo a pochi passi dal Duomo e dal mare.",
      },
      { property: "og:title", content: "Sabbia 35 — B&B nel centro storico di Cefalù" },
      {
        property: "og:description",
        content: "Un rifugio di 35mq tra pietre antiche e il respiro del mare a Cefalù.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Tramonto sui tetti del centro storico di Cefalù con il mare sullo sfondo"
          width={1080}
          height={1600}
          className="w-full h-full object-cover animate-shutter"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 animate-reveal [animation-delay:400ms]">
          <h1 className="font-display text-5xl text-background leading-[1.1] text-balance mb-4">
            Luce d'oro sul <span className="italic">centro storico.</span>
          </h1>
          <p className="text-background/90 text-sm max-w-[28ch] font-light leading-relaxed">
            Un rifugio di 35mq dove il tempo rallenta tra pietre antiche e il respiro del mare.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-20">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
          — L'Alloggio
        </span>
        <h2 className="font-display text-3xl mb-8 leading-tight">
          Piccolo nel volume, <br />
          <span className="italic">infinito nell'anima.</span>
        </h2>
        <div className="space-y-6 text-foreground/80 leading-relaxed text-pretty">
          <p>
            Situato nel cuore pulsante di Cefalù, questo bilocale è stato restaurato preservando
            l'essenza della terra siciliana. Ogni metro quadro è un elogio alla luce naturale.
          </p>
          <p>
            Dalle travi a vista al pavimento in cotto, la palette sabbia e terracotta dialoga
            costantemente con l'azzurro che filtra dalle finestre.
          </p>
        </div>
      </section>

      {/* Specs */}
      <section className="px-6 pb-12">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-t border-border pt-10">
          {[
            { k: "Superficie", v: "35 mq" },
            { k: "Ospiti", v: "Fino a 3" },
            { k: "Camere", v: "Bilocale" },
            { k: "Wi-Fi", v: "Fibra" },
          ].map((s) => (
            <div key={s.k} className="space-y-1">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-accent">
                {s.k}
              </span>
              <p className="text-2xl font-display">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-12">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <img
              src={bedroomImg}
              alt="Camera da letto con lenzuola in lino e parete in pietra"
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="col-span-7 -mt-12 z-10">
            <img
              src={detailsImg}
              alt="Vaso in ceramica con rami di ulivo su piastrelle in terracotta"
              loading="lazy"
              width={600}
              height={800}
              className="aspect-[3/4] w-full object-cover ring-8 ring-background"
            />
          </div>
          <div className="col-span-5 self-center">
            <p className="font-mono text-[9px] uppercase leading-relaxed opacity-60">
              Materiali locali
              <br />
              Artigianato puro
              <br />
              Design essenziale
            </p>
          </div>
        </div>
        <img
          src={livingImg}
          alt="Zona living del bilocale con divano in lino e cucina a scomparsa in rovere"
          loading="lazy"
          width={1200}
          height={800}
          className="mt-4 aspect-video w-full object-cover"
        />
      </section>

      {/* CTA */}
      <section className="mx-6 my-20 p-8 bg-muted/30 border border-border text-center">
        <h3 className="font-display text-2xl italic mb-2">Prenota il tuo soggiorno</h3>
        <p className="text-[11px] font-mono uppercase tracking-widest opacity-60 mb-8">
          Disponibilità limitata
        </p>
        <Link
          to="/prenotazioni"
          className="inline-block w-full py-5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-transform active:scale-[0.98]"
        >
          Verifica disponibilità
        </Link>
      </section>

      {/* Location */}
      <section className="px-6 py-20 border-t border-border">
        <h4 className="font-display text-2xl mb-8">Posizione</h4>
        <p className="text-sm text-foreground/70 mb-8">
          A pochi passi dal Duomo di Cefalù, nascosto in un vicolo che profuma di gelsomino e sale.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Cefal%C3%B9+centro+storico"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase text-accent underline underline-offset-4"
        >
          Apri in Google Maps →
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
