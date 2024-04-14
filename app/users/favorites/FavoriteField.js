'use client';

import { useState } from "react";
import RecipesModal from "../../components/modal/recipes/page";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";

export const FavoriteField = ({ message, categorie, id, data }) => {

    function handleCategorie(categorie) {
        const categories = {
            "Receita": "bg-orange border-orange",
            "Curiosidade": "bg-yellow-300 border-yellow-300",
            "Outro": "bg-green-600 border-green-600"
        };

        return categories[categorie] ? categories[categorie] : "red-800";
    };

    const type = handleCategorie(categorie);

    // Modal Control
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="
            relative
            grid grid-cols-12
            w-11/12 py-3 px-5 my-3
            border border-gray-200 rounded-lg
            bg-white shadow-sm    
            cursor-pointer"
            >
                <div className={`
                absolute
                h-full w-1/6 px-2 py-4
                border-2 rounded-l-lg
                ${type}
                text-center  
            `} onClick={openModal}>
                    <p className="px-1 text-white font-bold">{categorie}</p>
                </div>
                <div className="col-span-2" />
                <div className="col-span-8 mx-5 truncate" onClick={openModal}>
                    {message}
                </div>
                <div className="col-span-2 grid grid-cols-2">
                    <button className=" 
                    w-max p-1
                    border rounded-lg 
                    bg-white  shadow-md
                    duration-500
                    hover:bg-gray-200
                    ">
                        <ShareIcon className="h-8 w-8" />
                    </button>
                    <button className=" 
                    w-max p-1
                    border rounded-lg 
                    bg-white  shadow-md
                    duration-500
                    hover:bg-gray-200
                ">
                        <HeartIcon className="h-8 w-8 fill-red-900 stroke-current text-red-900" />
                    </button>
                </div>
            </div>
            <RecipesModal id={id} data={data} categorie={categorie} isOpen={modalIsOpen} onRequestClose={closeModal} closeModal={closeModal} />
        </>
    );
};
