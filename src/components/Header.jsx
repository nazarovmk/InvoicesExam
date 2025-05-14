import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardDescription } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, forwardRef, useEffect } from "react";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";
import { getInvoices } from "../request";
import { useNavigate } from "react-router-dom";
import NotFoundComponent from "./NotFoundComponent";
import Form from "./Form";

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
  const [sheetOpen, setSheetOpen] = useState(false);
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
          <CardDescription className="font-normal text-[12px]">
            {invoices === null
              ? "Loading..."
              : `There are ${invoices.length} total invoices`}
          </CardDescription>
        </div>
        <div className="flex items-center gap-[18px] sm:gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="ghost">
                <p className="hidden sm:block text-[12px] font-bold">
                  Filter by status
                </p>
                <p className="sm:hidden text-[12px] font-bold">Filter</p>
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

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="flex items-center gap-4 bg-accent py-2 pl-2 pr-4 px-3 rounded-3xl text-[var(--input-btn)] cursor-pointer">
              <PlusCircleIcon />
              <p className="hidden sm:block font-bold text-[12px]">
                New Invoices
              </p>
              <p className="sm:hidden font-bold text-[12px]">New</p>
            </SheetTrigger>

            <SheetContent
              className="md:ml-[85px] min-w-full sm:min-w-[calc(85%)] md:min-w-[calc(80%-103px)] min-h-[calc(100%-56px)] overflow-y-scroll md:rounded-tr-[20px] md:rounded-br-[20px]"
              style={{
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              side="left"
            >
              <SheetHeader className="sm:pl-[56px] md:pl-[74px]">
                <SheetTitle className="font-bold text-[24px]">
                  New Invoice
                </SheetTitle>
              </SheetHeader>
              <Form setSheetOpen={setSheetOpen} info={null} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
