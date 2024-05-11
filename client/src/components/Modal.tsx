import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProp {
  value: boolean;
  title: string;
  children: React.ReactNode;
  onChangeModal: () => void;
}

const Modal: FC<ModalProp> = ({ value, title, children, onChangeModal }) => {
  return (
    <>
      <Dialog
        open={value}
        onOpenChange={(e) => {
          if (!e) {
            onChangeModal();
          }
        }}
      >
        <DialogContent className="bg-neutral-800 text-white border-none ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
