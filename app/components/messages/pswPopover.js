import classNames from "classnames";
import { CheckIcon,XMarkIcon } from "@heroicons/react/24/outline";

const PswValidationItem = ({isOk,text}) => {

    const iconSize = "h-4 w-4";

    return(
        <p className={classNames({
            "flex flex-row items-center": true,
            "text-green-600": isOk,
            "text-red-600": !isOk,
        })}
        >
            {isOk ? <CheckIcon className={iconSize}/> : <XMarkIcon className={iconSize}/>}
            {text}
        </p>
    );
};

export const PopOver = ({isOpen,btn,pswValidation}) => {

    function calculeArrowPos(btn) {

        const inputPos = btn.current.getBoundingClientRect();
        let position = inputPos.left + (inputPos.width / 2) - (8 / 2);
        return position;
    };

    return(
        <>
            {isOpen && (
                <div className="absolute top-full mt-3 bg-white border border-blue-200 rounded p-4 shadow-md w-max">
                    <p className="text-start">Sua senha deve conter: </p>
                    {pswValidation.map( validation => (
                        <PswValidationItem key={validation.text} isOk={validation.valid} text={validation.text}/>
                    ))}
                    <div className={`
                        absolute -top-[8px] left-[${calculeArrowPos(btn)}px] h-0 w-0
                        border-l-transparent border-l-8
                        border-r-transparent border-r-8
                        border-b-inherit border-b-8
                        -translate-x-1/2
                    `}/>
                </div>
            )}
        </>
    );
}