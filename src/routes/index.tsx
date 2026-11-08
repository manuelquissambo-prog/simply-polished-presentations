import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";
import { About, Contact, Faq, Footer, Hero, PracticeAreas, Process, Team, WhatsAppFab } from "@/components/site/Sections";

const title = "Domingos Kiala & Associados | Advogados em Luanda";
const description = "Sociedade de advogados em Alvalade, Luanda. Direito societário, laboral, terras, família, fiscal e contencioso. Agende a sua consulta.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Process />
        <Team />
        <Faq />
        <ContactForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
