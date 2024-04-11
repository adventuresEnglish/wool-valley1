import { CompleteFirstBestOfLink, FirstBestOfLink, Product } from "@/lib/types";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useShoppingCart } from "use-shopping-cart";

import { FavoritesContext } from "@/app/contexts/favorites-count-context-provider";
import { SelectSizeContext } from "@/app/contexts/select-size-context-provider";

export function useHandleCheckoutClick() {
  const { cartCount, cartDetails, redirectToCheckout } = useShoppingCart();

  const handleCheckoutClick = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (cartCount) {
        try {
          const res = await fetch("/session", {
            method: "POST",
            body: JSON.stringify(cartDetails),
          });
          console.log(cartDetails);
          const data = await res.json();
          console.log(data);
          const result: any = await redirectToCheckout(data.sessionId);
          if (result.error) {
            console.error(result);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [cartCount, cartDetails, redirectToCheckout]
  );

  return handleCheckoutClick;
}

export type Action =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: string }
  | { type: "INIT"; payload: Product[] };

export function useLocalStorage(key: string, initialValue: Product[]) {
  const reducer = (state: Product[], action: Action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "REMOVE":
        return state.filter((product) => product._id !== action.payload);
      case "INIT":
        return action.payload;
      default:
        return state;
    }
  };

  const [value, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        dispatch({ type: "INIT", payload: JSON.parse(storedValue) });
      }
    }
  }, [key]);

  const isItemIncluded = useCallback(
    (id: string) => {
      return value.some((product) => product._id === id);
    },
    [value]
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(value));
  }, [value]);

  return {
    value,
    dispatch,
    length: value.length,
    isItemIncluded,
  };
}

export function useSelectSize() {
  const [size, setSize] = useState<undefined | string>(undefined);

  const [chooseSizeIndicator, setChooseSizeIndicator] =
    useState<boolean>(false);

  return {
    chooseSizeIndicator,
    setChooseSizeIndicator,
    size,
    setSize,
  };
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "FavoritesCountContext Context must be used within the FavoritesCountContext"
    );
  }
  return context;
}

export function useSelectSizeContext() {
  const context = useContext(SelectSizeContext);
  if (!context) {
    throw new Error(
      "SelectSizeContext Context must be used within the SelectSizeContext"
    );
  }
  return context;
}

export function useWindowResizeListener() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return windowWidth;
}

function useMouse(ref: React.RefObject<HTMLElement>) {
  const [mouse, setMouse] = useState<{
    x: number;
    y: number;
    isActive: boolean;
  }>({ x: 0, y: 0, isActive: true });
  useEffect(() => {
    if (ref.current) {
      const handleMouseMove = (e: MouseEvent) => {
        // get mouse position relative to ref
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isActive: true,
          });
        }
      };
      const handleMouseOut = (e: MouseEvent) => {
        setMouse({
          x: 0,
          y: 0,
          isActive: false,
        });
      };
      const currentRef = ref.current;
      if (currentRef) {
        currentRef.addEventListener("mousemove", handleMouseMove);
        currentRef.addEventListener("mouseout", handleMouseOut);
        return () => {
          currentRef.removeEventListener("mousemove", handleMouseMove);
          currentRef.removeEventListener("mouseout", handleMouseOut);
        };
      }
    }
  });
  return mouse;
}

export function useMouseOverZoom(
  source: React.RefObject<HTMLImageElement>,
  target: React.RefObject<HTMLCanvasElement>,
  cursor: React.RefObject<HTMLElement>,
  tooltipContainer: HTMLElement | null,
  radius = 80
) {
  // Capture Mouse position
  const { x, y, isActive } = useMouse(source);
  // Compute the part of the image to zoom based on mouse position
  const zoomBounds = useMemo(() => {
    return {
      left: x - radius,
      top: y - radius,
      width: radius * 2,
      height: radius * 2,
    };
  }, [x, y, radius]);
  // move the cursor to the mouse position
  useEffect(() => {
    if (cursor.current) {
      const { left, top, width, height } = zoomBounds;
      cursor.current.style.left = `${left}px`;
      cursor.current.style.top = `${top}px`;
      cursor.current.style.width = `${width}px`;
      cursor.current.style.height = `${height}px`;
      cursor.current.style.display = isActive ? "block" : "none";
    }
  }, [zoomBounds, isActive, cursor]);
  // draw the zoomed image on the canvas
  useEffect(() => {
    if (source.current && target.current) {
      const ctx = target.current.getContext("2d");
      if (ctx) {
        if (isActive) {
          const { left, top, width, height } = zoomBounds;
          const imageRatio = source.current.naturalWidth / source.current.width;
          ctx.drawImage(
            source.current,
            left * imageRatio,
            top * imageRatio,
            width * imageRatio,
            height * imageRatio,
            0,
            0,
            target.current.width,
            target.current.height
          );
        } else {
          // clear canvas
          ctx.clearRect(0, 0, target.current.width, target.current.height);
        }
      }
    }
  }, [zoomBounds, isActive, source, target, tooltipContainer]);
}

export function useDiametricgAccordionSlider(initialState: {
  top: { isOpen: boolean; zIndex: number; sliderZIndex: number };
  bottom: { isOpen: boolean; zIndex: number; sliderZIndex: number };
}) {
  const [top, setTop] = useState(initialState.top);
  const [bottom, setBottom] = useState(initialState.bottom);

  const handleTopClick = () => {
    if (top.isOpen) {
      setTop({ ...top, isOpen: false });
      setTimeout(() => {
        setTop({ ...top, isOpen: false, zIndex: 10, sliderZIndex: 0 });
      }, 300);
    } else {
      setBottom({ ...bottom, zIndex: 10, sliderZIndex: 0 });
      setTop({ ...top, isOpen: true, zIndex: 30, sliderZIndex: 20 });
    }
  };

  const handleBottomClick = () => {
    if (bottom.isOpen) {
      setBottom({ ...bottom, isOpen: false });
      setTimeout(() => {
        setBottom({ ...bottom, isOpen: false, zIndex: 10, sliderZIndex: 0 });
      }, 1000);
    } else {
      setTop({ ...top, zIndex: 10, sliderZIndex: 0 });
      setBottom({ ...bottom, isOpen: true, zIndex: 30, sliderZIndex: 20 });
    }
  };

  return { top, bottom, handleTopClick, handleBottomClick };
}

// export function useFirstBestOfLinks(): CompleteFirstBestOfLink[] {
//   const [links, setLinks] = useState<CompleteFirstBestOfLink[]>([]);

//   useEffect(() => {
//     const fetchBestOf = async () => {
//       const baby_kidBestOf: FirstBestOfLink = await getFirstBestOf("baby_kid");
//       const adult_youthBestOf: FirstBestOfLink = await getFirstBestOf(
//         "adult_youth"
//       );

//       const newLinks = [
//         {
//           title: "Baby/Kid",
//           href: "/baby_kid",
//           description: "Ages 0-6",
//           bestOfImageUrl: baby_kidBestOf.bestOfImageUrl,
//           alt: baby_kidBestOf.alt,
//           _id: baby_kidBestOf._id,
//         },
//         {
//           title: "Adult/Youth",
//           href: "/adult_youth",
//           description: "Ages 12 and up",
//           bestOfImageUrl: adult_youthBestOf.bestOfImageUrl,
//           alt: adult_youthBestOf.alt,
//           _id: adult_youthBestOf._id,
//         },
//       ];

//       setLinks(newLinks);
//     };

//     fetchBestOf();
//   }, []);

//   return links;
// }