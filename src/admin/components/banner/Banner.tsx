import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "../../../common/ui/button";
import { fetchHeroBanner } from "../../../common/api/bannerApi";
import uuidv4 from "../../../common/lib/utils/uuid";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { DeleteIcon, Edit2, PlusCircle, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "../../../common/ui/checkbox";
import { fetchAllProducts } from "../../../common/api/productApi";

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    imageUrl: "/placeholder.svg?height=200&width=400",
    targetUrl: "/summer-sale",
    status: "Active",
  },
  {
    id: 2,
    title: "New Collection",
    imageUrl: "/placeholder.svg?height=200&width=400",
    targetUrl: "/new-collection",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Holiday Special",
    imageUrl: "/placeholder.svg?height=200&width=400",
    targetUrl: "/holiday-special",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Flash Deal",
    imageUrl: "/placeholder.svg?height=200&width=400",
    targetUrl: "/flash-deal",
    status: "Active",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
  const statusClasses = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
    Scheduled: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}
    >
      {status}
    </span>
  );
};

interface Product {
  id: string;
  name: string;
  price: number;
}

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
];

export default function Banner() {
  const { data: bannerData, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchHeroBanner,
  });

  const { data: products, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const table = useReactTable({
    data: products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const banners = bannerData?.bannerData;
  console.log(banners);

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
        <Dialog>
          <DialogTrigger>
            <Button className="flex items-center">
              <PlusCircle className="mr-2" />
              Add New Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Select Products</DialogTitle>
            </DialogHeader>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading products</div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            <Button>Done</Button>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {banners &&
          banners.map((banner) => (
            <div
              key={`banner-${uuidv4()}`}
              className="flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={banner.image[0]}
                alt={banner.title}
                className="h-56 w-full object-cover md:h-48 md:w-full"
              />
              <div className="p-4">
                <h2 className="mb-2 text-base font-semibold text-gray-800">
                  {banner.title}
                </h2>
                <p className="mb-2 text-sm text-gray-600">
                  Target: "/target-url"
                </p>
                <StatusBadge status={banner.brand} />
              </div>
              <div className="flex flex-col justify-between gap-4 bg-gray-50 p-4 md:flex-row">
                <Button variant="secondary" className="flex items-center">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <ConfirmationDialog
                  triggerText={
                    <>
                      <Trash2Icon className="mr-2" /> Delete
                    </>
                  }
                  title="Delete Banner"
                  description="Are you sure you want to delete this banner?"
                  onConfirm={() => console.log("Delete banner")}
                  confirmText="Delete"
                  cancelText="No"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
