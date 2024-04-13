import Link from "next/link";
import { Post } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export default function PostCard({
  post,
  clientLink,
  className,
  isNavbar = false,
}: {
  post: Post;
  className?: string;
  isNavbar?: boolean;
  clientLink?: React.ReactNode;
}) {
  return (
    <Card className="border border-goldAccent relative flex flex-col">
      <div className="flex justify-between z-10 border-b border-goldAccent">
        <div className=" flex justify-start items-center">
          {!clientLink ? (
            <Link href={`/blog/${post.slug}`}>
              <h1 className="text-xl 300px:text-2xl 350px:text-3xl font-bold px-2 350px:pl-4 hover:text-primary transition duration-100 ease-in-out">
                {post.title}
              </h1>
            </Link>
          ) : (
            clientLink
          )}
        </div>
        <div className="bg-primary/50  px-2 py-1.5 rounded-tr-md flex flex-col items-center whitespace-nowrap border-l border-goldAccent">
          <div className="flex space-x-2 inlnie-flex items-center text-goldAccent">
            <span className="text-slate-800">{post.author}</span>
            <PencilIcon size={18} />
          </div>
          <div className=" text-slate-600 text-sm">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="aspect-[1] items-center justify-center pt-1">
            <Image
              src={post.authorImageUrl}
              alt="Profile"
              width={50}
              height={50}
              quality={100}
              className=" rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <details className="absolute top-[88px] left-2 350px:left-4 z-30">
        <summary className="text-primary/60 hover:text-primary/80 hover:scale-105 transition duration-100 ease-in-out cursor-pointer text-sm 350px:text-base">
          Overview
        </summary>
        <p
          className={cn(
            "absolute line-clamp-6 text-start p-1 text-slate-600 tracking-wide z-10 bg-slate-100 rounded-lg order border-goldAccent shadow-2xl top-[43px] left-4 -right-32 350px:left-6 350px:-right-40 sm:top-16 sm:-right-60",
            {
              "top-8 left-1 350px:left-2.5 350px:top-11 sm:top-9 sm:-right-28 sm:-left-0.5 lg:top-12 lg:-right-36 lg:left-2":
                isNavbar,
            }
          )}>
          {post.overview}
        </p>
      </details>
      <div className="relative aspect-[1.3] overflow-hidden rounded-b-md details-open-blur">
        <Image
          src={post.imageUrl}
          alt="Some alt text"
          width={1000}
          height={1000}
        />
      </div>
    </Card>
  );
}
