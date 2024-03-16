import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function Root() {
  return (
    <div className="max-w-[1200px] m-auto ">
      <Header />
      <Outlet />
    </div>
  );
}
