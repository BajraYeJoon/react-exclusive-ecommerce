import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Axios } from "../../../common/lib/axiosInstance";
import { checkoutState } from "../../atoms/checkoutState";
import { orderplaceState } from "../../atoms/orderplaceState";
import { cartState } from "../../atoms/cartState";
import { couponState } from "../../site";
import { deleteAllCartItems } from "../../api/cartApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Input } from "../../../common/ui/input";
import { Button } from "../../../common/ui/button";

type FormValues = {
  fullName: string;
  streetAddress: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  paymentMethod: "bank" | "cash" | "khalti";
};

export default function Checkout() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const checkoutValues = useRecoilValue(checkoutState);
  const resetCartAfterOrderPlace = useSetRecoilState(cartState);
  const resetCheckoutCartAfterOrderPlace = useSetRecoilState(checkoutState);
  const navigate = useNavigate();
  const [, setOrderPlaceData] = useRecoilState(orderplaceState);
  const couponCode = useRecoilValue(couponState);
  const queryClient = useQueryClient();

  const removeCartAfterOrderPlace = useMutation({
    mutationFn: deleteAllCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (orderData: any) =>
      Axios.post("/payment/intialize-payment", orderData),
    onSuccess: () => {
      toast.success("Payment successful");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const generateInvoice = (orderData: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text("Invoice", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    doc.text(`Order ID: ${orderData.id}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 37);

    doc.setFontSize(14);
    doc.text("Bill To:", 20, 50);
    doc.setFontSize(12);
    doc.text(
      `${orderData.billingInfo.firstname} ${orderData.billingInfo.lastname}`,
      20,
      57,
    );
    doc.text(orderData.billingInfo.streetaddress, 20, 64);
    doc.text(
      `${orderData.billingInfo.country}, ${orderData.billingInfo.postalcode}`,
      20,
      71,
    );
    doc.text(`Phone: ${orderData.billingInfo.phone}`, 20, 78);
    doc.text(`Email: ${orderData.billingInfo.email}`, 20, 85);

    const tableData = orderData.itemId.map((item: any) => [
      item.title,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.quantity * item.price).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 95,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { textColor: 52, fontSize: 10 },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 95;
    doc.setFontSize(12);
    doc.text(`Subtotal: $${orderData.totalPrice.toFixed(2)}`, 140, finalY + 15);
    doc.text(`Shipping: $45.00`, 140, finalY + 22);
    doc.text(
      `Discount: $${(orderData.discount || 0).toFixed(2)}`,
      140,
      finalY + 29,
    );
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total: $${(orderData.totalPrice + 45 - (orderData.discount || 0)).toFixed(2)}`,
      140,
      finalY + 38,
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your business!", 105, 280, { align: "center" });

    doc.save(`invoice_${orderData.id}.pdf`);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const orderData = {
      id: Math.random().toString(36).substr(2, 9),
      itemId: checkoutValues.cartItems.map((item: any) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      })),
      totalPrice: checkoutValues.total,
      billingInfo: {
        firstname: data.fullName.split(" ")[0],
        lastname: data.fullName.split(" ")[1] || "",
        country: data.country || "Nepal",
        streetaddress: data.streetAddress,
        postalcode: data.postalCode,
        phone: data.phone,
        email: data.email,
      },
      paymentMethod: data.paymentMethod,
      discount: couponCode ? 10 : 0, // Assuming a fixed discount for simplicity
    };

    try {
      if (data.paymentMethod === "khalti") {
        await paymentMutation.mutateAsync(orderData);
      }

      if (couponCode) {
        await Axios.post("/coupon/apply", { couponCode: couponCode });
      }

      toast.success("Order placed successfully");
      setOrderPlaceData(orderData);
      reset();
      resetCheckoutCartAfterOrderPlace({ cartItems: [], total: 0 });
      Cookies.remove("checkoutData");
      await removeCartAfterOrderPlace.mutateAsync();
      resetCartAfterOrderPlace([]);
      Cookies.set("order-placed", "true");
      navigate("/order-placed", {
        replace: true,
      });

      generateInvoice(orderData);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <section className="container mx-auto my-12 px-4 md:px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-2"
      >
        <Card className="border-none bg-background shadow-none">
          <CardHeader>
            <CardTitle>Billing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                placeholder="Full Name"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="streetAddress"
                {...register("streetAddress", {
                  required: "Street Address is required",
                })}
                placeholder="Street Address"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="country"
                {...register("country", { required: "Country is required" })}
                placeholder="Country"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="postalCode"
                {...register("postalCode", {
                  required: "Postal Code is required",
                })}
                placeholder="Postal Code"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone Number is required" })}
                placeholder="Phone Number"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
                placeholder="Email"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-background shadow-none">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {checkoutValues.cartItems.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className="h-12 w-12 object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${item.product.price.toFixed(2)}</p>
              </div>
            ))}
            <hr />
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-medium">${checkoutValues.total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p className="font-medium">$45.00</p>
            </div>
            {couponCode && (
              <div className="flex justify-between">
                <p>Discount:</p>
                <p className="font-medium text-green-600">-$10.00</p>
              </div>
            )}
            <hr />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">
                $
                {(checkoutValues.total + 45 - (couponCode ? 10 : 0)).toFixed(2)}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-x-2">
                  <input
                    type="radio"
                    value="bank"
                    id="bank"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label htmlFor="bank">Bank Transfer</label>
                </div>

                <img src="/public/card.png" alt="" />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cash"
                  id="cash"
                  {...register("paymentMethod", { required: true })}
                />
                <label htmlFor="cash">Cash on Delivery</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="khalti"
                  id="khalti"
                  {...register("paymentMethod", { required: true })}
                />
                <label htmlFor="khalti">Pay with Khalti</label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
