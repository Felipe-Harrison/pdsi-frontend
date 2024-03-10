'use client';

import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";

function VipModal(props) {   

    return (
        <div>

            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.onRequestClose}
                contentLabel='Vip Modal'
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    content: {
                        width: "550px",
                        height: "85vh",
                        margin: "auto",
                        padding: "0px",
                        border: "none",
                        overflow: "hidden",
                        backgroundColor: "rgba(255,99,71,255)",
                        backgroundImage: `url('/image/Rectangle3.png')`,
                    },
                }}
            >
                <button className="close-button absolute top-0 right-0 m-4" onClick={props.closeModal}><XMarkIcon className="h-8 w-8" /></button>
                <img className="w-[75%] h-[75%] mx-auto" src="/image/promocionalChef.png" />
                <div className="text-center">
                    <p className="mb-4 inline-block">Seja VIP agora mesmo e tenha acesso a todos esses benefícios</p>
                </div>
                <div class="text-center">
                    <button class="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Virar VIP
                    </button>
                </div>
            </Modal>
        </div>
    );
}
export default VipModal;