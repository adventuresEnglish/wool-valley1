import Favorites from "./favorites";
import DisplayCategory from "./display-category";
import { getPostsData, getProductsData } from "@/lib/utils";
import { Post, Product } from "../../../lib/types";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  let categoryData: Product[] | Post[] = [];
  if (params.category === "blogs") {
    categoryData = await getPostsData();
  } else if (params.category !== "favorites") {
    categoryData = await getProductsData(params.category);
  }

  const componentMap: { [key: string]: JSX.Element } = {
    favorites: <Favorites />,
    default: (
      <DisplayCategory
        currentCategory={params.category}
        data={categoryData}
      />
    ),
  };

  let component = componentMap[params.category] || componentMap["default"];

  return <>{component}</>;
}