import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { Form } from './pages/Form';
import { Plan } from './pages/Plan';

function App() {
    const [view, setView] = useState('landing'); // landing, form, plan
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStart = () => setView('form');

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        try {
            const res = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: formData })
            });

            if (!res.ok) throw new Error('Failed to generate plan');

            const data = await res.json();
            setPlanData(data);
            setView('plan');
        } catch (error) {
            console.error(error);
            alert('Erro ao gerar plano. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setPlanData(null);
        setView('landing');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <>
            {view === 'landing' && <Landing onStart={handleStart} />}
            {view === 'form' && <Form onSubmit={handleFormSubmit} />}
            {view === 'plan' && planData && <Plan planData={planData} onReset={handleReset} />}
        </>
    );
}

export default App;
