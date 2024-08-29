import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";

const products = [
  {
    productId: "PROD001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    productName: "Product A",
  },
  {
    productId: "PROD002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    productName: "Product B",
  },
  {
    productId: "PROD003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    productName: "Product C",
  },
  {
    productId: "PROD004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    productName: "Product D",
  },
  {
    productId: "PROD005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    productName: "Product E",
  },
  {
    productId: "PROD006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    productName: "Product F",
  },
  {
    productId: "PROD007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    productName: "Product G",
  },
];

function WidgetRight() {
  return (
    <Table>
      <TableCaption>A list of your recent product transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product ID</TableHead>
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
            <TableCell className="text-right">{product.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default WidgetRight;