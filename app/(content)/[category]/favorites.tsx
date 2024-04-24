"use client";

import { useFavoritesContext } from "@/lib/hooks";
import DisplayCategory from "./display-category";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";

export default function Favorites() {
  const { value: favorites, length } = useFavoritesContext();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "8";
  //console.log("page", page, "perPage", perPage, "length", length);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  function sliceFavorites(favorites: Product[], start: number, end: number) {
    return favorites.slice(start, end);
  }
  const slicedFavorites = sliceFavorites(favorites, start, end);

  return (
    <DisplayCategory
      data={slicedFavorites}
      category="favorites"
      hasNextPage={end < length}
      hasPrevPage={start > 0}
      per_page={perPage}
      catCount={length}
    />
  );
}
