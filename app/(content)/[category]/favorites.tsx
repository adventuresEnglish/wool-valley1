"use client";

import { useFavoritesContext } from "@/lib/hooks";
import DisplayCategory from "./display-category";

export default function Favorites() {
  const { value: favorites } = useFavoritesContext();

  return (
    <DisplayCategory
      currentCategory="favorites"
      data={favorites}
    />
  );
}
