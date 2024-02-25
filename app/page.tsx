import Hero from "./components/hero";
import Newest from "./components/newest";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <Hero />
      <Newest />
    </div>
  );
}
