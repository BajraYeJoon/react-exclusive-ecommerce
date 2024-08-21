import { Mail, PhoneIcon } from "lucide-react";
import { Button, CustomBreakcrumb } from "../../components";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any, e) => {
    console.log(data);
    e.preventDefault();

    const form = e.target;
    emailjs.sendForm(
      "service_bhxnafe",
      "template_uwb60pg",
      form,
      "NdDh9yG_33K_69phh",
    );

    if (form) {
      form.reset();
      toast.success("Message sent successfully");
    }
  };

  return (
    <section className="relative mx-8 my-6 h-fit md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <CustomBreakcrumb breadcrumbTitle="Contact Us" />

      <div className="my-8 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        <div className="flex flex-col justify-evenly gap-6 border p-5 px-8 shadow-lg">
          <div className="flex flex-col items-start gap-3 lg:gap-4">
            <h2 className="inline-flex items-center gap-3 text-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <PhoneIcon size={24} fill="white" />
              </span>
              Call to Us
            </h2>
            <p className="text-base">we are available 24/7, 7 days a week</p>
            <p className="text-base">Phone: +8801611112222</p>
            <div className="h-[2px] w-full bg-foreground/50"></div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2 className="inline-flex items-center gap-3 text-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Mail size={24} fill="white" />
              </span>
              Write to Us
            </h2>
            <p className="text-base max-2xl:text-sm">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-base max-2xl:text-sm">
              Emails: customer@exclusive.com
            </p>
            <p className="text-base max-2xl:text-sm">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>

        <form
          className="flex flex-col flex-wrap justify-between gap-10 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap items-center gap-6 *:w-full md:*:w-44">
            <input
              placeholder="your name*"
              className="bg-color-secondary rounded-sm bg-foreground/15 px-4 py-3 text-base transition-all duration-300 ease-in-out focus-within:outline-2 max-2xl:text-sm"
              type="text"
              {...register("name", { required: "Name is required" })}
            />

            <input
              placeholder="your email*"
              className="rounded-sm bg-foreground/15 px-4 py-3 text-base transition-all duration-300 ease-in-out focus-within:outline-2 max-2xl:text-sm"
              type="email"
              {...register("email", { required: "Email is required" })}
            />

            <input
              placeholder="your phone*"
              className="rounded-sm bg-foreground/15 px-4 py-3 text-base transition-all duration-300 ease-in-out focus-within:outline-2 max-2xl:text-sm"
              type="tel"
              {...register("telephone", { required: "Phone is required" })}
            />
          </div>

          <textarea
            rows={10}
            cols={10}
            placeholder="enter your message"
            className="placeholder:text-color-text-2 outline-color-secondary focus-within:outline-color-primary-1 resize-none rounded-sm bg-foreground/15 px-4 py-3 text-base transition-all duration-300 ease-in-out focus-within:outline-2 max-2xl:text-sm"
            {...register("message", { required: "Message is required" })}
          ></textarea>

          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
