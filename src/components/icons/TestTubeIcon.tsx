import React from 'react';

interface IconProps {
  className?: string;
}

export const TestTubeIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-1.721-.984-3.235-2.454-3.997A4.5 4.5 0 008.25 6.087v8.814c0 .341.034.675.1.996.096.467.228.92.394 1.348.197.493.446.95.74 1.368.293.417.633.78.996 1.093a4.5 4.5 0 006.02 0c.363-.313.703-.676.996-1.093.294-.418.543-.875.74-1.368.166-.428.298-.881.394-1.348.066-.321.1-.655.1-.996V6.087z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75h.008v.008H12V9.75z" />
    </svg>
);