'use client';

import classNames from "classnames";
import { useEffect,useState } from "react";
import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";
import { useRoutes, getChats} from "./sidebarItens";
import { userSession } from "@/app/api/auth/customSession";

import VipModal from "../../../components/modal/vip/page"
import Spinner from "../../loading/spinner/Spinner";
import { LogoWide} from "@/public/image/LogoWide";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const Sidebar = ({isOpen,reference,closeSidebar}) => {

    const pathname = usePathname();
    const routes = useRoutes();

    const [chats,setChats] = useState([]);
    const [UserData,setUserData] = useState({});

    const [isLoading,setIsLoading] = useState(true);

    // Modal Control
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    // Utils functions
    const getUserData = async () => {
        setUserData(await userSession());
    };

    const getRecentsChats = async (pathname) => {
        setChats(await getChats(pathname));
        setIsLoading(false);
    };

    // On pathname load
    useEffect( () => {
        getRecentsChats(pathname);
    },[pathname]);

    // On load
    useEffect( () => {
        getUserData();
    },[]);

    return (
        <>
        {modalIsOpen && (
            <VipModal isOpen={modalIsOpen} onRequestClose={closeModal} closeModal={closeModal} />
        )}
        <div
            className={classNames({
                "flex flex-col": true, // layout
                "bg-white/[0.75] text-text": true, // colors
                "backdrop-filter backdrop-saturate-150 backdrop-blur-lg":true, // glass effect
                "lg:w-full lg:sticky lg:top-2 lg:z-0 top-0 z-20 fixed": true, // positioning
                "lg:h-screen h-full w-[300px] rounded-r-lg": true, // for height and width
                "transition-transform .3s ease-in-out lg:translate-x-0": true, //animations
                "-translate-x-full ": !isOpen, //hide sidebar to the left when closed
            })}
            ref={reference}
        >
            <nav className="h-full md:sticky top-0 md:top-2 ">
                <div className="py-2 border-b border-pink-100">
                    <LogoWide
                        height={10.78}
                    />
                </div>
                {/* nav items */}
                <div className="p-2 text-sm text-text" id="sidebar-chat-text">
                    Seus conselhos do Chef
                </div>
                <SidebarItem
                    item={{
                        label: "Novo conselho",
                        href: "/users/chat/new",
                        icon: <PlusCircleIcon className="w-6 h-6" />,
                        active: pathname == "/users/chat/new",
                        title: "Novo Conselho"
                    }}
                    onClick={() => {}}
                />
                <div className="py-2 flex flex-col gap-2 h-41vh overflow-y-auto border-b border-pink-100 overscroll-contain scroll-custom" id="sidebar-itens-scroll">
                    { isLoading ? (
                        <span>
                            <Spinner/> <span className="ml-2 text-sm text-text text-center">Procurando conselhos...</span>
                        </span>
                    ) : chats.length ? chats.map( (item,index) => { return (
                        <SidebarItem
                            key={index}
                            index={index}
                            item={item}
                            onClick={closeSidebar}
                            typeUser={UserData.plus}
                        />
                    )}) : (
                        <span className="p-2 text-sm text-text text-center">
                            Nenhum conselho encontrado
                        </span>
                    )}
                </div>
                <div className="py-2 flex flex-col gap-2 border-b border-pink-100" id="sidebar-config-itens">
                    {routes.map( (item,index) => { return (
                        <SidebarItem
                            key={index}
                            index={index}
                            item={item}
                            onClick={closeSidebar}
                        />
                    );})}
                </div>
                <div className="flex flex-col gap-2 items-center">
                    {!UserData.plus && (
                        <button 
                            className="
                                px-2 py-1
                                w-11/12 mt-1
                                text-white
                                rounded 
                                bg-invalid
                            "
                            onClick={openModal}
                            id="btn-vip-modal"
                            > 
                            Seja vip
                        </button>)
                    }
                    <div className="grid grid-cols-3 p-3 ">
                        <div className={classNames({
                            "h-12 w-max rounded-lg text-center p-3": true,
                            "bg-success": UserData.plus,
                            "bg-invalid": !UserData.plus,
                        })}>
                            <p className="
                                font-extrabold text-xl
                                text-white
                            ">
                                {UserData.nameSymbol}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="truncate">
                                {UserData.name}
                            </p>
                            {UserData.plus ? (
                                <div className="
                                px-2
                                bg-success rounded-lg text-white text-sm
                                text-center
                                ">
                                    VIP desde {UserData.plusData}
                                </div>
                            ): (
                                <div className="
                                    px-2
                                    bg-invalid rounded-lg text-white text-sm
                                    text-center
                                ">
                                    Plano grátis
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        </>
    );
};
export default Sidebar;
