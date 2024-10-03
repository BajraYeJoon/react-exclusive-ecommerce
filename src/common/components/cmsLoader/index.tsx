export function StatsLoader() {
	return (
		<div className="flex justify-center gap-12">
			{[1, 2, 3, 4].map((index) => (
				<div
					key={index}
					className="h-32 w-1/4 animate-pulse rounded bg-gray-200"
				></div>
			))}
		</div>
	);
}

export function StoryLoader() {
	return (
		<div className="flex w-full flex-col items-center justify-between gap-1 md:flex-row">
			<div className="flex w-full flex-auto flex-col gap-8">
				<div className="h-12 animate-pulse rounded bg-gray-200"></div>
				<div className="h-24 animate-pulse rounded bg-gray-200"></div>
			</div>
			<div className="h-[200px] w-full flex-auto animate-pulse rounded bg-gray-200 md:h-[300px]"></div>
		</div>
	);
}

export function EmployeeLoader() {
	return (
		<div className="flex items-center justify-center gap-7">
			{[1, 2, 3].map((index) => (
				<div key={index} className="h-auto w-96 animate-pulse rounded">
					<div className="mb-4 h-20 w-20 rounded-full bg-gray-200"></div>

					<div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>

					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>

					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
				</div>
			))}
		</div>
	);
}

export function ServiceLoader() {
	return (
		<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
			{[1, 2, 3].map((index) => (
				<div
					key={index}
					className="flex h-auto w-96 animate-pulse flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-md"
				>
					<div className="mb-4 h-20 w-20 rounded-full bg-gray-200"></div>

					<div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>

					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
				</div>
			))}
		</div>
	);
}
