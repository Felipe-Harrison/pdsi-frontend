import classNames from "classnames";
import SidebarItem from "./SidebarItem";
import useRoutes from "./sidebarItens";

const Sidebar = ({isOpen,reference}) => {
    
    const routes = useRoutes();

    return (
        <div
        className={classNames({
            "flex flex-col justify-between": true, // layout
            "bg-indigo-700 text-zinc-50": true, // colors
            "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
            "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
            "transition-transform .3s ease-in-out md:translate-x-0": true, //animations
            "-translate-x-full ": !isOpen, //hide sidebar to the left when closed
        })}
        ref={reference}
        >
        <nav className="md:sticky top-0 md:top-16">
            {/* nav items */}
            <ul className="py-2 flex flex-col gap-2">
                {routes.map( (item,index) => { return (
                    <SidebarItem
                        index={index}
                        item={item}
                    />
                );})}
            </ul>
        </nav>
        </div>
    );
};
export default Sidebar;
