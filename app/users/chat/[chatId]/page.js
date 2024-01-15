'use client';

import { UserMessage,BotMessage } from "@/app/components/messages/chatMessage"
import { MessageInput } from "@/app/components/inputs/messageInput"
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserBase } from "@/app/api/auth/customSession";
import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";
import DotLoading from "@/app/components/loading/dotLoading/dotLoading";
import MessageFormatter from "@/app/components/messages/messageFormatter";

export default function Chat({ params }) {

  const scrollDiv = useRef();
  const router = useRouter();

  // Gambiarra 2000
  const [messages,SetMessages] = useState([]);
  const [showinput,setShowInput] = useState(true);
  const [isLoading,setIsLoading] = useState(false);

  const lId = useRef(0);

  const onPageLoad = useCallback( async () => {
    try{
      // Proteger urls Usuários gratis
      const userType = await isUserBase();
      if(userType && params.chatId != 'new') {
        router.replace("/users");
      }

      // Buscar mensagens
      if(params.chatId == 'new') {
        return;
      }

      // Renovar token admin
      const session = await userSession();
      const username = session.username;

      const responseToken = await api.post('/v1/sso/token',{      
        username: 'admin',
        password: 'admin'   
      });
      
      const response = await api.get(`v1/question/${username}/latest`,{
        headers:{
          Authorization: "Bearer "+ responseToken.data.accessToken
        }   
      });

      const chat = response.data.find( item => item.questionId == params.chatId);

      console.log("page Chats",chat);
      SetMessages(messages => [
        ...messages,
        UserMessage(chat.question,lId.current),
        BotMessage(MessageFormatter(chat.answer),chat.questionId)
      ]);
      lId.current++;

      setShowInput(false);

    }catch (err) {
      console.log("Error in onPageLoad:users/chat/page",err);
    }
  },[router,params]);

  useEffect( () => {
    onPageLoad();
  },[onPageLoad]);

  useEffect( () => {
    scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
  },[messages]);
  
  const addUserMessage = (message) => {
    setIsLoading(true)
    lId.current++;
    SetMessages(messages => [...messages,UserMessage(message,lId.current)]);
  }
  
  const addBotMessage = (message,id,block) => {
    setIsLoading(false);
    lId.current++;
    SetMessages(messages => [...messages,BotMessage("Chef: "+ message,id)]);
    if(block) {
      setShowInput(false);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="min-h-chat">
        {messages.length ? (
          messages.map( message => (message))
        ) : (
          <div className="min-h-chat flex justify-center items-center font-bold text-text">Envie uma mensagem para começar</div>
        )}
        {isLoading && (<DotLoading/>)}
      </div>
      {showinput ? (
        <MessageInput onUserSend={addUserMessage} onResponse={addBotMessage} newChat={params.chatId == 'new'}/>
      ) : params.chatId == 'new' && (
        <div className="flex justify-center">
          <button
            type='button'
            onClick={() => location.reload()}
            className='
                w-5/12 h-12
                mb-8
                text-center text-neutral-100 text-xl font-bold
                bg-emerald-500 rounded-lg shadow border
                transition duration-200
                hover:bg-emerald-800
            '
            >
              Novo Conselho
            </button>
        </div>
      )}
      <div ref={scrollDiv}/>
    </div>
  );
}