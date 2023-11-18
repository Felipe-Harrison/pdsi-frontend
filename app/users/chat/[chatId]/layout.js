'use client';

import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChatsLayout({params,children}) {

    const [chatTitle,setChatTitle] = useState("");
    const searchParams = useSearchParams();
    const title = searchParams.get('t')

    useEffect( () => {
        setChatTitle(title ? title : `Conselho ${params.chatId}`)
    },[params,title]);

    return(       
        <div
            className="h-screen flex flex-col w-full"
        >
            <div className={classNames({
                "text-center": true,
                "bg-primary text-white font-extrabold text-lg tracking-wide": true, // colors
                "h-14": true,
                "t-0":true,
                "w-full sticky py-4 shadow-sm": true,
             })}>
                <h1 className="w-8/12 m-auto truncate">{chatTitle}</h1>
            </div>
            <div className="h-full overflow-y-scroll relative">
                {children}
            </div>
        </div>
    );
};