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
