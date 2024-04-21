// "use client";

// import { useBlurNav } from "@/lib/hooks";
// import { createContext } from "react";

// type BlurNavContextProps = {
//   blurNav: boolean;
//   setBlurNav: (displayCart: boolean) => void;
// };

// export const BlurNavContext = createContext<BlurNavContextProps | null>(null);

// export default function BlurNavContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { blurNav, setBlurNav } = useBlurNav();

//   return (
//     <BlurNavContext.Provider
//       value={{
//         blurNav,
//         setBlurNav,
//       }}>
//       {children}
//     </BlurNavContext.Provider>
//   );
// }
