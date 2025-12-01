export function calculateBMR(weight, height, age, sex) {
    // Mifflin-St Jeor
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (sex === 'M') {
        bmr += 5;
    } else {
        bmr -= 161;
    }
    return Math.round(bmr);
}

export function calculateTDEE(bmr, activity) {
    const multipliers = {
        'Iniciante': 1.2,
        'Intermediario': 1.375,
        'Avançado': 1.55
    };
    return Math.round(bmr * (multipliers[activity] || 1.2));
}

export function calculateMacros(tdee, goal) {
    let calories = tdee;
    let ratios = { p: 0.3, c: 0.4, f: 0.3 }; // Default Emagrecer

    if (goal === 'Emagrecer') {
        calories = tdee * 0.8; // -20%
        ratios = { p: 0.3, c: 0.4, f: 0.3 };
    } else if (goal === 'Massa magra') {
        calories = tdee * 1.1; // +10%
        ratios = { p: 0.28, c: 0.47, f: 0.25 };
    } else if (goal === 'Massa muscular') {
        calories = tdee * 1.15; // +15%
        ratios = { p: 0.25, c: 0.50, f: 0.25 };
    }

    calories = Math.round(calories);

    return {
        calories,
        macros: {
            p: Math.round((calories * ratios.p) / 4),
            c: Math.round((calories * ratios.c) / 4),
            f: Math.round((calories * ratios.f) / 9)
        }
    };
}
