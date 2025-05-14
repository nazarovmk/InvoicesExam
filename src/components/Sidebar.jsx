import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import ThemesToggle from "./ThemesToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();
  return (
    <>
      <div
        className="pr-[32px] md:pr-0 w-full md:w-[103px] bg-[#373B53] h-auto md:h-screen flex justify-between rounded-none md:rounded-tr-[28px] md:rounded-br-[28px] md:flex-col md:z-[999] md:relative"
        data-aos="fade-right"
      >
        <img
          className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[103px] md:h-[103px]"
          src="./logo.svg"
          alt=""
        />
        <div className="flex items-center md:flex-col md:gap-6 justify-center">
          <ThemesToggle />
          <hr className="h-[72px] sm:w-[1px] sm:h-[80px] md:w-full md:h-[1px] border border-[#494E6E] mx-[24px] sm:mx-[32px] md:mx-0" />
          <img
            src="./user.svg"
            alt=""
            className="md:w-10 md:h-10 md:mb-6 md:mx-auto"
          />
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="md:ml-[85px] min-w-full sm:min-w-[calc(85%)] md:min-w-[calc(80%-103px)] min-h-[calc(100%-56px)] overflow-y-scroll sm:rounded-tr-[20px] sm:rounded-br-[20px] md:rounded-tr-[20px] md:rounded-br-[20px]"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          side="left"
        >
          <SheetHeader className="sm:pl-[56px] md:pl-[74px]">
            <SheetTitle className="font-bold text-[24px]">
              {editedData && editedData.id
                ? `Edit #${editedData.id}`
                : "New Invoice"}
            </SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}
