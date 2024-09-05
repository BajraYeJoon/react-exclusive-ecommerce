import { useQueries } from "@tanstack/react-query";
import { Users2 } from "lucide-react";
import { CiMoneyBill } from "react-icons/ci";
import { GrBasket } from "react-icons/gr";
import { fetchAllUsers } from "../../../api/fetchUser";
import { fetchAllProducts } from "../../../../common/api/productApi";
import uuidv4 from "../../../../common/lib/utils/uuid";
const FeaturedInfo = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: fetchAllUsers },
      { queryKey: ["products"], queryFn: fetchAllProducts },
      // { queryKey: ["revenue"], queryFn: fetchAllRevenue },
    ],
  });

  const usersData = results ? results[0].data : 0;
  const productsData = results[1].data;
  // const revenueData = results[2].data;

  const ANALYTIC_CARD_INFO = [
    {
      icon: Users2,
      label: "Users",
      value: usersData?.data?.length,
      generatedValue: "1500",
    },
    {
      icon: GrBasket,
      label: "Products",
      value: productsData?.length,
      generatedValue: "300",
    },
    {
      icon: CiMoneyBill,
      label: "Revenue",
      value: "$5,000",
      generatedValue: "110",
    },
  ];

  return (
    <div className="flex justify-center gap-6 lg:justify-between">
      {ANALYTIC_CARD_INFO.map(({ icon, label, generatedValue, value }) => {
        const Icon = icon;
        return (
          <div
            className="flex h-fit w-fit flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow md:w-full md:p-6"
            key={`${label}-${uuidv4()}`}
          >
            <Icon className="h-5 w-5" />
            <h1 className="text-base font-medium">{label}</h1>
            <div className="flex items-start gap-2">
              <h2 className="text-lg font-bold">{`${value}`}</h2>
              <span className="text-sm font-light">
                {generatedValue} &darr;
              </span>
            </div>
            <p className="mb-3 hidden text-xs font-normal text-gray-500 md:text-base">
              Compared to Prev 30 days.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedInfo;
