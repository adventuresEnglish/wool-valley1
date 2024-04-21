"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { urlFor } from "../../lib/sanity";
import { Product } from "../../../lib/types";
import {
  useBlurNavContext,
  useMouseOverZoom,
  useWindowResizeListener,
} from "@/lib/hooks";
import { cn, getCanvasSide, isMobileOrTablet } from "@/lib/utils/utils";
import FavoriteButton from "@/app/components/favorite-button";
import { useShoppingCart } from "use-shopping-cart";

type ImageGalleryProps = {
  product: Product;
};

export default function ImageGallery({ product }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState<{ image: any; key: string }>({
    image: product.images[0],
    key: product.images[0]._key,
  });

  const isMobOrTab = isMobileOrTablet();
  const [eventX, setEventX] = useState(0);
  const [tooltipContainer, setTooltipContainer] = useState<HTMLElement | null>(
    null
  );
  const [showPlusCursor, setShowPlusCursor] = useState(true);
  let windowWidth = useWindowResizeListener();
  windowWidth = windowWidth || 0;
  const { canvasSide, smallScreen } = getCanvasSide(windowWidth);

  const source = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLCanvasElement>(null);

  useMouseOverZoom(source, target, tooltipContainer, windowWidth);

  useEffect(() => {
    !isMobOrTab &&
      setTooltipContainer(document.getElementById("tooltip-container"));
  }, [isMobOrTab]);

  const { blurNav, setBlurNav } = useBlurNavContext();
  const { handleCartClick } = useShoppingCart();

  return (
    <>
      <div
        className={cn("grid gap-4 lg:grid-cols-6 z-[60]", {
          "pointer-events-none": blurNav,
        })}
        onClick={() => {
          if (blurNav) {
            setBlurNav(false);
            handleCartClick();
          }
        }}>
        {product.images.length > 1 ? (
          <div className="order-last flex gap-4 lg:order-none lg:flex-col lg:col-span-2">
            {product.images
              .filter((image: any) => image._key !== bigImage.key)
              .map((image: any) => (
                <div
                  key={image._key}
                  className="relative aspect-[1] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={urlFor(image).url()}
                    alt={product.alt}
                    width={500}
                    height={500}
                    quality={100}
                    className=" scale-[1] object-center cursor-pointer"
                    onClick={() => setBigImage({ image, key: image._key })}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="order-last lg:order-none" />
        )}
        <div className="relative aspect-[1] overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
          <Image
            width={1000}
            height={1000}
            quality={100}
            ref={source}
            src={urlFor(bigImage.image).url()}
            alt={product.alt}
            className={cn("w-full h-full scale-100 object-center bg-gray-100", {
              "scale-110": isMobOrTab,
            })}
            style={{
              cursor:
                showPlusCursor && !blurNav
                  ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(219,199,138)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>\') 12 12, auto'
                  : !showPlusCursor && !blurNav
                  ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(219,199,138)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>\') 12 12, auto'
                  : "auto",
            }}
            onClick={(e) => {
              setShowPlusCursor((prev) => !prev);
            }}
            onMouseEnter={(e) => {
              setEventX(e.clientX);
            }}
            onMouseMove={(e) => {
              setEventX(e.clientX);
            }}
            onMouseLeave={(e) => {
              setShowPlusCursor(true);
            }}
          />
          <FavoriteButton product={product} />
        </div>
      </div>
      {tooltipContainer &&
        !blurNav &&
        createPortal(
          <canvas
            ref={target}
            className="border border-primary rounded-lg fixed md:right-1/2 top-[124px] 350px:top-[138px] lg:top-28 left-5 md:left-auto"
            style={{
              display: showPlusCursor ? "none" : "block",
              width: canvasSide,
              height: canvasSide,
              transform: `translateX(calc(${
                smallScreen && eventX > windowWidth / 2 ? "0%" : "200%"
              } + ${smallScreen ? "0px" : "16px - 100%"}))`,
            }}
          />,
          tooltipContainer
        )}
    </>
  );
}
