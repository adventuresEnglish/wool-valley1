import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/more-info/about" },
      { label: "Contact", href: "/more-info/contact" },
      { label: "Careers", href: "/more-info/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/more-info/faq" },
      { label: "Shipping", href: "/more-info/shipping" },
      { label: "Returns", href: "/more-info/returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/more-info/privacy" },
      { label: "Terms", href: "/more-info/terms" },
      { label: "Cookies", href: "/more-info/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 bottom-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-10 place-items-center">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                {section.title}
              </h2>
              <ul className="text-sm sm:text-base text-gray-500">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
