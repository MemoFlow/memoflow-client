import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  id: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  error?: string;
  labelRight?: React.ReactNode;
}

export default function InputField({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  labelRight,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-1.5 w-full mb-5 text-left">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="font-brand text-[0.8rem] font-medium text-slate-500 tracking-wider">
          {label}
        </label>
        {labelRight}
      </div>
      
      <div className="relative flex items-center w-full">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full px-4 py-3 font-sans text-[0.95rem] text-slate-800 bg-white border rounded-xl outline-none transition-all duration-200 ${
            error 
              ? 'border-red-500 focus:ring-3 focus:ring-red-500/15 focus:border-red-500' 
              : 'border-slate-200 focus:border-brand-green focus:ring-3 focus:ring-brand-green/25'
          }`}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute right-3.5 bg-none border-none p-1 text-slate-400 cursor-pointer flex items-center justify-center rounded-lg hover:text-slate-700 hover:bg-slate-100/50 focus-visible:outline-2 focus-visible:outline-brand-green transition-all"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              /* Eye Off Icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              /* Eye Icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <span className="text-[0.75rem] text-red-500 mt-1 pl-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
