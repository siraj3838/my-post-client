import { Outlet } from "react-router-dom";
import Navbar from "../Pages/SharePages/Navbar/Navbar";

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-screen-xl mx-auto">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;