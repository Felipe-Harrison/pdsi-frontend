import Link from "next/link";
import classNames from "classnames";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const SidebarItem = ({index,item,onClick,typeUser=true}) => {

    return(
        <Link 
            key={index} 
            href={!typeUser ? "" : { pathname: item.href, query: item.title ? { t: item.title } : {} }}
            onClick={() => {
                onClick();
                item.onClick ? item.onClick() : null
            }}>
            <li
                className={classNames({
                    "text-gray-200 font-bold hover:bg-gray-300 cursor-not-allowed": !typeUser,
                    "text-text  font-bold hover:bg-primary hover:text-white": typeUser, //colors
                    "flex gap-4 items-center truncate": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-2": true, //self style
                    "bg-primary text-white": item.active
                })}
            >
                <div>{!typeUser ? <LockClosedIcon className="w-6 h-6"/> : item.icon}</div> 
                <div className="truncate">{item.label}</div>
            {item.active}
            </li>
        </Link>
    );
};

export default SidebarItem;