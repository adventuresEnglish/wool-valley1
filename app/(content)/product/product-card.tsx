import { Card, CardTitle } from "@/components/ui/card";
import { cn, formatCategory } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../../components/favorite-button";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  product: Product;
  className?: string;
  category: string;
  isCarousel?: boolean;
};

export default function ProductCard({
  product,
  className,
  category,
  isCarousel = false,
}: ProductCardProps) {
  return (
    <Card className={cn("border-goldAccent", className)}>
      <div className="relative aspect-[1] overflow-hidden rounded-t-lg border-b border-goldAccent shadow-lg ">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={isCarousel ? product.bestOfImageUrl : product.imageUrl}
            alt={product.alt}
            width={1000}
            height={1000}
            className="scale-100 transform object-bottom hover:opacity-70 transition duration-300 ease-in-out"
          />
        </Link>
        {category === "all" ? (
          <Link href={`/${product.categoryName}`}>
            <Badge
              className="absolute top-2.5 left-2.5 py-1 px-2 text-sm bg-primary/45 border border-goldAccent hover:bg-background transition duration-100 ease-in-out z-10"
              variant={"secondary"}>
              {formatCategory(product.categoryName)}
            </Badge>
          </Link>
        ) : null}

        <FavoriteButton product={product} />
      </div>

      <CardTitle className="p-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        <i>{product.name}</i>
      </CardTitle>
    </Card>
  );
}
