export type BasicProduct = {
  name: string;
  description: string;
  price: number;
  imageUrl: any;
  _id: string;
  slug: string;
  categoryName: string;
};

export type Product = BasicProduct & {
  images: any;
  bestOfImageUrl: any;
  description: string;
  alt: string;
};

export type FirstBestOfLink = {
  _id: string;
  alt: string;
  bestOfImageUrl: any;
};

export type CompleteFirstBestOfLink = FirstBestOfLink & {
  title: string;
  href: string;
  description: string;
};

export type Post = {
  title: string;
  subTitle: string;
  author: string;
  authorImageUrl: any;
  imageUrl: any;
  overview: string;
  content?: any;
  _id?: string;
  slug: string;
  createdAt: string;
};
