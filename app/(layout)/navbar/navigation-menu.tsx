"use client";

import {
  NavigationMenu as NavigationMenuWrapper,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useFavoritesContext } from "@/lib/hooks";
import FeaturedBlogs from "./featured-blogs";
import { useRef, useState } from "react";
import DiametricAccordion from "@/app/(layout)/navbar/diametric-accordion";

export default function NavigationMenu() {
  const pathName = usePathname();
  const { length: favoritesCount } = useFavoritesContext();
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  return (
    <NavigationMenuWrapper>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/"
            legacyBehavior
            passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                "text-primary": pathName === "/",
              })}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(navigationMenuTriggerStyle(), {
              "text-primary":
                pathName === "/baby_kid" ||
                pathName === "/adult_youth" ||
                pathName === "/all" ||
                pathName.includes("product"),
            })}>
            Slippers
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <DiametricAccordion />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(navigationMenuTriggerStyle(), {
              "text-primary": pathName === "/blogs",
            })}>
            Blog
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <FeaturedBlogs isNavbar={true} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/favorites"
            legacyBehavior
            passHref>
            <NavigationMenuLink
              className={cn("group", navigationMenuTriggerStyle(), {
                "text-primary": pathName === "/favorites",
              })}>
              Favorites
              <span className="text-base text-gray-400 inline-block w-8 pl-1 group-hover:text-primary/40">
                {favoritesCount && favoritesCount > 0
                  ? `(${favoritesCount})`
                  : "( )"}
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuIndicator className="text" />
      </NavigationMenuList>
    </NavigationMenuWrapper>
  );
}
