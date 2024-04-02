import Carousel from "./components/carousel";
import Hero from "./components/hero";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="mx-auto max-w-[272px] 300px:max-w-[292px] 350px:max-w-[342px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
      <Hero />
      <Carousel
        category="all"
        className="my-9"
      />
    </div>
  );
}
