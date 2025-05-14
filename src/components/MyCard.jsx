import { CardDescription, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";

export default function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="hidden sm:flex items-center justify-between rounded-[8px] px-[32px] cursor-pointer">
        <CardTitle className="min-w-[80px] text-base">#{id}</CardTitle>
        <CardDescription className="min-w-[120px] text-base">
          {createdAt}
        </CardDescription>
        <CardDescription className="min-w-[100px] text-base">
          {clientName}
        </CardDescription>
        <span className="min-w-[80px] text-base text-right">
          £{" "}
          {Number(total).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <div className="flex items-center gap-5 sm:ml-6 min-w-[120px]">
          <StatusBadge status={status} />
          <div className="w-[5px]">
            <ArrowRight className="text-[#7C5DFA]" />
          </div>
        </div>
      </div>

      <div className="sm:hidden rounded-[8px] px-6 cursor-pointer">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold">#{id}</CardTitle>
          <CardDescription className="text-sm">{clientName}</CardDescription>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col gap-1">
            <CardDescription className="text-sm">{createdAt}</CardDescription>
            <span className="text-[16px] font-bold">
              £{" "}
              {Number(total).toLocaleString("en-GB", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>
    </Card>
  );
}
