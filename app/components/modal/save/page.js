'use client';

import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";
import toast from "react-hot-toast";
import { useState } from "react";

function SaveModal(props) {

    const [title,setTitle] = useState("");
    const [categorie,setCategorie] = useState("");

    const handleSubmit = async e => {

        e.preventDefault();

        const data = {
            "questionId": props.messageId ? props.messageId : "123",
            "topic": categorie.toUpperCase(),
            "tittle": title
        }
        
        try {
            
            const session = await userSession();
            const username = session.username;

            // Renovar token admin
            const responseToken = await api.post('/v1/sso/token',{      
                username: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_USER,
                password: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_PSW 
            });
            
            const response = await api.put(`/v1/question/${username}/favorites`,
                data,
            {
                headers:{
                    Authorization: "Bearer "+ responseToken.data.accessToken
                }   
            });

            if(response.status == 204) {
                toast.success("Mensagem favoritada com sucesso!!!");
                props.closeModal();
            }


        } catch (err) {
            toast.error("Não foi possível salvar favoritos!");
            console.log(err)
        }
    }

    return (
        <div>            

            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.onRequestClose}
                contentLabel='Save Modal'
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "70vw",
                        height: "fit-content",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <button className="close-button absolute top-0 right-0 m-4 text-white" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                <form onSubmit={handleSubmit}>
                    <div className="text-center bg-orange">
                        <div className="m-4 inline-block text-2xl font-bold text-white">Favoritar Mensagem</div>
                    </div>
                    <div className="m-4 text-xl font-bold">Título</div>
                    <div className="m-4 flex">
                        <input 
                            className="w-full h-10 border border-2 rounded-md" 
                            placeholder=" Informe título para mensagem" 
                            onChange={ e => {
                                setTitle(e.target.value);
                            }}
                            required
                            value={title}
                        />
                    </div>
                    <div className="m-4 text-xl font-bold">Categoria</div>
                    <div className="m-4 flex">
                        <select 
                            className="w-full h-10 border border-2 rounded-md" 
                            name="category"
                            onChange={ e => {
                                setCategorie(e.target.value);
                            }}
                            required
                            value={categorie}
                        >
                            <option></option>
                            <option value="RECIPE">Receita</option>
                            <option value="CURIOSITY">Curiosidade</option>
                            <option value="GENERAL">Geral</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
export default SaveModal;