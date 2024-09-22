import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { Button } from "../../../common/ui/button";
import { fetchHeroBanner } from "../../../common/api/bannerApi";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
import { PlusCircle, Trash2Icon } from "lucide-react";
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
import { createBanner, deleteBanner } from "../../api/createBanner";
import { toast } from "sonner";
import { AnalyticsCardSkeleton } from "../dashboard-component/featuredInfo/FeaturedInfo";
import uuidv4 from "../../../common/lib/utils/uuid";


interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
}

export default function Banner() {
  const { data: bannerData, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchHeroBanner,
  });

  const [bannerItem, setBannerItem] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleCheckboxChange = (productId: number) => {
    setBannerItem((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [productId];
      }
    });
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "select",
        cell: ({ row }) => {
          return (
            <input
              type="radio"
              checked={bannerItem.includes(row?.original?.id)}
              onChange={() => handleCheckboxChange(row.original.id)}
            />
          );
        },
      },
      {
        accessorKey: "title",
        header: "Product Name",
        cell: ({ row }) => {
          return <h2>{row.original.title}</h2>;
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          return <div>${row.original.price}</div>;
        },
      },
    ],
    [bannerItem],
  );

  const table = useReactTable({
    data: products || [],
    columns,
    pageCount: Math.ceil((products?.length || 0) / pagination.pageSize),
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const banners = bannerData?.bannerData;

  const bannerMutation = useMutation({
    mutationFn: () => createBanner(bannerItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner created successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: (bannerId: number) => deleteBanner(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 md:text-2xl">
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
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <React.Fragment key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="w-[100px]">
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                                {header.column.getCanFilter() &&
                                header.id !== "id" ? (
                                  <div>
                                    <Filter
                                      column={header.column}
                                      table={table}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </TableHead>
                          ))}
                        </React.Fragment>
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
            </DialogDescription>

            <Button onClick={() => bannerMutation.mutate()}>Done</Button>

            <div className="pagination flex items-center justify-center gap-3">
              <button
                className="rounded border p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="rounded border p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="rounded border p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="rounded border p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  min="1"
                  max={table.getPageCount()}
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 rounded border p-1"
                />
              </span>
            </div>
            <div className="text-center">
              Showing {table.getRowModel().rows.length} of {table.getRowCount()}{" "}
              Rows
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map(() => (
              <AnalyticsCardSkeleton key={`skeleton-${uuidv4()}`} />
            ))}
          </>
        ) : (
          <>
            {banners?.map((banner: any) => (
              <div
                key={`banner-${banner.id}`}
                className="flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={banner.image[0]}
                  alt={banner.title}
                  className="h-24 w-full object-cover md:h-48 md:w-full"
                />
                <div className="p-2 md:p-4">
                  <h2 className="mb-2 text-sm font-semibold text-gray-800 md:text-base">
                    {banner.title}
                  </h2>

                  <span className="text-xs font-medium text-gray-600">
                    {banner?.brand}
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-2 p-2 md:flex-row">
                  <ConfirmationDialog
                    triggerComponent={
                      <>
                        <Trash2Icon className="mr-2" size={14} /> Delete
                      </>
                    }
                    title="Delete Banner"
                    description="Are you sure you want to delete this banner?"
                    onConfirm={() => deleteBannerMutation.mutate(banner.id)}
                    confirmText="Delete"
                    cancelText="No"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}