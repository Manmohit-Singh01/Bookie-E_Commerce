import {Outlet} from "react-router";
import NavBar from "./components/navBar.jsx";

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}