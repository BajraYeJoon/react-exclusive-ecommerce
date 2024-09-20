import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkoutState } from "../../atoms/checkoutState";
import { Button } from "../../../common/ui/button";
import { Fragment } from "react/jsx-runtime";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../formInput/FormInput";
import { orderplaceState } from "../../atoms/orderplaceState";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cartState } from "../../atoms/cartState";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import jsPDF from "jspdf";
// Add this line to import the 'autoTable' function
import autoTable from "jspdf-autotable";

const Checkout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const checkoutValues = useRecoilValue(checkoutState);
  const resetCartAfterOrderPlace = useSetRecoilState(cartState);
  const resetCheckoutCartAfterOrderPlace = useSetRecoilState(checkoutState);
  const Navigate = useNavigate();
  const [, setOrderPlaceData] = useRecoilState(orderplaceState);

  const generateInvoice = (orderData: any) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 10, 10);

    // Add order details
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderData.id}`, 10, 20);
    doc.text(`Total: $${orderData.total}`, 10, 30);
    doc.text(`Shipping: $${orderData.shipping}`, 10, 40);
    doc.text(`Payment Method: ${orderData.paymentMethod}`, 10, 50);

    // Add products table
    const products = orderData.products.map((item: any) => [
      item.title,
      `$${item.price}`,
    ]);

    autoTable(doc,{
      head: [["Product", "Price"]],
      body: products,
      startY: 60,
    });

    // Save PDF
    doc.save(`invoice_${orderData.id}.pdf`);
  };

  const onSubmit = (data: FieldValues) => {
    const orderData = {
      id: uuid().toString().substring(2, 15),
      billingInfo: data,
      products: productData.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
      })),
      shipping: 45,
      total: checkoutValues.total,
      paymentMethod: data.paymentMethod,
    };

    toast.success("Order placed successfully");
    setOrderPlaceData(orderData);
    reset();
    resetCheckoutCartAfterOrderPlace({ cartItems: [], total: 0 });
    Cookies.remove("checkoutData");
    resetCartAfterOrderPlace([]);
    Cookies.set("order-placed", "true");
    Navigate("/order-placed");

    // Generate PDF invoice
    generateInvoice(orderData);
  };

  const productData = checkoutValues.cartItems.map((item: any) => item.product);

  return (
    <section className="mx-64 mb-28 mt-12 max-2xl:mx-6 lg:mt-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 items-start justify-between gap-24 md:grid-cols-2"
      >
        <div className="order-1 flex flex-col gap-8 md:order-2">
          <h2 className="text-sm md:text-lg lg:text-3xl">Billing Details</h2>

          <div className="checkout-info-content flex flex-col space-y-4">
            <div className="flex w-full flex-col gap-12">
              <FormInput
                type="text"
                placeholder="Name"
                name="fullName"
                register={register}
                error={errors.fullName}
              />
              <FormInput
                type="text"
                placeholder="Company Name"
                name="companyName"
                register={register}
                error={errors.companyName}
              />
              <FormInput
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                register={register}
                error={errors.streetAddress}
              />
              <FormInput
                type="text"
                placeholder="Apartment, suite, unit etc. (optional)"
                name="apartment"
                register={register}
                error={errors.apartment}
              />
              <FormInput
                type="text"
                placeholder="Town / City"
                name="city"
                register={register}
                error={errors.city}
              />
              <FormInput
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber}
              />
              <FormInput
                type="email"
                placeholder="Email Address"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>
            <div>
              <input type="checkbox" name="save" id="save" />
              <label htmlFor="save">Save this information for next time</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-7 lg:gap-8">
          {productData.map((cartData, index) => (
            <Fragment key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 lg:gap-5">
                  <img
                    src={cartData.image[0]}
                    alt="cart images"
                    className="h-10 w-10 md:h-12 md:w-12"
                  />
                  <h4 className="text-xs md:text-lg lg:text-base">
                    {cartData.title}
                  </h4>
                </div>
                <p className="text-sm md:text-lg lg:text-xl">
                  ${cartData.price}
                </p>
              </div>
            </Fragment>
          ))}

          <div className="flex items-center justify-between border-b pb-3 text-sm lg:text-base">
            <h3>Shipping:</h3>
            <p>$45</p>
          </div>

          <div className="flex items-center justify-between text-sm lg:text-base">
            <h4>Total:</h4>
            <p>${checkoutValues.total}</p>
          </div>

          <div
            className="flex flex-col gap-4 text-sm lg:gap-4 lg:text-xl"
            id="group"
          >
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <input
                  type="radio"
                  value="bank"
                  {...register("paymentMethod")}
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <img
                src={"/card.png"}
                alt="payment card images"
                className="h-4 lg:h-6"
              />
            </div>
            <div className="space-x-3">
              <input type="radio" value="cash" {...register("paymentMethod")} />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="khalti"
                {...register("paymentMethod")}
              />
              <label htmlFor="khalti">Pay with Khalti</label>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-fit">
            Place Order
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
