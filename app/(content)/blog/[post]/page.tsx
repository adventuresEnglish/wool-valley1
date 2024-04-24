import { urlFor } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Post } from "@/lib/types";
import { cn, getPostData } from "@/lib/utils/utils";
import { Metadata } from "next";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PencilIcon } from "lucide-react";

export const dynamic = "force-dynamic";
type Props = {
  params: {
    post: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: Post = await getPostData(params.post);
  return {
    title: post.title,
    description: post.overview,
    // metadataBase: new URL("localhost:3000"),
    // openGraph: {
    //   images: postPost.imageUrl,
    // },
  };
}

export default async function PostPage({
  params,
}: {
  params: { post: string };
}) {
  const post = (await getPostData(params.post)) as Post;

  const ImageComponent = ({ value }: { value: any }) => {
    const { height, width } = getImageDimensions(value);

    return (
      <Image
        src={urlFor(value).url()}
        alt="Image"
        className="rounded-lg max-w-full sm:max-w-lg mx-auto my-4"
        width={width}
        height={height}
        loading="lazy"
      />
    );
  };

  const PortableTextComponent: PortableTextComponents = {
    types: {
      image: ({ value }) => <ImageComponent value={value} />,
    },
    block: {
      h4: ({ children }) => <h4 className="text-xl prose pt-2">{children}</h4>,
      normal: ({ children }) => (
        <p className="sm:text-justify prose py-1 sm:py-1.5">{children}</p>
      ),
    },
  };

  return (
    <div className="mx-6 flex flex-col items-center">
      <div className="max-w-max ">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between ">
          <h1 className="text-3xl 350px:text-4xl my-5 order-2 sm:order-1 prose">
            {post.title}
          </h1>
          <AuthorBadge
            post={post}
            className="order-1 sm:order-2"
          />
        </div>
        <PortableText
          value={post.content}
          components={PortableTextComponent}
        />
      </div>
    </div>
  );
}

function AuthorBadge({ post, className }: { post: Post; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center space-x-2 rounded-full bg-primary/60 p-2 max-w-max h-[66px]",
        className
      )}>
      <div className="flex flex-col pl-2">
        <div className="text-goldAccent flex space-x-2">
          <span className="text-slate-800">{post.author}</span>
          <PencilIcon size={18} />
        </div>
        <div className=" text-slate-600 text-sm ">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="aspect-[1] items-center justify-center">
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
  );
}

// return (
//   <div className="mx-6 flex flex-col items-center">
//     <div className="max-w-max ">
//       <div className="flex flex-col sm:flex-row flex-wrap justify-between ">
//         <h1 className="text-3xl 350px:text-4xl my-5 order-2 sm:order-1">
//           {post.title}
//         </h1>
//         <AuthorBadge
//           post={post}
//           className="order-1 sm:order-2"
//         />
//       </div>
//       <PortableText
//         value={post.content}
//         components={PortableTextComponent}
//       />
//     </div>
//   </div>
// );
// }

// function AuthorBadge({ post, className }: { post: Post; className?: string }) {
// return (
//   <div
//     className={cn(
//       "flex items-center space-x-2 rounded-full bg-primary/60 p-2 max-w-max",
//       className
//     )}>
//     <div className="flex flex-col pl-2">
//       <div className="text-goldAccent flex space-x-2">
//         <span className="text-slate-800">{post.author}</span>
//         <PencilIcon size={18} />
//       </div>
//       <div className=" text-slate-600 text-sm ">
//         {new Date(post.createdAt).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </div>
//     </div>
//     <div className="aspect-[1] items-center justify-center">
//       <Image
//         src={post.authorImageUrl}
//         alt="Profile"
//         width={50}
//         height={50}
//         quality={100}
//         className=" rounded-full object-cover"
//       />
//     </div>
//   </div>
// );
// }
