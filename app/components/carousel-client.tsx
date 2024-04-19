"use client";

import { Carousel } from "@/components/ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";

export default function CarouselClient({
  children,
  category,
  className,
}: {
  children: React.ReactNode;
  category: string;
  className?: string;
}) {
  return (
    <Carousel
      className={className}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={
        category === "all"
          ? [
              Autoscroll({
                speed: 1.5,
                startDelay: 100,
                //stopOnInteraction: false,
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
