"use client";

import { useState, type ReactNode } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";

export default function ImageGallery({
  images,
  children,
}: {
  images: LightboxImage[];
  children: (open: (index: number) => void) => ReactNode;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  return (
    <>
      {children((i) => setOpenAt(i))}
      {openAt !== null && (
        <Lightbox
          images={images}
          index={openAt}
          onClose={() => setOpenAt(null)}
        />
      )}
    </>
  );
}
