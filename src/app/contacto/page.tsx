import { CtaBanner } from "@/components/CtaBanner";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Contanos qué necesitás y escribinos por WhatsApp.",
  path: "/contacto",
});

// La página es solo el formulario (que arma el mensaje y abre WhatsApp con la ciudad elegida)
export default function ContactoPage() {
  return (
    <CtaBanner
      as="h1"
      title="Contanos qué necesitás"
      subtitle="Completá el formulario y se abre WhatsApp con tu mensaje listo para enviar."
      image="/images/hero/hero-3.jpg"
      variant="crema"
      trazo={{ variant: "lazo", position: "bottom-left" }}
    />
  );
}
