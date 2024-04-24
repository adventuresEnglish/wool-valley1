import { GOLDEN_RATIO } from "@/lib/constants";

const LoadingLine = () => {
  const φ = GOLDEN_RATIO;
  const spinnerStyles = Array(7)
    .fill(0)
    .map((_, i) => ({
      animation: `loading 1.4s infinite`,
      animationDelay: `${(Math.abs(i - 3) * 0.2).toFixed(1)}s`,
      transform: `scale(${1 - 0.25 * Math.abs(i - 3)})`,
      marginRight: `${8 * φ ** Math.abs(i - 3)}px`,
    }));

  return (
    <div className="flex justify-center items-center h-10">
      <div className="flex justify-center items-center space-x-1">
        {spinnerStyles.map((style, i) => (
          <span
            key={i}
            className="inline-block w-3.5 h-3.5 bg-primary rounded-full opacity-0 animate-loading"
            style={style}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingLine;
