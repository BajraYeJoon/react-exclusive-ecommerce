import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../common/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../common/ui/tabs";
import Sales from "./sales";
import Categories from "./categories";
import Order from "./order";

export default function EcommerceAdminDashboard() {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <Card className="charts mx-auto w-full">
      <CardHeader>
        <CardTitle>Charts</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex h-fit flex-wrap">
            <TabsTrigger value="sales">Monthly Sales</TabsTrigger>
            <TabsTrigger value="categories">Product Categories</TabsTrigger>
            <TabsTrigger value="orders">Order Status</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <Sales />
          </TabsContent>
          <TabsContent value="categories">
            <Categories />
          </TabsContent>
          <TabsContent value="orders">
            <Order />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
