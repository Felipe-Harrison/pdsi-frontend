import React, { 
    useEffect, 
    useState, 
    useMemo 
} from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";

import {
    ChatBubbleLeftIcon,
    StarIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

function Chat (name,id,pathname){  

    const isChatActive = pathname == `/users/chat/${id}`;
    return {
        label: name,
        href: `/users/chat/${id}`,
        icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
        active: isChatActive,
        title: `${name}`,
    };
};

const getRecentsChats = async () => {

    try {

        const session = await userSession();
        const username = session.username;

        // Renovar token admin
        const responseToken = await api.post('/v1/sso/token',{      
            username: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_USER,
            password: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_PSW 
        });
        
        const response = await api.get(`v1/question/${username}/latest`,{
            headers:{
                Authorization: "Bearer "+ responseToken.data.accessToken
            }   
        });

        return response.data;

    } catch (err) {

        console.error(err);
        if(err.status == 500) {
            console.error("ERROR::500: Não foi encontrado nenhum chat")
        }
        return [];
    };
};

export const getChats = async (pathname) => {
    const questions = await getRecentsChats();
    let aux = []
    aux = questions.map( question => (
        Chat(`${question.question.substring(0,30)}`,question.questionId,pathname)
    ));
    return aux;
}

export const useChats = () => {

    const pathname = usePathname();

    const [questions,setQuestions] = useState([]);
    const [chats,setChats] = useState([]);

    useEffect(()=>{
        const getChats = async() => {
            const questions = await getRecentsChats();
            setQuestions(questions);
        }
        getChats();
    },[pathname]);

    useEffect( () => {
        let aux = []
        aux = questions.map( question => (
            Chat(`${question.question.substring(0,20)}`,question.questionId,pathname)
        ));
        setChats(aux);
    } ,[questions,pathname]);

    return chats;
};

export const useRoutes = () => {

    const pathname = usePathname();

    const routes = useMemo( () => [
        {
            label: "Favoritos",
            href: "/users/favorites",
            icon: <StarIcon className="w-6 h-6" />,
            active: pathname == '/users/favorites',
        },
        {
            label: "Logout",
            href: "",
            icon: <ArrowLeftOnRectangleIcon className="w-6 h-6" />,
            onClick: () => signOut({ callbackUrl: 'http://localhost:3000/' }),
        },
    ],[pathname]);

    return routes;
};
