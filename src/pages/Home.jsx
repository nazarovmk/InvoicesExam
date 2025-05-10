import Header from "../components/Header";
import InvoiceCards from "../components/InvoiceCards";

export default function Home() {
  return (
    <div className="pt-[32px] pb-[20px] sm:pt-[56px] sm:pb-[35px] md:pt-[72px] md:pb-[50px]">
      <Header />
      <InvoiceCards />
    </div>
  );
}
