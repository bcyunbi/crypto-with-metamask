import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            className="text-center rounded-full bg-sky-500 hover:bg-sky-600 text-sm text-neutral-100 max-w-fit p-2 cursor-pointer"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;