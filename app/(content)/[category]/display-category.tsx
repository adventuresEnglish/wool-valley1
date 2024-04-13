import { Post, Product } from "../../../lib/types";
import React from "react";
import { Metadata } from "next";
import ProductCard from "../product/product-card";
import { formatCategory } from "@/lib/utils";
import PostCard from "../blog/post-card";

export const metadata: Metadata = {
  title: "Wool Valley Slippers",
  description: "Shop for handmade wool slippers.",
};

type DisplayCategoryProps = {
  currentCategory: string;
  currentStyle?: string;
  data: Product[] | Post[];
};

export default function DisplayCategory({
  currentCategory,
  currentStyle,
  data,
}: DisplayCategoryProps) {
  console.log("DisplayCategory", data);
  return (
    <div className="bg-white mb-10 min-h-[80vh] lg:min-h-[90vh]">
      <div className="mx-auto max-w-2xl px-4 sm:px-24 lg:max-w-7xl lg:px-8">
        {currentCategory !== "blogs" ? (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {currentStyle
                ? `${formatCategory(currentStyle)} Slippers`
                : "All Slippers"}
            </h2>
            <span className="text-muted-foreground text-lg">
              {formatCategory(currentCategory)}
            </span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
              {(data as Product[]).map((product: Product) => (
                <ul key={product._id}>
                  <ProductCard
                    product={product}
                    category={currentCategory}
                  />
                </ul>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Blogs
            </h2>
            <span className="text-muted-foreground text-lg">All Blogs</span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-x-8">
              {(data as Post[]).map((post: Post) => (
                <div key={post.title}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
