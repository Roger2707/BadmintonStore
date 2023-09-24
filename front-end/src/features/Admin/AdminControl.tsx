import { Outlet } from "react-router-dom";
import Sidebar from "../../apps/layouts/Sidebar";
import '../../styles/Admin.css'
import Header from "../../apps/layouts/Header";
import { useState } from "react";

export default function AdminControl() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Header/>
            <div className="admin-container" >
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className={isOpen ? "outlet-container" : "outlet-container-closed"} >
                    <Outlet/>
                </div>
            </div>
        </>
    )
}