interface SpotlightSectionProps {
  imgSrc: string;
  className: string;
}

const SpotlightSection = ({ imgSrc, className }: SpotlightSectionProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={imgSrc}
        alt=""
        className="h-full w-full object-cover object-[center_top_10%]" // Adjust the object position as needed
      />
    </div>
  );
};

export default SpotlightSection;
