import React from 'react';

export interface ButtonProps {
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, variant= 'primary', className = '', label }) => {
    return (
        <button
            onClick={onClick}
            className={`${className} px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black'}`}
        >
            {label}
        </button>
    );
};

export default Button;