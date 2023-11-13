'use client';

import Modal from "react-modal";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function RecipesModal(props) {

    const [recipeData,setRecipeData] = useState({});

    useEffect( () => {
        setRecipeData(props.data);
    },[props.data]);

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
                        width: "60%",
                        height: "80%",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <div className="bg-orange">
                    <button className="close-button absolute top-0 right-0 m-4" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                    <div className="text-center">
                        <div className="m-4 inline-block text-xl font-bold">
                            {props.categorie}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="m-4 inline-block text-xl font-bold">
                        id: {props.id}
                    </div>
                </div>
                <div className="m-4 text-xl font-bold">Pergunta:</div>
                <div className="m-4 flex">
                    <div className="m-4 text-base font-normal">{recipeData.message}</div>
                </div>
                <div className="m-4 text-xl font-bold">Resposta:</div>
                <div className="m-4 flex h-3/6">
                    <div className="h-11/12 m-4 px-2 text-base font-normal overflow-y-auto overscroll-contain scroll-custom">
                        {recipeData.answer}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default RecipesModal;