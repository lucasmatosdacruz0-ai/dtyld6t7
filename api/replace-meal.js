import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mealsData = require('../data/meals.json');

export default function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { currentMealId, type } = req.body;

        // Filter meals of the same type, excluding the current one
        const alternatives = mealsData.filter(m => m.type === type && m.id !== currentMealId);

        if (alternatives.length === 0) {
            return res.status(404).json({ error: 'No alternatives found' });
        }

        // Pick a random alternative
        const randomAlt = alternatives[Math.floor(Math.random() * alternatives.length)];

        res.status(200).json({ meal: randomAlt });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}
