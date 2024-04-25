import Favorites from "./favorites";
import DisplayCategory from "./display-category";
import { getCatCount, getPostsData, getProductsData } from "@/lib/utils/utils";
import { Post, Product } from "../../../lib/types";
import ProductCard from "../product/product-card";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = params.category === "blogs" ? "6" : "9";
  const per_page = searchParams["per_page"] ?? perPage;
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const catCount = await getCatCount(params.category);

  console.log(
    "per_page",
    per_page,
    "catCount",
    catCount,
    "start",
    start,
    "end",
    end
  );

  console.log("hello");

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
      <DisplayCategory
        data={categoryData}
        hasPrevPage={start > 0}
        hasNextPage={end < catCount}
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
    ),
    favorites: <Favorites />,
  };

  let component = componentMap[params.category] || componentMap.default;

  return <>{component}</>;
}
