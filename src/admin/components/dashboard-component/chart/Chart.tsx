import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../common/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../common/ui/tabs";

// Dummy data for e-commerce charts
const monthlySalesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Apr", sales: 4780, orders: 268 },
  { month: "May", sales: 5890, orders: 320 },
  { month: "Jun", sales: 6390, orders: 358 },
  { month: "Jul", sales: 7490, orders: 400 },
];

const categoryData = [
  { name: "Electronics", value: 4000 },
  { name: "Clothing", value: 3000 },
  { name: "Books", value: 2000 },
  { name: "Home & Garden", value: 2780 },
  { name: "Sports", value: 1890 },
];

const customerDemographics = [
  { age: "18-24", male: 400, female: 500 },
  { age: "25-34", male: 800, female: 1000 },
  { age: "35-44", male: 1000, female: 1100 },
  { age: "45-54", male: 600, female: 800 },
  { age: "55+", male: 400, female: 500 },
];

const orderStatusData = [
  { name: "Completed", value: 5400 },
  { name: "Processing", value: 1200 },
  { name: "Shipped", value: 2400 },
  { name: "Cancelled", value: 400 },
];

export default function EcommerceAdminDashboard() {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Charts</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex h-fit flex-wrap justify-between">
            <TabsTrigger value="sales">Monthly Sales</TabsTrigger>
            <TabsTrigger value="categories">Product Categories</TabsTrigger>
            <TabsTrigger value="demographics">
              Customer Demographics
            </TabsTrigger>
            <TabsTrigger value="orders">Order Status</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="red"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="categories">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="demographics">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={customerDemographics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="male"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="female"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="orders">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={orderStatusData}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
