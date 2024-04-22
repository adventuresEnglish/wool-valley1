"use server";

import getImage from "@/lib/utils/get-image";
import Image from "next/image";

type BlurImageProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
};

export default async function BlurImage({
  width,
  height,
  src,
  alt,
  className,
}: BlurImageProps) {
  const { base64, img } = await getImage(src);
  return (
    <Image
      src={src}
      placeholder="blur"
      blurDataURL={base64}
      width={width}
      height={height}
      alt={alt}
      quality={100}
      className={className}
    />
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import getImage from "@/lib/utils/get-image";
// import BlurImageClient from "./blur-image-client";

// type BlurImageProps = {
//   width: number;
//   height: number;
//   src: string;
//   alt: string;
//   className?: string;
// };

// export default function BlurImage({
//   width,
//   height,
//   src,
//   alt,
//   className,
// }: BlurImageProps) {
//   const [image, setImage] = useState<{
//     base64: string;
//     img: { src: string; height: number; width: number };
//   } | null>(null);

//   useEffect(() => {
//     async function fetchImage() {
//       const { base64, img } = await getImage(src);
//       setImage({ base64, img });
//     }

//     fetchImage();
//   }, [src]);

//   if (typeof window !== "undefined" && image) {
//     return (
//       <BlurImageClient
//         {...image.img}
//         alt={alt}
//         className={className}
//       />
//     );
//   }

//   return null;
// }
