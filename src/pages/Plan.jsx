import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Download, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';

export function Plan({ planData, onReset }) {
    const [currentWeek, setCurrentWeek] = useState(1);
    const { plan, user, stats, downloadUrl } = planData;

    const daysPerWeek = 7;
    const totalWeeks = Math.ceil(plan.length / daysPerWeek);

    const currentDays = plan.slice((currentWeek - 1) * daysPerWeek, currentWeek * daysPerWeek);

    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Seu Plano de 60 Dias</h1>
                    <p className="text-slate-500">Meta: {user.goal} • {stats.calories} kcal/dia</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={onReset}>Novo Plano</Button>
                    <a href={downloadUrl} download="plano_60_dias.json" target="_blank" rel="noreferrer">
                        <Button className="flex items-center gap-2">
                            <Download size={18} /> Baixar JSON
                        </Button>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="text-blue-600 font-semibold mb-1">Proteína</div>
                    <div className="text-2xl font-bold text-blue-900">{stats.macros.p}g</div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="text-green-600 font-semibold mb-1">Carboidratos</div>
                    <div className="text-2xl font-bold text-green-900">{stats.macros.c}g</div>
                </Card>
                <Card className="bg-orange-50 border-orange-100">
                    <div className="text-orange-600 font-semibold mb-1">Gorduras</div>
                    <div className="text-2xl font-bold text-orange-900">{stats.macros.f}g</div>
                </Card>
            </div>

            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setCurrentWeek(w => Math.max(1, w - 1))}
                    disabled={currentWeek === 1}
                    className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30"
                >
                    <ChevronLeft />
                </button>
                <h2 className="text-xl font-bold">Semana {currentWeek}</h2>
                <button
                    onClick={() => setCurrentWeek(w => Math.min(totalWeeks, w + 1))}
                    disabled={currentWeek === totalWeeks}
                    className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="space-y-6">
                {currentDays.map((day) => (
                    <Card key={day.day} className="overflow-hidden">
                        <div className="bg-slate-50 -m-6 mb-6 p-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Dia {day.day}</h3>
                            <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">
                                {day.stats.calories} kcal
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(day.meals).map(([type, meal]) => (
                                <div key={type} className="p-3 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors">
                                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">{type}</div>
                                    <div className="font-medium text-slate-800 mb-1">{meal.name}</div>
                                    <div className="text-sm text-slate-500 line-clamp-2">
                                        {meal.ingredients.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Layout>
    );
}
