import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";

function App() {
  const seoData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: "Exlcusive Ecommerce Website",
    description: " Get the best deals on our exclusive ecommerce website",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/JSON-LD.svg",
    datePublished: new Date("2024-07-19T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Binaya",
      url: "https://github.com/bajrayejoon",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoData),
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
