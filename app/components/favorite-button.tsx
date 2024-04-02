"use client";

import { cn } from "@/lib/utils";
import { useFavoritesContext } from "@/lib/hooks";
import { Product } from "../../lib/types";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export default function FavoriteButton({ product }: { product: Product }) {
  const { dispatch, isItemIncluded } = useFavoritesContext();
  const pathname = usePathname();

  const isFavorite = isItemIncluded(product._id);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      dispatch({ type: "ADD", payload: product });
    } else {
      dispatch({ type: "REMOVE", payload: product._id });
      if (pathname === "/favorites") {
        toast(`You removed ${product.name} from your favorites.`, {
          icon: "🗑️",
          cancelButtonStyle: {
            background: "#7c3aed",
            color: "#fff",
          },
          cancel: {
            label: "Undo",
            onClick: () => dispatch({ type: "ADD", payload: product }),
          },
        });
      }
    }
  };

  return (
    <span className="absolute -right-0.5 top-0 px-3 py-1.5">
      <button onClick={handleFavoriteClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("w-8 h-8 stroke-primary ", {
            "opacity-45 hover:opacity-75 transform hover:scale-125":
              !isFavorite,
            "hover:opacity-75": isFavorite,
          })}>
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255,255,0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            fill="url(#gradient)"
          />
        </svg>
      </button>
    </span>
  );
}

//   return (
//     <span className="absolute -right-0.5 top-0 px-3 py-1.5">
//       <button onClick={handleFavoriteClick}>
//         <HeartIcon
//           size={27}
//           className={cn("w-8 h-8 stroke-red-500 fill-primary ", {
//             "opacity-55 hover:opacity-75 transform hover:scale-125":
//               !isFavorite,
//             "hover:opacity-75": isFavorite,
//           })}
//         />
//       </button>
//     </span>
//   );
// }
