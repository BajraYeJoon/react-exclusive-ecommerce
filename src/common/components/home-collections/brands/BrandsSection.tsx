import BrandsDisplay from "./BrandsDisplay";

interface BrandSectionProps {
  logoSrc: string;
  brandName: string;
  slideDelay: number;
  logoWidth: string;
  className: string;
}

const BrandSection = ({
  logoSrc,
  brandName,
  slideDelay,
  logoWidth,
  className,
}: BrandSectionProps) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <img
        src={logoSrc}
        alt={brandName}
        className={`absolute left-4 top-20 z-20 mb-4 ${logoWidth} object-contain object-top md:top-56`}
      />
      <BrandsDisplay brandName={brandName} slideDelay={slideDelay} />
    </div>
  );
};

export default BrandSection;
