import React,{
    useState,
    useEffect,
    useRef,
} from "react";
import classNames from "classnames";
import { PopOver } from "../messages/pswPopover";
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";


export const PasswordInput = ({
    label,
    id,
    name,
    placeholder = "Insira uma senha",
    required = true,
    validate = true, 
    confirmPassword = false,
    passwordCompare = "",
    // Events
    onValidate = () => {},
    onComparePassword = () => {},
    onChange = () => {},
}) => {

    // Password Control
    const [pswValid,setPswValid] = useState(true);

    const [show,setShow] = useState(false);
    const [elementHasFocus, setelementHasFocus] = useState(false);

    // Password Feedback
    const pswField = useRef(null);
    const [openPopover,setOpenPopOver] = useState(false);
    const [passwordRequisites,setPasswordRequisites] = useState(passwordValidation(''));
    const [pswFeedbackMessage, setpswFeedbackMessage] = useState("");

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
                'text': 'Pelo menos um caracter especial (Ex: @.-_!)',
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
    
    function passwordMessageFeedback(feedbackType)  {
        
        const feedbacks = [
            "Senha inválida", // 0
            "Senhas diferentes" // 1
        ];

        if(feedbackType < 0 || feedbackType > feedbacks.length) return;

        setpswFeedbackMessage(feedbacks[feedbackType]);
    }

    function comparePassword(password) {
        return password === passwordCompare;
    };

    function validatePassword( password ) {

        let isValid = true;
        let feedbackType = -1;

        if(validate) {
            const validations = passwordValidation(password);
            validations.forEach(item => item.valid ? isValid = true : isValid = false);
            setPasswordRequisites(validations);
            onValidate(isValid);
            feedbackType = !isValid && 0;
        }

        if(confirmPassword) {
            let isIgual = comparePassword(password);
            onComparePassword(isIgual);
            isValid = isIgual;
            feedbackType = !isIgual && 1;
        }

        passwordMessageFeedback(feedbackType);

        return isValid;
    }

    // Se alterar senha limpa campo
    useEffect( () => {
        if(confirmPassword) {
            pswField.current.value = "";
        }
    },[confirmPassword, passwordCompare]);

    return (<>
        <label for="psw" className="text-text text-md font-bold truncate">
            {label}
        </label>
        <div className="relative w-full">
            <input
                id={id}
                name={name}
                type={show ? "text" : "password"}
                required={required}
                placeholder={placeholder}
                className={classNames({
                    "w-full px-3 py-1 bg-transparent rounded border border-gray-300 outline-blue-200":true,
                    "border-red-400 outline-red-400": !pswValid,
                    "border-gray-300": pswValid,
                })}
                onFocus={() => {setOpenPopOver(validate); setelementHasFocus(true)}}
                onBlur={() => setOpenPopOver(false)}
                ref={pswField}
                onChange={ e => {
                    setPswValid(validatePassword(e.target.value));
                    onChange(e.target.value);
                }}
            />
            { elementHasFocus && (show ? (
                <EyeSlashIcon className={icon} onClick={() => setShow(false)} title="Esconder senha"/>
            ) : (
                <EyeIcon className={icon} onClick={() => setShow(true)} title="Mostrar senha"/>
            ))}
        </div>
        {!pswValid && ( 
            <span className="text-red-400 text-xs pl-1">{pswFeedbackMessage}</span> 
        )}
        <PopOver isOpen={openPopover} btn={pswField} pswValidation={passwordRequisites}/>
    </>);
};

export default PasswordInput;

const icon = "w-5 h-5 absolute inset-y-1/2 -translate-y-1/2 right-2 cursor-pointer"