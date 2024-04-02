import DisplayCategory from "@/app/(content)/[category]/display-category";

import { getProductsData } from "@/lib/utils";

import { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { style: string; category: string };
}) {
  const categoryData: Product[] = await getProductsData(
    params.category,
    params.style
  );

  return (
    <DisplayCategory
      currentStyle={params.style}
      currentCategory={params.category}
      data={categoryData}
    />
  );
}
