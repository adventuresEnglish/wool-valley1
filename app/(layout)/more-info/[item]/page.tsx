import About from "@/app/(layout)/more-info/_footer/about";
import Careers from "@/app/(layout)/more-info/_footer/careers";
import Contact from "@/app/(layout)/more-info/_footer/contact";
import Cookies from "@/app/(layout)/more-info/_footer/cookies";
import FAQ from "@/app/(layout)/more-info/_footer/faq";
import Privacy from "@/app/(layout)/more-info/_footer/privacy";
import Returns from "@/app/(layout)/more-info/_footer/returns";
import Shipping from "@/app/(layout)/more-info/_footer/shipping";
import Terms from "@/app/(layout)/more-info/_footer/terms";
import { capitalize } from "@/lib/utils/utils";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: { item: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: capitalize(params.item),
  };
}

export default function MoreInfoPage({ params }: Props) {
  const componentMap: { [key: string]: JSX.Element } = {
    about: <About />,
    contact: <Contact />,
    careers: <Careers />,
    faq: <FAQ />,
    shipping: <Shipping />,
    returns: <Returns />,
    privacy: <Privacy />,
    terms: <Terms />,
    cookies: <Cookies />,
  };

  const component = componentMap[params.item] || null;

  return (
    <div className="min-h-[80vh] max-w-2xl px-4 sm:px-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
        {params.item === "faq"
          ? params.item.toUpperCase()
          : params.item.charAt(0).toUpperCase() + params.item.slice(1)}
      </h2>

      {component}
    </div>
  );
}
