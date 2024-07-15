import { cn } from "../../lib/utils"
import { useState } from "react";
import {
  HeartIcon,
  LucideShoppingCart,
  Menu,
  SearchIcon,
  X,
} from "lucide-react";

const navLinks = [
  {
    href: "#",
    label: "Home",
  },
  {
    href: "#",
    label: "Contact",
  },
  {
    href: "#",
    label: "About",
  },
  {
    href: "#",
    label: "Sign Up",
  },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full relative lg:px-9 py-2 md:px-3 lg:py-3 border-b border-foreground/10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Exclusive
          </span>
        </a>

        <div
          className={cn(
            "transition-opacity duration-300 ease-in-out items-center justify-between w-full md:flex md:w-auto",
            {
              "md:relative md:mt-0 md:p-0 md:bg-transparent absolute top-16 md:top-0 mt-2 rounded-2xl p-5 max-w-sm sm:max-w-xl mx-auto bg-slate-400 opacity-100 translate-y-0":
                isMobileMenuOpen,
              "hidden opacity-0 translate-y-4": !isMobileMenuOpen,
            }
          )}
        >
          <ul className="flex flex-col font-medium md:space-x-12 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block font-normal py-4 px-3 text-foreground  hover:border-b-foreground/50 hover:border-b-2  md:p-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex w-42 h-10 px-3 py-2 text-sm border border-background/20 rounded-md focus-within:ring focus-within:ring-accent text-foreground hover:border-b hover:border-b-foreground/25">
            <input
              type="search"
              className="flex-grow focus:outline-none"
              placeholder="What are you looking for?"
            />
            <SearchIcon className="my-auto" size={20} />
          </div>
          <HeartIcon size={20} />
          <LucideShoppingCart size={20} />
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
