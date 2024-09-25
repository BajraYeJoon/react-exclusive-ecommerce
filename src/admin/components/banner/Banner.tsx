import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { Button } from "../../../common/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchAllProducts } from "../../../common/api/productApi";
import { Filter } from "../productsList/ProductsList";
import { toast } from "sonner";
import { AnalyticsCardSkeleton } from "../dashboard-component/featuredInfo/FeaturedInfo";
import uuidv4 from "../../../common/lib/utils/uuid";
import { fetchHeroBanner } from "../../../common/api/bannerApi";
import { createBanner, deleteBanner } from "../../api/createBanner";
import { BannerCard } from "./BannerCard";

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
}

export interface Banner {
  id: number;
  title: string;
  brand: string;
  image: string[];
}

interface BannerApiResponse {
  bannerData: Banner[];
}

const BannerManagement = () => {
  const queryClient = useQueryClient();

  const { data: bannerData, isLoading: isBannersLoading } = useQuery<
    BannerApiResponse,
    Error
  >({
    queryKey: ["banners"],
    queryFn: fetchHeroBanner,
  });
  const banners = bannerData?.bannerData;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: products } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
  console.log(products, "produyccccttss");

  const [selectedBannerItems, setSelectedBannerItems] = useState<number[]>([]);

  const handleCheckboxChange = (productId: number) => {
    setSelectedBannerItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const bannerMutation = useMutation<void, Error, void>({
    mutationFn: () => createBanner(selectedBannerItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteBannerMutation = useMutation<void, Error, number>({
    mutationFn: (bannerId: number) => deleteBanner(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "select",
        cell: ({ row }) => (
          <input
            type="radio"
            checked={selectedBannerItems.includes(row.original.id)}
            // disabled={}
            onChange={() => handleCheckboxChange(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "title",
        header: "Product Name",
        cell: ({ row }) => <h2>{row.original.title}</h2>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <div>${row.original.price}</div>,
      },
    ],
    [selectedBannerItems],
  );

  const table = useReactTable({
    data: products || [],
    columns,
    pageCount: Math.ceil((products?.length ?? 0) / pagination.pageSize),
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground md:text-2xl">
          Banner Management
        </h1>
        <Dialog>
          <DialogTrigger>
            <Button className="flex items-center">
              <PlusCircle className="mr-2" size={14} />
              Add New Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Select Products</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {isBannersLoading ? (
                <div>Loading...</div>
              ) : (
                <ProductTable table={table} />
              )}
            </DialogDescription>
            <Button onClick={() => bannerMutation.mutate()}>Done</Button>
          </DialogContent>
        </Dialog>
      </header>
      <BannerGrid
        banners={banners}
        isLoading={isBannersLoading}
        deleteBannerMutation={deleteBannerMutation}
      />
    </div>
  );
};

export default BannerManagement;

interface ProductTableProps {
  table: ReturnType<typeof useReactTable<Product>>;
}

const ProductTable: React.FC<ProductTableProps> = ({ table }) => (
  <div className="h-[600px] overflow-y-scroll rounded-md border">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                <div
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : null}
                  {header.column.getCanFilter() && header.id !== "id" && (
                    <Filter column={header.column} table={table} />
                  )}
                </div>
              </TableHead>
            ))}
          </React.Fragment>
        ))}
      </TableHeader>
      {table.getRowModel().rows.length ? (
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableCell
            colSpan={table.getHeaderGroups().length}
            className="w- h-24 text-center"
          >
            No results.
          </TableCell>
        </TableBody>
      )}
    </Table>
  </div>
);

interface BannerGridProps {
  banners: Banner[] | undefined;
  isLoading: boolean;
  deleteBannerMutation: ReturnType<typeof useMutation<void, Error, number>>;
}

const BannerGrid = ({
  banners,
  isLoading,
  deleteBannerMutation,
}: BannerGridProps) => {
  if (banners?.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-600">
        No banners available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map(() => (
            <AnalyticsCardSkeleton key={uuidv4()} />
          ))}
        </>
      ) : (
        <>
          {banners?.map((banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              deleteBannerMutation={deleteBannerMutation}
            />
          ))}
        </>
      )}
    </div>
  );
};
