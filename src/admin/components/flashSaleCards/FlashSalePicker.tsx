import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "../../../common/lib/utils";
import { Button } from "../../../common/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../common/ui/popover";
import { Calendar } from "../../../common/ui/calendar";
import { addProductToFlashSale } from "../../api/flashSale";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";

export function DatePickerWithRange({
  className,
  data,
  setFlashItem,
}: {
  className?: string;
  data: number[];
  setFlashItem: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  console.log(new Date(date?.from).toISOString());
  console.log(new Date(date?.to).toISOString());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div>
        {data.map((item) => (
          <Button
            key={item}
            variant={"default"}
            className="h-fit max-w-12 rounded-md border border-foreground p-1"
            disabled
          >
            {item}
          </Button>
        ))}
      </div>
      <div className={cn("grid gap-2", className)}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add to Flash Sale</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center gap-4">
          <DialogHeader className="text-center">
            Are you sure you want to add this all products to Flash Sale?
          </DialogHeader>
          <DialogTitle className="text-sm font-medium">
            Sale Start: {format(date?.from, "LLL dd, y")} -
            Sale End: {format(date?.to, "LLL dd, y")}
            <span className="text-primary">*</span>
          </DialogTitle>
          <DialogDescription className="space-x-2">
            <Button
              onClick={() =>
                addProductToFlashSale({
                  saleStart: new Date(date?.from).toISOString(),
                  saleEnd: new Date(date?.to).toISOString(),
                  products: data,
                }).then((res) => {
                  console.log(res);
                  queryClient.invalidateQueries({ queryKey: ["products"] });
                  toast.success("Product added to flash sale");
                  setFlashItem([]);
                })
              }
              onSelect={() => setOpen(false)}
            >
              Yes
            </Button>
            <Button variant={"secondary"}>
              <DialogClose>No</DialogClose>
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </Popover>
  );
}

// import * as React from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "../../../common/lib/utils";
// import { Button } from "../../../common/ui/button";
// import { Calendar } from "../../../common/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../../common/ui/popover";

// export function DatePickerWithRange({ data, setFlashItem }) {
//   const [date, setDate] = React.useState<Date>();

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground",
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }
