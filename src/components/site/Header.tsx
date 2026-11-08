import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import logo from "@/assets/logo.png";
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
  const [escuro, setEscuro] = useState(false);
  useEffect(() => setEscuro(document.documentElement.classList.contains("dark")), []);
  const alternar = () => {
    const novo = !escuro;
    setEscuro(novo);
    document.documentElement.classList.toggle("dark", novo);
    try { localStorage.setItem("tema", novo ? "escuro" : "claro"); } catch {}
  };
  const temaBtn = (
    <button onClick={alternar} className="rounded-sm p-2 text-muted-foreground hover:text-foreground" aria-label={escuro ? "Mudar para versão clara" : "Mudar para versão escura"}>
      {escuro ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="flex items-center gap-3 leading-tight">
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-sm bg-card p-0.5" />
          <span>
          <span className="block font-serif text-lg font-semibold">{site.nome}</span>
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">{site.subtitulo}</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
          ))}
          {temaBtn}
          <Button asChild><a href="#consulta">Agendar consulta</a></Button>
        </nav>
        <div className="flex items-center gap-1 lg:hidden">{temaBtn}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
        </div>
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
