import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Form({ onSubmit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', sex: '', weight: '', height: '',
        activity: 'Intermediario', goal: 'Emagrecer',
        preferences: [], allergies: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Vamos conhecer você</h2>
                    <span className="text-sm font-medium text-indigo-600">Passo {step} de 3</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                <Card>
                    {step === 1 && (
                        <div className="space-y-4">
                            <Input label="Nome" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Lucas" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Idade" name="age" type="number" value={formData.age} onChange={handleChange} />
                                <Input label="Sexo" name="sex" type="select" options={['M', 'F']} value={formData.sex} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Peso (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
                                <Input label="Altura (cm)" name="height" type="number" value={formData.height} onChange={handleChange} />
                            </div>
                            <Button onClick={handleNext} className="w-full mt-4">Próximo</Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <Input
                                label="Nível de Atividade"
                                name="activity"
                                type="select"
                                options={['Iniciante', 'Intermediario', 'Avançado']}
                                value={formData.activity}
                                onChange={handleChange}
                            />
                            <Input
                                label="Objetivo"
                                name="goal"
                                type="select"
                                options={['Emagrecer', 'Massa magra', 'Massa muscular']}
                                value={formData.goal}
                                onChange={handleChange}
                            />
                            <div className="flex gap-4 mt-6">
                                <Button onClick={handleBack} variant="secondary" className="flex-1">Voltar</Button>
                                <Button onClick={handleNext} className="flex-1">Próximo</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-4">
                                <h4 className="font-semibold text-indigo-900 mb-2">Quase lá!</h4>
                                <p className="text-sm text-indigo-700">
                                    Vamos gerar um plano de 60 dias baseado nos seus dados.
                                </p>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Button onClick={handleBack} variant="secondary" className="flex-1">Voltar</Button>
                                <Button onClick={handleSubmit} className="flex-1">Gerar Plano 🔥</Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </Layout>
    );
}
