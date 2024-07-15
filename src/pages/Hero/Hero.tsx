import Carousel from "../../components/Carousel/carousel";

const categories = [
  { id: 1, name: "Women's Fashion" },
  { id: 2, name: "Men's Fashion" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Toys & Games" },
  { id: 6, name: "Books" },
  { id: 7, name: "Electronics" },
  {
    id: 8, name: "Beauty & Personal Care",
  }

];

const images = [
  "https://plus.unsplash.com/premium_photo-1688045722767-8d8672f6950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1720728659925-9ca9a38afb2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1720937172267-575f3575386b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
];

const Hero = () => {
  return (
    <section className="flex max-w-screen-xl py-10 lg:px-9 h-fit mx-auto justify-between items-center gap-4">
    <div className="border-r-4 w-96 flex flex-col justify-start items-center">
      <ul className="flex flex-col gap-3 font-semibold">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  
    <Carousel images={images} />
  </section>
  );
};

export default Hero;
