import { Post, Product } from "../../../lib/types";
import React from "react";
import { Metadata } from "next";
import ProductCard from "../product/product-card";
import { cn, formatCategory } from "@/lib/utils/utils";
import PostCard from "../blog/post-card";
import PaginationControls from "./pagination-controls";
import PaginationContextProvider from "@/app/contexts/pagination-context";

export const metadata: Metadata = {
  title: "Wool Valley Slippers",
  description: "Shop for handmade wool slippers.",
};

type DisplayCategoryProps = {
  currentStyle?: string;
  data: Product[] | Post[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  category: string;
  per_page: string | string[];
  catCount: number;
  children?: React.ReactNode;
};

export default function DisplayCategory({
  currentStyle,
  data,
  hasNextPage,
  hasPrevPage,
  category,
  per_page,
  catCount,
  children,
}: DisplayCategoryProps) {
  return (
    <>
      <section className="bg-white mb-32 min-h-[80vh] lg:min-h-[90vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-24 lg:max-w-6xl 2xl:max-w-[1350px] lg:px-8">
          {category !== "blogs" ? (
            <DisplaySlippers
              data={data as Product[]}
              category={category}
              currentStyle={currentStyle}
            />
          ) : (
            <DisplayBlogs data={data as Post[]} />
          )}
          <div className="h-10">
            {catCount > Number(per_page) && (
              <PaginationContextProvider>
                <PaginationControls
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  category={category}
                  currentStyle={currentStyle}
                  per_page={per_page}
                  catCount={catCount}
                />
              </PaginationContextProvider>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function DisplaySlippers({
  category,
  currentStyle,
  data,
  children,
}: {
  category: string;
  currentStyle?: string;
  data: Product[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <header className="flex flex-col 350px:flex-row 350px:justify-between mx-4 sm:mx-6 lg:mx-8 2xl:mx-12 items-center 2xl:mb-1">
        <h2 className="text-xl 350px:text-2xl 2xl:text-3xl font-bold text-slate-800 tracking-tight">
          {currentStyle
            ? `${formatCategory(currentStyle)} Slippers`
            : "All Slippers"}
        </h2>
        <span className="text-muted-foreground text-base 350px:text-lg 2xl:text-xl">
          {formatCategory(category)}
        </span>
      </header>
      <div className="mt-1 flex flex-wrap justify-center mb-3 2xl:mb-4">
        {data.flatMap((product, i) => {
          const items = [
            <ul
              key={product._id}
              className="m-3 w-full sm:w-[44%] md:w-[29%] lg:w-[17.2%] 2xl:w-[22%]">
              <ProductCard
                product={product}
                category={category}
              />
            </ul>,
          ];

          if (i === 4 || i === 7) {
            items.unshift(
              <div
                key={`empty-${i}`}
                className="invisible 2xl:visible 2xl:w-[11%]"></div>
            );
          }

          return items;
        })}
      </div>
    </>
  );
}

function DisplayBlogs({ data }: { data: Post[] }) {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Blogs</h2>
      <span className="text-muted-foreground text-lg">All Blogs</span>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-x-8 pb-6 xl:pb-8">
        {(data as Post[]).map((post: Post) => (
          <div key={post.title}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

//lg:min-h-[540px] xl:min-h-[628px]

{
  /* <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-2 mb-4">
              {(data as Product[]).map((product: Product) => (
                <ul key={product._id}>
                  <ProductCard
                    product={product}
                    category={category}
                  />
                </ul>
              ))}
            </div> */
}
