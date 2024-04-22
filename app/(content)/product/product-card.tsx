import { Card, CardTitle } from "@/components/ui/card";
import { cn, formatCategory } from "@/lib/utils/utils";
import Link from "next/link";
import FavoriteButton from "../../components/favorite-button";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

type ProductCardProps = {
  product: Product;
  className?: string;
  category: string;
  children?: React.ReactNode;
  isCarousel?: boolean;
};

export default function ProductCard({
  product,
  className,
  category,
  children,
  isCarousel = false,
}: ProductCardProps) {
  return (
    <Card className={cn("border-goldAccent", className)}>
      <div className="relative overflow-hidden rounded-t-lg border-b border-goldAccent shadow-lg lg:max-h-[200px] xl:max-h-[240px]">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.imageUrl}
            alt={product.alt}
            width={1000}
            height={1000}
            className={cn(
              "transform lg:-translate-y-0 xl:-translate-y-0 hover:opacity-70 transition duration-300 ease-in-out bg-gray-100",
              {
                "lg:-translate-y-0 xl:-translate-y-0": isCarousel,
              }
            )}
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
