import { Button } from "../../../common/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
} from "../../../common/ui/dialog";

const ProductDetails = ({ data }: any) => {
  return (
    <Dialog>
      <DialogHeader>{data.title}</DialogHeader>
      <DialogDescription>{data.description}</DialogDescription>
      <DialogDescription>
        <Button>Add this to Flash</Button>
      </DialogDescription>
    </Dialog>
  );
};

export default ProductDetails;
