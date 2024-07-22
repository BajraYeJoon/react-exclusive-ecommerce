import { Link } from "react-router-dom";
const Favorites = () => {
  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <h1 className="text-3xl font-semibold text-gray-400">
        No items in favorites
      </h1>
      <Link to={"/products"} className="underline">
        Add some products from here....
      </Link>
    </section>
  );
};

export default Favorites;
