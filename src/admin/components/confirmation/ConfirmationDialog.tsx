import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../../common/ui/dialog";
import { Button } from "../../../common/ui/button";

interface ConfirmationDialogProps {
  triggerComponent?: React.ReactNode;
  triggerText?: string | React.ReactNode;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  triggerText,
  triggerComponent,
  title,
  description,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerComponent || <Button>{triggerText}</Button>}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center gap-4 py-12">
        <DialogHeader>
          <DialogTitle className="max-w-sm text-center text-lg">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description} <span className="ml-1 text-primary">*</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-2">
          <Button onClick={onConfirm}>{confirmText}</Button>
          <DialogClose asChild>
            <Button variant="secondary">{cancelText}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
