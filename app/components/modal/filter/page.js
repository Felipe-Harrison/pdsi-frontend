'use client';

import { useState } from "react";
import Modal from "react-modal";
import { XMarkIcon,FunnelIcon } from "@heroicons/react/24/outline";

function FilterModal(props) {

    const [titleFilter,setTitleFilter] = useState("");
    const [categorieFilter,setcategorieFilter] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        props.onFilter(titleFilter.toLowerCase(),categorieFilter);
    }

    return (
        <div>

            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.onRequestClose}
                contentLabel='Filter Modal'
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "80%",
                        height: "45vh",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                    },
                }}
            >
                <button className="close-button absolute top-0 right-0 m-4 text-white" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                <form onSubmit={handleSubmit}>
                    <div className="text-center bg-orange text-white">
                        <div className="m-4 inline-block text-2xl font-bold ">Filtro</div>
                    </div>
                    <div className="m-4 text-xl font-bold">Título</div>
                    <div className="m-4 flex">
                        <input className="w-full h-10 border border-2 rounded-md px-3" placeholder=" Informe título para mensagem" onChange={ e => setTitleFilter(e.target.value)} value={titleFilter}/>
                    </div>
                    <div className="m-4 text-xl font-bold">Categoria</div>
                    <div className="m-4 flex">
                        <select className="w-full h-10 border border-2 rounded-md" name="category" onChange={ e => setcategorieFilter(e.target.value)} value={categorieFilter}>
                            <option value=''>Selecione</option>
                            <option value="RECIPE">Receita</option>
                            <option value="CURIOSITY">Curiosidade</option>
                            <option value="GENERAL">Geral</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="mb-4 bg-orange hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                           Filtrar
                        </button>
                        <button 
                            type="reset" 
                            class="ml-2 mb-4 bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setTitleFilter("");
                                setcategorieFilter("");
                            }}
                        >
                            Limpar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
export default FilterModal;