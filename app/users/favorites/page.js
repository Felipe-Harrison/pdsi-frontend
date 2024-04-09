'use client';

import classNames from "classnames";
import { useEffect, useState } from "react";

import api from "@/app/api/api";
import { userSession } from "@/app/api/auth/customSession";
import { FavoriteField } from "./FavoriteField";

import FilterModal from "../../components/modal/filter/page";
import { FunnelIcon} from "@heroicons/react/24/outline";

const Favorites = () => {

    const [favoritesFiltered,setFavoritesFiltered] = useState([]);
    const [favorites,setFavorites] = useState([]);

    // Modal control
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const NormalizeTopic = (topic) => {
        const categories = {
            "GENERAL" : 'Outro',
            "RECIPE": "Receita",
            "CURIOSITY": "Curiosidade"
        }
    
        return categories[topic] ? categories[topic] : "Outro";
    };

    function setFavoriteList( favoriteList, filter) {

        let listAux = favoriteList;
        if(filter) {
            listAux = favoriteList.filter( favorite => ( 
                favorite['question'].toLowerCase().includes(filter[0]) && favorite['topic'].includes(filter[1])
            ));
        }
        
        setFavoritesFiltered( listAux.map( item => 
            <FavoriteField 
                id= {item.questionId} 
                key={item.questionId} 
                message={item.question} 
                categorie={NormalizeTopic(item.topic)}
                data={{
                    message: item.question,
                    answer: item.answer,
                }}
            />
        ));
    }

    useEffect( () => {

        const getFavourites = async () => {

            try {
                
                // const session = await userSession();
                // const username = session.username;
                
                // const responseToken = await api.post('/v1/sso/token',{
                //     username: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_USER,
                //     password: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_PSW 
                // });
    
                // const response = await api.get(`/v1/question/${username}/favorites`,
                // {
                //     headers:{
                //         Authorization: "Bearer "+ responseToken.data.accessToken
                //     }
                    
                // });

                const favorites = [
                    {
                        "questionId": "f648d97e-d8f6-4447-bffb-b67e12eff830",
                        "topic": "RECIPE",
                        "question": "Receita de macarrão",
                        "answer": "\n\nIngredientes:\n- 500g de macarrão de sua preferência\n- 2 dentes de alho\n- 1 cebola\n- Azeite\n- Sal\n\nModo de Preparo:\n\n1. Em uma panela, leve ao fogo o macarrão de sua preferência e deixe cozinhar de acordo com as instruções da embalagem.\n\n2. Enquanto isso, em uma frigideira, frite o alho e a cebola no azeite.\n\n3. Quando o macarrão estiver cozido, escorra a água e coloque-o na frigideira.\n\n4. Misture tudo com o alho e a cebola, e tempere com sal a gosto.\n\n5. Sirva quente.",
                        "answerCreatedAt": "2023-11-12T15:02:22.156726841"
                    },
                    {
                        "questionId": "6bb7e33b-1f14-41b8-a49f-ca33f4a7af4b",
                        "topic": "RECIPE",
                        "question": "Receita de strogonoff",
                        "answer": "\n\nINGREDIENTES\n\n- 500g de carne moída;\n- 2 colheres de sopa de óleo;\n- 2 cebolas picadas;\n- 2 dentes de alho picados;\n- 1 xícara de chá de vinho branco;\n- 1 xícara de chá de caldo de carne;\n- 1 lata de creme de leite;\n- 1 colher de sopa de catchup;\n- 1 colher de sopa de mostarda;\n- 1 colher de sopa de molho inglês;\n- Sal e pimenta a gosto;\n- Salsinha e cebolinha a gosto;\n- 2 colheres de sopa de farinha de trigo;\n- 2 colheres de sopa de manteiga.\n\nMODO DE PREPARO\n\n1. Em uma panela, aqueça o óleo e refogue a carne moída até dourar.\n\n2. Acrescente a cebola e o alho e refogue por mais alguns minutos.\n\n3. Junte o vinho branco e deixe ferver por alguns minutos.\n\n4. Acrescente o caldo de carne, o creme de leite, o catchup, a mostarda, o molho inglês, sal, pimenta, salsinha e cebolinha.\n\n5. Misture bem e deixe cozinhar por cerca de 20 minutos.\n\n6. Em uma vasilha, misture a farinha de trigo com a manteiga até formar uma farofa.\n\n7. Acrescente a farofa à panela com o strogonoff e misture bem.\n\n8. Desligue o fogo e sirva a seguir.",
                        "answerCreatedAt": "2023-11-12T14:58:02.620354406"
                    },
                    {
                        "questionId": "b728ba77-579f-457a-9abb-078b689a580c",
                        "topic": "CURIOSITY",
                        "question": "Panela",
                        "answer": "\n\nUma panela é um utensílio de cozinha usado para cozinhar alimentos. Geralmente é feito de metal, mas também pode ser feito de barro ou cerâmica.",
                        "answerCreatedAt": "2023-11-12T14:36:28.950571903"
                    },
                    {
                        "questionId": "c6154183-83bc-48e7-ad95-3c25bfa1fef3",
                        "topic": "GENERAL",
                        "question": "QUal o instrumento utilizar para cozinha um ovo da melhor maneira?",
                        "answer": ".\nUma frigideira.",
                        "answerCreatedAt": "2023-11-12T13:50:09.918633529"
                    },
                    {
                        "questionId": "8142809f-953d-44a7-9ea1-c5e2cb6c606a",
                        "topic": "CURIOSITY",
                        "question": "Feijão",
                        "answer": ".\n\nO feijão é um alimento muito nutritivo, rico em proteínas, ferro, vitaminas e minerais. É uma importante fonte de energia para a dieta humana. É uma leguminosa comum em pratos de todo o mundo, como feijoada, feijão com arroz e sopas.",
                        "answerCreatedAt": "2023-11-12T14:45:58.926149682"
                    },
                    {
                        "questionId": "d10c04db-0fef-4aff-82b8-c5d2a0fa2125",
                        "topic": "GENERAL",
                        "question": "QUal o instrumento utilizar para cozinha um bife da melhor maneira?",
                        "answer": "\n\nUma frigideira.",
                        "answerCreatedAt": "2023-11-12T13:48:50.553448519"
                    },
                    {
                        "questionId": "166dd806-8d0c-432c-869c-ecac4f426a42",
                        "topic": "RECIPE",
                        "question": "Arroz",
                        "answer": ".\n\nReceita de arroz branco.",
                        "answerCreatedAt": "2023-11-12T14:42:21.743018646"
                    },
                    {
                        "questionId": "bb5b85c1-8918-4604-8d07-6653aa4938bb",
                        "topic": "RECIPE",
                        "question": "Macarrão",
                        "answer": "\n\nReceita de macarrão alho e óleo.",
                        "answerCreatedAt": "2023-11-12T15:06:06.154813686"
                    },
                    {
                        "questionId": "356c1bcc-7d2d-4fac-9ff4-d905c6db94e2",
                        "topic": "RECIPE",
                        "question": "Batata",
                        "answer": ".\n\nReceita de Batata Assada.",
                        "answerCreatedAt": "2023-11-12T14:52:55.229027654"
                    },
                    {
                        "questionId": "f36ef552-e8b9-4f98-a852-a67192295887",
                        "topic": "RECIPE",
                        "question": "Receita de arroz com batata",
                        "answer": "\n\nIngredientes:\n- 2 xícaras de arroz\n- 2 batatas médias\n- 1 cebola média\n- 2 dentes de alho\n- 2 colheres de sopa de azeite\n- Sal a gosto\n\nModo de preparo:\n\n1. Descasque as batatas e corte-as em cubinhos pequenos.\n2. Em uma panela com água fervente, coloque as batatas e deixe cozinhar por 10 minutos.\n3. Enquanto isso, descasque e pique a cebola e os dentes de alho.\n4. Em uma outra panela, aqueça o azeite e refogue a cebola e o alho até ficarem dourados.\n5. Adicione o arroz e refogue por alguns minutos.\n6. Acrescente as batatas cozidas e misture bem.\n7. Adicione água fervente na panela até que o arroz fique coberto.\n8. Tempere com sal a gosto.\n9. Deixe cozinhar por cerca de 15 minutos ou até que o arroz esteja al dente.\n10. Sirva quente.",
                        "answerCreatedAt": "2023-11-12T14:56:18.671720572"
                    }    
                ]
                
                //const favorites = response.data;
                setFavorites(favorites)
                setFavoriteList(favorites);
                
                
            } catch (err) {
                console.log(err)
            }
        }

        getFavourites();
        
    },[]);

    return (
        <div>
        <div
            className="h-screen flex flex-col w-full"
        >
            <div className={classNames({
                "text-center": true,
                "bg-primary text-white font-extrabold text-lg tracking-wide": true, // colors
                "h-14": true,
                "t-0":true,
                "w-full sticky py-4 shadow-sm": true,
            })}>
                <h1>Meus Favoritos</h1>
            </div>
            <div className="
                w-full
                flex flex-col
                items-end
            ">
                <button className="
                    mx-5 my-3 
                    border 
                    p-2 
                    rounded-lg
                    bg-white
                    shadow-md
                    duration-200
                    hover:bg-gray-200
                " onClick={openModal}>
                    <FunnelIcon className="h-6 w-6"/>
                </button>
            </div>
            <div className="h-full overflow-y-scroll relative flex flex-col items-center scroll-custom" id='favorites-itens-scroll'>
                {favoritesFiltered.length ? (
                    favoritesFiltered.map(favorite => (favorite)) 
                ) : (
                    <div> Nenhum favorito encontrado</div>
                )}
            </div>
        </div>
            <FilterModal 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal} 
            closeModal={closeModal} 
            onFilter={(title, categorie) => {
                setFavoriteList(favorites,[title,categorie])
                setModalIsOpen(false);
            }} />
        </div>
    );
}

export default Favorites;