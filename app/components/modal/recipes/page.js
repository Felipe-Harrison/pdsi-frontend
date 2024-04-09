'use client';

import Modal from "react-modal";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MessageFormatter from "@/app/components/messages/messageFormatter";

function RecipesModal(props) {

    const [recipeData,setRecipeData] = useState({});
    const [typeModel, setTypeModel] = useState("");

    function handleCategorie(categorie) {
        const categories = {
            "Receita": "bg-orange border-orange",
            "Curiosidade": "bg-yellow-300 border-yellow-300",
            "Outro": "bg-green-600 border-green-600"
        };

        return categories[categorie] ? categories[categorie] : "bg-orange";
    };

    useEffect( () => {
        setRecipeData(props.data);
        setTypeModel(handleCategorie(props.categorie));
    },[props.categorie,props.data]);

    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.onRequestClose}
                contentLabel='Recipe Modal'
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "70%",
                        height: "80%",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
                id="modal-favorite"
            >
                <div className={typeModel}>
                    <button className="close-button absolute top-0 right-0 m-4" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                    <div className="text-center">
                        <div className="m-4 inline-block text-xl font-bold">
                            {props.categorie}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mx-3 gap-4 p-2 h-11/12">
                    <div className="text-xl font-bold">Pergunta:</div>
                    <div className="text-base font-normal">
                        {recipeData.message}
                    </div>
                    <div className="text-xl font-bold">Resposta:</div>
                    <div className="h-10/12 px-2 text-base font-normal overflow-y-auto overscroll-contain scroll-custom">
                        {MessageFormatter(recipeData.answer)}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default RecipesModal;