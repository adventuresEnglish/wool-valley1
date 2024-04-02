import { Post, Product } from "../../../lib/types";
import React from "react";
import { Metadata } from "next";
import ProductCard from "../product/product-card";
import { cn, formatCategory } from "@/lib/utils";
import PostCard from "../blog/post-card";
import Link from "next/link";

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
  return (
    <div className="bg-white mb-5 min-h-[80vh] lg:min-h-[90vh]">
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
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
              {(data as Post[]).map((post: Post) => (
                <div key={post.title}>
                  <PostCard post={post}>
                    <Link href={`/blog/${post.slug}`}>
                      <h1 className="text-xl 300px:text-2xl 350px:text-3xl font-bold px-2 350px:pl-4 hover:text-primary transition duration-100 ease-in-out">
                        {post.title}
                      </h1>
                    </Link>
                  </PostCard>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
