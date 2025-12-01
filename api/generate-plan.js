import { calculateBMR, calculateTDEE, calculateMacros } from '../src/utils/calculations.js';
import { generate60DayPlan } from '../src/utils/generator.js';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ error: 'Missing user data' });
        }

        // 1. Calculate Stats
        const bmr = calculateBMR(user.weight, user.height, user.age, user.sex);
        const tdee = calculateTDEE(bmr, user.activity);
        const { calories, macros } = calculateMacros(tdee, user.goal);

        // 2. Generate Plan
        const plan = generate60DayPlan(user, { calories, macros });

        // 3. Create Download ID (Base64 encoded user data for stateless regeneration)
        const downloadId = Buffer.from(JSON.stringify(user)).toString('base64');

        res.status(200).json({
            user,
            stats: { bmr, tdee, calories, macros },
            plan,
            downloadUrl: `/api/download-plan?id=${downloadId}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
