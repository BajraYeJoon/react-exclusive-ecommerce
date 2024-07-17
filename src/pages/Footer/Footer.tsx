import { Linkedin, MailCheck } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <section className="mx-72 mt-16 flex flex-wrap gap-10 pb-6 pt-24 max-2xl:mx-8 md:justify-start lg:justify-between">
        <div className="flex flex-col items-start gap-3">
          <Link to="/">
            <span className="self-center text-2xl font-semibold tracking-wider">
              Exclusive
            </span>
          </Link>
          <p className="text-sm tracking-wider md:text-base">Subscribe</p>
          <span className="text-xs font-extralight tracking-wide md:text-sm">
            Get 10% off your first order
          </span>
          <div className="search-bar w-42 group hidden h-10 rounded-sm border border-background bg-transparent px-3 py-2 text-sm text-foreground md:flex">
            <input
              type="search"
              className="search-input w-full bg-transparent placeholder:text-xs focus:outline-none"
              placeholder="Enter your email"
            />
            <MailCheck className="search-icon my-auto" size={20} fill="#ffff" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-semibold tracking-wider">Support</h3>
          <p className="text-sm font-light">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-sm font-light">exclusive@gmail.com</p>
          <p className="text-sm font-light">+880 123 456 7890</p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-semibold tracking-wider">About</h3>
          <p className="text-sm font-light">My Account</p>
          <p className="text-sm font-light">Login / Register</p>
          <p className="text-sm font-light">Cart</p>
          <p className="text-sm font-light">Wishlist</p>
          <p className="text-sm font-light">Shop</p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-semibold tracking-wider">Information</h3>
          <p className="text-sm font-light">Privacy Policy</p>
          <p className="text-sm font-light">Terms & Conditions</p>
          <p className="text-sm font-light">Contact Us</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-semibold tracking-wider">Follow Us</h3>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xs">Save 3$ with App New User Only</span>
            <div className="items- flex w-full justify-between">
              <div className="h-20 w-20 bg-background">qr code</div>
              <div className="flex flex-col gap-2">
                <img src="/footer-img/gplay.png" alt="" className="w-full" />
                <img src="/footer-img/appstore.png" alt="" className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <FaFacebook />
            <BsInstagram />
            <Linkedin />
            <MailCheck />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
