import DisplayCategory from "@/app/(content)/[category]/display-category";

import { getProductsData } from "@/lib/utils";

import { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function StylePage({
  params,
}: {
  params: { style: string; category: string };
}) {
  const categoryData: Product[] = await getProductsData({
    category: params.category,
    style: params.style,
    range: [0, 8],
  });

  return (
    <DisplayCategory
      currentStyle={params.style}
      currentCategory={params.category}
      data={categoryData}
    />
  );
}
