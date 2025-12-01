import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mealsData = require('../../data/meals.json');

// Simple seeded random for deterministic results based on user input
function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function generate60DayPlan(userStats, targetMacros) {
    const plan = [];

    // Create a seed from user stats to ensure same plan for same user
    let seed = userStats.name.length + userStats.age + userStats.weight;

    const mealsByType = {
        breakfast: mealsData.filter(m => m.type === 'breakfast'),
        lunch: mealsData.filter(m => m.type === 'lunch'),
        snack: mealsData.filter(m => m.type === 'snack'),
        dinner: mealsData.filter(m => m.type === 'dinner')
    };

    for (let day = 1; day <= 60; day++) {
        const dayPlan = {
            day,
            meals: {
                breakfast: getRandomMeal(mealsByType.breakfast, seed + day * 1),
                lunch: getRandomMeal(mealsByType.lunch, seed + day * 2),
                snack: getRandomMeal(mealsByType.snack, seed + day * 3),
                dinner: getRandomMeal(mealsByType.dinner, seed + day * 4)
            }
        };

        // Adjust portion sizes to match target calories roughly
        // This is a simplified adjustment logic
        const dailyCals = Object.values(dayPlan.meals).reduce((acc, m) => acc + m.calories, 0);
        const ratio = targetMacros.calories / dailyCals;

        dayPlan.stats = {
            calories: Math.round(dailyCals * ratio),
            ratio: ratio.toFixed(2)
        };

        plan.push(dayPlan);
    }

    return plan;
}

function getRandomMeal(list, seed) {
    const index = Math.floor(seededRandom(seed) * list.length);
    return list[index];
}
