import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCircle,
  Calendar,
  Tag,
  DollarSign,
  Percent,
  Clock,
  Gift,
} from "lucide-react";
import { useState } from "react";
import { Axios } from "../../lib/axiosInstance";

// Types
interface Coupon {
  id: string;
  name: string;
  code: string;
  type: "fixed_Amount" | "percentage";
  value: number;
  startDate: string;
  expirationDate: string;
}

interface CouponProps {
  coupon: Coupon;
  onCopy: (code: string) => void;
  isCopied: boolean;
}

const fetchCoupons = async (): Promise<Coupon[]> => {
  const response = await Axios.get("/coupon");
  return response.data;
};

const CouponDesign1: React.FC<CouponProps> = ({ coupon, onCopy, isCopied }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg"
  >
    <div className="absolute -right-4 -top-4 h-24 w-24 rotate-12 bg-yellow-400" />
    <div className="p-6">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">{coupon.name}</h2>
      <div className="mb-4 flex items-center">
        {coupon.type === "fixed_Amount" ? (
          <DollarSign className="mr-1 h-6 w-6 text-green-600" />
        ) : (
          <Percent className="mr-1 h-6 w-6 text-blue-600" />
        )}
        <span className="text-3xl font-bold text-gray-900">
          {coupon.type === "fixed_Amount"
            ? `$${coupon.value.toFixed(2)} OFF`
            : `${coupon.value} OFF`}
        </span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-semibold text-yellow-800">
          {coupon.code}
        </span>
        <button
          onClick={() => onCopy(coupon.code)}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          aria-label={isCopied ? "Copied" : "Copy code"}
        >
          {isCopied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Clock className="mr-1 h-4 w-4" />
        <span>
          Expires: {new Date(coupon.expirationDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  </motion.div>
);

const CouponDesign2: React.FC<CouponProps> = ({ coupon, onCopy, isCopied }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-lg bg-white shadow-lg"
  >
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
      <h2 className="text-xl font-bold">{coupon.name}</h2>
    </div>
    <div className="p-6">
      <div className="mb-4 text-center">
        <span className="text-4xl font-bold text-indigo-600">
          {coupon.type === "fixed_Amount"
            ? `$${coupon.value.toFixed(2)}`
            : `${coupon.value}`}
        </span>
        <span className="ml-1 text-lg font-semibold text-gray-600">OFF</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm text-gray-800">
          {coupon.code}
        </span>
        <button
          onClick={() => onCopy(coupon.code)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
          aria-label={isCopied ? "Copied" : "Copy code"}
        >
          {isCopied ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          <span>
            Valid from: {new Date(coupon.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <Tag className="mr-1 h-4 w-4" />
          <span>
            Expires: {new Date(coupon.expirationDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const CouponDesign3: React.FC<CouponProps> = ({ coupon, onCopy, isCopied }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-500 p-1 shadow-lg"
  >
    <div className="rounded-lg bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{coupon.name}</h2>
        <Gift className="h-8 w-8 text-green-500" />
      </div>
      <div className="mb-4 flex items-center justify-center">
        <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent">
          {coupon.type === "fixed_Amount"
            ? `$${coupon.value.toFixed(2)}`
            : `${coupon.value}%`}
        </span>
        <span className="ml-2 text-2xl font-bold text-gray-600">OFF</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-gray-100 px-4 py-2 font-mono text-lg font-semibold text-gray-800">
          {coupon.code}
        </span>
        <button
          onClick={() => onCopy(coupon.code)}
          className="rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 text-sm font-bold text-white transition-all hover:from-green-500 hover:to-blue-600"
          aria-label={isCopied ? "Copied" : "Copy code"}
        >
          {isCopied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Valid: {new Date(coupon.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span>
            Expires: {new Date(coupon.expirationDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Main Component
export default function EnhancedCoupons() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const {
    data: coupons,
    isLoading,
    error,
  } = useQuery<Coupon[]>({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (isLoading)
    return <div className="p-4 text-center">Loading coupons...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching coupon data
      </div>
    );
  if (!coupons || coupons.length === 0)
    return <div className="p-4 text-center">No coupons available</div>;

  const getCouponDesign = (index: number, coupon: Coupon) => {
    const designs = [CouponDesign1, CouponDesign2, CouponDesign3];
    const DesignComponent = designs[index % designs.length];
    return (
      <DesignComponent
        key={coupon.id}
        coupon={coupon}
        onCopy={copyCode}
        isCopied={copiedCode === coupon.code}
      />
    );
  };

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Available Coupons
      </h1>
      <AnimatePresence>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon, index) => getCouponDesign(index, coupon))}
        </div>
      </AnimatePresence>
    </div>
  );
}
