import { Badge } from "@/components/ui/badge";
import {
  adult_youthDropdownlinks,
  baby_kidDropdownlinks,
} from "@/lib/constants";
import { useDiametricgAccordionSlider } from "@/lib/hooks";
import { capitalize, cn } from "@/lib/utils";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DiametricAccordion = () => {
  const { top, bottom, handleTopClick, handleBottomClick } =
    useDiametricgAccordionSlider({
      top: { isOpen: false, zIndex: 10, sliderZIndex: 0 },
      bottom: { isOpen: false, zIndex: 10, sliderZIndex: 0 },
    });

  return (
    <section className="relative flex flex-col w-[260px] 350px:w-[320px] sm:w-[400px] overflow-hidden bg-popover">
      <button
        onClick={handleTopClick}
        className={cn(
          "relative group grid grid-cols-3 gap-4 items-center px-4 pt-4 pb-2 transition-all bg-popover",
          {
            [`z-${top.zIndex}`]: true,
          }
        )}>
        <div className="text-start">
          <h1 className="font-medium leading-none text-gray-600 transition duration-100 group-hover:text-primary">
            Adult/Youth
          </h1>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Ages 7 <span className="whitespace-nowrap">and up</span>
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm group-hover:text-primary">
            styles
          </p>
          <span className="flex justify-center text-goldAccent">
            <ChevronDown
              className={`h-4 w-4 shrink-0 transform transition-transform duration-200 ${
                top.isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-goldAccent ">
          <Image
            src="https://cdn.sanity.io/images/c8kajeh8/slippers/0458afa4362ab0e4b20ed6f31cdb84ce71790bf1-1000x1000.jpg"
            alt="See All Adult/Youth Slippers"
            width={120}
            height={120}
            className="object-center transform group-hover:opacity-70 transition duration-300 ease-in-out"
          />
        </div>
      </button>
      <div
        className={cn("absolute h-1/2 w-full px-4 pt-2 pb-4  bg-popover", {
          [`z-${top.sliderZIndex}`]: true,
          "top-slider-down -top-1/2": top.isOpen,
          "top-slider-up top-1/2": !top.isOpen,
        })}>
        {" "}
        <AccordionContent links={adult_youthDropdownlinks} />
      </div>
      <button
        onClick={handleBottomClick}
        className={cn(
          "relative group grid grid-cols-3 gap-4 items-center px-4 pt-2 pb-4 transition-all bg-popover",
          {
            [`z-${bottom.zIndex}`]: true,
          }
        )}>
        <div className="text-start">
          <h1 className="font-medium leading-none text-gray-600 transition duration-100 group-hover:text-primary">
            Baby/Kid
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">Ages 0-6</p>
        </div>
        <div>
          <span className="flex justify-center text-goldAccent">
            <ChevronUp
              className={`h-4 w-4 shrink-0 transform transition-transform duration-200 ${
                bottom.isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
          <p className="text-muted-foreground text-sm group-hover:text-primary">
            styles
          </p>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-goldAccent">
          <Image
            src="https://cdn.sanity.io/images/c8kajeh8/slippers/f574b43d9e2639f01629095bcb50a369adc0c6b7-1000x1000.jpg"
            alt="See All Baby/Kid Slippers"
            width={120}
            height={120}
            className="object-center transform group-hover:opacity-70 transition duration-300 ease-in-out"
          />
        </div>
      </button>

      <div
        className={cn(`absolute h-1/2 w-full px-4 pt-4 pb-2 bg-popover`, {
          [`z-${bottom.sliderZIndex}`]: true,
          "bottom-slider-up top-full": bottom.isOpen,
          "bottom-slider-down top-0%": !bottom.isOpen,
        })}>
        <AccordionContent links={baby_kidDropdownlinks} />
      </div>
    </section>
  );
};

type DropdownLinkProps = {
  links: {
    style: string;
    image: string;
    alt: string;
    category: string;
  }[];
};

function AccordionContent({ links }: DropdownLinkProps) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {links.map((link) => (
        <li key={link.style}>
          <Link
            legacyBehavior
            passHref
            href={`/${link.category}/${link.style}`}>
            <NavigationMenuLink className=" text-gray-600 transition duration-100 hover:text-primary border-b">
              <div className="relative flex flex-col items-center group">
                <Badge
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 px-2 text-sm bg-primary/45 z-10 border border-goldAccent group-hover:bg-background transition duration-100 ease-in-out"
                  variant={"secondary"}>
                  {capitalize(link.style)}
                </Badge>
                <div className="relative overflow-hidden rounded-lg border border-goldAccent ">
                  <Image
                    src={link.image}
                    alt={link.alt}
                    width={120}
                    height={120}
                    className="object-center transform  group-hover:opacity-70 transition duration-300 ease-in-out"
                  />
                </div>
              </div>
            </NavigationMenuLink>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default DiametricAccordion;
