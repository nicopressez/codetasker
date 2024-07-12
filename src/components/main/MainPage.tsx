import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";

export default function MainPage() {
  return (
    <div>
     <Sidenav />
     <Outlet />
    </div>
  )
}
