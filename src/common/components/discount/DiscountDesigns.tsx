import { Calendar, Clock, Gift } from "lucide-react";
import type { Coupon, CouponProps } from "./DiscountCard";

const CouponValue = ({ coupon }: { coupon: Coupon }) => (
	<span className="text-lg font-medium md:text-3xl">
		{coupon.type === "fixed_amount"
			? `$${coupon.value.toFixed(2)} OFF`
			: `${coupon.value}% OFF`}
	</span>
);

const CopyButton = ({
	onClick,
	isCopied,
	startDate,
}: {
	onClick: () => void;
	isCopied: boolean;
	startDate: string;
}) => (
	<button
		type="button"
		onClick={onClick}
		className="rounded-full bg-primary px-4 py-2 text-[8px] font-light text-background transition-colors hover:bg-red-500/75 sm:text-xs"
	>
		{new Date(startDate).toLocaleDateString() ===
		new Date().toLocaleDateString() ? (
			<span>Coming Soon!!</span>
		) : (
			<>{isCopied ? "Copied!" : "Copy Code"}</>
		)}
	</button>
);

const ExpirationDate = ({ date }: { date: string }) => (
	<div className="flex items-center text-xs text-foreground/75">
		<Clock className="mr-1 h-4 w-4" />
		<span>Expires: {new Date(date).toLocaleDateString()}</span>
	</div>
);

export const CouponDesign1 = ({ coupon, onCopy, isCopied }: CouponProps) => (
	<div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 p-4 shadow-lg sm:p-6">
		<div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rotate-12 bg-yellow-400 md:z-10" />
		<h2 className="z-30 mb-2 text-sm font-bold text-foreground/85 md:text-lg lg:text-2xl">
			{coupon.name}
		</h2>
		<div className="mb-4 flex items-center">
			<CouponValue coupon={coupon} />
		</div>
		<div className="mb-4 flex flex-col items-center justify-between gap-2 md:flex-row">
			<span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-semibold text-yellow-800">
				{coupon.code}
			</span>
			<CopyButton
				onClick={() => onCopy(coupon.code)}
				isCopied={isCopied}
				startDate={coupon.startDate}
			/>
		</div>
		<ExpirationDate date={coupon.expirationDate} />
	</div>
);

export const CouponDesign2 = ({ coupon, onCopy, isCopied }: CouponProps) => (
	<div className="overflow-hidden rounded-lg bg-background shadow-lg">
		<div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-background">
			<h2 className="text-xl font-bold">{coupon.name}</h2>
		</div>
		<div className="p-6">
			<div className="mb-4 text-center">
				<CouponValue coupon={coupon} />
			</div>
			<div className="mb-4 flex items-center justify-between">
				<span className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm text-gray-800">
					{coupon.code}
				</span>
				<CopyButton
					onClick={() => onCopy(coupon.code)}
					isCopied={isCopied}
					startDate={coupon.startDate}
				/>
			</div>
			<div className="flex items-center justify-between text-xs text-gray-500">
				<div className="flex items-center">
					<Calendar className="mr-1 h-4 w-4" />
					<span>
						Valid from: {new Date(coupon.startDate).toLocaleDateString()}
					</span>
				</div>
				<ExpirationDate date={coupon.expirationDate} />
			</div>
		</div>
	</div>
);

export const CouponDesign3 = ({ coupon, onCopy, isCopied }: CouponProps) => (
	<div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-500 p-1 shadow-lg">
		<div className="rounded-lg bg-background p-5">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-gray-800">{coupon.name}</h2>
				<Gift className="h-8 w-8 text-green-500" />
			</div>
			<div className="mb-4 flex items-center justify-center">
				<CouponValue coupon={coupon} />
			</div>
			<div className="mb-4 flex items-center justify-between">
				<span className="rounded-full bg-gray-100 px-4 py-2 font-mono text-lg font-semibold text-gray-800">
					{coupon.code}
				</span>
				<CopyButton
					onClick={() => onCopy(coupon.code)}
					isCopied={isCopied}
					startDate={coupon.startDate}
				/>
			</div>
			<div className="flex items-center justify-between text-sm text-gray-600">
				<div className="flex items-center">
					<Calendar className="mr-1 h-4 w-4" />
					<span>Valid: {new Date(coupon.startDate).toLocaleDateString()}</span>
				</div>
				<ExpirationDate date={coupon.expirationDate} />
			</div>
		</div>
	</div>
);
