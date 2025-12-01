import React from 'react';

export function Card({ children, className = '', title }) {
    return (
        <div className={`bg-white rounded-xl shadow-xl border border-slate-100 p-6 ${className}`}>
            {title && <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>}
            {children}
        </div>
    );
}
