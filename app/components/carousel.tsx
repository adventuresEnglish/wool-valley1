import Link from "next/link";
import CarouselClient from "./carousel-client";
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Product } from "@/lib/types";
import { cn, formatCategory, getProductsData } from "@/lib/utils/utils";
import ArrowRight from "@/components/ui/arrow-right";
import ProductCard from "../(content)/product/product-card";

type CarouselProps = {
  category: string;
  className?: string;
  currentModel?: string;
};

export default async function Carousel({
  category,
  className,
  currentModel,
}: CarouselProps) {
  const bestOf: Product[] = await getProductsData({
    category,
    isCarousel: true,
  });

  return (
    <section className="my-9 space-y-3">
      <BrowseMoreLink
        category={category}
        currentModel={currentModel}
      />
      <div className={cn("p-3 rounded-lg bg-slate-200 shadow-lg", className)}>
        <div
          className={cn("rounded-lg", {
            "border-x border-goldAccent z-50 overflow-hidden":
              category === "all",
          })}>
          <CarouselClient category={category}>
            <CarouselContent>
              {bestOf.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5 m-0 p-0">
                  <ProductCard
                    category={category}
                    product={product}
                    className="ml-4"
                    isCarousel={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {category !== "all" && (
              <div className="">
                <CarouselPrevious className="left-4 text-primary border-primary" />
                <CarouselNext className="right-4 text-primary border-primary" />
              </div>
            )}
          </CarouselClient>
        </div>
      </div>
    </section>
  );
}

function BrowseMoreLink({
  category,
  currentModel,
}: {
  category: string;
  currentModel?: string;
}) {
  return (
    <section className="flex justify-between px-2 300px:px-3 350px:px-4 sm:px-5">
      <div className="text-sm 350px:text-base sm:text-lg font-semibold">
        {category === "all" ? (
          "Our favorites..."
        ) : (
          <>
            More like{" "}
            <span className="text-primary whitespace-nowrap">
              {currentModel}
            </span>
          </>
        )}
      </div>
      <Link
        href={`/${category}`}
        className="text-primary flex items-center transform transition-all duration-200 hover:scale-110 hover:text-center ">
        {category !== "all" ? (
          <div className="flex justify-end items-center flex-wrap text-xs 350px:text-sm sm:text-base pl-11">
            <p className="pr-1">See All </p>
            <div className="flex items-center flex-nowrap">
              <span className="font-semibold">{formatCategory(category)}</span>
              <ArrowRight />
            </div>
          </div>
        ) : (
          <>
            See All <ArrowRight />
          </>
        )}
      </Link>
    </section>
  );
}
