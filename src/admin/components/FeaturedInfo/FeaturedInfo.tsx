import { ANALYTIC_CARD_INFO } from "../../lib/constants";

const FeaturedInfo = () => {
  return (
    <div className="flex w-full justify-between gap-6">
      {ANALYTIC_CARD_INFO.map(({ icon, label, generatedValue, value }) => {
        const Icon = icon;
        return (
          <div className="flex h-fit w-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow">
            <Icon className="h-5 w-5" />
            <h1 className="text-base font-medium">{label}</h1>
            <div className="flex items-start gap-2">
              <h2 className="text-lg font-bold">{`$${generatedValue}`}</h2>

              <span className="text-sm font-light">{value} &darr;</span>
            </div>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Compared to Prev 30 days.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedInfo;
