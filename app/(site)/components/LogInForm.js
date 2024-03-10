'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Logo } from "@/public/image/Logo";

import Spinner from '@/app/components/loading/spinner/Spinner';

export const LoginForm = ({tooglePage}) => {

    const session = useSession();

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading,setIsloading] = useState(false);

    // Controle Login
    useEffect(() => {
        if (session.status == 'authenticated') {
            router.push('/users');
        }
    }, [router, session.status]);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsloading(true)

        signIn('credentials', {
            email: username,
            password: password,
            redirect: false,
        }).then((callback) => {
            if (callback.error) {
                toast.error("Erro ao realizar login: Nome de usuário ou senha errada")
                console.log("Erro ao realizar login: " + callback.error);
            }
            if (callback.ok && !callback.error) {
                toast.success("Usuario logado com sucesso!");
                router.push('/users');
            }
        }).finally( () => {
            setIsloading(false)
        });
    }

    return (
        <>
            <div className='
                flex flex-col items-center justify-center wrap
                bg-orange bg-food-pattern 
                rounded-l
                text-center font-bold text-2xl text-white
            '>
                <p className='mx-2'>Precisou de ajuda na Cozinha?</p>
                <p>Deixa com o Chef!</p>
            </div>
            <div className='text-center'> 
                <div className='mt-4'>
                    <Logo height={175}/>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-around items-center'>
                    {/* usuário */}
                    <input 
                        autoFocus
                        type="text" 
                        onChange={(event) => { setUsername(event.target.value) }} 
                        required
                        className="
                            w-9/12
                            px-3 py-2 my-4
                            bg-transparent
                            text-zinc-800 text-xl font-bold 
                            border-b-2 border-zinc-800 outline-none
                        "
                        placeholder="Usuário" 
                    />
                    {/* senha */}
                    <input 
                        type="password" 
                        onChange={(event) => { setPassword(event.target.value) }} 
                        required
                        className="
                            w-9/12
                            px-3 py-2 mt-3
                            bg-transparent
                            text-zinc-800 text-xl font-bold 
                            border-b-2 border-zinc-800 outline-none
                        "
                        placeholder="Senha" 
                    />
                    <button 
                        type='submit'
                        className='
                            w-5/12 h-12
                            mt-8
                            text-center text-neutral-100 text-lg font-bold
                            bg-emerald-500 rounded-lg shadow border
                            transition duration-200
                            hover:bg-emerald-800
                        '
                        disabled={isLoading}
                    >
                        {isLoading ? (<><Spinner/> <span className='ml-2'>Verificando...</span></>) : "Entrar"}
                    </button>
                </form>
                <div>
                    <a className='text-gray-400 text-sm underline cursor-pointer'>
                        Esqueceu sua senha?
                    </a>
                </div>
                <div className='mt-12'>
                    <div 
                        className="text-center text-text text-md font-normal"
                    >
                        Não possui uma conta ainda?
                    </div>
                    <button 
                        type='button' 
                        onClick={() => tooglePage()}
                        className="
                        w-fit h-12
                        md:w-5/12
                        mt-4 px-2
                        text-center text-neutral-100 text-xl font-bold
                        transition duration-200
                        bg-orange rounded-lg shadow border
                        hover:bg-yellow-900
                    "
                    >
                        Cadastre-se
                    </button>
                </div>
            </div>
        </>
    )
}

export default LoginForm;
