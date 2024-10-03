import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	useReactTable,
	ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
	FilterFn,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../common/ui/table";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "../../../common/ui/dialog";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { fetchAllProducts } from "../../../common/api/productApi";
import { Axios } from "../../../common/lib/axiosInstance";
import { Button } from "../../../common/ui/button";
import { useRecoilState } from "recoil";
import { flashSaleState } from "../../../user-portal/atoms/flashSaleState";
import { DatePickerWithRange } from "../flashSaleCards/FlashSalePicker";
import ProductDetails from "./ProductDetails";
import uuidv4 from "../../../common/lib/utils/uuid";
import AddNewProductDialog from "./AddNewProductDialog";
import UpdateProductForm from "./UpdateP";
import ConfirmationDialog from "../confirmation/ConfirmationDialog";
// import { useSearchParams } from "react-router-dom";

export const ProductsList = () => {
	const [flashItem, setFlashItem] = useRecoilState<number[]>(flashSaleState);
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
	});
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [dialogOpen, setDialogOpen] = useState();

	// const [searchParams] = useSearchParams();
	// const categoryName = searchParams.get("category") || "";

	const queryClient = useQueryClient();

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

	const handleCheckboxChange = (productId: number) => {
		setFlashItem((prev: number[]) => {
			if (prev.includes(productId)) {
				return prev.filter((id) => id !== productId);
			} else {
				return [...prev, productId];
			}
		});
	};

	const categoryFilter: FilterFn<any> = (row, columnId, filterValue) => {
		const categoryNames = (row.getValue(columnId) as { name: string }[]).map(
			(category: any) => category.name,
		);
		return categoryNames.some((name: string) =>
			name.toLowerCase().includes(filterValue.toLowerCase()),
		);
	};

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
				header: "Title",
				cell: ({ row }) => (
					<Dialog>
						<DialogTrigger className="text-left">
							{row.original.title}
						</DialogTrigger>
						<DialogContent>
							<ProductDetails data={row.original} />
						</DialogContent>
					</Dialog>
				),
			},
			{
				accessorKey: "onSale",
				header: "On Sale",
				cell: (info) => (info.getValue() === true ? "Yes" : "No"),
			},
			{
				accessorKey: "stock",
				header: "Stock",
			},
			{
				accessorKey: "price",
				header: "Price",
				cell: (info) => (
					<span className="text-right">
						${info.getValue() as React.ReactNode}
					</span>
				),
			},
			{
				accessorKey: "categories",
				header: "Categories",
				cell: ({ row }) => (
					<div className="max-w-[150px] truncate">
						{row.original.categories
							.map((category: any) => category.name)
							.join(", ")}
					</div>
				),
				filterFn: categoryFilter,
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => (
					<div className="flex space-x-2">
						<Dialog open={dialogOpen} onOpenChange={dialogOpen}>
							<DialogTrigger>
								<FaEdit className="text-blue-500" />
							</DialogTrigger>
							<DialogContent>
								<UpdateProductForm
									initialData={row.original}
									setDialogOpen={setDialogOpen}
								/>
							</DialogContent>
						</Dialog>

						<ConfirmationDialog
							triggerComponent={
								<>
									<FaTrash className="text-primary" />
								</>
							}
							title="Are you sure you want to delete this product?"
							description="This action cannot be undone."
							onConfirm={() => handleDelete(row.original.id)}
							confirmText="Yes"
							cancelText="No"
						/>
						<input
							type="checkbox"
							disabled={row.original.onSale}
							onChange={() => handleCheckboxChange(row.original.id)}
							className="ml-2"
						/>
					</div>
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
			// columnFilters: [{id: "categories", value: categoryName}]
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
	});

	const handleDelete = (productId: any) => {
		deleteMutation.mutate(productId);
	};

	return (
		<div className="my-4 flex w-full flex-col gap-4 px-2 md:px-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Products List</h2>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-fit">Add new Product</Button>
					</DialogTrigger>
					<DialogContent>
						{/* <AddNewProductDialog /> */}
						<AddNewProductDialog />
					</DialogContent>
				</Dialog>
			</div>

			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="px-2 py-3">
										<div
											className={`${
												header.column.getCanSort()
													? "cursor-pointer select-none"
													: ""
											} flex items-center space-x-2`}
											onClick={header.column.getToggleSortingHandler()}
										>
											<span>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											</span>
											<span>
												{{
													asc: " 🔼",
													desc: " 🔽",
												}[header.column.getIsSorted() as string] ?? null}
											</span>
										</div>
										{header.column.getCanFilter() && header.id !== "id" && (
											<div className="mt-2">
												<Filter column={header.column} table={table} />
											</div>
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
				<span className="text-sm text-gray-700">
					Showing {table.getRowModel().rows.length} of {table.getRowCount()}{" "}
					Rows
				</span>
			</div>

			{flashItem.length > 0 && (
				<div className="fixed bottom-4 right-4 z-10">
					<Dialog>
						<div className="flex flex-col items-center justify-center gap-2 rounded-md border bg-slate-200 p-2">
							<span className="flex max-w-[200px] flex-wrap justify-between gap-2">
								{flashItem.map((item) => (
									<Button
										variant={"outline"}
										className="h-fit max-w-12 rounded-md border border-foreground p-1"
										key={`checked-sale-${uuidv4()}`}
										onClick={() => handleCheckboxChange(item)}
									>
										{item}
									</Button>
								))}
							</span>
							<DialogTrigger>
								<Button>Add to Flash Sale</Button>
							</DialogTrigger>
						</div>
						<DialogContent>
							<DatePickerWithRange
								data={flashItem}
								setFlashItem={setFlashItem}
							/>
						</DialogContent>
					</Dialog>
				</div>
			)}
		</div>
	);
};
export function Filter({ column, table }: { column: any; table: any }) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	return typeof firstValue === "number" ? (
		<div
			className="flex flex-col space-y-2"
			onClick={(e) => e.stopPropagation()}
		>
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
				className="w-full rounded border px-2 py-1 text-sm shadow"
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
				className="w-full rounded border px-2 py-1 text-sm shadow"
			/>
		</div>
	) : (
		<input
			className="w-full rounded border px-2 py-1 text-sm shadow"
			onChange={(e) => column.setFilterValue(e.target.value)}
			onClick={(e) => e.stopPropagation()}
			placeholder={`Search...`}
			type="text"
			value={(columnFilterValue ?? "") as string}
		/>
	);
}
