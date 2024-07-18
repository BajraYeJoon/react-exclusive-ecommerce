import {
  FaMobile,
  BsSmartwatch,
  MdVideogameAsset,
  ComputerIcon,
  HeadphonesIcon,
  CameraIcon,
} from "./images";

import { CiDeliveryTruck } from "react-icons/ci";
import { GrSecure } from "react-icons/gr";
import { IconType } from "react-icons";
import { BiHeadphone } from "react-icons/bi";

interface ServiceDetail {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}

export const serviceDetailsInfo: ServiceDetail[] = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Lorem ipsum dolor sit amet.",
    icon: CiDeliveryTruck,
  },
  {
    id: 2,
    title: "Quality Products",
    description: "Lorem ipsum dolor sit amet.",
    icon: BiHeadphone,
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Lorem ipsum dolor sit amet.",
    icon: GrSecure,
  },
];


export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sign Up", href: "/sign-up" },
];
  

export const bestSellingProducts = [
  {
    title: "The North Coat",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-coat.png",
  },
  {
    title: "Gucci duffle bag",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-bag.png",
  },
  {
    title: "RGB liquid CPU Cooler",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-fan.png",
  },
  {
    title: "The North Coat",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-shelf.png",
  },
];

export const categories = [
  {
    icon: FaMobile,
    categoryName: "Phones",
  },
  {
    icon: ComputerIcon,
    categoryName: "Computers",
  },
  {
    icon: BsSmartwatch,
    categoryName: "Smartwatch",
  },
  {
    icon: CameraIcon,
    categoryName: "Camera",
  },
  {
    icon: HeadphonesIcon,
    categoryName: "Headphones",
  },
  {
    icon: MdVideogameAsset,
    categoryName: "Gaming",
  },
];

export const generalProducts = [
  {
    title: "The North Coat",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-coat.png",
  },
  {
    title: "Gucci duffle bag",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-bag.png",
  },
  {
    title: "RGB liquid CPU Cooler",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-fan.png",
  },
  {
    title: "The North Coat",
    price: 360,
    // discountPrice: 260,
    rating: 65,
    image: "/best-selling-products/b-shelf.png",
  },
];

export const heroCategories = [
  {
    id: 1,
    name: "Women's Fashion",
    subcategories: ["Dresses", "Tops", "Shoes"],
  },
  { id: 2, name: "Men's Fashion", subcategories: ["Shirts", "Pants", "Shoes"] },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Toys & Games" },
  { id: 6, name: "Books" },
  { id: 7, name: "Electronics" },
  { id: 8, name: "Beauty & Personal Care" },
];

export const heroContent = [
  {
    title: "Up to 10% off Voucher",
    brandName: "Iphone 14 Series",
  },
  {
    title: "Get the best deals",
    brandName: "Iphone 14 Series",
  },
  {
    title: "Get the best deals",
    brandName: "Iphone 14 Series",
  },
];

export const productCardsContent = [
  {
    title: "HAVIT HV-G92 Gamepad",
    price: 160,
    discountPrice: 120,
    rating: 88,
    image: "/products-img/product-headphone.png",
  },
  {
    title: "AK-900 Wired Keyboard",
    price: 1160,
    discountPrice: 960,
    rating: 75,
    image: "/products-img/product-gaming-keyboard.png",
  },
  {
    title: "IPS LCD Gaming Monitor",
    price: 400,
    discountPrice: 370,
    rating: 99,
    image: "/products-img/product-gaming-monitor.png",
  },
  {
    title: "S-Series Comfort Chair ",
    price: 400,
    discountPrice: 375,
    rating: 98,
    image: "/products-img/product-chair.png",
  },
  {
    title: "S-Series Comfort Chair ",
    price: 400,
    discountPrice: 375,
    rating: 98,
    image: "/products-img/product-chair.png",
  },
];