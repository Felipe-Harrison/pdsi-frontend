'use client';

import { useState,useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Sidebar from "../components/layout/sidebar/Sidebar";

import { Bars3Icon } from "@heroicons/react/24/outline";

export default function UsersLayout({children}) {

    const [showSidebar,setShowSidebar] = useState(false);

    const refSidebar = useRef(null);
    useOnClickOutside(refSidebar, (e) => {
        setShowSidebar(false);
    });

    return(
        <div className="grid grid-cols-4 lg:grid-cols-5 bg-zinc-100">
            <Sidebar isOpen={showSidebar} reference={refSidebar} closeSidebar={() => setShowSidebar(false)}/>
            <div className="col-span-4 bg-food-pattern">
                <button id='btn-sidebar' className={"fixed h-8 w-8 left-3 top-3 z-10 lg:hidden"} onClick={() => setShowSidebar(true)}>
                    <Bars3Icon/>
                </button> 
                {children}
            </div>
        </div>
    );
};