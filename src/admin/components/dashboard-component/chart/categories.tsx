import { useQuery } from "@tanstack/react-query";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { fetchCategories } from "../../../../common/api/categoryApi";
import { Loading } from "../../../../user-portal/site";

const defaultCategoryValues = {
	"Women's Fashion": 4000,
	"Men's Fashion": 3000,
	Sports: 2000,
	"Toys & Games": 2780,
	Books: 1890,
};

function Categories() {
	const { data: categoriesData, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		select: (data) => data.slice(0, 5),
	});

	type Category = {
		name: keyof typeof defaultCategoryValues;
	};

	const mappedCategories =
		categoriesData?.map((category: Category) => ({
			name: category.name,
			value: defaultCategoryValues[category.name] || 0,
		})) || [];

	if (isLoading) {
		return <Loading />;
	}

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={mappedCategories}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="value" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	);
}

export default Categories;
