// Dados fictícios — substitua pelos dados reais do escritório.
export const site = {
  nome: "Domingos Kiala & Associados",
  subtitulo: "Sociedade de Advogados",
  morada: "Rua Comandante Gika, n.º 214, 2.º andar, Alvalade, Luanda, Angola",
  telefone: "+244 923 456 789",
  whatsapp: "244923456789", // apenas dígitos, com indicativo 244
  email: "geral@dkadvogados.ao",
  mapa: "https://www.google.com/maps/search/?api=1&query=Alvalade%2C+Luanda%2C+Angola",
  horario: ["Segunda a Sexta: 8h30 às 17h00", "Sábado: apenas com marcação", "Domingo e feriados: encerrado"],
  redes: { linkedin: "#", facebook: "#", instagram: "#" },
};

export const waLink = (texto?: string) =>
  `https://wa.me/${site.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

export const areas = [
  { icon: "Building2", titulo: "Direito Societário e Comercial", texto: "Constituição de empresas, elaboração e revisão de contratos e apoio no licenciamento da actividade." },
  { icon: "Briefcase", titulo: "Direito Laboral", texto: "Contratos de trabalho, processos de despedimento e resolução de conflitos entre empregador e trabalhador." },
  { icon: "Landmark", titulo: "Terras e Imobiliário", texto: "Títulos de concessão de terra, compra e venda, arrendamento e registos predial e de propriedade." },
  { icon: "Users", titulo: "Família e Sucessões", texto: "Divórcio, regulação do poder paternal, partilhas e processos de herança, com discrição e sensibilidade." },
  { icon: "Receipt", titulo: "Direito Fiscal e Aduaneiro", texto: "Cumprimento das obrigações perante a AGT, reclamações e contencioso fiscal e aduaneiro." },
  { icon: "Scale", titulo: "Contencioso e Arbitragem", texto: "Representação em tribunal e condução de processos de arbitragem e outros meios de resolução de litígios." },
] as const;

export const equipa = [
  { nome: "Dr. Joaquim Domingos Kiala", cargo: "Sócio-fundador", area: "Direito Societário e Comercial", cedula: "OAA-1187", foto: "joaquim" },
  { nome: "Dra. Teresa Ngola Baptista", cargo: "Advogada", area: "Família e Sucessões", cedula: "OAA-2452", foto: "teresa" },
  { nome: "Dr. Manuel Capita Sebastião", cargo: "Advogado", area: "Direito Laboral e Contencioso", cedula: "OAA-3069", foto: "manuel" },
];

/** Aberto de seg a sex, 8h30–17h00, hora de Luanda (UTC+1). */
export function estaAberto(agora: Date = new Date()): boolean {
  const luanda = new Date(agora.getTime() + 60 * 60 * 1000); // UTC+1, sem horário de verão
  const dia = luanda.getUTCDay();
  const minutos = luanda.getUTCHours() * 60 + luanda.getUTCMinutes();
  return dia >= 1 && dia <= 5 && minutos >= 8 * 60 + 30 && minutos < 17 * 60;
}
