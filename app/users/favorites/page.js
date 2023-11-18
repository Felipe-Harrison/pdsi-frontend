'use client';

import { useEffect, useState } from "react";
import classNames from "classnames";
import { HeartIcon,ShareIcon,FunnelIcon} from "@heroicons/react/24/outline";
import RecipesModal from "../modal/recipes/page";
import FilterModal from "../modal/filter/page";
import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";
import { getRecentsChats } from "@/app/components/layout/sidebar/sidebarItens";

const Favorites = () => {

    const [favorites,setFavorites] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect( () => {

        const getFavourites = async () => {

            try {
                
                // const session = await userSession();
                // const username = session.username;
                
                // const responseToken = await api.post('/v1/sso/token',{
                //     username: 'admin',
                //     password: 'admin' 
                // });
    
                // const response = await api.get(`/v1/question/${username}/favorites`,
                // {
                //     headers:{
                //         Authorization: "Bearer "+ responseToken.data.accessToken
                //     }
                    
                // });
                
                // const favorites = response.data;

                const favorites = await getRecentsChats();
                
                setFavorites( favorites.map( item => 
                    <FavoriteField 
                        id= {item.questionId} 
                        key={item.questionId} 
                        message={item.question} 
                        categorie={NormalizeTopic(item.topic)}
                        data={{
                            message: item.question,
                            answer: item.answer,
                        }}
                    />
                ));
                
            } catch (err) {
                console.log(err)
            }
        }

        getFavourites();
        
    },[]);

    return (
        <div>
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
                <h1>Meus Favoritos</h1>
            </div>
            <div className="
                w-full
                flex flex-col
                items-end
            ">
                <button className="
                    mx-5 my-3 
                    border 
                    p-2 
                    rounded-lg
                    bg-white
                    shadow-md
                    duration-200
                    hover:bg-gray-200
                " onClick={openModal}>
                    <FunnelIcon className="h-6 w-6"/>
                </button>
            </div>
            <div className="h-full overflow-y-scroll relative flex flex-col items-center scroll-custom">
                {favorites.length ? (
                    favorites.map(favorite => (favorite)) 
                ) : (
                    <div> Voce ainda não possui favoritos</div>
                )}
            </div>
        </div>
        <FilterModal isOpen={modalIsOpen} onRequestClose={closeModal} closeModal={closeModal} />
        </div>
    );
}

const NormalizeTopic = (topic) => {
    const categories = {
        "GENERAL" : 'Outro',
        "RECIPE": "Receita",
        "CURIOSITY": "Curiosidade"
    }

    return categories[topic] ? categories[topic] : "Outro";
}
const FavoriteField = ({message,categorie,id,data}) => {

    function handleCategorie(categorie) {
        const categories = {
            "Receita": "bg-orange border-orange",
            "Curiosidade": "bg-yellow-300 border-yellow-300",
            "Outro": "bg-green-600 border-green-600"
        }

        return categories[categorie] ? categories[categorie] : "red-800"
    }

    const type = handleCategorie(categorie);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

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
            <div className="col-span-2"/>
            <div className="col-span-8 mx-5 truncate" onClick={openModal}>
                Favorito: {message}
            </div>
            <div className="col-span-2 grid grid-cols-2">
                <button className=" 
                    w-max p-1
                    border rounded-lg 
                    bg-white  shadow-md
                    duration-500
                    hover:bg-gray-200
                    ">
                    <ShareIcon className="h-8 w-8"/>
                </button>
                <button className=" 
                    w-max p-1
                    border rounded-lg 
                    bg-white  shadow-md
                    duration-500
                    hover:bg-gray-200
                ">
                    <HeartIcon className="h-8 w-8 fill-red-900 stroke-current text-red-900"/>
                </button>
            </div>
        </div>
        <RecipesModal id={id} data={data} categorie={categorie} isOpen={modalIsOpen} onRequestClose={closeModal} closeModal={closeModal} />
        </>
    )
}

export default Favorites;