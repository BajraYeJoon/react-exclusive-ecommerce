import { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  ShoppingCart,
  Search,
  Menu,
  X,
  Home,
  User,
  LogIn,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../common/lib/utils";
import { navLinks } from "../../constants/data";
import { useAuthContext } from "../../context/useAuthContext";
import { Input } from "../../../common/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySearch } from "../../../common/api/productApi";
import { fetchCart } from "../../api/cartApi";
import { fetchFavorites } from "../../api/wishlistApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import { debounce } from "../../utils/debounce";
import { Routes } from "../../../admin/lib/links";
import { Button } from "../../../common/ui/button";
import { FormattedMessage, useIntl } from "react-intl";

type SearchResultProps = {
  id: number;
  title: string;
  image: string;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isLoggedIn, isAdmin } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultProps[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggleMenu]);

  useEffect(() => {
    const debouncedFetchResults = debounce(async (query: string) => {
      if (searchQuery === "") {
        setResults([]);
        return;
      }
      const res = await fetchProductsBySearch(query);
      setResults(res);
    }, 500);

    debouncedFetchResults(searchQuery);
  }, [searchQuery]);

  const handleLinkClick = () => {
    setToggleMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: !isAdmin && isLoggedIn,
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !isAdmin && isLoggedIn,
  });
  const favoritesquantity = favorites?.data.length || 0;
  const cartquantity = cart?.length || 0;

  const clearSearch = () => {
    console.log("Clear search clicked");
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  return (
    <nav className="navbar border-b">
      <div className="navbar-container mx-72 flex items-center justify-between py-4 max-2xl:mx-6">
        <div className="logo-container flex items-center">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold">
              Exclusive
            </span>
          </Link>
        </div>

        <div className="nav-links hidden gap-8 lg:flex">
          <ul className="flex flex-col font-medium md:mt-0 md:flex-row md:space-x-4">
            {navLinks.map((link) => {
              if (isLoggedIn && link.label === "Sign Up") {
                return null;
              }

              return (
                <li
                  key={`nav-link-${uuidv4()}`}
                  className="nav-item cursor-pointer"
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive, isPending }) =>
                      cn(
                        "nav-link block px-3 py-1 font-medium text-foreground transition-colors duration-200",
                        isPending && "pending",
                        isActive && "active-link border-b-2 border-foreground",
                      )
                    }
                  >
                    <FormattedMessage id={link.label} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="group relative hidden items-center justify-center md:flex">
            <Input
              type="text"
              ref={searchInputRef}
              className="w-full rounded-sm p-4 text-sm font-light tracking-wider placeholder:text-[10px] placeholder:text-muted-foreground/50 focus:border-[1px] md:block"
              placeholder={intl.formatMessage({ id: "search.placeholder" })}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
            />
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute end-2 flex cursor-pointer items-center"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            ) : (
              <Search
                size={30}
                className="pointer-events-none absolute end-2 flex items-center ps-3"
              />
            )}
            {results.length > 0 && (
              <div
                ref={resultsRef}
                className="absolute top-12 z-10 flex min-w-96 flex-col rounded-md border border-foreground bg-white shadow-lg"
              >
                {results.map((product: SearchResultProps) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="flex gap-2 px-4 py-2 hover:bg-accent"
                  >
                    <img
                      src={product.image[0]}
                      alt=""
                      className="inline-block aspect-square h-10 w-10 object-cover"
                    />
                    <span className="text-xs">
                      {product.title.slice(0, 100)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {!isAdmin && (
            <Link to="/favorites" className="relative">
              <HeartIcon
                size={20}
                fill={favoritesquantity > 0 ? "red" : "none"}
              />
              {favoritesquantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {favoritesquantity}
                </span>
              )}
            </Link>
          )}

          {!isAdmin && isLoggedIn && (
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {cartquantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartquantity}
                </span>
              )}
            </Link>
          )}

          {isAdmin && isLoggedIn && (
            <Link to={`/${Routes.Admin}/${Routes.Dashboard}`}>
              <Button>Dashboard</Button>
            </Link>
          )}

          {isLoggedIn && !isAdmin && (
            <Link to={`/profile`}>
              <div className="profile-badge h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-foreground/35"></div>
            </Link>
          )}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="menu-toggle z-50 lg:hidden"
            aria-label={toggleMenu ? "Close menu" : "Open menu"}
          >
            {toggleMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-36 z-40 flex w-full flex-col overflow-y-hidden bg-foreground sm:top-32 md:top-28 lg:hidden"
          >
            <ul className="nav-menu mobile-nav-menu flex flex-col gap-4 space-y-2 px-4 py-4 font-bold tracking-wider">
              {navLinks.map((link) => {
                if (isLoggedIn && link.label === "Sign Up") {
                  return null;
                }
                return (
                  <motion.li
                    key={`mobile-nav-link-${uuidv4()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="nav-item"
                  >
                    <Link
                      to={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 rounded-lg p-2 text-background hover:bg-background/10"
                    >
                      {link.label === "Home" && <Home size={20} />}
                      {link.label === "Sign Up" && <User size={20} />}
                      {link.label === "Login" && <LogIn size={20} />}
                      <FormattedMessage id={link.label} />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
