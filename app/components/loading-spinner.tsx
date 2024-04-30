import { useState, useEffect } from "react";
import { GOLDEN_RATIO } from "@/lib/constants";

const LoadingSpinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const a = 13;
  const b = 0.025;

  const spinners = Array(18)
    .fill(0)
    .map((_, i) => {
      const θ = i * 225 * (Math.PI / 180);
      const r = a * Math.exp(b * θ);

      return {
        transform: `rotate(${i * 50}deg) translate(${r}px)`,
        animation: `loading-spinner 2.4s infinite ${i / 18}s`,
      };
    });

  return show ? (
    <div className="fixed lg:top-[45.6%] 2xl:top-[50%] lg:left-[49.15%] w-24 h-24 transform -translate-x-1/2 -translate-y-1/2">
      {spinners.map((style, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full opacity-70"
          style={style}
        />
      ))}
    </div>
  ) : null;
};

export default LoadingSpinner;
