import { calculateBMR, calculateTDEE, calculateMacros } from '../src/utils/calculations.js';
import { generate60DayPlan } from '../src/utils/generator.js';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Missing ID' });
        }

        // Decode User Data
        const userJson = Buffer.from(id, 'base64').toString('utf-8');
        const user = JSON.parse(userJson);

        // Re-calculate Stats & Plan (Deterministic)
        const bmr = calculateBMR(user.weight, user.height, user.age, user.sex);
        const tdee = calculateTDEE(bmr, user.activity);
        const { calories, macros } = calculateMacros(tdee, user.goal);
        const plan = generate60DayPlan(user, { calories, macros });

        const exportData = {
            user,
            stats: { bmr, tdee, calories, macros },
            plan
        };

        // Set Headers for Download
        res.setHeader('Content-Disposition', 'attachment; filename=plano_60_dias.json');
        res.setHeader('Content-Type', 'application/json');

        res.status(200).send(JSON.stringify(exportData, null, 2));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Invalid ID or Server Error' });
    }
}
