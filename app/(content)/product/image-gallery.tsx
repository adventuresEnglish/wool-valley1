"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { urlFor } from "../../lib/sanity";
import { Product } from "../../../lib/types";
import { useMouseOverZoom, useWindowResizeListener } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  children: React.ReactNode;
  images: Product["images"];
  alt: string;
};

export default function ImageGallery({
  children,
  images,
  alt,
}: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState<{ image: any; key: string }>({
    image: images[0],
    key: images[0]._key,
  });
  const mainImage = urlFor(bigImage.image).url();
  const [eventX, setEventX] = useState(0);
  const [tooltipContainer, setTooltipContainer] = useState<HTMLElement | null>(
    null
  );
  const [showPlusCursor, setShowPlusCursor] = useState(true);
  const windowWidth = useWindowResizeListener();

  const source = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLCanvasElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useMouseOverZoom(source, target, cursor, tooltipContainer);

  useEffect(() => {
    setTooltipContainer(document.getElementById("tooltip-container"));
  }, []);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-6">
        {images.length > 1 ? (
          <div className="order-last flex gap-4 lg:order-none lg:flex-col lg:col-span-2">
            {images
              .filter((image: any) => image._key !== bigImage.key)
              .map((image: any) => (
                <div
                  key={image._key}
                  className="relative aspect-[1] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={urlFor(image).url()}
                    alt={alt}
                    width={200}
                    height={200}
                    className=" object-contain object-center cursor-pointer"
                    onClick={() => setBigImage({ image, key: image._key })}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="order-last lg:order-none" />
        )}
        <div
          className={cn(
            "relative aspect-[1] overflow-hidden rounded-lg bg-gray-100 lg:col-span-4",
            {
              "lg:col-span-4": images.length === 1,
            }
          )}>
          <Image
            width={1000}
            height={1000}
            quality={100}
            ref={source}
            src={mainImage}
            alt={alt}
            className="w-full h-full scale-[1.3] object-center bg-gray-100"
            style={{
              cursor: showPlusCursor
                ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(219,199,138)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>\') 12 12, auto'
                : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(219,199,138)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>\') 12 12, auto',
            }}
            onMouseEnter={(e) => {
              setEventX(e.clientX);
            }}
            onMouseMove={(e) => {
              setEventX(e.clientX);
            }}
            onMouseLeave={() => setShowPlusCursor(true)}
            onTouchStart={(e) => {
              setEventX(e.touches[0].clientX);
              setShowPlusCursor(false);
            }}
            onTouchMove={(e) => {
              setEventX(e.touches[0].clientX);
            }}
            onTouchEnd={() => setShowPlusCursor(true)}
            onClick={(e) => {
              setShowPlusCursor((prev) => !prev);
            }}
          />
          {children}
        </div>
      </div>
      {tooltipContainer &&
        createPortal(
          <canvas
            ref={target}
            className={cn(
              "hidden border border-primary rounded-lg fixed md:w-[345px] md:h-[345px] md:right-1/2 top-[124px] 350px:top-[139px] md:top-[145px] lg:top-28",
              {
                block: !showPlusCursor,
                "left-5": windowWidth < 768,
              }
            )}
            style={{
              width: windowWidth < 768 ? `${windowWidth / 2 - 29}px` : "",
              height: windowWidth < 768 ? `${windowWidth / 2 - 29}px` : "",
              transform: `translateX(calc(${
                windowWidth < 768 && eventX > windowWidth / 2 ? "0%" : "100%"
              } + ${windowWidth < 768 ? "0px" : "16px"}))`,
            }}
          />,
          tooltipContainer
        )}
    </>
  );
}