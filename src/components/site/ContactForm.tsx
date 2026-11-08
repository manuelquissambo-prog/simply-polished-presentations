import { useState } from "react";
import { z } from "zod";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { areas, waLink } from "@/lib/site-data";

const schema = z.object({
  nome: z.string().trim().min(2, "Indique o seu nome.").max(100),
  telefone: z.string().trim().regex(/^\+?[\d\s]{9,16}$/, "Indique um telefone válido (ex.: 923 000 000)."),
  email: z.string().trim().email("Indique um email válido.").max(255),
  area: z.string().min(1, "Escolha a área jurídica."),
  descricao: z.string().trim().min(10, "Descreva brevemente o seu caso.").max(1000, "Máximo de 1000 caracteres."),
  consentimento: z.literal(true, { errorMap: () => ({ message: "É necessário autorizar o tratamento dos dados." }) }),
});

type Erros = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ContactForm() {
  const [erros, setErros] = useState<Erros>({});

  function submeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = schema.safeParse({
      nome: f.get("nome"), telefone: f.get("telefone"), email: f.get("email"),
      area: f.get("area"), descricao: f.get("descricao"), consentimento: f.get("consentimento") === "on",
    });
    if (!r.success) {
      const out: Erros = {};
      r.error.issues.forEach((i) => { out[i.path[0] as keyof Erros] ??= i.message; });
      setErros(out);
      return;
    }
    setErros({});
    const d = r.data;
    const msg = `Bom dia. Gostaria de agendar uma consulta.\n\nNome: ${d.nome}\nTelefone: ${d.telefone}\nEmail: ${d.email}\nÁrea: ${d.area}\n\nCaso: ${d.descricao}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }

  const campo = "mt-1.5";
  const err = (k: keyof Erros) => erros[k] && <p id={`${k}-erro`} className="mt-1 text-sm text-destructive">{erros[k]}</p>;
  const aria = (k: keyof Erros) => ({ "aria-invalid": !!erros[k], "aria-describedby": erros[k] ? `${k}-erro` : undefined });

  return (
    <section id="consulta" className="sona-pattern border-y border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pedido de consulta</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Agende a sua consulta</h2>
          <div className="sona-divider mt-4 w-24" aria-hidden />
          <p className="mt-4 text-muted-foreground">Preencha o formulário. Ao enviar, abrimos o WhatsApp com a sua mensagem já escrita — só precisa de carregar em enviar. Respondemos no próprio dia útil.</p>
          <p className="mt-6 flex gap-2 rounded-sm border border-border bg-card p-4 text-sm">
            <ShieldAlert className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            Não envie documentos confidenciais por este formulário.
          </p>
        </div>
        <form noValidate onSubmit={submeter} className="grid gap-5 rounded-sm border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:col-span-3">
          <div className="sm:col-span-2"><Label htmlFor="nome">Nome completo</Label><Input id="nome" name="nome" autoComplete="name" className={campo} {...aria("nome")} />{err("nome")}</div>
          <div><Label htmlFor="telefone">Telefone</Label><Input id="telefone" name="telefone" type="tel" autoComplete="tel" placeholder="+244 9XX XXX XXX" className={campo} {...aria("telefone")} />{err("telefone")}</div>
          <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" autoComplete="email" className={campo} {...aria("email")} />{err("email")}</div>
          <div className="sm:col-span-2">
            <Label htmlFor="area">Área jurídica</Label>
            <select id="area" name="area" defaultValue="" className={`${campo} flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`} {...aria("area")}>
              <option value="" disabled>Escolha uma opção</option>
              {areas.map((a) => <option key={a.titulo}>{a.titulo}</option>)}
              <option>Outra / não sei</option>
            </select>{err("area")}
          </div>
          <div className="sm:col-span-2"><Label htmlFor="descricao">Descrição breve do caso</Label><Textarea id="descricao" name="descricao" rows={5} maxLength={1000} className={campo} {...aria("descricao")} />{err("descricao")}</div>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" name="consentimento" className="mt-1 h-4 w-4 accent-primary" {...aria("consentimento")} />
              <span>Autorizo o tratamento dos meus dados pessoais apenas para resposta a este pedido, nos termos da Lei n.º 22/11 de Protecção de Dados Pessoais.</span>
            </label>{err("consentimento")}
          </div>
          <Button type="submit" size="lg" className="sm:col-span-2">Enviar pedido pelo WhatsApp</Button>
        </form>
      </div>
    </section>
  );
}
