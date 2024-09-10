import { useEffect, useRef, useState } from "react";
import { HeartIcon, LucideShoppingCart, Search } from "lucide-react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { NavLink, Link } from "react-router-dom";
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

type SearchResultProps = {
  id: number;
  title: string;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isLoggedIn, isAdmin } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultProps[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  // console.log(isAdmin, 'am i admin????')

  useEffect(() => {
    const debouncedFetchResults = debounce(async (query: string) => {
      if (searchQuery === "") {
        setResults([]);
        return;
      }
      const res = await fetchProductsBySearch(query);
      setResults(res);
    }, 1000);

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
    enabled: isLoggedIn,
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: isLoggedIn,
  });
  const favoritesquantity = favorites?.data.length || 0;
  const cartquantity = cart?.length || 0;

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
        <div className="flex items-center gap-6">
          <div className="group relative hidden items-center justify-center md:flex">
            <Input
              type="search"
              className={cn(
                "w-full rounded-sm p-4 text-sm font-light tracking-wider placeholder:text-[10px] placeholder:text-muted-foreground/50 focus:border-[1px] md:block",
              )}
              placeholder="What are you looking for?"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Search
              size={30}
              className="pointer-events-none absolute end-2 flex items-center ps-3"
            />

            {results.length > 0 && (
              <div
                ref={resultsRef}
                className="absolute top-12 z-10 flex w-full flex-col rounded-md border border-foreground bg-white shadow-lg"
              >
                {results.map((product: SearchResultProps) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="px-4 py-2 hover:bg-accent"
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {!isAdmin && (
            <Link to="/favorites">
              {favoritesquantity > 0 ? (
                <HeartIcon size={20} fill="red" />
              ) : (
                <HeartIcon size={20} fill="none" />
              )}
            </Link>
          )}

          <Link to="/cart" className="flex gap-1">
            <LucideShoppingCart size={20} />
            {cartquantity > 0 && (
              <span className="cart-quantity rounded-full bg-primary px-2 py-1 text-xs font-light text-background">
                {cartquantity}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <Link to={`/profile`}>
              <div className="profile-badge h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-foreground/35"></div>
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
            {navLinks.map((link) => {
              if (isLoggedIn && link.label === "Sign Up") {
                return null;
              }
              return (
                <li
                  key={`mobile-nav-link-${uuidv4()}`}
                  className="nav-item nav-link my-2 block font-normal text-background"
                >
                  <Link to={link.href} onClick={handleLinkClick}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
