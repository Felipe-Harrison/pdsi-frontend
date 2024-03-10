'use client';

import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";

function FilterModal(props) {

    const handleSubmit = async e => {
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
                        <div className="m-4 inline-block text-2xl font-bold">Filtro</div>
                    </div>
                    <div className="m-4 text-xl font-bold">Título</div>
                    <div className="m-4 flex">
                        <input className="w-full h-10 border border-2 rounded-md" placeholder=" Informe título para mensagem" />
                    </div>
                    <div className="m-4 text-xl font-bold">Categoria</div>
                    <div className="m-4 flex">
                        <select className="w-full h-10 border border-2 rounded-md" name="category">
                            <option></option>
                            <option value="receita">Receita</option>
                            <option value="curiosidade">Curiosidade</option>
                            <option value="geral">Geral</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="mb-4 bg-orange hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                            Filtrar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
export default FilterModal;