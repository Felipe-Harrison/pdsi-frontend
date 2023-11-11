'use client';

import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import api from "@/app/api/api";
import toast from "react-hot-toast";
import { useState } from "react";

function SaveModal(props) {

    const [title,setTitle] = useState("");
    const [categorie,setCategorie] = useState("");

    const handleSubmit = async e => {

        e.preventDefault();

        const username = "test";

        const data = {
            "questionId": props.id ? props.id : "123",
            "topic": categorie.toUpperCase(),
            "tittle": title
        }
        
        try {
            const response = api.put(`/v1/question/${username}/favorites`,{
                data: data,
            });

            console.log(response);

            toast.success("Mensagem favoritada com sucesso!!!");

        } catch (err) {
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
                        width: "550px",
                        height: "45vh",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <button className="close-button absolute top-0 right-0 m-4" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <div className="m-4 inline-block text-2xl font-bold">Salvar mensagem em Favoritos</div>
                    </div>
                    <div className="m-4 text-xl font-bold">Título</div>
                    <div className="m-4 flex">
                        <input 
                            className="w-full h-10 border border-2 rounded-md" 
                            placeholder=" Informe título para mensagem" 
                            onChange={ e => {
                                setTitle(e.target.value);
                            }}
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
                            value={categorie}
                        >
                            <option></option>
                            <option value="receita">Receita</option>
                            <option value="curiosidade">Curiosidade</option>
                            <option value="geral">Geral</option>
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