import { useEffect, useState } from "react";
import { Briefcase, Building2, Landmark, Receipt, Scale, Users, MessageCircle, MapPin, Clock, Phone, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hero from "@/assets/luanda-baia.jpg";
import { areas, equipa, estaAberto, site, waLink } from "@/lib/site-data";

const icons = { Briefcase, Building2, Landmark, Receipt, Scale, Users };

function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
      <div className="sona-divider mt-4 w-24" aria-hidden />
      {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Hero() {
  const [aberto, setAberto] = useState<boolean | null>(null);
  useEffect(() => {
    setAberto(estaAberto());
    const t = setInterval(() => setAberto(estaAberto()), 60000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="inicio" className="relative flex min-h-[88vh] items-end overflow-hidden pt-16">
      <img src={hero} alt="Baía de Luanda e a Marginal ao fim da tarde" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-24 text-primary-foreground animate-fade-up">
        {aberto !== null && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-3 py-1 text-sm">
            <span className={`h-2 w-2 rounded-full ${aberto ? "bg-accent" : "bg-primary"}`} />
            {aberto ? "Atendimento aberto agora" : "Atendimento fechado · deixe a sua mensagem"}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Defendemos os seus direitos com rigor, ética e proximidade.
        </h1>
        <p className="mt-5 max-w-xl text-lg opacity-90">Advocacia em Luanda para particulares e empresas.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#consulta">Agendar consulta</a></Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href={waLink("Bom dia, gostaria de marcar uma consulta.")} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar no WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PracticeAreas() {
  return (
    <section id="areas" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle kicker="Áreas de atuação" title="Apoio jurídico em todas as fases" intro="Acompanhamos particulares, famílias e empresas, em Luanda e nas demais províncias." />
      <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => {
          const Icon = icons[a.icon];
          return (
            <article key={a.titulo} className="bg-card p-7">
              <Icon className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">{a.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function About() {
  const valores = [
    ["Sigilo profissional", "Tudo o que nos confia fica entre nós, nos termos do Estatuto da Ordem dos Advogados de Angola."],
    ["Ética", "Aconselhamos com honestidade, mesmo quando a resposta não é a que o cliente quer ouvir."],
    ["Clareza nos honorários", "Valores acordados por escrito, em Kwanzas, antes de começarmos."],
    ["Respeito pelo cliente", "Explicamos cada passo numa linguagem simples e respondemos com prontidão."],
  ];
  return (
    <section id="sobre" className="sona-pattern border-y border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="Sobre nós" title="Um escritório angolano, perto de quem precisa" />
          <p className="text-muted-foreground">
            Fundada em Alvalade pelo Dr. Joaquim Domingos Kiala, a nossa sociedade nasceu da vontade de oferecer uma advocacia séria e acessível, que conhece bem a realidade de Luanda — dos cartórios e conservatórias aos tribunais e à AGT.
          </p>
          <p className="mt-4 text-muted-foreground">
            Hoje acompanhamos empresários, trabalhadores e famílias com a mesma dedicação, sempre com a porta aberta para uma conversa franca.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {valores.map(([t, d]) => (
            <div key={t} className="rounded-sm border border-border bg-card p-6 shadow-soft">
              <dt className="font-serif text-lg font-semibold">{t}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Process() {
  const passos = [
    ["Primeiro contacto", "Fala connosco por telefone, WhatsApp ou formulário e marcamos uma consulta."],
    ["Análise do caso", "Ouvimos a sua situação, analisamos os documentos e explicamos as opções possíveis."],
    ["Proposta de honorários e estratégia", "Apresentamos por escrito o plano de trabalho e os honorários, antes de avançar."],
    ["Acompanhamento do processo", "Mantemo-lo informado de cada passo até à conclusão do assunto."],
  ];
  return (
    <section id="como-trabalhamos" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle kicker="Como trabalhamos" title="Quatro passos, sem surpresas" />
      <ol className="grid gap-8 md:grid-cols-4">
        {passos.map(([t, d], i) => (
          <li key={t} className="border-t-2 border-primary pt-5">
            <span className="font-serif text-3xl text-accent">0{i + 1}</span>
            <h3 className="mt-2 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Team() {
  return (
    <section id="equipa" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Equipa</p>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Quem o vai acompanhar</h2>
        <div className="sona-divider mt-4 mb-10 w-24" aria-hidden />
        <div className="grid gap-6 md:grid-cols-3">
          {equipa.map((p) => (
            <article key={p.nome} className="border border-secondary-foreground/15 p-6">
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary-foreground/5" role="img" aria-label={`Fotografia de ${p.nome} (a colocar)`}>
                <UserRound className="h-16 w-16 opacity-30" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{p.nome}</h3>
              <p className="text-sm text-accent">{p.cargo} · {p.area}</p>
              <p className="mt-2 text-xs opacity-70">Cédula profissional n.º {p.cedula}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faq = [
    ["Como é a primeira consulta?", "É uma reunião, presencial no nosso escritório em Alvalade ou por videochamada, em que ouvimos a sua situação, esclarecemos dúvidas e indicamos os caminhos possíveis. O valor da consulta é informado no momento da marcação."],
    ["Como são cobrados os honorários?", "Os honorários são acordados antes de começarmos, por escrito e em Kwanzas. Dependendo do caso, podem ser fixos, por hora ou por fase do processo."],
    ["Que formas de pagamento aceitam?", "Aceitamos transferência bancária e pagamento por Multicaixa Express. Emitimos sempre factura."],
    ["Que documentos devo levar?", "Traga o seu Bilhete de Identidade (BI), o NIF e todos os documentos relacionados com o caso: contratos, cartas, notificações ou decisões."],
    ["A minha conversa é confidencial?", "Sim. Tudo o que nos contar está protegido pelo sigilo profissional do advogado, mesmo que não chegue a contratar os nossos serviços."],
    ["Quanto tempo demora um processo?", "Depende da natureza do caso e do funcionamento dos tribunais e serviços públicos. Não garantimos prazos, mas damos-lhe sempre uma estimativa realista e informamos de qualquer atraso."],
  ];
  return (
    <section id="duvidas" className="mx-auto max-w-3xl px-4 py-20">
      <SectionTitle kicker="Perguntas frequentes" title="Dúvidas comuns" />
      <Accordion type="single" collapsible>
        {faq.map(([q, a]) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contactos" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle kicker="Contactos" title="Visite-nos em Alvalade" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Info icon={MapPin} title="Morada">{site.morada}</Info>
        <Info icon={Clock} title="Horário (hora de Luanda)">{site.horario.map((h) => <span key={h} className="block">{h}</span>)}</Info>
        <Info icon={Phone} title="Telefone / WhatsApp"><a className="underline-offset-4 hover:underline" href={`tel:${site.telefone.replace(/\s/g, "")}`}>{site.telefone}</a></Info>
        <Info icon={Mail} title="Email"><a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></Info>
      </div>
      <Button asChild variant="outline" className="mt-8"><a href={site.mapa} target="_blank" rel="noopener noreferrer"><MapPin /> Abrir no Google Maps</a></Button>
    </section>
  );
}

function Info({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-primary" aria-hidden />
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold">{site.nome}</p>
          <p className="text-sm opacity-70">{site.subtitulo} · Luanda, Angola</p>
        </div>
        <nav aria-label="Links rápidos" className="flex flex-col gap-1 text-sm opacity-80">
          <a href="#areas">Áreas de atuação</a><a href="#sobre">Sobre</a><a href="#consulta">Agendar consulta</a><a href="#contactos">Contactos</a>
        </nav>
        <div className="flex gap-4 text-sm opacity-80">
          <a href={site.redes.linkedin}>LinkedIn</a><a href={site.redes.facebook}>Facebook</a><a href={site.redes.instagram}>Instagram</a>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/15">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs opacity-70">
          <p>Aviso legal: a informação neste site é geral e não substitui aconselhamento jurídico.</p>
          <p>
            <a href="#privacidade" className="underline">Política de privacidade</a> · © {ano} {site.nome}. Todos os direitos reservados.
          </p>
          <p id="privacidade">Os dados enviados pelo formulário servem apenas para responder ao seu pedido de consulta e não são partilhados com terceiros.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={waLink("Bom dia, gostaria de marcar uma consulta.")} target="_blank" rel="noopener noreferrer" aria-label="Falar connosco no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
