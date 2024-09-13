import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Copy, CheckCircle, Calendar, Tag, DollarSign } from "lucide-react";
import { useState } from "react";
import { Axios } from "../../lib/axiosInstance";

const fetchCoupon = async () => {
  const response = await Axios.get("/coupon");
  return response;
};

export default function Component() {
  const [copied, setCopied] = useState(false);

  const {
    data: couponsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupon,
  });

  const coupons = couponsData?.data;
  console.log(coupons);

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching coupon data
      </div>
    );
  if (!coupons || coupons?.length === 0)
    return <div className="p-4 text-center">No coupon available</div>;

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {coupons.map((coupon) => (
        <motion.div
          key={coupon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 w-full overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white md:p-8 lg:p-10">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
              {coupon.name}
            </h2>
            <p className="text-lg opacity-90 md:text-xl">Limited Time Offer</p>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 text-4xl font-bold text-blue-600 md:mb-0 md:text-5xl">
                <DollarSign className="mr-2 inline-block" />
                {coupon.value.toFixed(2)}
              </div>
              <div className="text-lg font-semibold uppercase text-gray-600">
                {coupon.type === "fixed_Amount"
                  ? "Fixed Amount"
                  : "Percentage Off"}
              </div>
            </div>

            <div className="mb-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <span className="w-full rounded-lg bg-gray-100 px-6 py-3 text-center font-mono text-lg text-gray-800 sm:w-auto sm:text-xl">
                {coupon.code}
              </span>
              <button
                onClick={() => copyCode(coupon.code)}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition duration-300 hover:bg-blue-700 sm:w-auto"
              >
                {copied ? (
                  <CheckCircle className="mr-2" />
                ) : (
                  <Copy className="mr-2" />
                )}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <div className="mb-8 flex flex-col items-center justify-between text-sm text-gray-600 sm:flex-row">
              <div className="mb-2 flex items-center sm:mb-0">
                <Calendar className="mr-2" />
                <span>
                  Valid from: {new Date(coupon.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Tag className="mr-2" />
                <span>
                  Expires on:{" "}
                  {new Date(coupon.expirationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-0 -ml-3 h-6 w-6 rounded-full bg-gray-100"></div>
            <div className="absolute -top-3 right-0 -mr-3 h-6 w-6 rounded-full bg-gray-100"></div>
            <div className="my-4 border-t-2 border-dashed border-gray-300"></div>
          </div>

          <div className="bg-gray-50 p-6 md:p-8 lg:p-10">
            <p className="text-center text-gray-600">
              Use this code at checkout to get{" "}
              {coupon.type === "fixed_Amount"
                ? `$${coupon.value.toFixed(2)} off`
                : `${coupon.value}% off`}{" "}
              your purchase. Terms and conditions apply.
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
