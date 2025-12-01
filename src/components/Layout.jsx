import React from 'react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">💪</span>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Body60
                        </span>
                    </div>
                </div>
            </nav>
            <main className="max-w-5xl mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="text-center py-8 text-slate-400 text-sm">
                <p>© 2024 Mudar de Corpo em 60 Dias. Feito com ❤️ e IA.</p>
            </footer>
        </div>
    );
}
