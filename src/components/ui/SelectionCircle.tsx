import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCircleProps {
    checked: boolean;
    onChange?: () => void;
    className?: string;
}

export const SelectionCircle: React.FC<SelectionCircleProps> = ({ checked, onChange, className = '' }) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onChange?.();
            }}
            className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0
                ${checked
                    ? 'bg-accent-blue border-accent-blue'
                    : 'bg-white border-gray-300 hover:border-gray-400'}
                ${className}
            `}
        >
            <Check
                size={14}
                className={`text-white transition-transform duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                strokeWidth={3}
            />
        </div>
    );
};
