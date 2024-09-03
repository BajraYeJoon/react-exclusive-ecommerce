import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { X } from "lucide-react";
import { Button } from "../../../common/ui/button";
import { Badge } from "../../../common/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFlashSale, getFlashSale } from "../../api/flashSale";
import { Loading } from "../../../user-portal/site";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../common/ui/dialog";
import ProductDetails from "../productsList/ProductDetails";
import { toast } from "sonner";

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

  if (isLoading) {
    return <Loading />;
  }

  const flashSaleProducts = flashSaleProductsData ?? [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Flash Sale Items</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!flashSaleProducts.length ? (
          <div>No products on Sale 🎉</div>
        ) : (
          <>
            {flashSaleProducts.map((product: Product) => (
              <Dialog key={product.id}>
                <DialogTrigger>
                  <Card className="relative">
                    <Badge className="absolute right-2 top-2">Sale</Badge>
                    <CardHeader>
                      <CardTitle className="mt-2 text-lg font-normal">
                        {product.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={product.image[0]}
                        alt={product.title}
                        className="mb-2 h-32 w-full object-cover"
                      />
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => removeFromSale.mutate(product.id)}
                      >
                        <X className="mr-2 h-4 w-4" /> Remove from Sale
                      </Button>y
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <ProductDetails data={product} />
                </DialogContent>
              </Dialog>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
