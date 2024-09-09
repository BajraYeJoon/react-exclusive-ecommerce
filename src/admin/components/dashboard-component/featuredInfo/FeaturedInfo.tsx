import { useQueries } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import { CiMoneyBill } from "react-icons/ci";
import { GrBasket } from "react-icons/gr";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../common/ui/card";

import { Badge } from "../../../../common/ui/badge";
import { fetchAllUsers } from "../../../api/fetchUser";
import { fetchAllProducts } from "../../../../common/api/productApi";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "../../../../common/ui/skeleton";

const FeaturedInfo = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: fetchAllUsers },
      { queryKey: ["products"], queryFn: fetchAllProducts },
      // { queryKey: ["revenue"], queryFn: fetchAllRevenue },
    ],
  });

  const loader = results.some((result) => result.isLoading);

  const usersData = results[0].data?.data?.length || 0;
  const productsData = results[1].data?.length || 0;
  // const revenueData = results[2].data

  const ANALYTIC_CARD_INFO = [
    {
      icon: Users2,
      label: "Users",
      value: usersData,
      generatedValue: 15,
      trend: "up" as const,
    },
    {
      icon: GrBasket,
      label: "Products",
      value: productsData,
      generatedValue: 3,
      trend: "up" as const,
    },
    {
      icon: CiMoneyBill,
      label: "Revenue",
      value: "$5,000",
      generatedValue: 11,
      trend: "down" as const,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loader ? (
        <>
          {Array.from({ length: 3 }).map(() => (
            <AnalyticsCardSkeleton key={`skeleton-${uuidv4()}`} />
          ))}
        </>
      ) : (
        <>
          {ANALYTIC_CARD_INFO.map(
            ({ icon: Icon, label, value, generatedValue, trend }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={`${label}-${uuidv4()}`}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground">
                          vs. previous 30 days
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-2">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <Badge
                        variant={trend === "up" ? "default" : "destructive"}
                      >
                        {trend === "up" ? "↑" : "↓"} {Math.abs(generatedValue)}%
                      </Badge>
                      <span className="text-xs font-medium">
                        {trend === "up" ? "Increase" : "Decrease"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ),
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedInfo;

function AnalyticsCardSkeleton() {
  return (
    <Card className="bg-background">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle>
          <Skeleton className="h-4 w-[100px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-4 w-[70px]" />
        </div>
      </CardContent>
    </Card>
  );
}