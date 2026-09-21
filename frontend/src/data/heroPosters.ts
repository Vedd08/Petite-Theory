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
    alt: "The Festive Feast hamper featuring a selection of Diwali treats. ₹1850",
    href: "/hampers",
  },
  {
    id: "parampara",
    image: "/hero/diwali/parampara.webp",
    alt: "Parampara Diwali hamper box with traditional sweets and snacks. ₹1250",
    href: "/hampers",
  },
  {
    id: "utsav-brownie",
    image: "/hero/diwali/utsav-brownie.webp",
    alt: "Utsav Brownie box for Diwali celebrations. ₹850",
    href: "/hampers",
  },
  {
    id: "mini-shagun",
    image: "/hero/diwali/mini-shagun.webp",
    alt: "Mini Shagun Diwali hamper, perfect for gifting. ₹600",
    href: "/hampers",
  },
];
