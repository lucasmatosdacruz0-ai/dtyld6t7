import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

export function Landing({ onStart }) {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                <div className="mb-8 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
                    <span className="relative bg-white px-4 py-1 rounded-full text-sm font-medium text-indigo-600 border border-indigo-100">
                        ✨ Transformação Total
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                    Mude seu corpo em <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        60 Dias
                    </span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    Gere um plano alimentar 100% personalizado, focado nos seus objetivos e biotipo.
                    Sem dietas malucas, apenas ciência e consistência.
                </p>

                <div className="flex gap-4">
                    <Button onClick={onStart} className="text-lg px-8 py-4">
                        Gerar Meu Plano Grátis
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { icon: "⚡", title: "Rápido", desc: "Plano gerado em segundos" },
                        { icon: "🥗", title: "Personalizado", desc: "Baseado no seu metabolismo" },
                        { icon: "📱", title: "Mobile Friendly", desc: "Leve para qualquer lugar" }
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
