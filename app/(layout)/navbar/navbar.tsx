"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { dynapuff } from "@/components/ui/fonts";
import NavigationMenu from "./navigation-menu";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";

export default function Navbar() {
  const { cartCount, handleCartClick, shouldDisplayCart } = useShoppingCart();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  let timeoutId: NodeJS.Timeout;
  const hoveredRef = useRef(false);

  const handleMouseEnter = () => {
    hoveredRef.current = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleMouseLeave = () => {
    const previous = scrollY.getPrevious();
    hoveredRef.current = false;
    if (previous !== undefined && previous > 50) {
      timeoutId = setTimeout(() => {
        setHidden(true);
      }, 2200);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 50) {
      setHidden(true);
    } else if (latest > 100) {
      timeoutId = setTimeout(() => {
        if (!hoveredRef.current) setHidden(true);
      }, 2200);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "mb-5 border-b sticky top-0 w-full bg-slate-50 flex flex-wrap items-center justify-between z-[70]",
        {
          "pointer-events-none": shouldDisplayCart,
        }
      )}
      onClick={() => {
        if (shouldDisplayCart) handleCartClick();
      }}>
      <div className="pl-2 300px:px-2 sm:px-6">
        <Link href="/">
          <h1 className="text-xl 350px:text-2xl sm:text-3xl md:text-4xl font-bold ">
            <span className="text-primary">Wool Valley</span>{" "}
            <span className="text-slate-600">Slippers</span>
          </h1>
        </Link>
      </div>

      <div
        className={cn(
          "w-full lg:w-auto border-t lg:border-t-0 order-3 lg:order-2",
          {
            "filter blur-sm": shouldDisplayCart,
          }
        )}>
        <NavigationMenu />
      </div>

      <div className="300px:px-1 sm:px-6 order-2 lg:order-3">
        <Button
          variant="ghost"
          onClick={() => {
            handleCartClick();
          }}
          className="h-12 w-16 350px:h-16 350px:w-20 lg:h-20 lg:w-24 rounded-none relative flex flex-col bg-slate-50">
          <Image
            width={50}
            height={48}
            src="/sheepCart.svg"
            alt="sheep cart"
          />
          <span
            className={`${dynapuff.className} absolute top-[55%] lg:top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/70 sm:text-base md:text-2xl`}>
            {cartCount && cartCount > 0 ? cartCount : ""}
          </span>
          <span className="hidden text-xs font-semibold text-gray-500 lg:block">
            Cart
          </span>
        </Button>
      </div>
    </motion.header>
  );
}
