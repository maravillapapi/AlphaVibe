import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    animated?: boolean;
    animationDelay?: number;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hover = true,
    animated = false,
    animationDelay = 0
}) => {
    const delayClass = animationDelay > 0 && animationDelay <= 8 ? `animate-delay-${animationDelay}` : '';

    return (
        <div
            className={`
                bg-[var(--background-card)] rounded-xl shadow-md
                border border-[var(--border-light)]
                ${hover ? 'hover-lift' : ''}
                ${animated ? `animate-fade-in-up ${delayClass}` : ''}
                ${onClick ? 'cursor-pointer' : ''}
                ${className}
            `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
