import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PageMain } from "@/components/PageMain";
import { WhatsAppPicker } from "@/components/WhatsAppPicker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} | Agencia de marketing en Mercedes y Fray Bentos`,
    template: `%s | ${site.nombre}`,
  },
  description: site.descripcion,
  openGraph: {
    siteName: site.nombre,
    locale: "es_UY",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <WhatsAppPicker>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-carbon focus:px-4 focus:py-2 focus:text-crema"
          >
            Saltar al contenido
          </a>
          <Header />
          <PageMain>{children}</PageMain>
          <Footer />
          <WhatsAppFloat />
        </WhatsAppPicker>
      </body>
    </html>
  );
}
