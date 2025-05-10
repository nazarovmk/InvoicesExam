export default function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="w-[217px] h-[160px] sm:w-[241px] sm:h-[200px] text-center">
        <img className="mb-10" src="./NotFound.svg" alt="" />
        <h2 className="font-bold text-[20px] mb-6 text-[#0C0E16]">
          There is nothing here
        </h2>
        <p className="text-[12px] text-[#888EB0]">
          Create an invoice by clicking the <b>New Invoice</b> button and get
          started
        </p>
      </div>
    </div>
  );
}
