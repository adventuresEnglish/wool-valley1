"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Change 24 to your desired size for screens larger than 350px

export default function ArrowRightComp() {
  const [windowWidth, setWindowWidth] = useState(351);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const arrowSize: number = windowWidth <= 350 ? 18 : 24;

  return <ArrowRight size={arrowSize} />;
}