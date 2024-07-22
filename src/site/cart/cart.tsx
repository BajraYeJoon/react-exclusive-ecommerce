import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components";
import { useRecoilValue } from "recoil";
import { cartState } from "../../atoms/cartState";

const cartHeaderData = [
  { label: "Price" },
  { label: "Quantity" },
  { label: "Total" },
];

const Cart = () => {
  const cartItems = useRecoilValue(cartState);

  if (cartItems.length === 0) {
    return (
      <section className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-400">
          No items in cart
        </h1>
      </section>
    );
  }

  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <>
        <h1>
          {cartItems.map((item) => (
            <div key={item.id}>
              {item.price} - {item.quantity}
            </div>
          ))}
        </h1>
      </>

      <div className="grid grid-cols-2 py-6 text-foreground/40">
        <div className="text-xl font-normal leading-8">Product</div>
        <p className="hidden items-center justify-between text-xl font-normal leading-8 sm:flex">
          <span className={`w-full text-center`}>
            {cartHeaderData[0].label}
          </span>
          <span className={`w-full text-center`}>
            {cartHeaderData[1].label}
          </span>
          <span className={`w-full text-center`}>
            {cartHeaderData[2].label}
          </span>
        </p>
      </div>

      <div className="border-b-2 md:my-4">
        {cartItems.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-6 md:grid-cols-2">
            <div className="col-span-2 flex w-full items-center gap-3 md:col-span-1">
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 rounded-md"
              />
              <h5 className="text-sm font-medium text-black md:text-base">
                {item.title}
              </h5>
            </div>
            <div className="flex w-fit flex-col items-center justify-around gap-2 sm:flex-row md:w-full">
              <h6 className="text-center text-sm font-medium leading-9 text-foreground md:text-base">
                {item.price}{" "}
              </h6>
              <div className="flex items-center justify-center rounded-md border p-1">
                <input
                  type="text"
                  className="max-w-12 px-4"
                  placeholder={item.quantity.toString()}
                />
                <div className="flex flex-col items-center justify-center">
                  <ChevronUp size={14} />
                  <ChevronDown size={14} />
                </div>
              </div>
              <h6 className="text-center text-sm font-medium leading-9 md:text-lg">
                {item.price * item.quantity}
              </h6>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <Button className="w-full">Add Coupon Code</Button>
        </div>
        <div className="mb-8 w-full max-w-sm rounded-md border border-foreground/50 p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Sub Total
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              $360.00
            </h6>
          </div>

          <div className="flex w-full items-center justify-between border-b border-gray-200 pb-6">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Shipping Charge
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              $45.00
            </h6>
          </div>
          <div className="flex w-full items-center justify-between py-6">
            <p className="text-lg font-medium leading-9 text-gray-900 md:text-2xl">
              Total
            </p>
            <h6 className="text-lg font-medium leading-9 md:text-2xl">
              $405.00
            </h6>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </section>
  );
};

export { Cart };
