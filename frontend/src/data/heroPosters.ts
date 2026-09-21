export type HeroPoster = {
  id: string;
  image: string;
  alt: string;
  href: string;
};

// Note: Posters are native 4:5 aspect ratio and live in public/hero/diwali/
// The array order is the display order, allowing easy swapping after Diwali.
export const heroPosters: HeroPoster[] = [
  {
    id: "festive-feast",
    image: "/hero/diwali/festive-feast.webp",
    alt: "The Festive Feast Diwali Celebration Collection: twelve curated dates, truffles and chocolates, ₹1,200",
    href: "/hampers",
  },
  {
    id: "parampara",
    image: "/hero/diwali/parampara.webp",
    alt: "Parampara festive hamper with assorted brownies, chocolates, cookies and granola, ₹1,650",
    href: "/hampers",
  },
  {
    id: "utsav-brownie",
    image: "/hero/diwali/utsav-brownie.webp",
    alt: "Utsav Brownie box with six assorted brownies, ₹800",
    href: "/hampers",
  },
  {
    id: "mini-shagun",
    image: "/hero/diwali/mini-shagun.webp",
    alt: "The Mini Shagun chocolate gift box with six chocolates, ₹500",
    href: "/hampers",
  },
];
