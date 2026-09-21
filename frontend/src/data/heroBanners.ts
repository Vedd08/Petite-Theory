export type HeroBanner = {
  id: string;
  src: string;     // 3:2 banner, product in the right 60%
  alt: string;
  name: string;    // shown in the caption
  detail: string;  // shown in the caption
  href: string;
};

// Banners are 3:2 with the product in the right 60%
// Files live in public/diwali/banners/
// Array order is display order
export const heroBanners: HeroBanner[] = [
  {
    id: "glowing-affair",
    name: "The Glowing Affair",
    detail: "Stuffed dates · Box of 12",
    alt: "Twelve stuffed dates in a red gift box with a navy and gold lotus lid",
    src: "/diwali/banners/glowing-affair.webp",
    href: "/hampers",
  },
  {
    id: "little-sweet-spark",
    name: "Little Sweet Spark",
    detail: "Truffle edit · Box of 6",
    alt: "Six assorted truffles in a gold tray beside a sage gift sleeve",
    src: "/diwali/banners/little-sweet-spark.webp",
    href: "/hampers",
  },
  {
    id: "utsav-brownie",
    name: "Utsav Brownie",
    detail: "Six assorted brownies",
    alt: "Six assorted brownies in a gold-lined gift box",
    src: "/diwali/banners/utsav-brownie.webp",
    href: "/hampers",
  },
  {
    id: "pataaka-cookie-tin",
    name: "The Pataaka Cookie Tin",
    detail: "Gooey baked cookies",
    alt: "A gold tin of gooey baked chocolate cookies with its ribboned lid",
    src: "/diwali/banners/pataaka-cookie-tin.webp",
    href: "/hampers",
  },
  {
    id: "crackle-and-crave",
    name: "The Crackle & Crave",
    detail: "Nut chocolates · Box of 12",
    alt: "Twelve gold-leaf nut chocolates in a window gift box",
    src: "/diwali/banners/crackle-and-crave.webp",
    href: "/hampers",
  }
];
