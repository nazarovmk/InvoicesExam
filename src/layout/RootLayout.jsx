import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex flex-col md:flex-row lg:gap-[100px]">
      <div>
        <Sidebar />
      </div>
      <main className="grow md:h-screen overflow-auto lg:overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
