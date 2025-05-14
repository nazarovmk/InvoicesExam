import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { addInvoices } from "../request";
import ItemList from "./ItemList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { prepareData } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { items: zustandItems } = useAppStore();
  const setInvoices = useAppStore((state) => state.setInvoices);
  const navigate = useNavigate();

  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = { status: e.nativeEvent.submitter.id };

    formData.forEach((value, key) => {
      result[key] = ["quantity", "price", "paymentTerms"].includes(key)
        ? Number(value)
        : value;
    });

    result.items = zustandItems;
    setSending(prepareData(result));
  }

  useEffect(() => {
    if (!sending) return;
    setLoading(true);
    addInvoices(sending)
      .then((newInvoice) => {
        setInvoices((prev) => [...prev, newInvoice]);
        toast.success("Ma'lumot qo'shildi");
        setSheetOpen(false);
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
        setSending(null);
      });
  }, [sending, setInvoices, setSheetOpen, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:pl-[56px] sm:pr-[56px] md:pl-[74px] pl-[24px] pr-[24px] pb-[32px]"
    >
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="font-bold text-[12px] mb-6 text-accent">Bill From</h3>
        <div className="flex flex-col gap-6">
          <div className="grid w-full max-w-full items-center gap-2.5">
            <Label
              className="text-[12px] text-muted"
              htmlFor="senderAddress-street"
            >
              Street Address
            </Label>
            <Input
              className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
              type="text"
              id="senderAddress-street"
              name="senderAddress-street"
              defaultValue={info?.senderAddress.street}
              placeholder="Street Address"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="senderAddress-city"
              >
                City
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="senderAddress-city"
                name="senderAddress-city"
                defaultValue={info?.senderAddress.city}
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="senderAddress-postCode"
              >
                Post Code
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="senderAddress-postCode"
                name="senderAddress-postCode"
                defaultValue={info?.senderAddress.postCode}
                placeholder="Post Code"
              />
            </div>

            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="senderAddress-country"
              >
                Country
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="senderAddress-country"
                name="senderAddress-country"
                defaultValue={info?.senderAddress.country}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-10">
        <h3 className="font-bold text-[12px] mb-6 text-accent">Bill To</h3>
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-full items-center gap-2.5">
            <Label className="text-[12px] text-muted" htmlFor="clientName">
              Client’s Name
            </Label>
            <Input
              className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={info?.clientName}
              placeholder="Client’s Name"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-2.5">
            <Label className="text-[12px] text-muted" htmlFor="clientEmail">
              Client’s Email
            </Label>
            <Input
              className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
              type="email"
              id="clientEmail"
              name="clientEmail"
              defaultValue={info?.clientEmail}
              placeholder="Client’s Email"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-2.5">
            <Label
              className="text-[12px] text-muted"
              htmlFor="clientAddress-street"
            >
              Street Address
            </Label>
            <Input
              className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              defaultValue={info?.clientAddress.street}
              placeholder="Street Address"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="clientAddress-city"
              >
                City
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="clientAddress-city"
                name="clientAddress-city"
                defaultValue={info?.clientAddress.city}
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="clientAddress-postCode"
              >
                Post Code
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="clientAddress-postCode"
                name="clientAddress-postCode"
                defaultValue={info?.clientAddress.postCode}
                placeholder="Post Code"
              />
            </div>

            <div className="grid w-full max-w-full items-center gap-2.5">
              <Label
                className="text-[12px] text-muted"
                htmlFor="clientAddress-country"
              >
                Country
              </Label>
              <Input
                className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                type="text"
                id="clientAddress-country"
                name="clientAddress-country"
                defaultValue={info?.clientAddress.country}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date & Terms */}
      <div className="mb-[32px] grid gap-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="grid w-full items-center gap-2.5">
            <Label className="text-[12px] text-muted" htmlFor="createdAt">
              Invoice Date
            </Label>
            <Input
              className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
              type="date"
              id="createdAt"
              name="createdAt"
              defaultValue={info?.createdAt}
            />
          </div>
          <div className="grid w-full items-center gap-2.5">
            <label
              htmlFor="paymentTerms text-muted"
              className="text-[12px] font-medium text-muted"
            >
              Payment Terms
            </label>
            <Select
              name="paymentTerms"
              defaultValue={info?.paymentTerms?.toString()}
            >
              <SelectTrigger
                id="paymentTerms"
                className="w-full font-bold text-[12px] rounded-[4px] bg-card"
              >
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Terms</SelectLabel>
                  {[1, 7, 14, 30].map((d) => (
                    <SelectItem key={d} value={d.toString()}>
                      Net {d} Days
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid w-full max-w-full items-center gap-2.5">
          <Label className="text-[12px] text-muted" htmlFor="description">
            Project Description
          </Label>
          <Input
            className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
            type="text"
            id="description"
            name="description"
            defaultValue={info?.description}
            placeholder="Project Description"
          />
        </div>
      </div>

      <ItemList info={info?.items} />

      <div className="flex justify-end gap-2.5">
        {info ? (
          <>
            <Button variant="outline">Cancel</Button>
            <Button disabled={loading}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <div className="flex gap-[7px] mx-auto sm:flex-row sm:justify-between sm:mx-0 sm:w-full">
            <Button
              type="button"
              variant="outline"
              className="sm:mr-auto rounded-3xl py-[17px] px-[17px] sm:py-[20px] sm:px-[24px] md:py-[20px] md:px-[24px] font-bold text-[12px] cursor-pointer bg-[var(--input-btn)] text-[var(--muted-btn)]"
            >
              Discard
            </Button>
            <Button
              className="rounded-3xl py-[17px] px-[17px] sm:py-[20px] sm:px-[24px] md:py-[20px] md:px-[24px] font-bold text-[12px] cursor-pointer"
              id="draft"
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save as draft"}
            </Button>
            <Button
              className="rounded-3xl py-[17px] px-[17px] sm:py-[20px] sm:px-[24px] md:py-[20px] md:px-[24px] font-bold text-[12px] cursor-pointer"
              id="pending"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save & Send"}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
