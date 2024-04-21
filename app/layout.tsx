import type { Metadata } from "next";
import { inter } from "@/components/ui/fonts";
import "./globals.css";
import Navbar from "./(layout)/navbar/navbar";
import CartProvider from "./components/providers";
import ShoppingCartModal from "./(layout)/shopping-cart-modal";
import FavoritesContextProvider from "./contexts/favorites-count-context-provider";
import SelectSizeContextProvider from "./contexts/select-size-context-provider";
import Footer from "./(layout)/more-info/_footer/footer";
import { Toaster } from "sonner";
import BlurNavContextProvider from "./contexts/blur-nav-context";

export const metadata: Metadata = {
  title: "Wool Valley Slippers",
  description: "Shop for handmade wool slippers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ height: "100%" }}>
      <body
        className={`${inter.className} antialiased`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <FavoritesContextProvider>
          <SelectSizeContextProvider>
            <BlurNavContextProvider>
              <CartProvider>
                <Navbar />
                <ShoppingCartModal />
                {children}
                <div id="tooltip-container" />
                <Toaster />
              </CartProvider>
            </BlurNavContextProvider>
          </SelectSizeContextProvider>
        </FavoritesContextProvider>
        <Footer />
      </body>
    </html>
  );
}
