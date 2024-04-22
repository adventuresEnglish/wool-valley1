import { Post, Product } from "../../../lib/types";
import React from "react";
import { Metadata } from "next";
import ProductCard from "../product/product-card";
import { cn, formatCategory } from "@/lib/utils/utils";
import PostCard from "../blog/post-card";
import PaginationControls from "./pagination-controls";

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
        <div className="mx-auto max-w-2xl px-4 sm:px-24 lg:max-w-7xl lg:px-8">
          {category !== "blogs" ? (
            <DisplaySlippers
              data={data as Product[]}
              category={category}
              currentStyle={currentStyle}></DisplaySlippers>
          ) : (
            <DisplayBlogs data={data as Post[]} />
          )}
          <div className="h-10">
            {catCount > Number(per_page) && (
              <PaginationControls
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                category={category}
                currentStyle={currentStyle}
                per_page={per_page}
                catCount={catCount}
              />
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
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {currentStyle
          ? `${formatCategory(currentStyle)} Slippers`
          : "All Slippers"}
      </h2>
      <span className="text-muted-foreground text-lg">
        {formatCategory(category)}
      </span>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 lg:min-h-[540px] xl:min-h-[628px] pb-6 xl:pb-8">
        {(data as Product[]).map((product: Product) => (
          <ul key={product._id}>
            <ProductCard
              product={product}
              category={category}></ProductCard>
          </ul>
        ))}
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
