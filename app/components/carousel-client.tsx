"use client";

import { Carousel } from "@/components/ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";

export default function CarouselClient({
  children,
  category,
}: {
  children: React.ReactNode;
  category: string;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={
        category === "all"
          ? [
              Autoscroll({
                speed: 2,
                startDelay: 100,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                direction: "backward",
              }),
            ]
          : []
      }>
      {children}
    </Carousel>
  );
}
