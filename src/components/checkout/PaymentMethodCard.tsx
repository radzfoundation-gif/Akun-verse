'use client';

import { LucideIcon } from 'lucide-react';

interface PaymentMethodCardProps {
    id: string;
    name: string;
    icon: LucideIcon;
    iconBgColor: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
    description?: string;
}

export default function PaymentMethodCard({
    id,
    name,
    icon: Icon,
    iconBgColor,
    isSelected,
    onSelect,
    description,
}: PaymentMethodCardProps) {
    return (
        <button
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${isSelected
                    ? 'border-brand-500 bg-brand-50 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
        >
            <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                <Icon size={24} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-medium ${isSelected ? 'text-brand-700' : 'text-gray-900'}`}>
                    {name}
                </p>
                {description && (
                    <p className="text-sm text-gray-500 truncate">{description}</p>
                )}
            </div>
            <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                    }`}
            >
                {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                )}
            </div>
        </button>
    );
}
