import Favorites from "./favorites";
import DisplayCategory from "./display-category";
import { getCatCount, getPostsData, getProductsData } from "@/lib/utils/utils";
import { Post, Product } from "../../../lib/types";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = params.category === "blogs" ? "6" : "8";
  const per_page = searchParams["per_page"] ?? perPage;
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const catCount = await getCatCount(params.category);

  let categoryData: Product[] | Post[] = [];
  if (params.category === "blogs") {
    categoryData = await getPostsData();
  } else if (params.category !== "favorites") {
    categoryData = await getProductsData({
      category: params.category,
      range: [start, end],
    });
  }

  const componentMap: { [key: string]: JSX.Element } = {
    default: (
      // <Suspense
      //   fallback={
      //     <div className="bg-white mb-32 min-h-[80vh] lg:min-h-[90vh] flex justify-center items-center">
      //       loading
      //     </div>
      //   }>
      <DisplayCategory
        data={categoryData}
        hasNextPage={end < catCount}
        hasPrevPage={start > 0}
        category={params.category}
        per_page={per_page}
        catCount={catCount}
      />
      // </Suspense>
    ),
    favorites: <Favorites />,
  };

  let component = componentMap[params.category] || componentMap.default;

  return <>{component}</>;
}
