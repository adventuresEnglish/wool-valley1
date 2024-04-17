import { client } from "@/app/lib/sanity";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getPlaiceholder } from "plaiceholder";
import { SIZE_CATEGORIES } from "../constants";
import { PRICE_ID_STORE } from "../priceIdStore";
import { Product } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPostsData(genre?: string) {
  let query = `*[_type == "post" ${
    !genre
      ? ""
      : genre === "featured"
      ? "&& featured == true"
      : `&& genre == ${genre}`
  }]{
      title,
      author,
      "authorImageUrl": authorImage.asset->url,
      subTitle,
      overview,
      createdAt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
  }`;

  if (genre === "featured") {
    query += "[0...2]";
  }
  const data = await client.fetch(query);
  return data;
}

export async function getPostData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] { 
    title,
    subTitle,
    author,
    "authorImageUrl": authorImage.asset->url,
    createdAt,
    publishedAt,
    content,
}`;
  const data = await client.fetch(query);
  return data;
}

export async function getProductsData({
  category,
  style,
  isCarousel = false,
  range,
}: {
  category: string;
  style?: string;
  isCarousel?: boolean;
  range?: [number, number];
}) {
  if (category === "all") {
    let query = `*[_type == "product" ${
      isCarousel ? "&& bestOf == true" : ""
    }] | order(_createdAt asc){
      _id,
      price,
      name,
      alt,
      "slug": slug.current,
      "description": description,
      "categoryName": category->name,
      images,
      "imageUrl": images[0].asset->url,
      "bestOfImageUrl": select(
        includeBestOfImage == true => bestOfImage.asset->url,
        images[0].asset->url
        )
      }`;

    if (range) {
      query += `[${range[0]}...${range[1]}]`;
    }

    const data = await client.fetch(query);

    return evenlyDistributeBabyKidEntries(data);
  }

  let query = `*[_type == "product" && category->name == "${category}" 
    ${style ? `&& style[]->name match "${style}"` : ""}
    ${isCarousel ? "&& bestOf == true" : ""}] | order(_createdAt asc){
      _id,
      price,
      name,
      alt,
      "slug": slug.current,
      "description": description,
      "categoryName": category->name,
      images,
      "imageUrl": images[0].asset->url,
      "bestOfImageUrl": select(
        includeBestOfImage == true => bestOfImage.asset->url,
        images[0].asset->url,
        )
      }`;

  if (range) {
    query += `[${range[0]}...${range[1]}]`;
  }

  const data = await client.fetch(query);
  return data;
}

export async function getProductData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
      "imageUrl": images[0].asset->url,
      images,
      description,
      price,
      name,
      alt,
      "slug": slug.current,
      "categoryName": category->name,
      url,
      }`;
  const data = await client.fetch(query);
  return data;
}

export async function getCatCount(category: string, style?: string) {
  if (category === "all") {
    const query = `count(*[_type == "product"])`;
    const count = await client.fetch(query);
    return count;
  }
  if (category === "blogs") {
    const query = `count(*[_type == "post"])`;
    const count = await client.fetch(query);
    return count;
  }
  const query = `count(*[_type == "product" && category->name == "${category}" ${
    style ? `&& style[]->name match "${style}"` : ""
  }
  ])`;
  const count = await client.fetch(query);
  return count;
}

export function getSizeCategory(key: string) {
  return SIZE_CATEGORIES.filter((category) => category.key === key);
}

export function getSizeLabel(sizeValue: string) {
  for (const category of SIZE_CATEGORIES) {
    for (const size of category.sizes) {
      if (size._key === sizeValue) {
        return `EU ${size.eu} (US ${size.us} ${category.label})`;
      }
    }
  }

  return null;
}

export const capitalize = (str: string): string => {
  return str === "faq"
    ? str.toUpperCase()
    : str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatCurrency(amount: number): string {
  const dollars = (amount / 100).toFixed(2);
  return `$${dollars}`;
}

export function price_idLookup(name: string, size: string) {
  // Extract the category from the size
  const category = size.split("_").slice(0, -1).join("_");

  // Use the category and name to narrow down the search
  const categoryStore = PRICE_ID_STORE[
    category as keyof typeof PRICE_ID_STORE
  ] as {
    [key: string]: { [key: string]: string };
  };
  const nameStore = categoryStore[name];

  // Use the original size to get the price_id
  return nameStore[size];
}

function evenlyDistributeBabyKidEntries(data: Product[]): Product[] {
  const babyKidEntries = data.filter(
    (entry: { categoryName: string }) => entry.categoryName === "baby_kid"
  );
  const otherEntries = data.filter(
    (entry: { categoryName: string }) => entry.categoryName !== "baby_kid"
  );

  // Calculate number of chunks excluding Baby_Kid entries
  const numOtherEntries = otherEntries.length;
  const numBabyKidEntries = babyKidEntries.length;
  const entriesPerBabyKid = Math.floor(numOtherEntries / numBabyKidEntries);
  const remainingOtherEntries = numOtherEntries % numBabyKidEntries;

  // Initialize result array
  let result: Product[] = [];

  // Initialize the index for other entries
  let otherIndex = 0;

  // Iterate over Baby_Kid entries
  for (let i = 0; i < numBabyKidEntries; i++) {
    // Calculate the number of other entries to include before this Baby_Kid entry
    const numOtherBeforeBabyKid =
      entriesPerBabyKid + (i < remainingOtherEntries ? 1 : 0);

    // Add other entries before this Baby_Kid entry
    result = result.concat(
      otherEntries.slice(otherIndex, otherIndex + numOtherBeforeBabyKid)
    );
    otherIndex += numOtherBeforeBabyKid;

    // Add the current Baby_Kid entry
    result.push(babyKidEntries[i]);
  }

  // Add any remaining other entries
  result = result.concat(otherEntries.slice(otherIndex));

  return result;
}

export const formatCategory = (category: string): string => {
  switch (category) {
    case "baby_kid":
      return "Baby/Kid";
    case "adult_youth":
      return "Adult/Youth";
    case "all":
      return "All";
    case "favorites":
      return "Favorites";
    case "blogs":
      return "Blogs";
    case "simple":
      return "Simple";
    case "abstract":
      return "Abstract";
    case "floral":
      return "Floral";
    default:
      return category;
  }
};

export function isMobileOrTablet() {
  return (
    typeof navigator !== "undefined" &&
    /Mobi|Android/i.test(navigator.userAgent)
  );
}

// export async function getFirstBestOf(category: string) {
//   const query = `*[_type == "product" && category->name == "${category}" && bestOf == true][0] {
//     _id,
//       alt,
//       "bestOfImageUrl": select(
//       includeBestOfImage == true => bestOfImage.asset->url,
//       images[0].asset->url,
//       )
//   }`;
//   const data = await client.fetch(query);
//   return data;
// }

export function getPaginationVariables(
  windowWidth: number,
  pageNum: number,
  pages: number
) {
  let pagSchema = "schema 9";
  if (windowWidth < 1024) {
    pagSchema = "schema 7";
  }
  if (windowWidth < 490) {
    pagSchema = "schema 5";
  }

  const jumpFirstActive = pageNum == 1;
  const jumpSecondActive = pageNum == 2;
  const showJumpSecond =
    pages == 5 ||
    (pageNum <= 4 && pagSchema === "schema 9") ||
    (pageNum <= 3 && pagSchema === "schema 7");
  const showFirstEllipsis =
    pages > 5 &&
    ((pageNum > 4 && pagSchema === "schema 9") ||
      (pageNum > 3 && pagSchema === "schema 7"));

  const showSecondEllipsis =
    pages > 5 &&
    ((pageNum < pages - 3 && pagSchema === "schema 9") ||
      (pageNum < pages - 2 && pagSchema === "schema 7"));
  const jumpPenUltActive = pageNum == pages - 1;
  const showJumpPenUlt =
    pages == 5 ||
    pages == 4 ||
    (pageNum >= pages - 3 && pagSchema === "schema 9") ||
    (pageNum >= pages - 2 && pagSchema === "schema 7");
  const jumpUltActive = pageNum == pages;

  let sliceBegin = 0;
  if (pagSchema === "schema 9") {
    sliceBegin = pageNum - 2;
    if (sliceBegin >= pages - 5) sliceBegin = pages - 5;
  }
  if (pagSchema === "schema 7") {
    sliceBegin = pageNum - 1;
    if (sliceBegin >= pages - 3) sliceBegin = pages - 3;
  }
  if (sliceBegin < 2) sliceBegin = 2;

  let sliceEnd = 0;
  if (pagSchema === "schema 9") {
    sliceEnd = pageNum + 1;
    if (sliceEnd < 5) sliceEnd = 5;
  }
  if (pagSchema === "schema 7") {
    sliceEnd = pageNum;
    if (sliceEnd < 3) sliceEnd = 3;
  }
  if (sliceEnd >= pages - 2) sliceEnd = pages - 2;

  return {
    jumpFirstActive,
    jumpSecondActive,
    showJumpSecond,
    showFirstEllipsis,
    showSecondEllipsis,
    jumpPenUltActive,
    showJumpPenUlt,
    jumpUltActive,
    sliceBegin,
    sliceEnd,
    pagSchema,
  };
}
