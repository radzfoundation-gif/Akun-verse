'use client';

import { Check } from 'lucide-react';

interface CheckoutStepsProps {
    currentStep: number;
    steps: string[];
}

export default function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                    <div key={step} className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${isCompleted
                                        ? 'bg-green-500 text-white'
                                        : isCurrent
                                            ? 'bg-brand-500 text-white'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}
                            >
                                {isCompleted ? <Check size={16} /> : stepNumber}
                            </div>
                            <span
                                className={`hidden sm:block text-sm font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-400'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-8 sm:w-12 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
