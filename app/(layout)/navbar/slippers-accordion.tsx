import {
  Accordion,
  AccordionContent as AccordionContentWrapper,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  adult_youthDropdownlinks,
  baby_kidDropdownlinks,
} from "@/lib/constants";
import { capitalize } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export const SlippersAccordion = () => {
  return (
    <section className="flex flex-col py-4 w-[260px] 350px:w-[320px] sm:w-[400px]">
      <Accordion
        type="single"
        collapsible>
        <AccordionItem
          value="item-1"
          className="px-4 pb-2 border-b-[2px] border-slate-300">
          <AccordionTrigger
            leftElement={
              <div className="text-start">
                <h1 className="font-medium leading-none text-gray-600 transition duration-100 group-hover:text-primary">
                  Baby/Kid
                </h1>
                <p className="text-sm leading-snug text-muted-foreground">
                  Ages 0-6
                </p>
              </div>
            }
            rightElement={
              <div className="relative overflow-hidden rounded-lg border border-goldAccent ">
                <Image
                  src="https://cdn.sanity.io/images/c8kajeh8/slippers/f574b43d9e2639f01629095bcb50a369adc0c6b7-1000x1000.jpg"
                  alt="See All Baby/Kid Slippers"
                  width={120}
                  height={120}
                  className="object-center transform group-hover:opacity-70 transition duration-300 ease-in-out"
                />
              </div>
            }
          />
          <AccordionContent links={baby_kidDropdownlinks} />
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="px-4 pt-2">
          <AccordionTrigger
            leftElement={
              <div className="text-start">
                <h1 className="font-medium leading-none text-gray-600 transition duration-100 group-hover:text-primary">
                  Adult/Youth
                </h1>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Ages 7 <span className="whitespace-nowrap">and up</span>
                </p>
              </div>
            }
            rightElement={
              <div className="relative overflow-hidden rounded-lg border border-goldAccent ">
                <Image
                  src="https://cdn.sanity.io/images/c8kajeh8/slippers/0458afa4362ab0e4b20ed6f31cdb84ce71790bf1-1000x1000.jpg"
                  alt="See All Adult/Youth Slippers"
                  width={120}
                  height={120}
                  className="object-center transform group-hover:opacity-70 transition duration-300 ease-in-out"
                />
              </div>
            }
          />
          <AccordionContent links={adult_youthDropdownlinks} />
        </AccordionItem>
      </Accordion>
    </section>
  );
};

type DropdownLinkProps = {
  links: {
    style: string;
    image: string;
    alt: string;
    category: string;
  }[];
};

const AccordionContent: React.FC<DropdownLinkProps> = ({ links }) => {
  return (
    <AccordionContentWrapper>
      <ul className="grid grid-cols-3 gap-4 pt-4">
        {links.map((link) => (
          <li key={link.style}>
            <Link
              legacyBehavior
              passHref
              href={`/${link.category}/${link.style}`}>
              <NavigationMenuLink className=" text-gray-600 transition duration-100 hover:text-primary border-b">
                <div className="relative flex flex-col items-center group">
                  <Badge
                    className="absolute top-2 left-1/2 transform -translate-x-1/2 px-2 text-sm bg-primary/45 z-10 border border-goldAccent group-hover:bg-background transition duration-100 ease-in-out"
                    variant={"secondary"}>
                    {capitalize(link.style)}
                  </Badge>
                  <div className="relative overflow-hidden rounded-lg border border-goldAccent ">
                    <Image
                      src={link.image}
                      alt={link.alt}
                      width={120}
                      height={120}
                      className="object-center transform  group-hover:opacity-70 transition duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </NavigationMenuLink>
            </Link>
          </li>
        ))}
      </ul>
    </AccordionContentWrapper>
  );
};
