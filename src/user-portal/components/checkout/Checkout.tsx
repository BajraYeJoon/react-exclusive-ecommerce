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
import { Label } from "../../../common/ui/label";

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
      Axios.post("/payment/initialize-payment", orderData),
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
      itemId: checkoutValues.cartItems.map((item: any) => item.product.id),
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
    };

    try {
      if (data.paymentMethod === "khalti") {
        const initializePaymentResponse =
          await paymentMutation.mutateAsync(orderData);

        if (initializePaymentResponse.data) {
          const { signature, signed_field_names } =
            initializePaymentResponse.data.paymentInitiate;
          const { transaction_uuid } = initializePaymentResponse.data;
          const total_amount =
            initializePaymentResponse.data.purchasedProduct.totalPrice;

          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
          form.style.display = "none";

          const fields = {
            amount: total_amount.toString(),
            tax_amount: "0",
            total_amount: total_amount.toString(),
            transaction_uuid: transaction_uuid,
            product_code: "EPAYTEST",
            product_service_charge: "0",
            product_delivery_charge: "0",
            success_url:
              "https://nest-ecommerce-1fqk.onrender.com/nest-/payment/verify",
            failure_url: "https://developer.esewa.com.np/failure",
            signed_field_names: signed_field_names,
            signature: signature,
          };

          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);

          return;
        }
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
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <section className="mx-64 my-12 max-2xl:mx-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-2"
      >
        <Card className="order-2 grid border-none bg-background shadow-none md:order-1">
          <CardHeader className="p-0 px-6 pb-4">
            <CardTitle className="font-light tracking-wider">
              Billing Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="font-ember text-sm text-foreground/40"
              >
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="streetAddress"
                className="font-ember text-sm text-foreground/40"
              >
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="streetAddress"
                {...register("streetAddress", {
                  required: "Street Address is required",
                })}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="font-ember text-sm text-foreground/40"
              >
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                {...register("country", { required: "Country is required" })}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="postalCode"
                className="font-ember text-sm text-foreground/40"
              >
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                {...register("postalCode", {
                  required: "Postal Code is required",
                })}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="font-ember text-sm text-foreground/40"
              >
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone Number is required" })}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-ember text-sm text-foreground/40"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 border-none bg-background shadow-none md:order-2">
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
                <p className="font-medium">
                  ${item.product.price.toFixed(2) * item.quantity}
                </p>
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
            <div className="*:text-sm">
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
