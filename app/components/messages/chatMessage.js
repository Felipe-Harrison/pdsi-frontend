import { useState,useRef } from "react";
import { useOnClickOutside, } from "usehooks-ts";

import SaveModal from "../../components/modal/save/page";
import { HeartIcon,ShareIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const ChatMessage = (id,msg,styleCustom,children) => {

    return(
        <div className="w-full my-5 flex flex-col" key={id}>
            <div className={`
                py-3 px-5 
                max-w-80p w-fit 
                h-max
                bg-white
                border border-gray-200
                shadow-md
                mx-3
                ${styleCustom}
            `}
            >
                {children}
                <p className="break-words">{msg}</p>
            </div>
        </div>
    );
};

export const UserMessage = (msg, id) => {

    return ChatMessage(
        id,
        msg,
        "rounded-borderMSg rounded-br-none self-end",
    )
};

export const BotMessage = (msg, id) => {

    return ChatMessage(
        id,
        msg,
        "rounded-borderMSg rounded-bl-none self-start",
        <FlyingMenu id={id}/>
    )
};

const FlyingMenu = ({id}) => {

    const [isOpen, setIsOpen] = useState(false);
    function toggleOpen() {
        setIsOpen(!isOpen);
    };
    
    const refMenu = useRef(null);
    useOnClickOutside(refMenu, (e) => {
        setIsOpen(false);
    });

    // Modal Control
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <SaveModal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                closeModal={closeModal} 
                messageId={id}
            />
            <div className="relative flex flex-col">
                <button onClick={() => toggleOpen()} className="self-end">
                    <EllipsisHorizontalIcon className="w-4 w-4"/>
                </button>
                {isOpen && (
                    <div className="
                        absolute -top-16 -right-8 w-max px-2 py-1 rounded-lg
                        bg-white border border-gray-200 shadow-md
                    "
                    ref={refMenu}
                    >
                        <button className="w-max p-1" onClick={openModal}>
                            <HeartIcon className="h-6 w-6 transition duration-200 hover:fill-invalid"/>
                        </button>
                        <button className="w-max p-1">
                            <ShareIcon className="h-6 w-6 transition duration-200 hover:fill-success"/>
                        </button>
                    </div>
                )}
            </div>    
        </div>
    )
}
