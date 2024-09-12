import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../common/ui/table";

const products = [
  {
    productId: "1",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    productName: "Product A",
  },
  {
    productId: "2",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    productName: "Product B",
  },
  {
    productId: "3",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    productName: "Product C",
  },
  {
    productId: "4",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    productName: "Product D",
  },
  {
    productId: "5",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    productName: "Product E",
  },
  {
    productId: "6",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    productName: "Product F",
  },
];

function WidgetRight() {
  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl font-medium">Recent Orders</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productId}>
              <TableCell className="font-medium">{product.productId}</TableCell>
              <TableCell>{product.paymentStatus}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell className="text-right">
                {product.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default WidgetRight;
