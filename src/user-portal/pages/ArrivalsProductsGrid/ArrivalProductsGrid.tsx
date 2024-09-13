import { PagesHeader } from "../../components";
import { Button } from "../../../common/ui/button";
import { NewArrivalsProductProps } from "./ArrivalsPage";
import { useQuery } from "@tanstack/react-query";
import { fetchNewArrivals } from "../../../common/api/productApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import { cn } from "../../../common/lib/utils";
import { Link } from "react-router-dom";

type GridItemProps = {
  product: NewArrivalsProductProps;
  index: number;
  additionalClasses: string;
};

const ArrivalProductsGrid = () => {
  const additionalClasses = [
    "col-span-2 md:row-span-2 lg:bg-cover",
    "col-span-2 bg-right shadow-[inset_-100px_0_100px_10px_rgba(255,255,255,0.2)] lg:bg-cover",
    "relative bg-center p-6 lg:bg-cover",
    "relative bg-center p-6 md:p-10 lg:bg-cover",
  ];

  const SkeletonGridItem = ({
    additionalClasses,
  }: {
    additionalClasses: string;
  }) => (
    <div
      className={`flex items-end rounded-sm bg-foreground p-4 md:p-6 lg:p-10 ${additionalClasses}`}
    >
      <div className="w-full space-y-2 md:space-y-4">
        <div className="space-y-2 text-background">
          <div className="h-6 w-3/4 rounded-md bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
          <div className="h-8 w-1/4 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );

  const { data: products, isLoading } = useQuery({
    queryKey: ["newarrivals"],
    queryFn: fetchNewArrivals,

    select: (products) => products.slice(0, 4),
  });

  if (isLoading) {
    return (
      <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-4 md:h-[400px] md:grid-cols-4 lg:h-[600px]">
        {additionalClasses.map((classes) => (
          <SkeletonGridItem
            key={`new-arrival-${uuidv4()}`}
            additionalClasses={classes}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="arrival-products-container flex flex-col gap-10 lg:gap-20">
      <PagesHeader
        subHeading="Featured"
        Heading="New Arrivals"
        cta="/new-arrivals"
      />
      {!products ? (
        <div>No products Found</div>
      ) : (
        <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-4 md:h-[400px] md:grid-cols-4 lg:h-[600px]">
          {products?.map((product: NewArrivalsProductProps, index: number) => (
            <GridItem
              key={product.id}
              product={product}
              index={index}
              additionalClasses={additionalClasses[index] || ""}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const GridItem = ({ product, additionalClasses }: GridItemProps) => {
  // https://haaamsknsjjifhavpila.supabase.co/storage/v1/object/public/nest-ecommerce/public/9676642f-9075-41db-a8ba-302b83b2821b-nando-jpeg-quality-001.jpg
  return (
    <div
      key={product.id}
      className={cn(
        `flex h-full w-full items-end rounded-sm bg-foreground bg-[url('${product.image[0]}')] bg-contain bg-bottom bg-no-repeat p-4 md:p-6 lg:p-6 ${additionalClasses}`,
      )}
    >
      <div className="space-y-2 md:space-y-4">
        <div className="space-y-2 text-background">
          <h3 className="text-sm md:text-base lg:text-lg">{product.title}</h3>
          <p className="text-[10px] tracking-wide text-background/60 md:text-[12px] lg:text-sm">
            {product.description.slice(0, 40)}...
          </p>
          <ShopNowButton id={product.id} />
        </div>
      </div>
    </div>
  );
};
const ShopNowButton = ({ id }: any) => (
  <Link to={`/products/${id}`}>
    <Button variant={"ghost"} size={"ghostsize"}>
      Shop Now
    </Button>
  </Link>
);

export default ArrivalProductsGrid;
