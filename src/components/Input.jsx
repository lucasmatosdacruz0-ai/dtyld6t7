import React from 'react';

export function Input({ label, type = 'text', value, onChange, placeholder, name, required = false, min, max, options = [] }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            {type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                    required={required}
                >
                    <option value="" disabled>Selecione...</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    required={required}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
            )}
        </div>
    );
}
