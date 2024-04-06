import { client } from "@/app/lib/sanity";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SIZE_CATEGORIES } from "./constants";
import { Product } from "./types";
import PRICE_ID_STORE from "./priceIdStore.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPostsData() {
  const query = `*[_type == "post"] {
      title,
      author,
      "authorImageUrl": authorImage.asset->url,
      subTitle,
      overview,
      createdAt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
  }`;
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

export async function getProductsData(
  category: string,
  style?: string,
  isCarousel = false
) {
  if (category === "all") {
    const query = `*[_type == "product" ${
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

    const data = await client.fetch(query);

    return evenlyDistributeBabyKidEntries(data);
  }

  const query = `*[_type == "product" && category->name == "${category}" 
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
