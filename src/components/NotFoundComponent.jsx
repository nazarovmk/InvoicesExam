export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center gap-6">
      <img className="mb-10 w-[241px] h-[200px]" src="./NotFound.svg" alt="" />
      <h2 className="font-bold text-[20px] text-[#0C0E16]">
        There is nothing here
      </h2>
      <p className="text-[12px] text-[#888EB0]">
        Create an invoice by clicking the <b>New Invoice</b> button and get
        started
      </p>
    </div>
  );
}
