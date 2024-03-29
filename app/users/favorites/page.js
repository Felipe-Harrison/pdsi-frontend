'use client';

import classNames from "classnames";
import { useEffect, useState } from "react";

import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";
import { FavoriteField } from "./FavoriteField";

import FilterModal from "../../components/modal/filter/page";
import { FunnelIcon} from "@heroicons/react/24/outline";

const Favorites = () => {

    const [favorites,setFavorites] = useState([]);

    // Modal control
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const NormalizeTopic = (topic) => {
        const categories = {
            "GENERAL" : 'Outro',
            "RECIPE": "Receita",
            "CURIOSITY": "Curiosidade"
        }
    
        return categories[topic] ? categories[topic] : "Outro";
    };

    useEffect( () => {

        const getFavourites = async () => {

            try {
                
                const session = await userSession();
                const username = session.username;
                
                const responseToken = await api.post('/v1/sso/token',{
                    username: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_USER,
                    password: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_PSW 
                });
    
                const response = await api.get(`/v1/question/${username}/favorites`,
                {
                    headers:{
                        Authorization: "Bearer "+ responseToken.data.accessToken
                    }
                    
                });
                
                const favorites = response.data;
                
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

export default Favorites;