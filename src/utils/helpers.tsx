export const formatPercentage = (percentage: number) => {
    return percentage.toFixed(0) + '%';
}

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith('Key') ||
        code.startsWith('Digit') ||
        code === 'Backspace' ||
        code === 'Space'
    );
};

export const countErrors = (actual: string, expected: string) => {
    console.log(`actual: ${actual}`);
    console.log(`expected: ${expected}`);
    const expectedCharacters = expected.split('');
    console.log(`expectedCharacters: ${expectedCharacters}`);

    return expectedCharacters.reduce((errors, expectedChar, i) => {
        const actualChar = actual[i] || '';
        if (actualChar !== expectedChar) {
            errors++; 
        }
        return errors;
    }, 0);
};
   
export const calculateAccuracyPercentage = (errors: number, total: number) => {
    if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
    }
    return 0;
};

  
export const debug = (str: string) => {
    if (process.env.NODE_ENV === "development") {
        console.debug(str);
    }
};