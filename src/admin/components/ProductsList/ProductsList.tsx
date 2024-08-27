/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../common/ui/dialog";
import AddNewProductDialog from "./AddNewProductDialog";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { fetchAllProducts } from "../../../common/api/productApi";
import { Axios } from "../../../common/lib/axiosInstance";
import { Loading } from "../../../user-portal/site";
import { Button } from "../../../user-portal/components";
import { queryClient } from "../../../common/lib/reactQueryClient";

export default function ProductsList() {
  // const [isOpen, setOpen] = useState(true);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const deleteProduct = async (productId: number) => {
    try {
      await Axios.delete(`/product/${productId}`);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Invoice",
        cell: (info) => (
          <span className="font-medium">
            {info.getValue() as React.ReactNode}
          </span>
        ),
      },
      {
        accessorKey: "title",
        header: "Status",
      },
      {
        accessorKey: "onSale",
        header: "On Sale",
        cell: (info) => (info.getValue() === true ? "Yes" : "No"),
      },
      {
        accessorKey: "stock",
        header: "Stock Amount",
      },
      {
        accessorKey: "price",
        header: "Amount",
        cell: (info) => (
          <span className="text-right">
            ${info.getValue() as React.ReactNode}
          </span>
        ),
      },
      {
        accessorKey: "categories",
        header: "Categories",
        cell: ({ row }) => {
          console.log(row, "categories");
          return <div>hi</div>;
        },
      },
      {
        id: "edit",
        header: "Edit",
        cell: ({ row }) => (
          <button onClick={() => handleEdit(row.original)}>
            <Dialog>
              <DialogTrigger asChild>
                <FaEdit />
              </DialogTrigger>
              <DialogContent>
                <AddNewProductDialog mode="update" initialData={row.original} />
              </DialogContent>
            </Dialog>
          </button>
        ),
      },
      {
        id: "delete",
        header: "Delete",
        cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.id)}>
            <FaTrash />
          </button>
        ),
      },
    ],
    [],
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

  const handleEdit = (product: any) => {
    // Implement edit functionality here
    console.log("Edit product", product);
  };

  const handleDelete = (productId: any) => {
    deleteMutation.mutate(productId);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new Product</Button>
        </DialogTrigger>
        <DialogContent>
          <AddNewProductDialog mode="create" />
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="w-[100px]">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() && header.id !== "id" ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </TableHead>
                ))}
              </React.Fragment>
            ))}
          </TableRow>
        </TableHeader>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="pagination">
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
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Showing {table.getRowModel().rows.length} of {table.getRowCount()} Rows
      </div>
    </div>
  );
}

function Filter({ column, table }: { column: any; table: any }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 rounded border shadow"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 rounded border shadow"
      />
    </div>
  ) : (
    <input
      className="w-36 rounded border shadow"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
