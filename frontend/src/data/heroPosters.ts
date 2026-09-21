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
    image: "/hero/diwali/1789973977514.webp",
    alt: "The Festive Feast hamper featuring a selection of Diwali treats. ₹1850",
    href: "/hampers",
  },
  {
    id: "parampara",
    image: "/hero/diwali/1789973984651.webp",
    alt: "Parampara Diwali hamper box with traditional sweets and snacks. ₹1250",
    href: "/hampers",
  },
  {
    id: "utsav-brownie",
    image: "/hero/diwali/1789973992028.webp",
    alt: "Utsav Brownie box for Diwali celebrations. ₹850",
    href: "/hampers",
  },
  {
    id: "mini-shagun",
    image: "/hero/diwali/1789974003592.webp",
    alt: "Mini Shagun Diwali hamper, perfect for gifting. ₹600",
    href: "/hampers",
  },
];
