import DisplayCategory from "@/app/(content)/[category]/display-category";

import { getCatCount, getProductsData } from "@/lib/utils/utils";

import { Product } from "@/lib/types";
import ProductCard from "../../product/product-card";

export const dynamic = "force-dynamic";

export default async function StylePage({
  params,
  searchParams,
}: {
  params: { category: string; style: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = params.category === "blogs" ? "6" : "8";
  const per_page = searchParams["per_page"] ?? perPage;
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const catCount = await getCatCount(params.category, params.style);
  const categoryData: Product[] = await getProductsData({
    category: params.category,
    style: params.style,
    range: [start, end],
  });

  // const names = categoryData.map((item) => item.name);
  // console.log("names", names, "hello");
  // console.log(
  //   "params",
  //   params,
  //   "searchParams",
  //   searchParams,
  //   "per_page",
  //   per_page,
  //   "catCount",
  //   catCount,
  //   "start",
  //   start,
  //   "end",
  //   end
  // );

  return (
    <DisplayCategory
      currentStyle={params.style}
      data={categoryData}
      hasNextPage={end < catCount}
      hasPrevPage={start > 0}
      category={params.category}
      per_page={per_page}
      catCount={catCount}>
      {(categoryData as Product[]).map((product: Product) => (
        <ul key={product._id}>
          <ProductCard
            product={product}
            category={params.category}></ProductCard>
        </ul>
      ))}
    </DisplayCategory>
  );
}
