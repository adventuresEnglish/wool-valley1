import { Metadata } from "next";
import AddToBag from "@/app/(content)/product/add-to-bag";
import CheckoutNow from "@/app/(content)/product/checkout-now";
import ImageGallery from "@/app/(content)/product/image-gallery";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { formatCategory, formatCurrency, getProductData } from "@/lib/utils";
import FavoriteButton from "@/app/components/favorite-button";
import SelectSize from "@/app/(content)/product/select-size";
import DisplaySize from "@/app/(content)/product/display-size";
import Carousel from "@/app/components/carousel";

export const dynamic = "force-dynamic";
type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await getProductData(params.slug);
  return {
    title: product.name,
    description: product.description,
    // metadataBase: new URL("localhost:3000"),
    // openGraph: {
    //   images: product.imageUrl,
    // },
  };
}

export default async function ProductPage({ params }: Props) {
  const product: Product = await getProductData(params.slug);

  return (
    <div className="bg-white mb-5 min-h-[100vh]">
      <div className="mx-auto max-w-screen-xl px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery
            images={product.images}
            alt={product.alt}>
            <FavoriteButton product={product} />
          </ImageGallery>

          <div className="pb-4 mb-2 md:mb-3 max-w-[400px]">
            <span className="mb-0.5 inline-block text-gray-500">
              {formatCategory(product.categoryName)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 lg:text-3xl">
              {product.name} <DisplaySize />
            </h2>
            {/* <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className=" rounded-e-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div> */}

            <div className="flex justify-between items-start 350px:items-center">
              <div className="flex flex-wrap gap-2 pr-3">
                <span className="text-xl font-semibold text-gray-800 md:text-2xl">
                  {formatCurrency(product.price)}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  {formatCurrency(product.price + 30)}
                </span>
              </div>
              <SelectSize category={product.categoryName} />
            </div>
            <span className="text-sm text-gray-500">
              Incl. vat and shipping
            </span>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                description={product.description}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                _id={product._id}
                slug={product.slug}
                categoryName={product.categoryName}
              />
              <CheckoutNow
                description={product.description}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                _id={product._id}
                slug={product.slug}
                categoryName={product.categoryName}
              />
            </div>

            <p className="mt-12 text-base text-gray-600 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
        <Carousel
          category={product.categoryName}
          className="mb-9"
          currentModel={product.name}
        />
      </div>
    </div>
  );
}
