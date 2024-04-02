import { Inter, DynaPuff } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dynaPuff",
});
