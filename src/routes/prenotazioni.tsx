import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, Check } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/prenotazioni")({
  head: () => ({
    meta: [
      { title: "Prenotazioni — Sabbia 35 B&B Cefalù" },
      {
        name: "description",
        content:
          "Verifica disponibilità e prenota il tuo soggiorno nel bilocale Sabbia 35 nel centro storico di Cefalù.",
      },
      { property: "og:title", content: "Prenotazioni — Sabbia 35 B&B Cefalù" },
      {
        property: "og:description",
        content: "Verifica disponibilità e prenota il tuo soggiorno a Cefalù.",
      },
    ],
  }),
  component: Prenotazioni,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome").max(80),
  email: z.string().trim().email("Email non valida").max(255),
  ospiti: z.string(),
  note: z.string().trim().max(800, "Massimo 800 caratteri").optional(),
});

function Prenotazioni() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ospiti, setOspiti] = useState("2");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const nights =
    checkIn && checkOut ? Math.max(0, differenceInCalendarDays(checkOut, checkIn)) : 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!checkIn) next.checkIn = "Seleziona il check-in";
    if (!checkOut) next.checkOut = "Seleziona il check-out";
    if (checkIn && checkOut && nights < 1) next.checkOut = "Il check-out deve essere dopo il check-in";

    const result = schema.safeParse({ nome, email, ospiti, note });
    if (!result.success) {
      for (const issue of result.error.issues) next[issue.path[0] as string] = issue.message;
    }

    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="px-6 py-32 text-center max-w-md mx-auto">
          <div className="mx-auto mb-8 grid place-items-center size-16 rounded-full bg-primary text-primary-foreground">
            <Check className="size-7" />
          </div>
          <h1 className="font-display text-3xl mb-4">Richiesta inviata</h1>
          <p className="text-foreground/70 leading-relaxed">
            Grazie {nome.split(" ")[0]}! Abbiamo ricevuto la tua richiesta per{" "}
            {checkIn && checkOut && (
              <span className="text-primary">
                {format(checkIn, "d MMM", { locale: it })} —{" "}
                {format(checkOut, "d MMM yyyy", { locale: it })}
              </span>
            )}
            . Ti risponderemo via email entro 24 ore con la conferma.
          </p>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <header className="px-6 pt-16 pb-10">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
          — Prenotazioni
        </span>
        <h1 className="font-display text-4xl leading-tight mb-3">Riserva il tuo soggiorno</h1>
        <p className="text-foreground/70 text-sm max-w-[46ch]">
          Compila la richiesta: ti confermeremo disponibilità e tariffe per il bilocale Sabbia 35
          nel centro storico di Cefalù.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="px-6 pb-24 space-y-8 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-mono text-[10px] uppercase tracking-widest">Check-in</Label>
            <DateField date={checkIn} onSelect={setCheckIn} />
            {errors.checkIn && <p className="text-xs text-destructive">{errors.checkIn}</p>}
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-[10px] uppercase tracking-widest">Check-out</Label>
            <DateField date={checkOut} onSelect={setCheckOut} fromDate={checkIn} />
            {errors.checkOut && <p className="text-xs text-destructive">{errors.checkOut}</p>}
          </div>
        </div>

        {nights > 0 && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {nights} {nights === 1 ? "notte" : "notti"}
          </p>
        )}

        <div className="space-y-2">
          <Label className="font-mono text-[10px] uppercase tracking-widest">Ospiti</Label>
          <Select value={ospiti} onValueChange={setOspiti}>
            <SelectTrigger className="rounded-none border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 ospite</SelectItem>
              <SelectItem value="2">2 ospiti</SelectItem>
              <SelectItem value="3">3 ospiti</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-[10px] uppercase tracking-widest">Nome e cognome</Label>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Mario Rossi"
            className="rounded-none border-border"
          />
          {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-[10px] uppercase tracking-widest">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mario@esempio.it"
            className="rounded-none border-border"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label className="font-mono text-[10px] uppercase tracking-widest">
            Note (facoltativo)
          </Label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Orario di arrivo, richieste particolari…"
            className="rounded-none border-border min-h-28"
          />
          {errors.note && <p className="text-xs text-destructive">{errors.note}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-transform active:scale-[0.98]"
        >
          Invia richiesta
        </button>
      </form>

      <SiteFooter />
    </div>
  );
}

function DateField({
  date,
  onSelect,
  fromDate,
}: {
  date?: Date;
  onSelect: (d?: Date) => void;
  fromDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal rounded-none border-border",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "d MMM", { locale: it }) : <span>Scegli</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0)) || (fromDate ? d <= fromDate : false)}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}
