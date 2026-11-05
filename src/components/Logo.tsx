import Image from "next/image";
import Link from "next/link";

/** Logo "Luprey." (placeholder en /public/logo.svg). variant="claro" para fondos oscuros. */
export function Logo({ variant = "oscuro" }: { variant?: "oscuro" | "claro" }) {
  return (
    <Link href="/" className="inline-block">
      <Image
        src={variant === "claro" ? "/logo-claro.svg" : "/logo.svg"}
        alt="Luprey, ir al inicio"
        width={140}
        height={36}
        priority
      />
    </Link>
  );
}
