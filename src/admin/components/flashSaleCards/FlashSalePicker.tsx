import * as React from "react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { CalendarArrowUp, Calendar as CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "../../../common/lib/utils";
import { Button } from "../../../common/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../common/ui/popover";
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
import "react-day-picker/style.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Routes } from "../../lib/links";

export function DatePickerWithRange({
  className,
  data,
  setFlashItem,
}: Readonly<{
  className?: string;
  data: number[];
  setFlashItem: React.Dispatch<React.SetStateAction<any>>;
}>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 20),
  });
 
  const [startTime, setStartTime] = React.useState<string>("00:00");
  const [endTime, setEndTime] = React.useState<string>("23:59");
  const navigate =  useNavigate()
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end",
  ) => {
    const time = e.target.value;
    if (type === "start") {
      setStartTime(time);
      if (date?.from) {
        const [hours, minutes] = time
          .split(":")
          .map((str) => parseInt(str, 10));
        const newFrom = setHours(setMinutes(date.from, minutes), hours);
        setDate({ ...date, from: newFrom });
      }
    } else {
      setEndTime(time);
      if (date?.to) {
        const [hours, minutes] = time
          .split(":")
          .map((str) => parseInt(str, 10));
        const newTo = setHours(setMinutes(date.to, minutes), hours);
        setDate({ ...date, to: newTo });
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="text-sm font-medium text-primary">Selected Products</div>
      <div className="flex flex-wrap gap-2">
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
        <span>
          Please Select the Date for Sales. (
          <i className="text-xs">Click below</i>)
        </span>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-fit", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />

            {date ? (
              <>
                {format(date?.from, "LLL dd, y HH:mm")} -{" "}
                {format(date?.to, "LLL dd, y HH:mm")}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="p-2">
            <label>
              Start Time:{" "}
              <input
                type="time"
                value={startTime}
                onChange={(e) => handleTimeChange(e, "start")}
              />
            </label>
            <label>
              End Time:{" "}
              <input
                type="time"
                value={endTime}
                onChange={(e) => handleTimeChange(e, "end")}
              />
            </label>
          </div>
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
            Sale Start: {format(date?.from, "LLL dd, y HH:mm")} - Sale End:{" "}
            {format(date?.to, "LLL dd, y HH:mm")}
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
                  navigate(`${Routes.Admin}/${Routes.FlashSales}`)
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