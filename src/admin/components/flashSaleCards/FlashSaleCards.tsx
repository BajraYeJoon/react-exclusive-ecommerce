import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { PlusCircle, X } from "lucide-react";
import { Button } from "../../../common/ui/button";
import { Badge } from "../../../common/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFlashSale, getFlashSale } from "../../api/flashSale";
import { Loading } from "../../../user-portal/site";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import ProductDetails from "../productsList/ProductDetails";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Routes } from "../../lib/links";
import { Axios } from "../../../common/lib/axiosInstance";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function FlashSaleAdmin() {
  const queryClient = useQueryClient();

  const { data: flashSaleProductsData, isLoading } = useQuery({
    queryKey: ["flashSaleProducts"],
    queryFn: getFlashSale,
  });

  const removeFromSale = useMutation({
    mutationFn: (id: number) => deleteFlashSale(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["flashSaleProducts"] });
      toast.success(`${data.message}`);
    },

    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    },
  });

  const clearAllSales = useMutation({
    mutationFn: () => Axios.delete("/sale").then((res) => res.data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["flashSaleProducts"] });
      toast.success(`${data.message}`);
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const flashSaleProducts = flashSaleProductsData ?? [];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Flash Sale Items</h1>

        {flashSaleProducts.length > 0 && (
          <Button onClick={() => clearAllSales.mutate()}>Clear All</Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!flashSaleProducts.length ? (
          <div className="space-y-4">
            No products on Sale 🎉
            <Link to={`/${Routes.Admin}/${Routes.Products}`}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add From here
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {flashSaleProducts.map((product: Product) => (
              <Card className="relative" key={product.id}>
                <Badge className="absolute right-2 top-2">Sale</Badge>
                <CardHeader>
                  <CardTitle className="mt-2 text-lg font-normal">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <CardContent className="">
                      {!product.image ? (
                        <Loading />
                      ) : (
                        <img
                          src={product.image[0]}
                          alt={product.title}
                          className="mb-2 h-32 w-full object-cover"
                        />
                      )}

                      <p className="font-medium">
                        ${product?.price?.toFixed(2)}
                      </p>
                    </CardContent>
                  </DialogTrigger>
                  <DialogContent>
                    <ProductDetails data={product} />
                  </DialogContent>
                </Dialog>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant={"outline"}>
                        <X className="mr-2 h-4 w-4" /> Remove from Sale
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center justify-center gap-4">
                      <DialogHeader>
                        Are you sure you want to remove this from Sale?
                      </DialogHeader>
                      <DialogTitle className="text-sm font-medium">
                        This action cannot be undone.{" "}
                        <span className="text-primary">*</span>
                      </DialogTitle>
                      <DialogDescription className="space-x-2">
                        <Button
                          variant={"destructive"}
                          onClick={() => removeFromSale.mutate(product.id)}
                        >
                          Yes
                        </Button>
                        <Button variant={"secondary"}>
                          <DialogClose>No</DialogClose>
                        </Button>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
