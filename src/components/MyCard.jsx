import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  invoiceId = "RT3080",
  createdAt = "Due  19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="border-2 border-transparent transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="hidden sm:flex items-center justify-between rounded-[8px] py-4 px-6 cursor-pointer shadow-sm">
        <CardTitle>#{invoiceId}</CardTitle>
        <CardDescription>{createdAt}</CardDescription>
        <span>{clientName}</span>
        <span>£ {total}</span>
        <StatusBadge status={status} />
        <ArrowRight className="text-[#7C5DFA]" />
      </div>

      <div className="sm:hidden rounded-[8px] py-6 px-6 cursor-pointer shadow-sm">
        <div className="flex items-center justify-between">
          <CardTitle>#{invoiceId}</CardTitle>
          <span>{clientName}</span>
        </div>
        <div className="flex items-center justify-between pt-6">
          <div className="flex flex-col">
            <CardDescription>{createdAt}</CardDescription>
            <span>£ {total}</span>
          </div>
          <StatusBadge status={status} />
        </div>
        <ArrowRight className="hidden sm:block" />
      </div>
    </div>
  );
}
