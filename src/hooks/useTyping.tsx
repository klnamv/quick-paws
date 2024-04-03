import { useCallback, useEffect, useState, useRef } from "react";
import { isKeyboardCodeAllowed } from '../utils/helpers';

const useTyping = (enabled: boolean) => {
    const [cursor, setCoursor] = useState(0);
    const [typed, setTyped] = useState<string>('');
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key, code }: KeyboardEvent) => {
        if (!enabled || !isKeyboardCodeAllowed(code)){
            return;
        };

        switch (key){
            case 'Backspace':
                setTyped((prev)=> prev.slice(0, -1));
                setCoursor(cursor - 1);
                totalTyped.current -= 1;
                break;
            default: 
                setTyped((prev)=> prev.concat(key));
                setCoursor(cursor + 1);
                totalTyped.current += 1;
            }
        }, [enabled]
    );

    const clearTyped = useCallback(()=> {
        setTyped('');
        setCoursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    },[keydownHandler]);

    return { typed, cursor, clearTyped, resetTotalTyped, totalTyped: totalTyped.current };
};


export default useTyping;