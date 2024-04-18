import { useCallback, useEffect, useState } from 'react';
import { countErrors, debug } from "../utils/helpers";
import useWords from './useWords';
import useTyping from './useTyping';
import useCauntdownTimer from './useCountdownTimer';

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;
 
const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { timeLeft, startCountdown, resetCountdown } =
        useCauntdownTimer(COUNTDOWN_SECONDS);
    const { words, updateWords } = useWords(NUMBER_OF_WORDS);
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTyping(
      state !== "finish"
    );
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === words.length;

    const restart = useCallback(() => {
      debug("restarting...");
      resetCountdown();
      resetTotalTyped();
      setState("start");
      setErrors(0);
      updateWords();
      clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

    const sumErrors = useCallback(() => {
      const currentLength = typed.length; // Assuming 'typed' is the current text the user has inputted
      debug(`cursor: ${currentLength} - words.length: ${words.length}`);
      const wordsReached = words.substring(0, currentLength); // Use the length of 'typed' to determine the substring
      console.log(`wordsReached: ${wordsReached}`);
      setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
      console.log(`setErrors: ${words}`);
  }, [typed, words]);
      
    useEffect(() => {
      if (isStarting) {
        setState("run");
        startCountdown();
      }
    }, [isStarting, startCountdown]);

    useEffect(() => {
      if (!timeLeft && state === "run") {
        debug("time is up...");
        setState("finish");
        sumErrors();
      }
    }, [timeLeft, state, sumErrors]);

    useEffect(() => {
      if (areWordsFinished) {
        debug("words are finished...");
        sumErrors();
        updateWords();
        clearTyped();
      }
    }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

    return { state, words, timeLeft, typed, errors, restart, totalTyped };
}

export default useEngine;