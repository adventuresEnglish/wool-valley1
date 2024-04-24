import { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const spinners = Array(9)
    .fill(0)
    .map((_, i) => ({
      transform: `rotate(${i * 40}deg) translate(50px)`,
      animation: `loading-spinner 1.4s infinite ${(i * 1.4) / 9}s`,
    }));

  return show ? (
    <div className="fixed top-[30%] left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2">
      {spinners.map((style, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 w-5 h-5 bg-primary rounded-full opacity-70 animate-loading-spinner"
          style={style}
        />
      ))}
    </div>
  ) : null;
};

export default LoadingSpinner;
