import { Button } from "../../../common/ui/button";
import { Card, CardContent } from "../../../common/ui/card";
import { CartItem } from "./Checkout";

type CheckoutValues = {
    cartItems: CartItem[];
    cartTotal: number;
    subTotal: number;
}

export const OrderSummary = ({
  checkoutValues,
  couponCode,
  register,
}: {
  checkoutValues: CheckoutValues;
  couponCode: string | null;
  register: any;
}) => (
  <Card className="order-1 border-none bg-background shadow-none md:order-2">
    <CardContent className="space-y-4">
      {checkoutValues.cartItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={`Product ${item.id}`}
              className="h-12 w-12 object-cover"
            />
            <div>
              <p className="text-sm font-normal">{item.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
          <p className="font-medium">${item.total}</p>
        </div>
      ))}
      <hr />
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p className="font-medium">${checkoutValues.subTotal.toFixed(2)}</p>
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
          ${(checkoutValues.subTotal + 45 - (couponCode ? 10 : 0)).toFixed(2)}
        </p>
      </div>
      <div className="*:text-sm">
        {["bank", "cash", "khalti"].map((method) => (
          <div key={method} className="flex items-center space-x-2">
            <input
              type="radio"
              value={method}
              id={method}
              {...register("paymentMethod", { required: true })}
            />
            <label htmlFor={method}>
              {method === "bank"
                ? "Bank Transfer"
                : method === "cash"
                  ? "Cash on Delivery"
                  : "Pay with Khalti"}
            </label>
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full">
        Place Order
      </Button>
    </CardContent>
  </Card>
);
