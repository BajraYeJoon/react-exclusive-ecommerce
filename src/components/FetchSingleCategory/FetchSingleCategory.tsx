import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const FetchSingleCategory = () => {
  const location = useLocation();

  useEffect(() => {
    const data = async () => {
      fetch(`https://dummyjson.com/products/category/${location.search}`).then(
        (res) => res.json(),
      );
    };
    data();
  }, [location.search]);

  console.log("location", location);

  return <div>FetchSingleCategory</div>;
};

export default FetchSingleCategory;
