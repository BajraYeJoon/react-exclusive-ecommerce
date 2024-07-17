import { Linkedin, MailCheck } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <section className="mt-16 flex flex-wrap justify-between gap-10 mx-8 lg:mx-72 pt-24 pb-6">
        <div className="flex flex-col items-start gap-3">
          <Link to="/">
            <span className="self-center text-2xl tracking-wider font-semibold ">
              Exclusive
            </span>
          </Link>
          <p className="text-sm md:text-base tracking-wider">Subscribe</p>
          <span className="text-xs md:text-sm font-extralight tracking-wide">
            Get 10% off your first order
          </span>
          <div className="search-bar hidden md:flex w-42 h-10 px-3 py-2 text-sm group bg-transparent rounded-sm border border-background  text-foreground ">
            <input
              type="search"
              className="search-input bg-transparent w-full placeholder:text-xs focus:outline-none"
              placeholder="Enter your email"
            />
            <MailCheck
              className=" search-icon my-auto"
              size={20}
              fill="#ffff"
            />
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
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="text-xs">Save 3$ with App New User Only</span>
            <div className="flex items- w-full justify-between">
              <div className="h-20 w-20 bg-background">qr code</div>
              <div className="flex flex-col gap-2">
                <img src="/footer-img/gplay.png" alt="" className="w-full" />
                <img src="/footer-img/appstore.png" alt="" className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center w-full px-4 justify-between">
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
