/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { HeartIcon, LucideShoppingCart, SearchIcon } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/data";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "../../context/useAuthContext";

// import { auth } from "../../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

// interface User {
//   uid: string;
//   photoURL: string | null | undefined;
// }
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isLoggedIn } = useAuthContext();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [auth.currentUser]);

  const handleLinkClick = () => {
    setToggleMenu(false);
  };

  return (
    <nav className="navbar border-b">
      <div className="navbar-container mx-72 flex items-center justify-between pb-4 pt-4 max-2xl:mx-8 md:pt-9">
        <div className="logo-container flex items-center gap-16">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold">
              Exclusive
            </span>
          </Link>
        </div>

        <div className="nav-links hidden gap-8 lg:flex">
          <ul className="flex flex-col font-medium md:mt-0 md:flex-row md:space-x-4">
            {navLinks.map((link, index) => {
              if (isLoggedIn && link.label === "Sign Up") {
                return null;
              }

              return (
                <li key={index} className="nav-item cursor-pointer">
                  <NavLink
                    to={link.href}
                    className={({ isActive, isPending }) =>
                      `nav-link block px-3 py-1 font-normal text-foreground ${
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
              );
            })}
          </ul>
        </div>
        <div className="search-bar flex items-center gap-6">
          <div className="search-bar w-42 group hidden h-10 rounded-md bg-card px-3 py-2 text-sm text-foreground md:flex">
            <input
              type="search"
              className="search-input w-full bg-card placeholder:text-xs focus:outline-none"
              placeholder="What are you looking for?"
            />
            <SearchIcon className="search-icon my-auto" size={20} />
          </div>
          <HeartIcon size={20} />
          <LucideShoppingCart size={20} />
          {isLoggedIn && (
            <Link to={`/profile`}>
              <div className="profile-badge h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-slate-400"></div>
            </Link>
          )}
          <div className="mobile-nav-toggle flex items-center lg:hidden">
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className="menu-toggle"
            >
              {!toggleMenu ? (
                <RxHamburgerMenu className="close-icon h-6" />
              ) : (
                <RxCross2 className="menu-icon h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mobile-nav fixed z-40 flex w-full origin-top flex-col gap-12 overflow-hidden bg-foreground duration-700 lg:hidden",
          !toggleMenu ? "h-0" : "h-full",
        )}
      >
        <div className="mobile-nav-menu flex flex-col gap-8 px-4 py-4 font-bold tracking-wider">
          <ul className="nav-menu flex flex-col font-medium md:mt-0 md:flex-row md:space-x-4">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="nav-item nav-link my-2 block font-normal text-background"
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
