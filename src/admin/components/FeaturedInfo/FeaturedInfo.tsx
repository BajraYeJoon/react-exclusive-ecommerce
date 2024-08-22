import { ANALYTIC_CARD_INFO } from "../../lib/constants";

const FeaturedInfo = () => {
  return (
    <div className="w-full flex justify-between gap-6">
      {ANALYTIC_CARD_INFO.map(({ icon, label, generatedValue, value }) => (
        <div className="w-full h-fit p-6 bg-white border border-gray-200 rounded-lg shadow">
          <img
            src={icon}
            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
          />
          <h1 className="text-base font-medium">{label}</h1>
          <div className="flex items-start gap-2">
            <h2 className="text-lg font-bold">{`$${generatedValue}`}</h2>

            <span className="text-sm font-light">{value} &darr;</span>
          </div>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Compared to Prev 30 days.
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedInfo;
