import React, { useState } from "react";
import {
  HeartIcon,
  LucideShoppingCart,
  SearchIcon,
  HamIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

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
    <nav className="navbar border-b">
      <div className="navbar-container flex items-center justify-between pt-9 pb-4 max-2xl:pt-7 max-2xl:pb-3 mx-64 max-3xl:mx-24 max-2xl:mx-14">
        <div className="logo-container flex items-center gap-16">
          <a href="/" className="logo flex items-center">
            <span className="logo-text self-center text-2xl font-semibold whitespace-nowrap">
              Exclusive
            </span>
          </a>
        </div>

        <div className="nav-links hidden lg:flex gap-8">
          <ul className="nav-menu flex flex-col font-medium md:space-x-4 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <a
                  href={link.href}
                  onClick={() => handleLinkClick({ href: link.href })}
                  className={`nav-link block font-normal py-1 px-3 text-foreground ${
                    activeLink === link.href
                      ? "active-link border-b border-b-foreground/50"
                      : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-6 items-center">
          <div className="search-bar hidden md:flex w-42 h-10 px-3 py-2 text-sm  bg-card rounded-md  text-foreground ">
            <input
              type="search"
              className="search-input bg-card w-full placeholder:text-xs"
              placeholder="What are you looking for?"
            />
            <SearchIcon className="search-icon my-auto" size={20} />
          </div>
          <HeartIcon size={20} />
          <LucideShoppingCart size={20} />
          <div className="mobile-nav-toggle lg:hidden flex items-center">
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className="menu-toggle"
            >
              <HamIcon className="menu-icon h-6" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mobile-nav fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700",
          !toggleMenu ? "h-0" : "h-full"
        )}
      >
        <div className="px-8 mobile-nav-menu flex flex-col gap-8 font-bold tracking-wider">
          <ul className="nav-menu flex flex-col font-medium md:space-x-4 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <a
                  href={link.href}
                  onClick={() => handleLinkClick({ href: link.href })}
                  className={`nav-link block font-normal py-1 px-3 text-foreground ${
                    activeLink === link.href
                      ? "active-link border-b border-b-foreground/50"
                      : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;