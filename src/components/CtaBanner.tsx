import { whatsappUrl } from "@/content/site";
import { Button } from "./Button";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

type Props = {
  id: string;
  tone?: "crema" | "carbon";
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function CtaBanner({
  id,
  tone = "crema",
  title = "No es solo lo que hacemos. Es cómo lo hacemos.",
  text = "Si a nuestros clientes les va bien, a nosotros también.",
  buttonLabel = "Hablemos por WhatsApp",
}: Props) {
  return (
    <Section tone={tone} labelledBy={id}>
      <SectionHeading id={id} title={title} intro={text} />
      <div className="mt-10">
        <Button href={whatsappUrl()} external>
          {buttonLabel}
        </Button>
      </div>
    </Section>
  );
}
