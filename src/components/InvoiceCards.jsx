import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkleton from "./CardSkleton";
import MyCard from "./MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundComponent from "./NotFoundComponent";

export default function InvoiceCards() {
  const { filter } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    setLoading(true);
    getInvoices("/invoices", filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div className="base-container flex flex-col gap-4 pt-[32px] sm:pt-[56px] md:pt-[65px]">
      {invoices.map((el) => {
        const { createdAt, invoiceId, clientName, total, status, id } = el;
        return (
          <MyCard
            createdAt={createdAt}
            invoiceId={invoiceId}
            clientName={clientName}
            total={total}
            status={status}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
