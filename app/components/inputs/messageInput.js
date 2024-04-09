import { useState } from "react";
import classNames from "classnames";

import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const MessageInput = ({onUserSend,onResponse}) => {

    const [userMessage,setUserMessage] = useState();
    const [creativeChefMode,setCreativeChefMode] = useState(false);

    // ON FORM SUBMIT
    async function sendMessage(e) {

        e.preventDefault();

        onUserSend(userMessage);
        setUserMessage("");

        try {

            // Renovar token usuario
            const session = await userSession();
            
            const responseToken = await api.post('/v1/sso/token',{
                username: session.username,
                password: session.password
            });

            const response = await api.post('v1/question',{
                
                message: userMessage,
                randomness: creativeChefMode ? 0.9 : 0.5
                
            },{
                headers:{
                    Authorization: "Bearer "+ responseToken.data.accessToken
                }  
            }
            );
            console.log(response.data);
            onResponse(response.data.answer,response.data.questionId,true);
        
        } catch (err) {
            onResponse(userMessage,userMessage,true);
            if(err.response.status == 400){
                const time = new Date();
                onResponse("Faça uma pergunta sobre tema culinário",time.getMilliseconds());
            }
            console.error(`Error in sendMessage: ${err}`);
        };
        
    }

    return(
        <div className={`
            bg-contentBlack 
            text-white
            bottom-0 
            sticky 
            h-14 w-full
            z-10
            relative
        `}>
            <form
                method="POST"
                action=""
                onSubmit={sendMessage}
                className={`
                    flex flex-row flex-nowrap
                    justify-evenly items-center
                    m-2
                `}
            >
                <input 
                    name="userMessage"
                    type="text" 
                    value={userMessage}
                    onChange={ e => setUserMessage(e.target.value)}
                    placeholder="Digite uma mensagem..."
                    autoCapitalize="sentences"
                    autoFocus
                    required
                    autoComplete="not"
                    className="
                        p-2
                        w-11/12
                        rounded-[7px] 
                        border-0
                        bg-transparent 
                        text-white
                        outline outline-0
                        transition duration-500
                    "
                    id="input-chat"
                />
                <button 
                    type="submit" 
                    className="h-8 w-8"
                    title="msgUser"
                >
                    <PaperAirplaneIcon/>
                </button>
            </form>
            <button className={classNames({
                "absolute -top-9 right-2": true,
                "py-1 px-3": true,
                "border-1 border-black rounded-lg": true,
                "bg-gray-300 text-text hover:bg-gray-500 hover:text-gray-100": !creativeChefMode,
                "bg-confirm text-white hover:bg-confirm/[1]": creativeChefMode,
                "bg-opacity-60":true,
                "transition duration-300":true,
            })}
            onClick={() => {
                setCreativeChefMode(!creativeChefMode);
            }}
            >
                Chefe Criativo
            </button>
        </div>
    );
}

export default MessageInput;