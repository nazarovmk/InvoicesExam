import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, forwardRef, useEffect } from "react";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";
import { getInvoices } from "../request";
import { useNavigate } from "react-router-dom";
import NotFoundComponent from "./NotFoundComponent";

const Button = forwardRef(({ className, variant, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`${buttonVariants({ variant })} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export default function Header() {
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });
  const [invoices, setInvoices] = useState(null);
  const navigate = useNavigate();

  function handleChange(key) {
    setItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [items]);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (err) {
        console.error("Xatolik: Ma'lumotlarni olishda muammo bo‘ldi", err);
        setInvoices([]);
      }
    }

    fetchInvoices();
  }, []);

  if (invoices === null) {
    return <p>Yuklanmoqda...</p>;
  }

  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <header>
      <div className="base-container flex items-center justify-between">
        <div>
          <h1 className="text-[20px] sm:text-[32px] font-bold">Invoices</h1>
          <p className="font-normal text-[12px]">
            {invoices === null
              ? "Loading..."
              : `There are ${invoices.length} total invoices`}
          </p>
        </div>
        <div className="flex items-center gap-[18px] sm:gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="ghost">
                <p className="hidden sm:block">Filter by status</p>
                <p className="sm:hidden">Filter</p>
                <ArrowBigDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Statuses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                {Object.entries(items).map(([key, value]) => (
                  <label
                    key={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start capitalize cursor-pointer`}
                    htmlFor={key}
                  >
                    <Checkbox
                      value={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                      id={key}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="rounded-3xl flex items-center gap-2 bg-[#7C5DFA] hover:bg-[#9277FF] font-bold text-white text-[12px] py-2 pr-[15px] pl-2 cursor-pointer transition-colors">
            <PlusCircleIcon />
            <p className="hidden sm:block">New Invoices</p>
            <p className="sm:hidden">New</p>
          </button>
        </div>
      </div>
    </header>
  );
}
