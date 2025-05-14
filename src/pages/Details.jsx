import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowLeft, ArrowLeftFromLineIcon, ArrowLeftIcon } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateInvoices } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState({});
  console.log(invoice);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then(() => {
        toast.success("Ma'lumot o'chirildi");
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById(id, data)
      .then((res) => {
        toast.success(`Ma'lumot "Paid" ga o'zgartirildi`);
        updateInvoices(res);
        navigate(-1);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      <div className="py-[64px]">
        <div className="mx-auto px-6 sm:px-15 md:px-10 w-full min-w-[327px] sm:min-w-[688px] md:max-w-[800px] flex flex-col gap-4 md:gap-6">
          <div
            className="flex items-center gap-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="./ArroeLeft.svg" alt="arrow left" />
            <h3>Go back</h3>
          </div>
          <Card className="p-[24px] sm:py-[20px] sm:px-[32px] md:py-[20px] md:px-[32px]">
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full sm:w-0 md:w-0 sm:gap-4 md:gap-4">
                <span className="text-[var(--senderAddress)]">Status: </span>
                <StatusBadge status={invoice?.status} />
              </div>

              <div className="hidden sm:flex sm:gap-2 sm:items-center md:flex md:gap-2 md:items-center">
                <Button className="cursor-pointer" variant="ghost">
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Delete
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete invoice #
                        {invoice?.invoiceId}? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 ml-auto">
                      <DialogClose
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        Cancel
                      </DialogClose>
                      <Button
                        onClick={() => handleDelete(invoice.id)}
                        variant="destructive"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Being Deleted" : "Delete"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                {invoice.status === "pending" && (
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                    disabled={updateLoading}
                  >
                    {updateLoading ? "Loading..." : "Mark as Paid"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Invoice Ma'lumotlari */}
          <Card className="p-[24px] sm:p-[32px] md:p-[48px] gap-0">
            {/* header start */}
            <CardHeader className="flex flex-col sm:flex-row md:flex-row sm:justify-between mb-[31px] sm:mb-[21px] md:mb-[21px]">
              <div className="flex flex-col gap-1 mb-[30px] sm:mb-0 md:mb-0">
                <CardTitle className="font-bold text-[16px]">
                  <span className="text-[16px] text-[var(--id-hex)]">#</span>
                  {invoice?.invoiceId || id}
                </CardTitle>
                <CardDescription className="text-[var(--senderAddress)]">
                  {invoice?.description || "Hech qanday tavsif yo'q"}
                </CardDescription>
              </div>

              <div>
                <CardTitle className="flex flex-col text-left sm:text-right md:text-right font-normal gap-1 text-[var(--senderAddress)]">
                  <span>
                    {invoice?.senderAddress?.street ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.senderAddress?.city || "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.senderAddress?.postCode ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.senderAddress?.country ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            {/* header end */}

            {/* card center st */}
            <CardContent className="mb-[40px] sm:mb-[48px] md:mb-[45px] flex justify-between">
              <div className="flex flex-col">
                <div className="flex flex-col gap-3 mb-[32px]">
                  <h3 className="text-[var(--senderAddress)]">Invoice Date</h3>
                  <p className="text-[15px] font-bold leading-[20px] text-[(--details-title)]">
                    {invoice?.createdAt || "Hech qanday tavsif yo'q"}
                  </p>
                </div>
                <div className="mb-[32px] sm:mb-0 md:mb-0 flex flex-col gap-3">
                  <h3 className="text-[var(--senderAddress)]">Payment Due</h3>
                  <p className="text-[15px] font-bold leading-[20px] text-[(--details-title)]">
                    {invoice?.paymentDue || "Hech qanday tavsif yo'q"}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:hidden md:hidden">
                  <h3 className="text-[var(--senderAddress)]">Sent to</h3>
                  <p className="text-[15px] font-bold leading-[20px] text-[(--details-title)]">
                    {invoice?.clientEmail || "Hech qanday tavsif yo'q"}
                  </p>
                </div>
              </div>

              <div>
                <span className="flex flex-col gap-2 mb-3">
                  <h3 className="text-[var(--senderAddress)]">Bill To</h3>
                  <p className="text-[15px] font-bold leading-[20px] text-[(--details-title)]">
                    {invoice?.clientName || "Hech qanday tavsif yo'q"}
                  </p>
                </span>

                <div className="flex flex-col text-left font-normal text-[var(--senderAddress)]">
                  <span>
                    {invoice?.clientAddress?.street ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.clientAddress?.city || "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.clientAddress?.postCode ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                  <span>
                    {invoice?.clientAddress?.country ||
                      "Hech qanday tavsif yo'q"}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex md:flex flex-col gap-3">
                <h3 className="text-[var(--senderAddress)]">Sent to</h3>
                <p className="text-[15px] font-bold leading-[20px] text-[(--details-title)]">
                  {invoice?.clientEmail || "Hech qanday tavsif yo'q"}
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-6 sm:px-[32px] sm:pt-[32px] sm:pb-[40px] md:px-[32px] md:pt-[32px] md:pb-[40px] bg-[var(--details-card-bg)] rounded-t-[8px]">
              <div className="w-full">
                <div className="hidden sm:flex md:flex items-center mb-[32px] text-[var(--senderAddress)] w-full">
                  <span className="font-semibold w-2/5">Item Name</span>
                  <span className="text-center w-1/6">QTY.</span>
                  <span className="text-right w-1/6">Price</span>
                  <span className="font-bold text-right w-1/6">Total</span>
                </div>

                {invoice?.items?.length > 0 ? (
                  <div className="grid gap-3">
                    {invoice.items.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="hidden sm:flex md:flex items-center w-full rounded"
                        >
                          <div className="font-semibold w-2/5 truncate">
                            {item.name}
                          </div>
                          <div className="text-center w-1/6 text-[var(--senderAddress)]">
                            {item.quantity}
                          </div>
                          <div className="text-right w-1/6 text-[var(--senderAddress)]">
                            £ {Number(item.price).toFixed(2)}
                          </div>
                          <div className="font-bold text-right w-1/6">
                            £ {item.total?.toFixed(2)}
                          </div>
                        </div>
                        {/*  */}
                        <div
                          key={index}
                          className="sm:hidden md:hidden flex justify-between items-center w-full rounded"
                        >
                          <div className="flex flex-col">
                            <div className="font-semibold">{item.name}</div>
                            <div className="flex gap-1">
                              <div className="text-[var(--senderAddress)]">
                                {item.quantity} x
                              </div>
                              <div className="text-[var(--senderAddress)]">
                                £ {Number(item.price).toFixed(2)}
                              </div>
                            </div>
                          </div>

                          <div className="font-bold text-right">
                            £ {item.total?.toFixed(2)}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-4">
                    Hech qanday mahsulot yo'q
                  </p>
                )}
              </div>
            </CardFooter>
            <div className="p-6 sm:py-[24px] sm:px-[32px] md:py-[24px] md:px-[32px] bg-[var(--details-card)] flex justify-between items-center rounded-b-[8px]">
              <h3 className="text-[11px] text-[var(--details-card-text)]">
                Amount Due
              </h3>
              <h2 className="text-[24px] font-bold text-[var(--details-card-text)]">
                £ {invoice?.total?.toFixed(2)}
              </h2>
            </div>
            {/* card footer end */}
          </Card>
        </div>
      </div>

      <div className="sm:hidden md:hidden bg-card py-[22px] px-[24px] flex justify-center gap-2 mx-auto">
        <Button
          className="cursor-pointer bg-[var(--details-card-bg)] text-[var(--muted)]"
          variant="ghost"
        >
          Edit
        </Button>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "destructive" })}>
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete invoice #{invoice?.invoiceId}?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 ml-auto">
              <DialogClose className={buttonVariants({ variant: "ghost" })}>
                Cancel
              </DialogClose>
              <Button
                onClick={() => handleDelete(invoice.id)}
                variant="destructive"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Being Deleted" : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {invoice.status === "pending" && (
          <Button
            className="cursor-pointer"
            onClick={() => handleUpdate(invoice.id, { status: "paid" })}
            disabled={updateLoading}
          >
            {updateLoading ? "Loading..." : "Mark as Paid"}
          </Button>
        )}
      </div>
    </>
  );
}
