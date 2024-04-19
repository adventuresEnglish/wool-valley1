"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ArrowRightComp() {
  const [windowWidth, setWindowWidth] = useState(350);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const arrowSize: number = windowWidth <= 350 ? 18 : 24;

  return <ArrowRight size={arrowSize} />;
}
