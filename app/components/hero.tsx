import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

const getData = async () => await client.fetch("*[_type == 'heroImages'][0]");

export default async function Hero() {
  const data = await getData();
  return (
    <section>
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex flex-col w-full items-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-bold text-black sm:text-5xl md:mb-8 md:text-5xl xl:text-6xl">
            <p>Something</p>
            <p>Soft for your</p>
            <p>
              <i>Soles</i>
            </p>
          </h1>
          <p className="leading-relaxed max-w-md bg-gradient-to-r bg-clip-text text-transparent from-primary to-goldAccent text-xs 300px:text-sm 350px:text-base xl:text-lg">
            hand-felted | naturally-dyed |{" "}
            <span className="whitespace-nowrap">wool slippers</span>
          </p>
        </div>

        <div className="mb-12 flex w-auto md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt={data.alt1}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              alt={data.alt2}
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
