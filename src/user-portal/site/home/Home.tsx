import { useState } from "react";
import { DiscountCard } from "../../../common/components";
import {
  Hero,
  SalesCard,
  Category,
  BestProducts,
  ArrivalProductsGrid,
  LimitedEditionCTA,
  GeneralProducts,
  ServiceDetails,
} from "../../pages";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, user: true }]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant for an e-commerce website. Provide concise answers to customer queries.",
              },
              { role: "user", content: input },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );

        const botReply = response.data.choices[0].message.content;
        setMessages((prev) => [...prev, { text: botReply, user: false }]);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I'm having trouble right now. Please try again later.",
            user: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="flex h-96 w-80 flex-col rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">AI Chatbot</h3>
            <button
              onClick={toggleChatbot}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.user ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block rounded-lg p-2 ${msg.user ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">Thinking...</div>
            )}
          </div>
          <div className="flex border-t p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-l-lg border p-2"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="rounded-r-lg bg-blue-500 px-4 text-white hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative mx-72 flex flex-col gap-28 overflow-x-hidden max-2xl:mx-6 max-2xl:gap-24">
      <Hero />
      {/* <DiscountCard /> */}
      <SalesCard />
      <Category />
      <BestProducts />
      <LimitedEditionCTA />
      <GeneralProducts />
      <ArrivalProductsGrid />
      <ServiceDetails />
      <AIChatbot />
    </div>
  );
};

export { Home };
