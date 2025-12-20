import { useState } from 'react';

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export function Dropdown({ value, options, onChange }: DropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className='relative w-full'>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className='
                    w-full
                    h-10
                    flex items-center justify-center
                    rounded-md 
                    bg-neutral-900 
                    px-4
                    text-sm 
                    text-neutral-200
                    
                    border border-neutral-500
                    hover:border-neutral-500
                    focus:border-neutral-500
                    '
            >
                <span className="flex items-center gap-2">
                    {value}
                    <svg className={`h-4 w-4 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        />
                    </svg>
                </span>
            </button>

            {/* Dropdown panel */}
            { open && (
                <div className="absolute z-10 mt-2 w-full rounded bg-neutral-900 shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option)
                                setOpen(false)
                            }}
                            className='
                                flex w-full items-center gap-3
                                px-4 py-2
                                text-sm text-neutral-200
                                bg-neutral-800
                                border-b border-neutral-800
                                last:border-b-0
                            '>
                                {/* Radio Button */}
                                <span className={`h-4 w-4 rounded-full border flex items-center justify-center 
                                ${value === option ? 'border-blue-500' : 'border-neutral-500' }`}>
                                    {value === option && (
                                        <span className='h-2 w-2 rounded-full bg-blue-500'/>
                                    )}
                                </span>
                                {option}
                        </button>  
                    ))}
                </div>                
            )}
        </div>
    );
}