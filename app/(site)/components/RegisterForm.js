import classNames from 'classnames';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import api from '@/app/api/api';
import { PasswordInput } from "@/app/components/inputs/passwordInput";
import { Spinner } from "@/app/components/loading/spinner/Spinner";

export default function RegisterForm({tooglePage}) {
    
    const [isLoading,setIsloading] = useState(false);

    const router = useRouter();

    // Password Validation
    const [password, setPassword] = useState('');
    const [pswIsValid, setpswIsValid] = useState(false);
    const [pswConfirm,setPswConfirm] = useState(true);

    async function register(data,userType) {

        let isSuccess = true;
        
        try {
            // Logar como admin e completar o Header
            const responseToken = await api.post('/v1/sso/token',{
                username: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_USER,
                password: process.env.NEXT_PUBLIC_JWT_ADM_REFRESH_PSW
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
        if(!pswIsValid){
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

        const data = {
            username: formProps.username,
            password: formProps.psw
        };

        const successRegister = await register(data,userType);

        if(successRegister) {
            toast.success("Usuario criado com sucesso!");
            e.target.reset();
            signIn('credentials', {
                email: data.username,
                password: data.password,
                redirect: false,
            }).finally( () => {
                router.push('/users');
            })
        } else {
            toast.error("Erro ao criar usuário");
        }
        setIsloading(false);
    
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
                    <div className='relative flex flex-col md:flex-row wrap gap-4 w-full'>
                        <div className='flex flex-col items-start'>
                            <PasswordInput
                                id='psw'
                                name='psw'
                                label='Senha'
                                placeholder='Insira uma senha'
                                onValidate = { isValid => setpswIsValid(isValid)}
                                onChange={ pswValue => setPassword(pswValue)}
                            />
                        </div>
                        
                        <div className='flex flex-col items-start'>
                            <PasswordInput
                                id='pswConf'
                                name='pswConf'
                                label="Confirmar Senha"
                                placeholder='Confirme a senha'
                                validate={false}
                                confirmPassword={true}
                                passwordCompare={password}
                                onComparePassword={ isIgual => setPswConfirm(isIgual)}
                            />
                        </div>
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
                            w-8/12 md:w-7/12 h-12 self-center
                            mt-6
                            text-center text-neutral-100 text-xl font-bold
                            bg-emerald-500 rounded-lg shadow border
                            transition duration-200
                            hover:bg-emerald-800
                        '
                        disabled={isLoading}
                        id='btn-register'
                    >
                       {isLoading ? ( <><Spinner/><span className='text-base pl-2'>Cadastrando...</span></> ) : 'Cadastrar' }
                    </button>
                </form>
                <div className='mt-6 md:mt-12'>
                    <div 
                        className="text-center text-text text-md font-normal"
                    >
                        Já possui uma conta?
                    </div>
                    <button 
                        type='button' 
                        onClick={() => tooglePage()}
                        className="
                        w-8/12 md:w-5/12 h-12
                        mt-4
                        text-center text-neutral-100 text-xl font-bold
                        transition duration-200
                        bg-orange rounded-lg shadow border
                        hover:bg-yellow-900
                        "
                        id='btn-login-page'
                    >
                        Entrar
                    </button>
                </div>
            </div>
            <div className='
                bg-orange bg-food-pattern 
                rounded-r
                hidden md:flex flex-col items-center justify-center wrap
                text-center font-bold text-2xl text-white
            '>
                <div className='bg-promotionImg h-full w-full bg-no-repeat bg-center bg-contain'/>
            </div>
        </>
    )
}