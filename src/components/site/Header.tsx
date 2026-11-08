import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

const links = [
  ["#areas", "Áreas"],
  ["#sobre", "Sobre"],
  ["#como-trabalhamos", "Como trabalhamos"],
  ["#duvidas", "Dúvidas"],
  ["#contactos", "Contactos"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="leading-tight">
          <span className="block font-serif text-lg font-semibold">{site.nome}</span>
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">{site.subtitulo}</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
          ))}
          <Button asChild><a href="#consulta">Agendar consulta</a></Button>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden" aria-label="Menu móvel">
          {links.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2 text-base">{l}</a>
          ))}
          <Button asChild className="mt-3 w-full"><a href="#consulta" onClick={() => setOpen(false)}>Agendar consulta</a></Button>
        </nav>
      )}
    </header>
  );
}
