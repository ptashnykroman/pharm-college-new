"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type ImageLightboxProps = {
  open: boolean;
  close: () => void;
  index: number;
  slides: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  onView: (index: number) => void;
};

export function ImageLightbox({
  open,
  close,
  index,
  slides,
  onView,
}: ImageLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Zoom]}
      labels={{
        Close: "Закрити",
        Next: "Наступне фото",
        Previous: "Попереднє фото",
        "Zoom in": "Збільшити",
        "Zoom out": "Зменшити",
      }}
      carousel={{
        imageFit: "contain",
        padding: "24px",
        spacing: "12%",
      }}
      animation={{
        fade: 250,
        swipe: 350,
        navigation: 350,
        zoom: 250,
      }}
      zoom={{
        maxZoomPixelRatio: 2,
        scrollToZoom: true,
      }}
      on={{
        view: ({ index: currentIndex }) => onView(currentIndex),
      }}
      render={{
        iconPrev: () => <ChevronLeft className="h-8 w-8" />,
        iconNext: () => <ChevronRight className="h-8 w-8" />,
        iconClose: () => <X className="h-8 w-8" />,
      }}
      styles={{
        container: {
          backgroundColor: "rgba(7, 17, 34, 0.94)",
        },
      }}
    />
  );
}
