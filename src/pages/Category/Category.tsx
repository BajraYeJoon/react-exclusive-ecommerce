import PagesHeader from "../../components/PagesHeader/PagesHeader";

const Category = () => {
  return (
    <section className="flex flex-col gap-7 border-b border-foreground/30 pb-14 max-2xl:pb-10">
      <PagesHeader subHeading="Categories" Heading="Browse by Category" />
    </section>
  );
};

export default Category;
