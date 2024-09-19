import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchAllUsers } from "../../../api/fetchUser";
import { Loading } from "../../../../user-portal/site";
import { Button } from "../../../../common/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../common/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../common/ui/dialog";
import { EyeIcon } from "lucide-react";
import UserDialogContent from "../userDetail/UserDialogContent";
import { Axios } from "../../../../common/lib/axiosInstance";
import { toast } from "sonner";

export default function UserList() {
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const queryClient = useQueryClient();

  const users = usersData?.data;

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) =>
      Axios.delete(`/profile/${id}`).then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong deleting the user. Please try again");
    },
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const removeUser = async (userId: number) => {
    deleteUserMutation.mutate(userId);

    console.log("rererere");
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "User ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "createdAt",
        header: "Joined At",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-12">
            <Dialog>
              <DialogTrigger>
                <EyeIcon className="h-5 w-5" />
              </DialogTrigger>
              <DialogContent>
                <UserDialogContent info={row.original} />
              </DialogContent>
            </Dialog>
            {/* <ConfirmationDialog
              triggerText="Remove"
              title="Are you sure you want to remove this user?"
              description="This action cannot be undone."
              onConfirm={() => removeUser(row.original.id)}
              confirmText="Yes"
              cancelText="No"
            /> */}
            <Button onClick={() => removeUser(row.original.id)}>Remove</Button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: users || [],
    columns,
    pageCount: Math.ceil((users?.length || 0) / pagination.pageSize),
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full space-y-4 px-4">
      <h3 className="text-xl font-medium md:hidden">Users</h3>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-2 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <span className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
