import { toast } from 'react-hot-toast';
import api from '@/app/api/api';
import axios from 'axios';
import { Image } from 'next/image';
import { signIn, useSession } from "next-auth/react";
import classNames from 'classnames';
import { PopOver } from '@/app/components/messages/pswPopover';
import { useRef, useState } from 'react';
import { Spinner } from "@/app/components/loading/spinner/Spinner";

export default function Cadastro({tooglePage}) {
    
    const [isLoading,setIsloading] = useState(false);
    // Password Validation
    const [openPopover,setOpenPopOver] = useState(false);
    const pswField = useRef(null);
    const [passwordRequisites,setPasswordRequisites] = useState(passwordValidation(''));
    const [pswValid,setPswValid] = useState(true);
    const [passwordValue,setPasswordValue] = useState('');
    const [pswConfirm,setPswConfirm] = useState(true);

    async function register(data,userType) {

        let isSuccess = false;
        
        try {
            
            const responseToken = await api.post('/v1/sso/token',{
                username: 'admin',
                password: 'admin' 
            });

            const response = await api.post(`v1/sso/user/${userType}`,
            data,
            {
                headers:{
                    Authorization: "Bearer "+ responseToken.data.accessToken
                }
                
            });
            console.log("User",response);
            isSuccess = true

        } catch (err) {
            console.log(err);
        } finally {
            return isSuccess;
        }
    };

    async function onFormSubmit(e) {
        e.preventDefault();

        // Bloquear senha
        if(!pswValid){
            toast.error("Senha inválida: Verifique senha informada");
            return;
        }

        if(!pswConfirm){
            toast.error("Senhas diferentes: Confirme sua senha novamente");
            return;
        }
        setIsloading(true);

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        const userType = formProps.plano;
        // Logar como admin e completar o Header
        
        const data = {
            username: formProps.username,
            password: formProps.psw
        }

        const successRegister = await register(data,userType)

        if(successRegister) {
            toast.success("Usuario criado com sucesso!");
            e.target.reset();
        } else {
            toast.error("Erro ao criar usuário");
        }
        setIsloading(false);
    
    };

    function passwordValidation (password) {
        const validations = [
            {
                'validation': /[a-z]/, //Minuscula
                'text': 'Pelo menos uma letra minúscula',
            },
            {
                'validation': /[A-Z]/, //Maiuscula
                'text': 'Pelo menos uma letra maiúscula',
            },
            {
                'validation': /[\W]/, //Special Char
                'text': 'Pelo menos um caracter especial',
            },
            {
                'validation': /[0-9]/, //Numero
                'text': 'Pelo menos um número',
            },
        ];
    
        validations.forEach( validation => {
            validation.valid = validation.validation.test(password);
        });

        return validations;
    };

    return (
        <>
            <div className='text-center'>
                <div className='text-start mt-4'>
                    <h1 className='font-bold text-2xl mx-8'>
                        Cadastro: 
                    </h1>
                </div>
                <form onSubmit={onFormSubmit} className='flex flex-col justify-around items-start mx-8 gap-4'>
                    {/* usuário */}
                    <>
                        <label for="username" className="text-text text-md font-bold">Usuário</label>
                        <input
                            id='username'
                            name='username'
                            type="text"
                            required
                            placeholder='Informe nome de acesso'
                            pattern='^[a-zA-Z0-9_]*$'
                            title='Nome de acesso sem espaço'
                            autoFocus
                            className="
                                w-full
                                px-3 py-1
                                bg-transparent
                                rounded border border-gray-300 outline-blue-200
                            "
                        />
                    </>
                    {/* senha */}
                    <div className='relative flex flex-row wrap gap-6'>
                        <div className='flex flex-col items-start'>
                            <label for="psw" className="text-text text-md font-bold">Senha</label>
                            <input
                                id='psw'
                                name='psw'
                                type="password"
                                required
                                className={classNames({
                                    "w-full px-3 py-1 bg-transparent rounded border border-gray-300 outline-blue-200":true,
                                    "border-red-400 outline-red-400": !pswValid,
                                    "border-gray-300": pswValid,
                                })}
                                placeholder='Insira uma senha'
                                onFocus={() => setOpenPopOver(true)}
                                onBlur={() => {setOpenPopOver(false)}}
                                ref={pswField}
                                onChange={ e => { 
                                    const validations = passwordValidation(e.target.value);
                                    let valid = true
                                    validations.forEach(item => item.valid ? valid = true : valid = false);
                                    setPswValid(valid);
                                    setPasswordRequisites(validations);
                                    setPasswordValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label for="pswConf" className="text-text text-md font-bold">Confirmar Senha</label>
                            <input
                                id='pswConf'
                                name='pswConf'
                                type="password"
                                placeholder='Confirme a senha'
                                className={classNames({
                                    "w-full px-3 py-1 bg-transparent rounded border border-gray-300 outline-blue-200":true,
                                    "border-red-400 outline-red-400": !pswConfirm,
                                    "border-gray-300": pswConfirm,
                                })}
                                onChange={ e => {
                                    if(e.target.value == passwordValue){
                                        setPswConfirm(true);
                                    }else{
                                        setPswConfirm(false);
                                    }
                                }}
                            />
                        </div>
                        <PopOver isOpen={openPopover} btn={pswField} pswValidation={passwordRequisites}/>
                    </div>
                    {/* email */}
                    <>
                        <label for="email" className="text-text text-md font-bold">Email: </label>
                        <input
                            id='email'
                            name='email'
                            type="email"
                            placeholder='Insira um email'
                            className="
                                w-full
                                px-3 py-1
                                bg-transparent
                                rounded border border-gray-300 outline-blue-200
                            "
                        />
                    </>
                    <>
                    <label className='text-text text-md font-bold'>
                        Plano: 
                    </label>
                    <div className='grid w-full gap-6 grid-cols-2 text-start'>
                        <div class="flex gap-2 items-center">
                            <input
                                checked
                                type="radio"
                                name="plano"
                                id="gratuito"
                                className="w-6 h-6 border border-stone-300"
                                value={'free'}
                            />
                            <label htmlFor="gratuito" className="text-text text-md font-bold">Gratuito</label>
                        </div>
                        <div class="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="plano"
                                id="member"
                                className="w-6 h-6 border border-stone-300"
                                value={'member'}
                            />
                            <label htmlFor="member" className="text-text text-md font-bold">Membro</label>
                        </div>
                    </div>
                    </>
                    <button 
                    type='submit'
                    className='
                        w-7/12 h-12 self-center
                        mt-8
                        text-center text-neutral-100 text-xl font-bold
                        bg-emerald-500 rounded-lg shadow border
                        transition duration-200
                        hover:bg-emerald-800
                    '
                    disabled={isLoading}
                    >
                       {isLoading ? ( <Spinner/> ) : 'Cadastrar' }
                    </button>
                </form>
                <div className='mt-12'>
                    <div 
                        className="text-center text-text text-md font-normal"
                    >
                        Já possui uma conta?
                    </div>
                    <button 
                        type='button' 
                        onClick={() => tooglePage()}
                        className="
                        w-5/12 h-12
                        mt-4
                        text-center text-neutral-100 text-xl font-bold
                        transition duration-200
                        bg-orange rounded-lg shadow border
                        hover:bg-yellow-900
                    "
                    >
                        Entrar
                    </button>
                </div>
            </div>
            <div className='
                bg-orange bg-food-pattern 
                rounded-r
                flex flex-col items-center justify-center wrap
                text-center font-bold text-2xl text-white
            '>
                <div className='bg-promotionImg h-full w-full bg-no-repeat bg-center bg-contain'/>
            </div>
        </>
    )
}