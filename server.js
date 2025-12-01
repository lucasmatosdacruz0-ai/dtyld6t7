import express from 'express';
import cors from 'cors';
import generatePlan from './api/generate-plan.js';
import downloadPlan from './api/download-plan.js';
import replaceMeal from './api/replace-meal.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Wrapper to adapt Vercel serverless function signature (req, res) to Express
const adapt = (handler) => (req, res) => {
    handler(req, res);
};

app.post('/api/generate-plan', adapt(generatePlan));
app.get('/api/download-plan', adapt(downloadPlan));
app.patch('/api/replace-meal', adapt(replaceMeal));

app.listen(port, () => {
    console.log(`Backend local rodando em http://localhost:${port}`);
});
