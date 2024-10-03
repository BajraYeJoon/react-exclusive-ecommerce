import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import uuidv4 from "../../../common/lib/utils/uuid";

const faqData = [
	{
		question: "What are your shipping options and how long will delivery take?",
		answer:
			"We offer several shipping options: - Standard shipping (3-5 business days) - Express shipping (1-2 business days) - Overnight shipping (next business day) Delivery times may vary depending on your location. You can view estimated delivery dates at checkout.",
	},
	{
		question: "What is your return policy?",
		answer:
			"We offer a 30-day return policy for most items. Products must be unused, unworn, and in their original packaging. To initiate a return, please log into your account and go to the 'Orders' section, or contact our customer service team.",
	},
	{
		question: "How can I track my order?",
		answer:
			"Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package on our website or directly on the carrier's site. You can also view your order status by logging into your account and going to the 'Orders' section.",
	},
	{
		question: "Do you offer international shipping?",
		answer:
			"Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see if we ship to your country and view shipping rates during the checkout process. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the customer.",
	},
];

const Faq = () => {
	return (
		<section className="mx-auto max-w-7xl mb-8 px-4 sm:px-6 lg:px-8">
			<div className="mb-2">
				<h6 className="mb-2 text-center sm:text-base text-xs md:text-lg font-medium text-indigo-600">
					FAQs
				</h6>
				<h2 className="font-manrope text-center text-xl md:text-2xl lg:text-4xl font-bold leading-[3.25rem] text-gray-900">
					Frequently asked questions
				</h2>
			</div>

			<div className="space-y-4">
				{faqData.map((item) => (
					<details
						key={`faq-${uuidv4()}`}
						className="group border border-gray-200 rounded-lg p-4 transition-all duration-500 ease-in-out"
					>
						<summary className="cursor-pointer text-sm sm:text-base md:text-lg font-medium text-gray-900 group-hover:text-primary transition duration-300 flex justify-between items-center">
							{item.question}
							<span className="ml-2 group-open:hidden">
								<FaChevronDown />
							</span>
							<span className="ml-2 hidden group-open:block">
								<FaChevronUp />
							</span>
						</summary>
						<p className="mt-2 text-xs sm:text-sm  md:text-base leading-6 text-gray-700 transition-opacity duration-500 ease-in-out group-open:opacity-100 group-open:max-h-screen max-h-0 overflow-hidden">
							{item.answer}
						</p>
					</details>
				))}
			</div>
		</section>
	);
};

export default Faq;