import Image from "next/image";
import type { Imagen } from "@/content/casos";

export function ImageGallery({ imagenes }: { imagenes: Imagen[] }) {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2">
      {imagenes.map((img, i) => (
        <li key={`${img.src}-${i}`} className={i === 0 ? "sm:col-span-2" : undefined}>
          <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? "(min-width: 1152px) 1088px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
