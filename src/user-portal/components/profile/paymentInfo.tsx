import React from "react";
import { FaCreditCard } from "react-icons/fa";

const PaymentInfo = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Payment Information</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-4">
            <FaCreditCard className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-medium">Visa ending in 1234</p>
              <p className="text-sm text-gray-500">Expires 12/2025</p>
            </div>
          </div>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2">
            Edit
          </button>
        </div>
        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2">
          Add New Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
