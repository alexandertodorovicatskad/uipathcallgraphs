import React from 'react';

interface RadioButtonProps {
    id: string;
    name: string;
    value: string;
    label?: React.ReactNode;
    selectedOption?: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    className?: string;
}

export default function RadioButton({
    id,
    name,
    value,
    label,
    selectedOption,
    onChange,
    style,
    className,
}: RadioButtonProps) {
    const isChecked = selectedOption === value;

    return (
        <div>
            <label
                htmlFor={id}
                className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-colors select-none ${isChecked ? 'bg-cyan-50 ring-1 ring-cyan-200' : 'hover:bg-gray-50'
                    } ${className ?? ''}`}
            >
                {/* visually hidden native input for accessibility */}
                <input
                    id={id}
                    type="radio"
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={() => onChange(value)}
                    style={style}
                    className="sr-only"
                />

                {/* custom radio circle */}
                <span
                    aria-hidden
                    className={`flex items-center justify-center w-4 h-4 rounded-full border transition-colors ${isChecked ? 'bg-cyan-600 border-cyan-600' : 'bg-white border-gray-300'
                        }`}
                >
                    {isChecked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>

                <span className="text-sm text-gray-800">{label ?? value}</span>
            </label>
        </div>
    );
}