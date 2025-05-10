import { useParams } from "react-router-dom";
import { getInvoice } from "../request";
import { useEffect, useState } from "react";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    setLoading(true);
    getInvoice("/invoices", id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <div>{JSON.stringify(invoice)}</div>;
}
