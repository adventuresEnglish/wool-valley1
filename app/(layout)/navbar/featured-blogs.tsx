import PostCard from "@/app/(content)/blog/post-card";
import ArrowRight from "@/components/ui/arrow-right";
import { Post } from "@/lib/types";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export default function FeaturedBlogs({
  isNavbar,
  featuredBlogs,
}: {
  isNavbar?: boolean;
  featuredBlogs: Post[];
}) {
  return (
    <section className="p-4 w-[260px] 350px:w-[320px] sm:w-[520px] lg:w-[600px]">
      <div className="flex justify-between pb-1 items-center">
        <header className="text-lg pl-1 text-slate-700">Featured:</header>
        <Link
          legacyBehavior
          passHref
          href="/blogs">
          <NavigationMenuLink className="whitespace-nowrap text-primary flex items-center transform transition-all duration-200 hover:scale-110 hover:text-center pr-1">
            See All <ArrowRight />
          </NavigationMenuLink>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredBlogs.map((post, index) => (
          <PostCard
            key={index}
            isNavbar={isNavbar}
            clientLink={
              <Link
                href={`/blog/${post.slug}`}
                passHref
                legacyBehavior>
                <NavigationMenuLink>
                  <h1 className=" font-bold px-2 350px:pl-4 hover:text-primary transition duration-100 ease-in-out text-xl lg:text-2xl">
                    {post.title}
                  </h1>
                </NavigationMenuLink>
              </Link>
            }
            post={post}
          />
        ))}
      </div>
    </section>
  );
}

// <PostCard
//   isNavbar={isNavbar}
//   clientLink={
//     <Link
//       href={`/blog/why-wool`}
//       passHref
//       legacyBehavior>
//       <NavigationMenuLink>
//         <h1 className=" font-bold px-2 350px:pl-4 hover:text-primary transition duration-100 ease-in-out text-xl lg:text-2xl">
//           Why Wool?
//         </h1>
//       </NavigationMenuLink>
//     </Link>
//   }
//   post={{
//     imageUrl:
//       "https://cdn.sanity.io/images/c8kajeh8/slippers/5ca06d670ad8a13e91d08448701cb1418c05b03e-667x1000.jpg",
//     title: " Why Wool?",
//     author: "Dom Lebo",
//     authorImageUrl:
//       "https://cdn.sanity.io/images/c8kajeh8/slippers/9311e5db56cef242b9677fa09d4d6cc4c3ee52b1-1170x1170.jpg",
//     subTitle: " The super fabric you never knew you needed",
//     overview:
//       "Wool has been a boon to humanity since times immemorial. From the plains of Africa to the might Irish coasts, wool has been keeping us warm and healthy for years. You may be surprised to know that wool has many characteristics.",
//     createdAt: "2024-03-18T19:54:23.036Z",
//     slug: "why-wool",
//   }}
// />
// <div className="hidden sm:block">
//   <PostCard
//     isNavbar={isNavbar}
//     clientLink={
//       <Link
//         href={`/blog/meet-the-makers`}
//         passHref
//         legacyBehavior>
//         <NavigationMenuLink>
//           <h1 className="font-bold px-2 350px:pl-4 hover:text-primary transition duration-100 ease-in-out text-xl 300px:text-xl 350px:text-xl sm:text-xl md:text-xl lg:text-2xl">
//             Meet the Makers
//           </h1>
//         </NavigationMenuLink>
//       </Link>
//     }
//     post={{
//       subTitle: "The Story Behind the Artists",
//       overview:
//         "Let's go deep on Paulino and his wife, Isadora, the genious behind Eco Maki slippers. This read will take you to peru and beyond.",
//       createdAt: "2024-03-18T19:54:32.394Z",
//       slug: "meet-the-makers",
//       imageUrl:
//         "https://cdn.sanity.io/images/c8kajeh8/slippers/5438bb3f3623913b4e6e9cf5fa1a14834bac40c8-821x821.jpg",
//       title: "Meet the Makers",
//       author: "Dom Lebo",
//       authorImageUrl:
//         "https://cdn.sanity.io/images/c8kajeh8/slippers/9311e5db56cef242b9677fa09d4d6cc4c3ee52b1-1170x1170.jpg",
//     }}
//   />
