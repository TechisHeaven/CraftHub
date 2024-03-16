import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

export default function Main() {
  return (
    <div className="max-w-[1200px] m-auto ">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
