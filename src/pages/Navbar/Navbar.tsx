import { useState } from "react";
import {
  HeartIcon,
  LucideShoppingCart,
  SearchIcon,
  HamIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/data";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLinkClick = () => {
    setToggleMenu(false);
  };

  return (
    <nav className="navbar border-b">
      <div className="navbar-container flex items-center justify-between pt-4 md:pt-9 pb-4 mx-6 lg:mx-72 ">
        <div className="logo-container flex items-center gap-16">
          <Link to="/" className=" flex items-center">
            <span className="self-center text-2xl font-semibold ">
              Exclusive
            </span>
          </Link>
        </div>

        <div className="nav-links hidden lg:flex gap-8">
          <ul className=" flex flex-col font-medium md:space-x-4 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item cursor-pointer">
                <NavLink
                  to={link.href}
                  className={({ isActive, isPending }) =>
                    `nav-link block font-normal py-1 px-3 text-foreground ${
                      isPending
                        ? "pending"
                        : isActive
                        ? "active-link border-b-2 border-foreground"
                        : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="search-bar flex gap-6 items-center">
          <div className="search-bar hidden md:flex w-42 h-10 px-3 py-2 text-sm group bg-card rounded-md  text-foreground ">
            <input
              type="search"
              className="search-input bg-card w-full placeholder:text-xs focus:outline-none"
              placeholder="What are you looking for?"
            />
            <SearchIcon className=" search-icon my-auto" size={20} />
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
          "mobile-nav fixed z-40 w-full bg-foreground  overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700",
          !toggleMenu ? "h-0" : "h-full"
        )}
      >
        <div className="px-4 py-4 mobile-nav-menu flex flex-col gap-8 font-bold tracking-wider">
          <ul className="nav-menu flex flex-col font-medium md:space-x-4 md:flex-row md:mt-0">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="nav-item nav-link block my-2 font-normal  text-background "
              >
                <Link to={link.href} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
