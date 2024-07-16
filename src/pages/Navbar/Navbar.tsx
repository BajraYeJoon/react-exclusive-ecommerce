import React, { useState } from "react";
import {
  HeartIcon,
  LucideShoppingCart,
  SearchIcon,
  HamIcon,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sign Up", href: "/sign-up" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLinkClick = ({ href }) => {
    setActiveLink(href);
  };

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between pt-9 pb-4 max-2xl:pt-7 max-2xl:pb-3 mx-64 max-3xl:mx-24 max-2xl:mx-14 ">
        {/* Logo and primary menu */}
        <div className="flex items-center gap-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Exclusive
            </span>
          </a>
        </div>

        <div className="hidden lg:flex gap-8 ">
          <ul className="flex flex-col font-medium md:space-x-4 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick({ href: link.href })}
                  className={`block font-normal py-1 px-3 text-foreground ${
                    activeLink === link.href
                      ? "border-b border-b-foreground/50 "
                      : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Secondary menu and icons */}
        <div className="flex gap-6 items-center">
          {/* Search bar */}
          <div className="hidden md:flex w-42 h-10 px-3 py-2 text-sm border border-background/20 rounded-md focus-within:ring focus-within:ring-accent text-foreground hover:border-b hover:border-b-foreground/25">
            <input
              type="search"
              className="flex-grow focus:outline-none"
              placeholder="What are you looking for?"
            />
            <SearchIcon className="my-auto" size={20} />
          </div>
          {/* Icons */}
          <HeartIcon size={20} />
          <LucideShoppingCart size={20} />
          {/* Mobile navigation toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              <HamIcon className="h-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile navigation */}
      <div
        className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            <a href="#" className="border-l-4 border-gray-600">
              Features
            </a>
            <a href="#">Pricing</a>
            <a href="#">Download</a>
            <a href="#">Classic</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
