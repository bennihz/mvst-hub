import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    label?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', label = 'label', ...props }) => {
    const buttonClass = `bg-blue-500 text-red font-bold py-2 px-4 rounded`;

    return (
        <button className={buttonClass} {...props}>
            {label}
        </button>
    );
};

export default Button;
