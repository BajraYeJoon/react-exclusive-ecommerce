import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { favoriteState } from "../../atoms/favoriteState";
import ProductCard from "../ProductCard/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
const Favorites = () => {
  const addedFavoritesProductInfo = useRecoilValue(favoriteState);

  console.log("addedFavoritesProductInfo", addedFavoritesProductInfo);

  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">
              favorites ({addedFavoritesProductInfo.length})
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {addedFavoritesProductInfo.length === 0 ? (
        <div className="my-12 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-semibold text-gray-400">
            No items in favorites
          </h1>
          <Link to={"/products"} className="underline">
            Add some products from here....
          </Link>
        </div>
      ) : (
        <div className="product-card-container flex w-full flex-wrap items-center justify-start gap-4 overflow-hidden">
          {addedFavoritesProductInfo.map((favProduct) => (
            <ProductCard
              key={favProduct.id}
              {...favProduct}
              image={favProduct.image}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
