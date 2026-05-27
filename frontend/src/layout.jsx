import {Outlet} from "react-router";
import NavBar from "./components/navBar.jsx";


function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}