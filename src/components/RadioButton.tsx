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
    return (
        <div>
            <label className={`cursor-pointer ml-2 ${className ?? ''}`}>
                <input
                    id={id}
                    type="radio"
                    name={name}
                    value={value}
                    checked={selectedOption === value}
                    onChange={() => onChange(value)}
                    style={style ?? { marginRight: 6 }}
                    className="mr-1"
                />
                {label ?? value}
            </label>
        </div>
    );
}