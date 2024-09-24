import React from "react";
import { Facebook, Instagram, Linkedin, MailCheck, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const footerData = {
  sections: [
    {
      title: "Support",
      items: [
        "Bhaktapur, DH 1515, Bhaktapur.",
        "binaya.bajrashakya@gmail.com",
        "+977 9860 756619",
      ],
    },
    {
      title: "About",
      items: ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"],
    },
    {
      title: "Information",
      items: ["Privacy Policy", "Terms & Conditions", "Contact Us"],
    },
  ],
};

interface FooterSectionProps {
  title: string;
  items: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold tracking-wider">{title}</h3>
      {items.map((item, index) => (
        <p key={index} className="text-sm font-light">
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <section className="mx-72 flex flex-wrap gap-10 pb-6 pt-24 max-2xl:mx-8 md:justify-start lg:justify-between">
        <SubscribeSection />
        {footerData.sections.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
        <FollowUsSection />
      </section>
    </footer>
  );
};

export default Footer;

const SubscribeSection: React.FC = () => {
  return (
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
  );
};

const FollowUsSection: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold tracking-wider">Follow Us</h3>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-xs">Save 3$ with App New User Only</span>
        <div className="items- flex w-full justify-between">
          <QrCode className="h-20 w-20" />
          <div className="flex flex-col gap-2">
            <img
              src="/footer-img/gplay.png"
              alt="Googe play"
              className="w-full"
            />
            <img
              src="/footer-img/appstore.png"
              alt="Apple Store"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex aspect-auto w-full items-center justify-between px-4">
        <Facebook />
        <Instagram />
        <Linkedin />
        <MailCheck />
      </div>
    </div>
  );
};
